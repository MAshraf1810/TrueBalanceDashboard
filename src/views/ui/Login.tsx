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
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[15px] shadow-md"
      >
        <div className="flex flex-col items-center">
          <img
            src="/assets/logo.png"
            alt="loginImage"
            className="object-contain w-32 h-32 mb-4"
          />

          <h1 className="text-[#969696] text-3xl sm:text-4xl font-bold text-center">
            Login to{" "}
            <span className="bg-gradient-to-b from-[#5bb48d] to-[#005430] bg-clip-text text-transparent">
              True Balance
            </span>
          </h1>

          <p className="text-[#969696] text-sm text-center mt-2">
            Welcome back! Please log in to access your account.
          </p>
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              className="input input-bordered w-full"
              type="email"
            />
            {errors.email && (
              <p className="text-[red] text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 relative mb-2">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            {isPasswordEyeOpen ? (
              <EyeIcon
                width={20}
                className="absolute cursor-pointer top-10 right-3"
                onClick={() => setIsPasswordEyeOpen((prev) => !prev)}
              />
            ) : (
              <EyeOff
                width={20}
                className="absolute cursor-pointer top-10 right-3"
                onClick={() => setIsPasswordEyeOpen((prev) => !prev)}
              />
            )}
            <input
              {...register("password")}
              id="password"
              className="input input-bordered w-full pr-10"
              type={isPasswordEyeOpen ? "text" : "password"}
            />
          </div>

          {errors.password && (
            <p className="text-[red] text-sm">{errors.password.message}</p>
          )}

          {apiError && (
            <p className="text-[red] text-sm my-4">{apiError}</p>
          )}
        </div>

        {/* <div className="flex justify-end mt-6">
          <p className="text-[#367AFF] text-sm">Forget Password?</p>
        </div> */}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#5bb48d] to-[#005430] text-lg py-3 rounded-lg text-white font-medium"
          >
            {isLoading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;