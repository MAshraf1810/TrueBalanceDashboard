import { useNavigate } from "react-router-dom";
import { Pages } from "../../api/pagesApi";

interface ProjectsTableProps {
  headers: string[];
  lang: "en" | "ar";
  data: Pages[];
}

const PagesTable = ({ data, headers, lang}: ProjectsTableProps) => {
  const navigate = useNavigate();
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
            data.map((page: Pages, idx: number) => (
              <tr
                className="cursor-pointer"
                key={idx}
                onClick={() =>
                  navigate(`/pages/details/${idx}`, { state: page })
                }
              >
                <td>{idx + 1}</td>
                <td>{page.name}</td>
                <td>{page.title[lang]}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/pages/add/${idx}`, { state: page })
                    }}
                    className="btn btn-sm bg-bruColorLight3 "
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
