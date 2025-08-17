import { Services } from "../../api/servicesApi";

interface ServicesTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Services[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ServicesTable = ({
  data,
  headers,
  lang,
  onDelete,
  onEdit,
}: ServicesTableProps) => {
  return (
    <div className="overflow-x-auto text-black">
      <table className="table bg-white overflow-hidden rounded-[10px] shadow-md">
        {/* head */}
        <thead className="bg-gray-100 font-bold text-xl text-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3">
                {header}
              </th>
            ))}
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="font-medium text-lg">
          {data?.length > 0 ? (
            data.map((service: Services, idx: number) => (
              <tr key={idx + 1} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{service.title[lang]}</td>
                <td className="px-4 py-3">{service.text[lang]}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onDelete(service.id)}
                      className="btn btn-xs bg-bruColorLight2 text-white"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onEdit(service.id)}
                      className="btn btn-xs bg-bruColorLight3 text-white"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;