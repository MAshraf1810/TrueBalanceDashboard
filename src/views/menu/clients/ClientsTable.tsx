import { Clients } from "../../api/clientsApi";

interface ProjectsTableProps {
  headers: string[];
  data: Clients[];
  onDelete: (id: number) => void;
}

const ClientsTable = ({ data, headers, onDelete }: ProjectsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-white">
        {/* head */}
        <thead>
          <tr className="text-black font-extrabold text-lg">
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {data?.length > 0 ? (
            data.map((client: Clients) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.location}</td>
                <td>{client.join_at}</td>
                <td className="flex items-center gap-3 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(client.id);
                    }}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(client.id);
                    }}
                    className="btn btn-xs bg-bruColorLight3 "
                  >
                    Edit
                  </button> */}
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

export default ClientsTable;
