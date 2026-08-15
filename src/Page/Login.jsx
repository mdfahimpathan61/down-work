import  { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import {
  Link,
  Navigate,
  
  useLocation,
  useNavigate,
} from "react-router";

const Login = () => {
  const { signinWithEmail, toastSuccess, activeUser,signInWitGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    const password = event.target.password.value;
    //console.log(name, email, url, password)

    //reset state
    setError("");
    setSuccessLogin(false);

    signinWithEmail(email, password)
      .then((result) => {
        console.log(result);
        setSuccessLogin(true);
        event.target.reset();
        
        console.log(location.state)
        location?.state ? navigate(location.state) : navigate("/");
        toastSuccess("Log in successful");
      })

      .catch((error) => {
        setError(error.message);
      });
  };


  const handleSignInWithGoogle = () =>{
    signInWitGoogle()
    .then(result => {
      toastSuccess("Log in successful");
      location?.state ? navigate(location.state) : navigate("/");
    })
    .catch(error =>{
      setError(error.message)
    })
  }

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
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  required
                />
                <div>
                  <Link className="text-[12px] text-accent hover:text-black hover:underline">
                    Forgot password
                  </Link>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button className="btn text-white mt-4 bg-secondary hover:bg-primary">
                  Log in
                </button>

                <button type="button" onClick={handleSignInWithGoogle} className="btn bg-white text-black hover:border-primary border-[#e5e5e5]">
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
                  <Link to={"/auth/registration"}>
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
