import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import {
  sliderFormValues,
} from "../../components/zod-schema/addSliderSchema";
import ImageInputWithHook from "../../components/shared/ImageInputWithHook";
import { useAddClientMutation } from "../../hooks/clients/useAddClientMutation";
import {
  addClientSchema,
  clientFormValues,
  updateClientSchema,
} from "../../components/zod-schema/addClientSchema";
import { useFetchClient } from "../../hooks/clients/useFetchClient";

const AddClientsForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [clientId, setClientId] = useState("");

  const params = useParams();

  const schema = clientId ? updateClientSchema : addClientSchema;

  const methods = useForm<sliderFormValues>({
    resolver: zodResolver(schema),
  });

  const images = methods.watch("images");
  const handleImagesChange = useCallback((images: File[] | null) => {
    if (images) {
      const urls = Array.from(images).map((img) => URL.createObjectURL(img));
      setImagesPreview(urls);

      // Clean up URLs when component unmounts or images change
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, []);

  useEffect(() => {
    const cleanup = handleImagesChange(images);

    // Cleanup on component unmount or when images change
    return () => cleanup && cleanup();
  }, [images, handleImagesChange]);

  const handleDeleteProjectImage = (ImageId: number) => {
    mutateImageDeletion(ImageId);
  };

  const {
    isError,
    isPending,
    mutateAsync: addClientMutation,
    error,
  } = useAddClientMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: clientData,
    isFetching: isClientFetching,
    isError: isFetchClientError,
    error: fetchClientError,
  } = useFetchClient(clientId || "");

  const onSubmit = (data: clientFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [];

    if (clientId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`logo`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    clientId
      ? addClientMutation({ formData, clientId })
      : addClientMutation({ formData });

    // methods.reset();

    // setTimeout(() => {
    //   navigate("/sliders");
    // }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setClientId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (clientId) {
      if (clientData?.logo) setOldImagesPreview(clientData?.logo);
    }
  }, [clientData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchClientError && (
          <p className="error-message">{fetchClientError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isClientFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Client</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ImageInputWithHook label={"Background Images"} />

          {imagesPreview.length > 0 && (
            <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
          )}

          {oldImagesPreview?.length > 0 && (
            <OldImagesPreviewUi
              oldImagesPreview={oldImagesPreview}
              onDeleteProjectImage={(id) => handleDeleteProjectImage(id)}
            />
          )}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddClientsForm;
