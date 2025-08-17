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
import { useFetchService } from "../../hooks/services/useFetchService";
import TextEditor from "../../components/shared/TextEditor";

const AddServicesForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [descriptionAr, setDescriptionAr] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
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

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, []);

  useEffect(() => {
    const cleanup = handleImagesChange(images);
    return () => cleanup && cleanup();
  }, [images, handleImagesChange]);

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

  const handleDeleteProjectImage = (ImageId: number) => {
    mutateImageDeletion(ImageId);
  };

  const onSubmit = async (data: serviceFormValues) => {
    const formData = new FormData();

    // Append text fields
    formData.append("title[en]", data.titleEn);
    formData.append("title[ar]", data.titleAr);
    formData.append("text[en]", descriptionEn);
    formData.append("text[ar]", descriptionAr);

    // Laravel method spoofing
    if (serviceId) formData.append("_method", "put");

    // Append image (only if selected)
    if (Array.isArray(data.images) && data.images.length > 0) {
      const image = data.images[0];
      if (image instanceof File && image.type.startsWith("image/")) {
        formData.append("icon", image);
      } else {
        console.error("Invalid image file format!");
        return;
      }
    }

    // Debug log
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      await addServiceMutation(serviceId ? { formData, serviceId } : { formData });
      methods.reset();
      setImagesPreview([]);
      setTimeout(() => {
        navigate("/services");
      }, 1500);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  useEffect(() => {
    if (params?.id) {
      setServiceId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (serviceId && serviceData) {
      methods.reset({
        titleAr: serviceData.title?.ar,
        titleEn: serviceData.title?.en,
      });
      setDescriptionAr(serviceData.text?.ar || "");
      setDescriptionEn(serviceData.text?.en || "");
      setOldImagesPreview(serviceData.icon || "");
    }
  }, [serviceData, serviceId, methods]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {isError && <p className="error-message">{error.message}</p>}
        {isFetchServiceError && (
          <p className="error-message">{fetchServiceError.message}</p>
        )}
        {(isPending || isServiceFetching || isDeleteImageLoading) && (
          <LoadingModal />
        )}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">
          {serviceId ? "Update Service" : "Add Service"}
        </h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Title AR */}
          <div className="form-control mb-4">
            <label className="label font-medium">Title (AR)</label>
            <input
              {...methods.register("titleAr")}
              type="text"
              placeholder="أدخل العنوان باللغة العربية"
              className="input input-bordered w-full"
            />
            {methods.formState.errors.titleAr && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.titleAr.message}
              </p>
            )}
          </div>

          {/* Title EN */}
          <div className="form-control mb-4">
            <label className="label font-medium">Title (EN)</label>
            <input
              {...methods.register("titleEn")}
              type="text"
              placeholder="Enter title in English"
              className="input input-bordered w-full"
            />
            {methods.formState.errors.titleEn && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.titleEn.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-control mb-4">
            <label className="label font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  methods.setValue("images", [files[0]]);
                } else {
                  methods.setValue("images", []);
                }
              }}
            />
          </div>

          {/* Description Editors */}
          <div className="mt-4">
            <TextEditor
              onChange={setDescriptionAr}
              value={descriptionAr}
              label="Description (AR)"
            />
            <TextEditor
              onChange={setDescriptionEn}
              value={descriptionEn}
              label="Description (EN)"
            />
          </div>

          {/* Previews */}
          {imagesPreview.length > 0 && (
            <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
          )}
          {oldImagesPreview && (
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
              {serviceId ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddServicesForm;