import ImageInputWithHook from "../shared/ImageInputWithHook";
import TextInputWithHook from "../shared/TextInputWithHook";
const inputData = [
  { name: "name", placeholder: "Enter your name..." },
  { name: "email", placeholder: "Enter your email address..." },
  { name: "password", placeholder: "Enter your password..." },
  { name: "phone", placeholder: "Enter your phone number..." },
];
const AddingServiceFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      {inputData.map((input) => (
        <TextInputWithHook
          key={input.name}
          label={input.name.charAt(0).toUpperCase() + input.name.slice(1)}
          name={input.name}
          placeholder={input.placeholder}
        />
      ))}
      <ImageInputWithHook label={"Images"} />
    </section>
  );
};

export default AddingServiceFormUi;
