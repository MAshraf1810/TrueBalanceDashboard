import { useForm } from "react-hook-form";
import { z } from "zod";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";

const schema = z.object({
  email: z.string().email({ message: "Email is required and must be valid!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

type LoginForm = z.infer<typeof schema>;

const Login = () => {
  const { setAuth } = useAuth();

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("bruAuthToken");
    if (token) {
      navigate("/projects");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setApiError("");
      setIsLoading(true);

      const response = await apiClient.post(`/api/auth/login`, data);
      const user = response.data.data[0];
      console.log(user);
      localStorage.setItem("bruAuth", JSON.stringify(user));
      localStorage.setItem("bruAuthToken", user.access_token);

      setAuth(user);
      navigate("/projects");
      setIsLoading(false);
    } catch (err: any) {
      if (!err.response) {
        setApiError("No Server Response!");
      }
      setApiError(
        err.response?.data?.data?.error || "An unexpected error occurred"
      );
      console.log(err.response?.data?.data?.error || "");
      setIsLoading(false);
    }
  };

  const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState(false);

  return (
    <div className="container mx-auto p-10 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center flex-col w-full bg-white m-auto p-10 rounded-[15px] md:w-[80%] lg:w-[45%]">
          <div className="">
            <img
              src="/assets/login/login_img.png"
              alt="loginImage"
              className="object-contain w-[60%] m-auto"
            />
          </div>

          <div className="w-full grow">
            <h1 className="text-[#969696] text-[45px] font-bold text-center">
              Login to{" "}
              <span className="bg-gradient-to-b from-[#452CB3] to-[#C86DD7] bg-clip-text text-transparent">
                True Balance
              </span>
            </h1>

            <h1 className="text-[#969696] text-sm text-center">
              Welcome back! Please log in to access your account.
            </h1>
            <div className="mt-5">
              <div className="flex flex-col gap-3 mb-5">
                <label className="font-bold">Email</label>
                <input
                  {...register("email")}
                  id="email"
                  className="input input-bordered"
                  type="email"
                />
                {errors.email && (
                  <p className="text-[red] mt-2">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3 relative">
                <label className="font-bold">Password</label>
                {isPasswordEyeOpen ? (
                  <EyeIcon
                    width={20}
                    className="absolute cursor-pointer top-1/2 mt-1 right-3"
                    onClick={() => setIsPasswordEyeOpen((prev) => !prev)}
                  />
                ) : (
                  <EyeOff
                    width={20}
                    className="absolute cursor-pointer top-1/2 mt-1 right-3"
                    onClick={() => setIsPasswordEyeOpen((prev) => !prev)}
                  />
                )}
                <input
                  {...register("password")}
                  id="password"
                  className="input input-bordered grow"
                  type={isPasswordEyeOpen ? "text" : "password"}
                />
              </div>
              {errors.password && (
                <p className="text-[red] mt-2">{errors.password.message}</p>
              )}
              {apiError && (
                <p className="text-[red] text-lg my-4">{apiError}</p>
              )}
              {/* <div className="flex justify-end mt-8 mb-4">
                <p className="text-[#367AFF]">Forget Password?</p>
              </div> */}
            </div>
            <div className="mt-10 flex justify-center items-center ">
              <button
                type="submit"
                className={`max-w-[350px] bg-gradient-to-b from-[#452CB3] to-[#C86DD7] text-xl py-3 rounded-lg grow text-white`}
              >
                {isLoading ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
