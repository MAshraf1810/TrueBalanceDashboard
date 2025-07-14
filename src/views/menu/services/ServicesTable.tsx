import { Services } from "../../api/servicesApi";

interface ProjectsTableProps {
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
}: ProjectsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((service: Services, idx: number) => (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{service.title[lang]}</td>
                <td>{service.text[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(service.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(service.id)}
                    className="btn btn-xs bg-bruColorLight3 "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;
