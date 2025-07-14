import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMoneyBillWave } from "react-icons/fa";
import apiClient from "../../services/api-client";
import { useState } from "react";
import UpdateSubPriceForm from "./UpdateSubPriceForm";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from "../../../modals/LoadingModal";

type Lang = "en" | "ar";

type SubPrice = {
  id: number;
  title: Record<Lang, string>;
  price: number;
  sub_price: [];
};

type Detail = {
  id: number;
  title: Record<Lang, string>;
  price: number;
  sub_price: SubPrice[];
};

type Fee = {
  id: number;
  title: Record<Lang, string>;
  details: Detail[];
};

// Replace with your real endpoint
const fetchFees = async (): Promise<{ data: Fee[] }> => {
  const res = await apiClient.get("/api/dashboard/packages");
  return res.data;
};

const NewPackages: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const queryClient = useQueryClient();

  const [packageId, setPackageId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fees"],
    queryFn: fetchFees,
  });

  const handleOpenModel = () => {
    const modal = document.getElementById("package_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  if (isLoading) return <LoadingModal />;
  if (isError)
    return <p className="text-center text-red-500">Error loading fees.</p>;

  return (
    <div className="p-4  flex  gap-10 items-start justify-start flex-wrap ">
      <dialog
        id={"package_modal"}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <UpdateSubPriceForm
            id={packageId!}
            onUpdateSuccess={() => {
              const modal = document.getElementById(
                "package_modal"
              ) as HTMLDialogElement;
              if (modal) {
                modal.close();
              }
              queryClient.invalidateQueries({ queryKey: ["fees"] });

              toast.success("Update Successfully!!");
            }}
          />

          <div className="modal-action flex gap-2 items-center">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      {data?.data?.map((fee) => (
        <div key={fee.id} className="space-y-8">
          <h2 className="text-2xl font-bold border-b pb-1 text-right ">
            {fee.title[lang]}
          </h2>
          {fee.details.map((detail) => (
            <div key={detail.id} className="card bg-base-100 shadow-md p-4">
              <div className="flex flex-row-reverse gap-10 items-center  mb-8">
                <div className="text-xl font-semibold min-w-[180px] text-right">
                  {detail.title[lang]}
                </div>
                <div className="text-lg badge badge-success p-3">
                  <FaMoneyBillWave className="mr-1" />
                  {detail.price} EGP
                </div>
                <button
                  onClick={() => {
                    handleOpenModel();
                    setPackageId(detail.id);
                    console.log(detail.id);
                  }}
                  className="btn btn-primary btn-xs"
                >
                  Edit
                </button>
              </div>
              <ul className="ml-4 list-disc text-lg space-y-1">
                {detail.sub_price.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex flex-row-reverse justify-between items-center gap-20  "
                  >
                    <span>{sub.title[lang]}</span>
                    <span className="text-lg text-primary">
                      {sub.price} EGP
                    </span>
                    <button
                      onClick={() => {
                        handleOpenModel();
                        setPackageId(sub.id);
                        console.log(sub.id);
                      }}
                      className="btn"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default NewPackages;
