import React from "react";
import { BsTicket } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- LOGIN FORM ---
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("No account found. Please register first.");
        setSubmitting(false);
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.email === values.email && user.password === values.password) {
        // Simulate token generation
        const fakeToken = btoa(`${values.email}:${Date.now()}`);
        localStorage.setItem("authToken", fakeToken);

        toast.success("Login successful!");
        resetForm();

        // Redirect to intended page (if any) or dashboard after login
        const state = location.state as { from?: { pathname?: string } } | null;
        const fromPath = state?.from?.pathname ?? "/dashboard";
        setTimeout(() => navigate(fromPath), 1000);
      } else {
        toast.error("Invalid email or password!");
      }
      setSubmitting(false);
    },
  });

  // --- REGISTER FORM ---
  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
      terms: Yup.bool().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: (values, { resetForm }) => {
      const existingUser = localStorage.getItem("user");

      if (existingUser && JSON.parse(existingUser).email === values.email) {
        toast.error("Email already registered!");
        return;
      }

      // Save new user
      const newUser = { email: values.email, password: values.password };
      localStorage.setItem("user", JSON.stringify(newUser));

      toast.success("Account created successfully!");
      resetForm();
    },
  });

  return (
    <section className="grid md:grid-cols-2 gap-8">
      <Toaster position="top-right" />

      {/* LEFT SECTION */}
      <div className="bg-[#E3E8E7]">
        <div className="w-[75%] mx-auto flex justify-center items-center h-96">
          <div className="text-center">
            <div className="flex items-center gap-4 justify-center mb-3">
              <BsTicket size={22} />
              <h1 className="font-semibold text-lg">SupportFlow</h1>
            </div>
            <h2 className="font-bold text-3xl mb-2">
              Streamline Your Support with SupportFlow
            </h2>
            <p className="text-gray-700">
              Manage customer tickets effortlessly — so you can focus on what
              matters most: your customers.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-[75%] mx-auto md:w-full flex justify-center items-center h-96">
        <Tabs defaultValue="account" className="w-fit md:w-full">
          <TabsList className="bg-transparent mx-auto w-72 border-b border-gray-300 rounded-none pb-0 px-0">
            <TabsTrigger
              value="account"
              className="h-9 cursor-pointer data-[state=active]:border-b-2 rounded-none data-[state=active]:border-b-blue-600 data-[state=active]:shadow-none"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="h-9 cursor-pointer data-[state=active]:border-b-2 rounded-none data-[state=active]:border-b-blue-600 data-[state=active]:shadow-none"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {/* LOGIN FORM */}
          <TabsContent value="account">
            <div className="text-center mb-4">
              <h1 className="text-xl font-semibold">Welcome Back!</h1>
              <p className="text-gray-500">Log in to continue.</p>
            </div>

            <form
              onSubmit={loginFormik.handleSubmit}
              className="max-w-sm mx-auto"
            >
              <div className="mb-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...loginFormik.getFieldProps("email")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    loginFormik.touched.email && loginFormik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="name@example.com"
                />
                {loginFormik.touched.email && loginFormik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {loginFormik.errors.email}
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...loginFormik.getFieldProps("password")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    loginFormik.touched.password && loginFormik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {loginFormik.touched.password &&
                  loginFormik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginFormik.errors.password}
                    </p>
                  )}
              </div>

              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link to="/" className="text-blue-600 text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginFormik.isSubmitting}
                className="cursor-pointer hover:bg-blue-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
              >
                {loginFormik.isSubmitting ? "Logging in..." : "Submit"}
              </button>
            </form>
          </TabsContent>

          {/* REGISTER FORM */}
          <TabsContent value="password">
            <form
              onSubmit={registerFormik.handleSubmit}
              className="max-w-sm mx-auto"
            >
              <div className="mb-2">
                <label
                  htmlFor="reg-email"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="reg-email"
                  type="email"
                  {...registerFormik.getFieldProps("email")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    registerFormik.touched.email && registerFormik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="name@example.com"
                />
                {registerFormik.touched.email &&
                  registerFormik.errors.email && (
                    <p className="text-red-500 text-xs">
                      {registerFormik.errors.email}
                    </p>
                  )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="reg-password"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  {...registerFormik.getFieldProps("password")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {registerFormik.touched.password &&
                  registerFormik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerFormik.errors.password}
                    </p>
                  )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="reg-confirmPassword"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  id="reg-confirmPassword"
                  type="password"
                  {...registerFormik.getFieldProps("confirmPassword")}
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ${
                    registerFormik.touched.confirmPassword &&
                    registerFormik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {registerFormik.touched.confirmPassword &&
                  registerFormik.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerFormik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="flex items-start mb-2">
                <input
                  id="terms"
                  type="checkbox"
                  {...registerFormik.getFieldProps("terms")}
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  I agree with the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                </label>
              </div>
              {registerFormik.touched.terms && registerFormik.errors.terms && (
                <p className="text-red-500 text-xs mb-3">
                  {registerFormik.errors.terms}
                </p>
              )}

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center w-full"
              >
                Register new account
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Login;
