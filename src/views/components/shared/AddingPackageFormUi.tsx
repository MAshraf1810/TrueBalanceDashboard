import { t } from "i18next";
import TextInputWithHook from "./TextInputWithHook";
import SelectInputWithHook from "./SelectInputWithHook";
import NumberInputWithHook from "./NumberInputWithHook";

const AddingPackageFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label={t("projects:projects.form.title")}
        name="title_ar"
        placeholder={t("projects:projects.form.placeholder.titleAr")}
      />
      <TextInputWithHook
        label={t("projects:projects.form.title")}
        name="title_en"
        placeholder={t("projects:projects.form.placeholder.titleEn")}
      />
      {/* <NumberInputWithHook
        label={"price_annual"}
        name="price_annual"
        placeholder={"Type Price_annual  ..."}
      /> */}
      <NumberInputWithHook
        label={"Price"}
        name="price"
        placeholder={"Type Price_monthly  ..."}
      />
      {/* <NumberInputWithHook
        label={"discount_annual"}
        name="discount_annual"
        placeholder={"Type discount_annual  ..."}
      />
      <NumberInputWithHook
        label={"discount_monthly"}
        name="discount_monthly"
        placeholder={"Type discount_monthly  ..."}
      /> */}
      {/* <SelectInputWithHook
        label="Bordered Status"
        name="bordered_status"
        options={[
          {
            label: "ACTIVE",
            value: "1",
          },
          {
            label: "INACTIVE",
            value: "0",
          },
        ]}
        placeholder="Bordered Status"
      /> */}
      <SelectInputWithHook
        label="Active Status"
        name="active_status"
        options={[
          {
            label: "ACTIVE",
            value: "1",
          },
          {
            label: "INACTIVE",
            value: "0",
          },
        ]}
        placeholder="Active Status "
      />
    </section>
  );
};

export default AddingPackageFormUi;
