import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import AddingTeamFormUi from "../../components/shared/AddingTeamFormUi";
import { useAddTeamMutation } from "../../hooks/teams/useAddTeamMutation";
import {
  addTeamSchema,
  teamFormValues,
  updateTeamSchema,
} from "../../components/zod-schema/addTeamSchema";
import { useFetchTeam } from "../../hooks/teams/useFetchTeam";

const AddTeamForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [teamId, setTeamId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = teamId ? updateTeamSchema : addTeamSchema;

  const methods = useForm<teamFormValues>({
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
    mutateAsync: addTeamMutation,
    error,
  } = useAddTeamMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: teamData,
    isFetching: isTeamFetching,
    isError: isFetchTeamError,
    error: fetchTeamError,
  } = useFetchTeam(teamId || "");

  const onSubmit = (data: teamFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "name[en]", value: data.teamNameEn },
      { key: "name[ar]", value: data.teamNameAr },
      { key: "position[en]", value: data.jobTitleEn },
      { key: "position[ar]", value: data.jobTitleAr },
    ];

    if (teamId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`image`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    teamId
      ? addTeamMutation({ formData, projectId: teamId })
      : addTeamMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/teams");
    }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setTeamId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (teamId) {
      methods.reset({
        teamNameAr: teamData?.name?.ar,
        teamNameEn: teamData?.name?.en,
        jobTitleAr: teamData?.position?.ar,
        jobTitleEn: teamData?.position?.en,
      });

      if (teamData?.image) setOldImagesPreview(teamData?.image);
      console.log("Copooo=>", teamData?.image);
    }
  }, [teamData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchTeamError && (
          <p className="error-message">{fetchTeamError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isTeamFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Team</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingTeamFormUi />

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
              Add Team
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddTeamForm;
