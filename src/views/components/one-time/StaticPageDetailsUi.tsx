import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Define the interface for props
interface StaticPageDetailsProps {
  title: string;
  description: string;
  imageUrl: string;
}

const StaticPageDetailsUi: React.FC<StaticPageDetailsProps> = ({
  title,
  description,
  imageUrl,
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <p
          onClick={() => navigate("/pages")}
          className="mb-2 p-3 shadow-2xl cursor-pointer w-fit bg-bruColorLight1 hover:bg-bruColorLight2  rounded-md"
        >
          <IoReturnUpBackOutline color="white" />
        </p>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img
              src={imageUrl}
              alt="Static Page Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPageDetailsUi;
