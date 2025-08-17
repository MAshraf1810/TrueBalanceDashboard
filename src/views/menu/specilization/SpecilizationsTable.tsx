interface SpecializationsTableProps {
    headers: string[];
    data: any[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const SpecializationsTable = ({ headers, data, onEdit, onDelete }: SpecializationsTableProps) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-white text-gray-800">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="text-left p-4 border-b">
                                {header}
                            </th>
                        ))}
                        <th className="text-left p-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="p-4 border-b">{item.id}</td>
                            <td className="p-4 border-b">{item.name.en}</td>
                            <td className="p-4 border-b">{item.name.ar}</td>
                            <td className="p-4 border-b space-x-2">
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="bg-bruColorLight2 py-1 px-3 rounded-lg text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => onEdit(item.id)}
                                    className="bg-bruColorLight3 py-1 px-3 rounded-lg text-sm"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    {data?.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center p-4 text-gray-500">
                                No specializations found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SpecializationsTable;