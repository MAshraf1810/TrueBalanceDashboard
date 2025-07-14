import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import { useAddServiceMutation } from "../../hooks/services/useAddServiceMutation";
import {
  addServiceSchema,
  serviceFormValues,
  updateServiceSchema,
} from "../../components/zod-schema/addServiceSchema";
import AddingServiceFormUi from "../../components/one-time/AddingServiceFormUi";
import { useFetchService } from "../../hooks/services/useFetchService";
import TextEditor from "../../components/shared/TextEditor";

const AddServicesForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [serviceId, setServiceId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = serviceId ? updateServiceSchema : addServiceSchema;

  const methods = useForm<serviceFormValues>({
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
    mutateAsync: addServiceMutation,
    error,
  } = useAddServiceMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: serviceData,
    isFetching: isServiceFetching,
    isError: isFetchServiceError,
    error: fetchServiceError,
  } = useFetchService(serviceId || "");

  const onSubmit = (data: serviceFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "title[en]", value: data.titleEn },
      { key: "title[ar]", value: data.titleAr },
      { key: "text[en]", value: descriptionEn },
      { key: "text[ar]", value: descriptionAr },
    ];

    if (serviceId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`icon`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    serviceId
      ? addServiceMutation({ formData, serviceId })
      : addServiceMutation({ formData });


    setTimeout(() => {
      navigate("/services");
    }, 2500);
    
    methods.reset();

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) {
        setServiceId(ID);
        console.log("o=>", ID);
      }
    }
  }, [params]);

  useEffect(() => {
    if (serviceId) {
      methods.reset({
        titleAr: serviceData?.title?.ar,
        titleEn: serviceData?.title?.en,
      });

      if (serviceData) setDescriptionAr(serviceData?.text.ar);
      if (serviceData) setDescriptionEn(serviceData?.text.en);

      if (serviceData?.icon) setOldImagesPreview(serviceData?.icon);
    }
  }, [serviceData, methods.reset]);
  const [descriptionAr, setDescriptionAr] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchServiceError && (
          <p className="error-message">{fetchServiceError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isServiceFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Service</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingServiceFormUi />
          <div className="mt-4">
            <TextEditor
              onChange={setDescriptionAr}
              value={descriptionAr}
              label="Description(Ar)"
            />
            <TextEditor
              onChange={setDescriptionEn}
              value={descriptionEn}
              label="Description(En)"
            />
          </div>
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
              Add Service
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddServicesForm;
