import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const {
    setActiveuser,
    signinWithEmail,
    toastSuccess,
    activeUser,
    signInWitGoogle,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [ setSuccessLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    const password = event.target.password.value;
    //console.log(name, email, url, password)
    const result = await axios.get(`/existinguser?email=${email}`);
    //console.log(result)
    if (!result.data.isExist) {
      setError("This email is not Registared!");
      return;
    }

    //reset state
    setError("");
    setSuccessLogin(false);

    signinWithEmail(email, password)
      //.then(res => res.json())
      .then((result) => {
        //console.log(result);
        setSuccessLogin(true);
        event.target.reset();

        //console.log(location.state)
        toastSuccess("Log in successful");
        location?.state ? navigate(location.state) : navigate("/");
      })

      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignInWithGoogle = async () => {
    signInWitGoogle()
      .then(async (data) => {
        const firebaseUser = data.user;
        //console.log(firebaseUser)
        setActiveuser({ ...firebaseUser, role: "" });

        await axios
          .get(`/existinguser?email=${firebaseUser.email}`)

          .then((result) => {
            //console.log(result.data)
            toastSuccess("Log in successful");
            if (result.data.user?.role) {
              location?.state ? navigate(location.state) : navigate("/");
            } else {
              navigate("/auth/role");
            }
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      {/* {activeUser && <Navigate to={"/"}></Navigate>} */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100  md:w-full max-w-sm  shadow-2xl">
          <div className="card-body max-w-10/10 p-5">
            <h1 className="text-2xl font-bold">Log In </h1>
            <form onSubmit={handleOnSubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input "
                    placeholder="Password"
                    name="password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 md:right-9 top-1/2 -translate-y-1/2 cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <div>
                  <Link
                    to={"/auth/forgotpassword"}
                    className="text-[12px] text-accent hover:text-black hover:underline"
                  >
                    Forgot password
                  </Link>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button className="btn text-white mt-4 bg-secondary hover:bg-primary">
                  Log in
                </button>

                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="btn bg-white text-black hover:border-primary border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>

                <div>
                  <Link to={"/auth/role"}>
                    Don't have an account?{" "}
                    <span className="text-primary hover:underline">
                      Registar
                    </span>
                  </Link>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
