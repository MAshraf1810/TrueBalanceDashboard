// @ts-nocheck
import React from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder?: string;
}

const TextInputWithHook: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder = "Type something...",
  ...rest // collect all remaining props
}) => {
  const { register, formState } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...rest} // spread the rest of the props here
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

export default TextInputWithHook;
