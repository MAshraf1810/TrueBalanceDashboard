import { Sliders } from "../../api/slidersApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Sliders[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const SlidersTable = ({
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
            data.map((slider: Sliders) => (
              <tr key={slider.id}>
                <td>{slider.id}</td>
                <td>{slider.title[lang]}</td>
                <td>{slider.text[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(slider.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(slider.id)}
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

export default SlidersTable;
