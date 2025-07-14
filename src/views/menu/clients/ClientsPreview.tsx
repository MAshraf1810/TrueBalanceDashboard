import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Define the interface for props
interface StaticPageDetailsProps {
  imageUrl: string;
}

const ClientsPreview: React.FC<StaticPageDetailsProps> = ({ imageUrl }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/clients")}
          className="mb-2 p-3 shadow-2xl cursor-pointer w-fit bg-bruColorLight1 hover:bg-bruColorLight2  rounded-md"
        >
          <IoReturnUpBackOutline color="white" />
        </button>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-full h-64 md:h-96 overflow-hidden flex justify-center items-center">
            <img src={imageUrl} alt="page" className="object-contain  w-64 h-64" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPreview;
