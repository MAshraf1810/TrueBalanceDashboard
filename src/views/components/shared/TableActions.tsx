interface TableActionsProps {
  header: string;
  add: string;
  onAdd?: () => void;
  filterOptions?: string[]; // e.g., ["User ID", "Services Name", ...]
  onFilterChange?: (filterKey: string, value: string) => void;
}

const TableActions = ({ header, onAdd, add }: TableActionsProps) => {
  return (
    <div className="flex justify-between items-center mb-4 text-white">
      <div className="text-2xl font-serif font-semibold">{header}</div>
      {add && (
        <div className="flex items-center gap-4">
          <button
            onClick={onAdd}
            className="bg-bruColor hover:bg-[#138496] text-white font-bold py-2 px-4 rounded"
          >
            {add}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableActions;
