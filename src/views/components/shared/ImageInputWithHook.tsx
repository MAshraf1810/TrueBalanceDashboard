import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../zod-schema/addProjectSchema";

// if you updating the image, you need to revoke the old URL.
const ImageInputWithHook = ({
  label = "Select Image",
}: {
  label?: string;
}) => {
  const methods = useFormContext<ProjectFormValues>();
  return (
    <section>
      <FormProvider {...methods}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <Controller
          name="images"
          control={methods.control}
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <input
              className=" file-input file-input-bordered"
              type="file"
              ref={ref}
              name={name}
              multiple
              onBlur={onBlur}
              onChange={(e) => {
                const files = e.target.files;
                onChange(files ? Array.from(files) : null);
              }}
            />
          )}
        />
        {methods.formState.errors.images && (
          <p className="text-red-500 px-3 py-2 text-xs w-fit bg-red-100 rounded-lg mt-2">
            {methods.formState.errors.images.message}
          </p>
        )}
      </FormProvider>
    </section>
  );
};

export default ImageInputWithHook;
