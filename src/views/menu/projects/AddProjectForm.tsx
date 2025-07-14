import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProjectSchema,
  ProjectFormValues,
  updateProductSchema,
} from "../../components/zod-schema/addProjectSchema";
import { useAddProjectMutation } from "../../hooks/projects/useAddProjectMutation";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProject } from "../../hooks/projects/useFetchProject";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import AddingProjectFormUi from "../../components/shared/AddingProjectFormUi";

const AddProjectForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState<
    { id: number; image: string }[]
  >([]);
  const [projectId, setProjectId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = projectId ? updateProductSchema : addProjectSchema;

  const methods = useForm<ProjectFormValues>({
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
    mutateAsync: AddProjectMutation,
    error,
  } = useAddProjectMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: projectData,
    isFetching: isProjectFetching,
    isError: isFetchProjectError,
    error: fetchProjectError,
  } = useFetchProject(projectId || "");

  const onSubmit = (data: ProjectFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "title[en]", value: data.titleEn },
      { key: "title[ar]", value: data.titleAr },
      { key: "text[en]", value: data.descriptionEn },
      { key: "text[ar]", value: data.descriptionAr },
      { key: "address[en]", value: data.addressEn },
      { key: "address[ar]", value: data.addressAr },
      { key: "type", value: data.type },
      { key: "delivered_status", value: data.delivered_status },
    ];

    if (projectId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`thumbnail`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    projectId
      ? AddProjectMutation({ formData, projectId })
      : AddProjectMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/projects");
    }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setProjectId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (projectId) {
      // Helper function to ensure delivered_status is correctly typed
      const convertDeliveredStatus = (
        status: number | undefined
      ): "0" | "1" | undefined => {
        if (status === undefined) return undefined;
        return status === 1 ? "1" : "0";
      };
      methods.reset({
        addressAr: projectData?.address?.ar,
        addressEn: projectData?.address?.en,
        titleAr: projectData?.title?.ar,
        titleEn: projectData?.title?.en,
        descriptionAr: projectData?.text?.ar,
        descriptionEn: projectData?.text?.en,
        type: projectData?.type as "Residential Area" | "Commercial Area",
        delivered_status: convertDeliveredStatus(projectData?.deliveredStatus),
      });

      if (projectData?.images) setOldImagesPreview(projectData?.images);
    }
  }, [projectData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchProjectError && (
          <p className="error-message">{fetchProjectError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isProjectFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Jobs</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingProjectFormUi />

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
              Add Job
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProjectForm;
