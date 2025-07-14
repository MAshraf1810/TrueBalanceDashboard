import ImageInputWithHook from "./ImageInputWithHook";
import SelectInputWithHook from "./SelectInputWithHook";
import TextInputWithHook from "./TextInputWithHook";
import TextAreaWithHook from "./TextAreaWithHook";

const AddingProjectFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label="Job Title (Arabic)"
        name="titleAr"
        placeholder="Enter job title in Arabic"
      />
      <TextInputWithHook
        label="Job Title (English)"
        name="titleEn"
        placeholder="Enter job title in English"
      />
      <TextInputWithHook
        label="Job Location (Arabic)"
        name="addressAr"
        placeholder="Enter job location in Arabic"
      />
      <TextInputWithHook
        label="Job Location (English)"
        name="addressEn"
        placeholder="Enter job location in English"
      />
      <SelectInputWithHook
        options={[
          {
            label: "Remote",
            value: "Residential Area",
          },
          {
            label: "On-site",
            value: "Commercial Area",
          },
        ]}
        label="Work Type"
        name="type"
        placeholder="Select work type"
      />
      <SelectInputWithHook
        options={[
          {
            label: "Inactive",
            value: "0",
          },
          {
            label: "Active",
            value: "1",
          },
        ]}
        label="Status"
        name="delivered_status"
        placeholder="Select status"
      />
      <TextAreaWithHook
        label="Job Description (Arabic)"
        name="descriptionAr"
        placeholder="Enter job description in Arabic"
      />
      <TextAreaWithHook
        label="Job Description (English)"
        name="descriptionEn"
        placeholder="Enter job description in English"
      />
      <ImageInputWithHook label="Upload Job Images" />
    </section>
  );
};

export default AddingProjectFormUi;
