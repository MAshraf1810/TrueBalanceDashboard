import ImageInputWithHook from "../shared/ImageInputWithHook";
import SelectInputWithHook from "../shared/SelectInputWithHook";
import TextAreaWithHook from "../shared/TextAreaWithHook";
import TextInputWithHook from "../shared/TextInputWithHook";

const AddingSliderFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label={"Title"}
        name="titleEn"
        placeholder={"Write Your Title  [EN]..."}
      />
      <TextInputWithHook
        label={"Title"}
        name="titleAr"
        placeholder={"Write Your Title [AR]..."}
      />
      <TextAreaWithHook
        label={"Description"}
        name="textEn"
        placeholder={"Write Your Description [EN]..."}
      />
      <TextAreaWithHook
        label={"Description"}
        name="textAr"
        placeholder={"Write Your Description [AR]..."}
      />
      <TextInputWithHook
        label={"Button Title"}
        name="btnTitleAr"
        placeholder={"Write Your Button Title [AR]..."}
      />
      <TextInputWithHook
        label={"Button Title"}
        name="btnTitleEn"
        placeholder={"Write Your Button Title [En]..."}
      />
      <TextInputWithHook
        label={"Button URL"}
        name="btnUrl"
        placeholder={"Write Your Button URL ..."}
      />
      {/* 
      <TextInputWithHook
        label={"Button Status"}
        name="btnStatus"
        placeholder={"Write Your Button Status ..."}
      /> */}
      <SelectInputWithHook
        label="Button Status"
        name="btnStatus"
        placeholder="Write Your Button Status ..."
        options={[
          { label: "Active", value: "1" },
          { label: "In-active", value: "0" },
        ]}
      />

      <ImageInputWithHook label={"Background Images"} />
    </section>
  );
};

export default AddingSliderFormUi;
