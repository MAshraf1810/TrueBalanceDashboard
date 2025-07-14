import { Settings } from "../../api/settingsApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Settings;
}

const SettingsTable = ({
  data,
  headers,
  lang,
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
          </tr>
        </thead>
        <tbody>
          {data ? (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title[lang]}</td>
              <td>{data.address[lang]}</td>
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
