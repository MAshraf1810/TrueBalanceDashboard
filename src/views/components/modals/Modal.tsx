const Modal = ({
  modal_id,
  onConfirm,
  meta: { confirm, label, Cancel },
}: {
  meta: { confirm: string; Cancel: string , label: string};
  modal_id: string;
  onConfirm: () => void;
}) => {
  return (
    <dialog id={modal_id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <p className="py-4 text-xl font-serif font-bold ">
          {label}
        </p>
        <div className="modal-action flex gap-2 items-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">{Cancel}</button>
          </form>
          <button className="btn bg-bruColorLight1" onClick={onConfirm}>
            {confirm}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
