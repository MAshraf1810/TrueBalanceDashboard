import { useNavigate } from "react-router-dom";
import { Pages } from "../../api/pagesApi";

interface PagesTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Pages[];
}

const PagesTable = ({ data, headers, lang }: PagesTableProps) => {
  const navigate = useNavigate();

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
            data.map((page: Pages, idx: number) => (
              <tr
                key={page.id}
                className="cursor-pointer hover:bg-gray-100 transition"
                onClick={() =>
                  navigate(`/pages/details/${page.id}`, { state: page })
                }
              >
                <td>{idx + 1}</td>
                <td>{page.name}</td>
                <td>{page.title[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/pages/add/${page.id}`, { state: page });
                    }}
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

export default PagesTable;