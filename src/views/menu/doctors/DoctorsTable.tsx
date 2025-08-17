import { Doctors } from "../../api/doctorsApi";

interface ProjectsTableProps {
  headers: string[];
  data: Doctors[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const DoctorsTable = ({
  data,
  headers,
  onDelete,
  onEdit,
}: ProjectsTableProps) => {
  return (
    <div className="overflow-x-auto text-black">
      <table className="table bg-white overflow-hidden rounded-[10px]">
        {/* head */}
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
            data.map((doctor: Doctors, idx: number) => (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  <img src={doctor.image} className="w-48" alt="img" />
                </td>
                <td>{doctor.phone}</td>
                <td>{doctor.specialization}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onDelete(doctor.id)}
                    className="btn btn-xs bg-bruColorLight2 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(doctor.id)}
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

export default DoctorsTable;
