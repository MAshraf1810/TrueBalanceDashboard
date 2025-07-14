import { Statics } from "./Projects";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Statics["new_booking"];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ProjectsTable = ({ data, headers }: ProjectsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-white">
        {/* head */}
        <thead>
          <tr className="text-lg font-bold">
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((project, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{project.user_name}</td>
                <td>{project.service}</td>
                <td>{project.amount}</td>
                <td>{project.total_session}</td>
                <td>{project.first_session_date}</td>
                <td>{project.booking_date}</td>
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

export default ProjectsTable;
