import TextInputWithHook from "./TextInputWithHook";
import FileInputWithHook from "./FileInputWithHook";

interface Props {
    imagesPreview: string[];
    setImagesPreview: (urls: string[]) => void;
}

const AddReviewFormUi = ({ imagesPreview, setImagesPreview }: Props) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <TextInputWithHook
                label="English Text"
                name="text.en"
                placeholder="Enter English review..."
            />
            <TextInputWithHook
                label="Arabic Text"
                name="text.ar"
                placeholder="Enter Arabic review..."
            />
            <FileInputWithHook
                label="Image"
                name="image"
                setPreviewUrls={setImagesPreview}
                previewUrls={imagesPreview}
            />
        </section>
    );
};

export default AddReviewFormUi;
