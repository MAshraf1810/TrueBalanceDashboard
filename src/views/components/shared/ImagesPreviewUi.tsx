const ImagesPreviewUi = ({
  imagesPreviewUrls,
}: {
  imagesPreviewUrls: string[];
}) => {
  return (
    <section className="flex flex-wrap w-fit gap-4 items-center p-4 border border-gray-200 rounded-lg mt-4">
      {imagesPreviewUrls?.map((img, idx) => (
        <div key={idx} className="border shadow-xl rounded-md">
          <img src={img} alt="preview" className=" object-contain h-32 w-32" />
        </div>
      ))}
    </section>
  );
};

export default ImagesPreviewUi;
