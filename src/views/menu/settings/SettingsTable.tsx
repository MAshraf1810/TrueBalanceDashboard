import { Settings as SettingsType } from "../../api/settingsApi";

interface SettingsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: SettingsType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const SettingsTable = ({
  data,
  headers,
  lang,
  onEdit,
  onDelete,
}: SettingsTableProps) => {
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
          {data ? (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title[lang]}</td>
              <td>{data.address[lang]}</td>
              <td className="flex items-center gap-3">
                <button
                  onClick={() => onDelete(data.id)}
                  className="btn btn-xs bg-bruColorLight2"
                >
                  Delete
                </button>
                <button
                  onClick={() => onEdit(data.id)}
                  className="btn btn-xs bg-bruColorLight3"
                >
                  Edit
                </button>
              </td>
            </tr>
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

export default SettingsTable;