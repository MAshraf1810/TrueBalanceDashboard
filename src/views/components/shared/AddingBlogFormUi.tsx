import TextInputWithHook from "./TextInputWithHook";

const AddingBlogFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 bg-white p-4 rounded-lg ">
      <TextInputWithHook
        label={"User Name"}
        name="user_name"
        placeholder={"Enter your User Name..."}
        disabled
      />
      <TextInputWithHook
        label={"User Location"}
        name="user_location"
        placeholder={"Enter your User Location..."}
        disabled
      />
      <TextInputWithHook
        label={"Mobile Number"}
        name="user_phone"
        placeholder={"Enter your phone number..."}
        disabled
      />

      <TextInputWithHook
        label={"Total Sessions"}
        name="total_session"
        placeholder={"Enter number of sessions..."}
        disabled
      />

      <TextInputWithHook
        label={"Service Name"}
        name="service"
        placeholder={"Enter service name..."}
        disabled
      />

      <TextInputWithHook
        label={"Session Date"}
        name="first_session_date"
        placeholder={"Enter first session date..."}
        disabled
      />

      <TextInputWithHook
        label={"Payment Date"}
        name="booking_date"
        placeholder={"Enter booking date..."}
        disabled
      />

      <TextInputWithHook
        label={"Breed"}
        name="breed"
        placeholder={"Enter dog's breed..."}
        disabled
      />

      <TextInputWithHook
        label={"Dog Name"}
        name="name"
        placeholder={"Enter dog's name..."}
        disabled
      />

      <TextInputWithHook
        label={"Gender"}
        name="gender"
        placeholder={"Enter dog's gender..."}
        disabled
      />

      <TextInputWithHook
        label={"Age"}
        name="age"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"additional_info"}
        name="additional_info"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"aggression"}
        name="aggression"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"destructive_behaviors"}
        name="destructive_behaviors"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"excessive_barking_whining"}
        name="excessive_barking_whining"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"fears_phobias"}
        name="fears_phobias"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"other_behavioral_issues"}
        name="other_behavioral_issues"
        placeholder={"Enter dog's age..."}
        disabled
      />
      <TextInputWithHook
        label={"separation_anxiety"}
        name="separation_anxiety"
        placeholder={"Enter dog's age..."}
        disabled
      />
      {/* 
      additional_info
aggression
destructive_behaviors
excessive_barking_whining
fears_phobias
other_behavioral_issues
separation_anxiety
      
      */}
    </section>
  );
};

export default AddingBlogFormUi;
