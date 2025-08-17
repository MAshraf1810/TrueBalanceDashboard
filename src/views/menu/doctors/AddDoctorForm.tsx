import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import AddingServiceFormUi from "../../components/one-time/AddingServiceFormUi";
import {
  addDoctorSchema,
  DoctorFormValues,
  updateDoctorSchema,
} from "../../components/zod-schema/addDoctorSchema";
import { useFetchDoctor } from "../../hooks/doctors/useFetchDoctor";
import { useAddDoctorMutation } from "../../hooks/doctors/useAddDoctorMutation";
import { useFetchSpecilizations } from "../../hooks/specializations/useFetchSpecilizations";
import { toast } from "react-toastify";

const AddDoctorForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [doctorId, setDoctoreId] = useState("");
  const [specilize, setSpecilize] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const schema = doctorId ? updateDoctorSchema : addDoctorSchema;

  const methods = useForm<DoctorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      specializationId: specilize?.toString(),
      password: "",
    },
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
  } = useAddDoctorMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: doctorData,
    isFetching: isServiceFetching,
    isError: isFetchServiceError,
    error: fetchServiceError,
  } = useFetchDoctor(doctorId || "");

  const onSubmit = async (data: DoctorFormValues) => {
    const formData = new FormData();

    const fields = [
      { key: "name", value: data.name },
      { key: "email", value: data.email },
      { key: "phone", value: data.phone },
      { key: "specialization_id", value: data.specializationId },
      { key: "type", value: data.type },
    ];

    if (doctorId) fields.push({ key: "_method", value: "put" });
    if (data.password) fields.push({ key: "password", value: data.password });

    fields.forEach(({ key, value }) => formData.append(key, value));

    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          formData.append("image", img);
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    }

    try {
      if (doctorId) {
        await addServiceMutation({ formData, serviceId: doctorId });
        toast.success("Doctor updated successfully!");
      } else {
        await addServiceMutation({ formData });
        toast.success("Doctor added successfully!");
      }

      setImagesPreview([]);

      // Delay navigation to allow toast to display
      setTimeout(() => {
        navigate("/doctors");
      }, 1500); // 1.5 seconds

    } catch (err) {
      console.error("Failed to submit doctor:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) {
        setDoctoreId(ID);
        console.log("o=>", ID);
      }
    }
  }, [params]);

  useEffect(() => {
    if (doctorId) {
      methods.reset({
        email: doctorData?.email,
        name: doctorData?.name,
        phone: doctorData?.phone,
        type: doctorData?.type ?? "doctor",
      });

      if (doctorData?.image) setOldImagesPreview(doctorData?.image);
    }
  }, [doctorData, methods.reset]);
  const { data: specilizations } = useFetchSpecilizations();

  useEffect(() => {
    if (doctorData?.specialization && specilizations?.data) {
      const targetSpecilize = specilizations.data.find(
        (item) => item.name.en === doctorData.specialization
      );
      if (targetSpecilize) {
        console.log("ososos=>", targetSpecilize);
        setSpecilize(targetSpecilize.id);
      }
    }
  }, [doctorData, specilizations]);

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

        <h1 className="text-3xl font-serif font-semibold mb-4 text-white">
          Add Doctor
        </h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingServiceFormUi />
          <div className="mt-4 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <label className="block text-xl font-bold mb-2">Specialization</label>
              <select
                {...methods.register("specializationId")}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                {specilizations?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name?.en} / {item.name?.ar}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-xl font-bold mb-2">Type</label>
              <select
                {...methods.register("type")}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="doctor">Doctor</option>
                <option value="therapist">Therapist</option>
              </select>
            </div>
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
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8 text-white"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddDoctorForm;