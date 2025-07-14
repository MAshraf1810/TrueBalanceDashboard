import React from "react";

interface TextInputProps {
  label?: string; // Label text
  name: string; // Name attribute for the input
  value?: string; // Current value of the input
  onChange: (name: string, value: string) => void; // Change handler
  placeholder?: string; // Optional placeholder
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Type something...",
}) => {
  // Handle input changes and pass them to the parent
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default TextInput;
