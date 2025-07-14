import TableActions from "../../components/shared/TableActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PagesTable from "./PagesTable";
import { useFetchPages } from "../../hooks/pages/useFetchPages";

const Pages = () => {
  const navigate = useNavigate();

  const { data, isLoading, error, isError } = useFetchPages();

  // Define the columns : accessor is the key in the data object.
  const headers = ["ID", "Name", "Title"];

  if (isLoading)
    return (
      <div className="flex  flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-56"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );

  if (isError)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {error.message}</span>
      </div>
    );

  return (
    <div className="p-6">
      <ToastContainer />
      <TableActions
        header={"Pages"}
        add={""}
        onAdd={() => navigate("/pages/add")}
      />
      {!isLoading && !isError && (
        <PagesTable
          headers={headers}
          data={data!}
          lang="en"
        />
      )}
    </div>
  );
};
export default Pages;
