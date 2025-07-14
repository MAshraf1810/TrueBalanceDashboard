import ImageInputWithHook from "./ImageInputWithHook";
import TextInputWithHook from "./TextInputWithHook";

const AddingTeamFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label={"Team Name"}
        name="teamNameEn"
        placeholder={"Write Your Team Name [EN]..."}
      />
      <TextInputWithHook
        label={"Team NameAr"}
        name="teamNameAr"
        placeholder={"Write Your Team Name [AR]..."}
      />
      <TextInputWithHook
        label={"Job Title"}
        name="jobTitleEn"
        placeholder={"Write Your Job Title [EN]..."}
      />
      <TextInputWithHook
        label={"Job Title"}
        name="jobTitleAr"
        placeholder={"Write Your Job Title [AR]..."}
      />

      <ImageInputWithHook label={"Teams Images"} />
    </section>
  );
};

export default AddingTeamFormUi;
