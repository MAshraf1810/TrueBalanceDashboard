// src/api/blogsApi.ts
import apiClient from "../services/api-client";
import { Meta, Pagination } from "../ui/Pagination";

// Blog Interfaces
export interface Blog {
    id: number;
    background: string;
    title: {
        ar: string;
        en: string;
    };
    text: {
        ar: string;
        en: string;
    };
    status: 0 | 1;
}

export interface FetchBlogsResponse {
    data: {
        data: Blog[];
        links: Pagination;
        meta: Meta;
    };
    status: string;
    error: string;
    code: number;
}

export interface FetchBlogResponse {
    data: Blog;
}

// Endpoint
const BLOG_API_ENDPOINT = "/api/dashboard/blogs";

// Fetch blogs (paginated)
export const getBlogs = async (currentPage: string) => {
    const res = await apiClient.get<FetchBlogsResponse>(
        `${BLOG_API_ENDPOINT}?page=${currentPage}`
    );
    return res.data.data;
};

// Fetch single blog
export const getBlog = async (blogId: string) => {
    const res = await apiClient.get<FetchBlogResponse>(
        `${BLOG_API_ENDPOINT}/${blogId}`
    );
    return res.data.data;
};

// Create or update blog
export const addOrUpdateBlog = async ({
    formData,
    blogId,
}: {
    formData: FormData;
    blogId?: string;
}) => {
    const ENDPOINT = blogId
        ? `${BLOG_API_ENDPOINT}/${blogId}`
        : BLOG_API_ENDPOINT;

    const res = await apiClient.post(ENDPOINT, formData);
    return res.data.data;
};

// Delete blog
export const deleteBlog = async (blogId: string | number) => {
    const res = await apiClient.post(`${BLOG_API_ENDPOINT}/${blogId}`, {
        _method: "delete",
    });
    return res.data.data;
};
