import { Sliders } from "../../api/slidersApi";

interface SlidersTableProps {
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
}: SlidersTableProps) => {
  return (
    <div className="overflow-x-auto text-black">
      <table className="table bg-white overflow-hidden rounded-[10px]">
        <thead className="font-bold text-xl">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="font-bold text-lg">
          {data?.length > 0 ? (
            data.map((slider: Sliders, idx: number) => (
              <tr key={slider.id} className="hover:bg-gray-100 transition">
                <td>{idx + 1}</td>
                <td>{slider.title[lang]}</td>
                <td>{slider.text[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(slider.id)}
                    className="btn btn-xs bg-bruColorLight2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(slider.id)}
                    className="btn btn-xs bg-bruColorLight3"
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