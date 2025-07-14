const ThumbnailImage = ({ source, alt }: { source: string; alt: string }) => {
  return (
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        <img src={source} alt={alt} />
      </div>
    </div>
  );
};

export default ThumbnailImage;
