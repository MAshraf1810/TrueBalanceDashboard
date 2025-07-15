import { Review } from "../../api/reviewsApi";

interface ReviewTableProps {
    headers: string[];
    lang: "en" | "ar";
    data: Review[];
    onDelete: (id: number) => void;
    onEdit: (review: Review) => void;
}

const ReviewTable = ({ data, headers, lang, onDelete, onEdit }: ReviewTableProps) => {
    return (
        <div className="overflow-x-auto text-black">
            <table className="table bg-white overflow-hidden rounded-[10px]">
                <thead className="bg-[#F9F9F9] text-[#868C98]">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border-r border-gray-200">{header}</th>
                        ))}
                        <th className="border-r border-gray-200">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? (
                        data.map((review) => (
                            <tr key={review.id}>
                                <td>
                                    <img
                                        src={review.image}
                                        alt="review"
                                        className="w-16 h-12 object-cover rounded"
                                    />
                                </td>
                                <td>{review.text[lang]}</td>
                                <td className="flex items-center gap-3">
                                    <button
                                        onClick={() => onEdit(review)}
                                        className="btn btn-xs bg-blue-500 text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(review.id)}
                                        className="btn btn-xs bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length + 1} className="text-center py-6 font-semibold">
                                No reviews found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewTable;