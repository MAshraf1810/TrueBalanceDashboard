import { MdDeleteForever } from "react-icons/md";

const OldImagesPreviewUi = ({
  oldImagesPreview,
  onDeleteProjectImage,
}: {
  oldImagesPreview: { id: number; image: string }[] | string;
  onDeleteProjectImage: (id: number) => void;
}) => {
  return (
    <>
      <p className="text-xl font-bold font-serif p-3 mb-1 mt-2">
        Older Images:{" "}
      </p>
      <section className="flex flex-wrap w-fit gap-4 items-center p-4 border border-gray-200 rounded-lg">
        {Array.isArray(oldImagesPreview)
          ? oldImagesPreview?.map((_) => (
              <div key={_.id} className="relative border shadow-xl rounded-md">
                <button
                  type="button"
                  onClick={() => onDeleteProjectImage(_.id)}
                  className="absolute cursor-pointer right-0 top-[-10px] w-7 h-7 rounded-full bg-red-100 flex justify-center items-center  "
                >
                  <MdDeleteForever color="red" className="text-xl z-40" />
                </button>
                <img
                  src={_.image}
                  alt="preview"
                  className=" object-contain h-32 w-32 rounded-md "
                />
              </div>
            ))
          : typeof oldImagesPreview === "string" && (
              <div className="relative border shadow-xl rounded-md">
                <img
                  src={oldImagesPreview}
                  alt="preview"
                  className=" object-contain h-32 w-32 rounded-md "
                />
              </div>
            )}
      </section>
    </>
  );
};

export default OldImagesPreviewUi;
