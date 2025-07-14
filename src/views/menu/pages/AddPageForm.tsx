import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import { Pages } from "../../api/pagesApi";
import AddingPageFormUi from "../../components/one-time/AddingPageFormUi";
import {
  pageFormValues,
  updatePageSchema,
} from "../../components/zod-schema/AddPageSchema";
import { useAddPageMutation } from "../../hooks/pages/useAddPageMutation";
import TextEditor from "../../components/shared/TextEditor";

const AddPageForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [descriptionAr, setDescriptionAr] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const methods = useForm<pageFormValues>({
    resolver: zodResolver(updatePageSchema),
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

  const {
    isError,
    isPending,
    mutateAsync: addPageMutation,
    error,
  } = useAddPageMutation();

  const onSubmit = (data: pageFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "name", value: payload.name },
      { key: "title[en]", value: data.titleEn },
      { key: "title[ar]", value: data.titleAr },
      { key: "text[en]", value: descriptionEn },
      { key: "text[ar]", value: descriptionAr },
    ];
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

    addPageMutation({ formData });

    // methods.reset();

    setImagesPreview([]);
  };

  const location = useLocation();
  const payload = location.state as Pages;

  useEffect(() => {
    console.log(payload);
    if (payload) {
      methods.reset({
        // name: payload?.name,
        titleEn: payload?.title.en,
        titleAr: payload?.title.ar,
      });
      if (payload) setDescriptionAr(payload?.text.ar);
      if (payload) setDescriptionEn(payload?.text.en);
      if (payload?.image) setOldImagesPreview(payload?.image);
    }
  }, [payload, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}

        <h1 className="text-3xl font-serif font-semibold mb-4">
          Update The Static Page
        </h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingPageFormUi />
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
              onDeleteProjectImage={(id) => console.log(id)}
            />
          )}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8"
            >
              Update Page
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddPageForm;
