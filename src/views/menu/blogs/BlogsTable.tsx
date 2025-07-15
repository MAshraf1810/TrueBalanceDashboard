import { Blog } from "../../api/blogsApi";

interface BlogsTableProps {
    headers: string[];
    lang: "en" | "ar";
    data: Blog[];
    onDelete: (id: number) => void;
    onEdit: (blog: Blog) => void;
}

const BlogsTable = ({ data, headers, lang, onDelete, onEdit }: BlogsTableProps) => {
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
                        data.map((blog: Blog) => (
                            <tr key={blog.id}>
                                <td>
                                    <img
                                        src={blog.background}
                                        alt="blog"
                                        className="w-16 h-12 object-cover rounded"
                                    />
                                </td>
                                <td>{blog.title[lang]}</td>
                                <td>{blog.text[lang]}</td>
                                <td className="flex items-center gap-3">
                                    <button
                                        onClick={() => onEdit(blog)}
                                        className="btn btn-xs bg-blue-500 text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(blog.id)}
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
                                No blogs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BlogsTable;