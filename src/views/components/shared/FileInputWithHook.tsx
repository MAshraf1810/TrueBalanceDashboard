// @ts-nocheck
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    previewUrls: string[];
    setPreviewUrls: (urls: string[]) => void;
}

const FileInputWithHook: React.FC<FileInputProps> = ({
    name,
    label,
    previewUrls,
    setPreviewUrls,
    ...rest
}) => {
    const { control, formState } = useFormContext();

    return (
        <div className="form-control col-span-1 md:col-span-2">
            <label className="label">
                <span className="label-text text-white">{label}</span>
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, name, ref } }) => (
                    <input
                        type="file"
                        name={name}
                        ref={ref}
                        multiple={false}
                        onBlur={onBlur}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setPreviewUrls([imageUrl]);
                                onChange(file);
                            }
                        }}
                        className="file-input file-input-bordered w-full"
                        {...rest}
                    />
                )}
            />

            {formState.errors[name] && (
                <p className="text-red-500 px-3 py-2 text-xs w-fit bg-red-100 rounded-lg mt-2">
                    {formState.errors[name]?.message as string}
                </p>
            )}

            {previewUrls.length > 0 && (
                <div className="mt-2">
                    <img
                        src={previewUrls[0]}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded shadow border"
                    />
                </div>
            )}
        </div>
    );
};

export default FileInputWithHook;