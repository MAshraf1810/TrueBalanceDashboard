// @ts-nocheck
import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectInputProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const SelectInputWithHook: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  placeholder = "Select an option...",
}) => {
  const methods = useFormContext();
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        {...methods.register(name)}
        className="select select-bordered w-full"
        defaultValue=""
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {methods.formState.errors[name] && (
        <p className="error-message">
          {typeof methods.formState.errors[name]?.message === "string"
            ? methods.formState.errors[name]?.message
            : ""}
        </p>
      )}
    </div>
  );
};

export default SelectInputWithHook;
