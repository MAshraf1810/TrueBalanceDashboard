import { Teams } from "../../api/teamsApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Teams[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TeamsTable = ({
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
            data.map((team: Teams) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name[lang]}</td>
                <td>{team.position[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(team.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(team.id)}
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

export default TeamsTable;
