import { useEffect } from "react";
import { IoIosEye } from "react-icons/io";
import { Booking } from "../../api/bookingApi";

interface BookingTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Booking[];
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const BookingTable = ({ data, headers, onView }: BookingTableProps) => {
  useEffect(() => {
    console.log("Bookings =>", data);
  }, [data]);

  return (
    <div className="overflow-x-auto text-black">
      <table className="table bg-white rounded-lg">
        <thead className="bg-[#F9F9F9] text-[#868C98]">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border-r border-gray-200">
                {header}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user_name}</td>
                <td>{booking.service}</td>
                <td>{booking.first_session_date}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.amount}</td>
                <td>{booking.total_session}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => onView(booking.id)}
                    className="btn btn-xs bg-blue-100 text-blue-700"
                  >
                    View <IoIosEye />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center text-black font-bold" colSpan={headers.length + 1}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;