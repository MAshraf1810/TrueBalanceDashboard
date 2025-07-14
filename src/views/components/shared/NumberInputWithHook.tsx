// @ts-nocheck
import React from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string; // Label text
  label: string; // Label text
  placeholder: string; // Optional placeholder
}

const NumberInputWithHook: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder = "Type something...",
}) => {
  const { register, formState } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="number"
        {...register(name, { valueAsNumber: true })}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
      {formState.errors[name] && (
        <p className="error-message">
          {typeof formState.errors[name]?.message === "string"
            ? formState.errors[name]?.message
            : ""}
        </p>
      )}
    </div>
  );
};

export default NumberInputWithHook;
