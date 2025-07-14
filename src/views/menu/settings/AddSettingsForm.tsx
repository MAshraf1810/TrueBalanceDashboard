// @ts-nocheck
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import AddingSettingFormUi from "../../components/one-time/AddingSettingFormUi";
import {
  updateSettingFormValues,
  updateSettingSchema,
} from "../../components/zod-schema/AddSettingSchema";
import { Settings } from "../../api/settingsApi";
import { useAddSettingMutation } from "../../hooks/settings/useAddSettingMutation";

const AddSettingsForm: React.FC = () => {
  const methods = useForm<updateSettingFormValues>({
    resolver: zodResolver(updateSettingSchema),
  });
  const location = useLocation();
  const payload = location.state as Settings;

  const {
    isError,
    isPending,
    mutateAsync: addSettingMutation,
    error,
  } = useAddSettingMutation();

  const navigate = useNavigate();

  const onSubmit = (data: updateSettingFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "title[en]", value: data.titleEn },
      { key: "title[ar]", value: data.titleAr },
      { key: "address[en]", value: data.addressEn },
      { key: "address[ar]", value: data.addressAr },
      { key: "email", value: data.email },
    ];

    fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Append phones array
    if (data.phones) {
      data.phones.forEach((phone, index) => {
        formData.append(`phones[phones][${index}]`, phone);
      });
    }

    // Append mobiles array
    if (data.mobiles) {
      data.mobiles.forEach((mobile, index) => {
        formData.append(`phones[mobiles][${index}]`, mobile);
      });
    }
    const social_media = {
      linkedin: data.linkedin,
      facebook: data.facebook,
      x: data.x,
      tiktok: data.tiktok,
      instagram: data.instagram,
      youTube: data.youTube,
    };

    // Append social media links dynamically
    if (social_media) {
      Object.entries(social_media).forEach(([key, value]) => {
        if (value) {
          formData.append(`social_media[${key}]`, value);
        }
      });
    }

    addSettingMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/settings");
    }, 2500);
  };

  useEffect(() => {
    if (payload) {
      methods.reset({
        addressAr: payload?.address?.ar,
        addressEn: payload?.address?.en,
        titleAr: payload?.title?.ar,
        titleEn: payload?.title?.en,
        facebook: payload?.social_media?.facebook,
        email: payload?.email,
        linkedin: payload?.social_media?.linkedin,
        youTube: payload?.social_media?.facebook,
        x: payload?.social_media?.x,
        tiktok: payload?.social_media?.tiktok,
        instagram: payload?.social_media?.instagram,
        lat: payload?.lat,
        long: payload?.long,
        phones: payload?.phones?.phones,
        mobiles: payload?.phones?.mobiles,
      });
    }
  }, [methods.reset, payload]);
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: methods.control,
    name: "phones",
  });

  const {
    fields: mobileFields,
    append: appendMobile,
    remove: removeMobile,
  } = useFieldArray({
    control: methods.control,
    name: "mobiles",
  });

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}

        <h1 className="text-3xl font-serif font-semibold mb-4">
          Update Settings
        </h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingSettingFormUi />

          {/* Phones */}
          <label className="label mt-2 shadow-xl p-3 rounded-md font-semibold text-lg w-fit">
            <span className="">Phones</span>
          </label>
          <div className="flex flex-col gap-3 mt-2 justify-center p-2 rounded-md">
            {phoneFields.map((field, index) => (
              <div key={field.id}>
                <input
                  {...methods.register(`phones.${index}` as const)}
                  placeholder="Phone number"
                  className="input input-bordered"
                />
                <button
                  type="button"
                  className="btn btn-ghost mx-1"
                  onClick={() => removePhone(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn bg-bruColorLight3 my-1"
            type="button"
            onClick={() => appendPhone("")}
          >
            Add Phone
          </button>
          {/* Phones */}

          {/* Mobiles */}

          <label className="label mt-4 shadow-xl p-3 rounded-md font-semibold text-lg w-fit">
            <span className="label-text ">Mobiles</span>
          </label>
          <div className="flex flex-col gap-3 mt-2 justify-center p-2 rounded-md">
            {mobileFields.map((field, index) => (
              <div key={field.id}>
                <input
                  {...methods.register(`mobiles.${index}` as const)}
                  placeholder="Mobile number"
                  className="input input-bordered"
                />
                <button
                  type="button"
                  className="btn btn-ghost mx-1"
                  onClick={() => removeMobile(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn bg-bruColorLight3 my-1"
            type="button"
            onClick={() => appendMobile("")}
          >
            Add Mobile
          </button>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8"
            >
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddSettingsForm;
