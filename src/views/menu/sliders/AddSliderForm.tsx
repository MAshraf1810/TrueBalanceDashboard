import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import { useAddSliderMutation } from "../../hooks/sliders/useAddSliderMutation";
import AddingSliderFormUi from "../../components/one-time/AddingSliderFormUi";
import {
  addSliderSchema,
  sliderFormValues,
  updateSliderSchema,
} from "../../components/zod-schema/addSliderSchema";
import { useFetchSlider } from "../../hooks/sliders/useFetchSlider";

const AddSliderForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [sliderId, setSliderId] = useState("");

  const params = useParams();

  const schema = sliderId ? updateSliderSchema : addSliderSchema;

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
    mutateAsync: addSliderMutation,
    error,
  } = useAddSliderMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: sliderData,
    isFetching: isSliderFetching,
    isError: isFetchSliderError,
    error: fetchSliderError,
  } = useFetchSlider(sliderId || "");
  const navigate = useNavigate();
  const onSubmit = (data: sliderFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "title[en]", value: data.titleEn },
      { key: "title[ar]", value: data.titleAr },
      { key: "text[en]", value: data.textEn },
      { key: "text[ar]", value: data.textAr },
      { key: "btn_title[en]", value: data.btnTitleEn },
      { key: "btn_title[ar]", value: data.btnTitleAr },
      { key: "btn_url", value: data.btnUrl },
      { key: "btn_active", value: data.btnStatus },
    ];

    if (sliderId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`background`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    sliderId
      ? addSliderMutation({ formData, sliderId })
      : addSliderMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/sliders");
    }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setSliderId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (sliderId) {
      methods.reset({
        titleEn: sliderData?.title.en,
        titleAr: sliderData?.title.ar,
        textEn: sliderData?.text.en,
        textAr: sliderData?.text.ar,
        btnTitleAr: sliderData?.btnTitle.ar,
        btnTitleEn: sliderData?.btnTitle.en,
        btnUrl: sliderData?.btnUrl,
        btnStatus: sliderData?.btnActive,
      });

      if (sliderData?.background) setOldImagesPreview(sliderData?.background);
    }
  }, [sliderData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchSliderError && (
          <p className="error-message">{fetchSliderError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isSliderFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Slider</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingSliderFormUi />

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
              Add Slider
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddSliderForm;
