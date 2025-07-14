import TextInputWithHook from "../shared/TextInputWithHook";

const AddingSettingFormUi = () => {
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
      <TextInputWithHook
        label={"Address"}
        name="addressEn"
        placeholder={"Write Your Address [EN]..."}
      />
      <TextInputWithHook
        label={"Address"}
        name="addressAr"
        placeholder={"Write Your Address [AR]..."}
      />

      <TextInputWithHook
        label={"Email"}
        name="email"
        placeholder={"Write Your Email..."}
      />
      <TextInputWithHook
        label={"Linkedin"}
        name="linkedin"
        placeholder={"Write Your Linkedin..."}
      />
      <TextInputWithHook
        label={"Facebook"}
        name="facebook"
        placeholder={"Write Your Facebook..."}
      />
      <TextInputWithHook label={"X"} name="x" placeholder={"Write Your x..."} />
      <TextInputWithHook
        label={"tiktok"}
        name="tiktok"
        placeholder={"Write Your tiktok..."}
      />
      <TextInputWithHook
        label={"Instagram"}
        name="instagram"
        placeholder={"Write Your Instagram ..."}
      />
      <TextInputWithHook
        label={"YouTube"}
        name="youTube"
        placeholder={"Write Your YouTube..."}
      />
      <TextInputWithHook
        label={"Long"}
        name="long"
        placeholder={"Write long..."}
      />
      <TextInputWithHook
        label={"Lat"}
        name="lat"
        placeholder={"Write Lat..."}
      />
    </section>
  );
};

export default AddingSettingFormUi;
