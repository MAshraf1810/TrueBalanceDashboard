import { useEffect } from "react";
import { IoIosEye } from "react-icons/io";
import { Booking } from "../../api/bookingApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Booking[];
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const BlogsTable = ({ data, headers, onView }: ProjectsTableProps) => {
  useEffect(() => {
    console.log("DEBUG=>", data);
  }, [data]);
  return (
    <div className="overflow-x-auto text-black">
      <table className="table bg-white overflow-hidden rounded-[10px]">
        {/* head */}
        <thead className="bg-[#F9F9F9] text-[#868C98]">
          <tr>
            {headers.map((header, index) => (
              <th className="border-r border-gray-200" key={index}>
                {header}
              </th>
            ))}
            <th className="border-r border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((team: Booking) => (
              <tr key={team.id}>
                <td>{team.user_name}</td>
                <td>{team.service}</td>
                <td>{team.first_session_date}</td>
                <td>{team.booking_date}</td>
                <td>{team.amount}</td>
                <td>{team.total_session}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onView(team.id)}
                    className="btn btn-xs bg-bruColorLight3"
                  >
                    View <IoIosEye />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-black font-bold" colSpan={headers.length + 1}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsTable;
