import TextInputWithHook from "./TextInputWithHook";
import FileInputWithHook from "./FileInputWithHook";

interface Props {
    imagesPreview: string[];
    setImagesPreview: (urls: string[]) => void;
}

const AddingBlogFormUi = ({ imagesPreview, setImagesPreview }: Props) => {

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <TextInputWithHook label="English Title" name="title.en" placeholder="Enter English title..." />
            <TextInputWithHook label="Arabic Title" name="title.ar" placeholder="Enter Arabic title..." />
            <TextInputWithHook label="English Text" name="text.en" placeholder="Enter English text..." />
            <TextInputWithHook label="Arabic Text" name="text.ar" placeholder="Enter Arabic text..." />

            <FileInputWithHook
                label="Background Image"
                name="background"
                setPreviewUrls={setImagesPreview}
                previewUrls={imagesPreview}
            />
        </section>
    );
};

export default AddingBlogFormUi;