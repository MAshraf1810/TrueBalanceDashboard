import ImageInputWithHook from "../shared/ImageInputWithHook";
import TextInputWithHook from "../shared/TextInputWithHook";

const AddingPageFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label={"Page Title"}
        name="titleAr"
        placeholder={"Write Your Page Title [AR]..."}
      />
      <TextInputWithHook
        label={"Page Title"}
        name="titleEn"
        placeholder={"Write Your Page Title [EN]..."}
      />
      {/* <TextInputWithHook
        label={"Page Name"}
        name="name"
        placeholder={"Write Your Page Name [EN]..."}
      /> */}
      <ImageInputWithHook label={"Pages Images"} />
    </section>
  );
};

export default AddingPageFormUi;
