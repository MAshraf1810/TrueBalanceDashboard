import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import apiClient from "../../services/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";

// ✅ Zod schema
const SubPriceSchema = z.object({
  title: z.object({
    en: z.string().min(3, "English title is required"),
    ar: z.string().min(3, "Arabic title is required"),
  }),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
});

type SubPriceFormValues = z.infer<typeof SubPriceSchema>;

const fetchSubPrice = async (
  id: number
): Promise<{ data: SubPriceFormValues }> => {
  const res = await apiClient.get(`/api/dashboard/packageDetails/${id}`);
  return res.data;
};

const updateSubPrice = async ({
  id,
  data,
}: {
  id: number;
  data: SubPriceFormValues;
}) => {
  const res = await apiClient.put(`/api/dashboard/packageDetails/${id}`, data);
  return res.data;
};

const UpdateSubPriceForm: React.FC<{
  id: number;
  onUpdateSuccess?: () => void;
}> = ({ id, onUpdateSuccess }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["sub-price", id],
    queryFn: () => fetchSubPrice(id),
    enabled: id != null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubPriceFormValues>({
    resolver: zodResolver(SubPriceSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SubPriceFormValues) => updateSubPrice({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sub-price"] });
      if (onUpdateSuccess) onUpdateSuccess();
    },
  });

  React.useEffect(() => {
    if (data) reset(data.data);
  }, [data, reset]);

  const onSubmit = (values: SubPriceFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-base-100 shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Update Sub Price</h2>

        {isLoading ? (
          <LoadingModal />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label font-medium">Title (English)</label>
              <input
                type="text"
                placeholder="Enter English Title"
                className="input input-bordered w-full"
                {...register("title.en")}
              />
              {errors.title?.en && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.en.message}
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium">Title (Arabic)</label>
              <input
                type="text"
                placeholder="ادخل العنوان بالعربية"
                className="input input-bordered w-full"
                {...register("title.ar")}
              />
              {errors.title?.ar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.ar.message}
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium">Price (EGP)</label>
              <input
                type="number"
                placeholder="Enter Price"
                className="input input-bordered w-full"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${
                mutation.isPending ? "loading" : ""
              }`}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateSubPriceForm;
