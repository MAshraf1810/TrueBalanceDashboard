import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddingPackageFormUi from "../../components/shared/AddingPackageFormUi";
import { useAddPackageMutation } from "../../hooks/packages/useAddPackageMutation";
import {
  updatePackageSchema,
  addPackageSchema,
  PackageFormValues,
} from "../../components/zod-schema/addPackageSchema";
import { useFetchPackage } from "../../hooks/packages/useFetchPackage";

const AddPackageForm: React.FC = () => {
  const [packageId, setPackageId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = packageId ? updatePackageSchema : addPackageSchema;

  const {
    data: projectData,
    isFetching: isProjectFetching,
    isError: isFetchProjectError,
    error: fetchProjectError,
  } = useFetchPackage(packageId || "");

  const methods = useForm<PackageFormValues>({
    resolver: zodResolver(schema),
  });

  const {
    isError,
    isPending,
    mutateAsync: AddPackageMutation,
    error,
  } = useAddPackageMutation();

  const onSubmit = (data: PackageFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "title[en]", value: data.title_en },
      { key: "title[ar]", value: data.title_ar },
      { key: "price", value: data.price?.toString() },
      { key: "active_status", value: data.active_status },
    ];

    if (packageId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // ✅ Correct way to append features
    data.features.forEach((item, idx) => {
      formData.append(`features[${idx}][title][en]`, item.title_en);
      formData.append(`features[${idx}][title][ar]`, item.title_ar);
      formData.append(
        `features[${idx}][checked_status]`,
        item.checked_status.toString()
      );
    });

    packageId
      ? AddPackageMutation({ formData, packageId })
      : AddPackageMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/packages");
    }, 2500);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setPackageId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (packageId) {
      // Helper function to ensure delivered_status is correctly typed
      const convertDeliveredStatus = (
        status: number | undefined
      ): "0" | "1" | undefined => {
        if (status === undefined) return undefined;
        return status === 1 ? "1" : "0";
      };
      methods.reset({
        title_en: projectData?.title.en,
        title_ar: projectData?.title.ar,
        price: projectData?.price,
        active_status: convertDeliveredStatus(projectData?.activeStatus),
        features: projectData?.features.map((feature) => ({
          title_en: feature.title.en,
          title_ar: feature.title.ar,
          checked_status: feature.checkedStatus.toString() as "0" | "1", // Convert to string
        })),
      });
    }
  }, [projectData, methods.reset]);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "features",
  });

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

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Package</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingPackageFormUi />
          <h3 className="text-lg font-bold  mt-6 mb-3">Features</h3>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-10 content-start w-fit">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1  w-fit  mb-8">
                <div className="flex flex-col  gap-3">
                  <label className="text-lg font-semibold ">
                    Feature Title (English)
                  </label>
                  <input
                    className="input  input-bordered"
                    {...methods.register(`features.${index}.title_en`)}
                  />
                </div>
                <div className="flex flex-col  gap-3">
                  <label className="text-lg font-semibold">
                    Feature Title (Arabic)
                  </label>
                  <input
                    className="input input-bordered "
                    {...methods.register(`features.${index}.title_ar`)}
                  />
                </div>
                <div className="flex flex-col  gap-3">
                  <label className="text-lg font-semibold">
                    Checked Status
                  </label>
                  <select
                    className="select select-bordered"
                    {...methods.register(`features.${index}.checked_status`)}
                  >
                    <option value="1">Enabled</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
                <button
                  className="btn  my-5 "
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Feature
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn bg-bruColorLight1 hover:bg-bruColorLight1 text-white"
            onClick={() =>
              append({ title_en: "", title_ar: "", checked_status: "1" })
            }
          >
            Add Feature
          </button>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1  text-white px-12 my-8"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddPackageForm;
