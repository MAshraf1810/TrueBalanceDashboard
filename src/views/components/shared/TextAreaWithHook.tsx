// @ts-nocheck
import React from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaProps {
  name: string;
  label: string;
  placeholder: string;
}

const TextAreaWithHook: React.FC<TextAreaProps> = ({
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
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className="textarea textarea-bordered w-full"
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

export default TextAreaWithHook;
