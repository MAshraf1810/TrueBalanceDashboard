import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  label: string;
  onChange: (value: string) => void;
};

const TextEditor: React.FC<Props> = ({ value, label, onChange }) => {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold my-2">{label}</h1>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
