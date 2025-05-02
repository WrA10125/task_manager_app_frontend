// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/register", { email, password }); 
//       localStorage.setItem("token", res.data.token);
//       navigate("/Dashboard");
    
//     } catch (err) {
//       alert("Registration failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white p-8 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         <input
//           className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />

//         <input
//           className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition duration-300"
//         >
//           Register
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <span
//             className="text-green-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import API from "../services/api";


const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, userName, email, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

      try {
        const res = await API.post("/auth/register", {
          firstName,
          lastName,
          userName,
          email,
          password,
          confirmPassword,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/Dashboard");
        alert("Registration successful!");
       
        // if (res.data.message === "user successfully created") {
        //   alert("Registration successful! Please log in.");
        //   navigate("/Dashboard"); // Redirect to login page
        // } else {
        //   alert("Unexpected response from server.");
        // }
      } catch (err) {
        alert("Registration failed");
        console.error(err);
      }

    setValidated(true);
  };

  return (
    <form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="w-full mt-6"
    >
      <div className="flex justify-center mb-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="border-b border-black focus:outline-none focus:border-blue-600 py-2 text-sm w-1/2 mr-2"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="border-b border-black focus:outline-none focus:border-blue-600 py-2 text-sm w-1/2 ml-2"
          placeholder="Last Name"
          required
        />
      </div>
      <div className="w-full relative mb-4">
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          placeholder="Username"
          required
        />
        <FontAwesomeIcon
          icon={faUser}
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
        />
      </div>
      <div className="w-full relative mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          placeholder="Email Address"
          required
        />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
        />
      </div>
      <div className="w-full relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          placeholder="Password"
          required
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer opacity-80"
        />
      </div>
      <div className="w-full relative mb-4">
        <input
          type={showConPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border-b border-black focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          placeholder="Confirm Password"
          required
        />
        <FontAwesomeIcon
          icon={showConPassword ? faEyeSlash : faEye}
          onClick={() => setShowConPassword(!showConPassword)}
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer opacity-80"
        />
      </div>

      <button
        type="submit"
        className="bg-gray-700 py-4 px-10 text-white hover:bg-opacity-95 mt-4"
      >
        Register <FontAwesomeIcon icon={faArrowRight} />
      </button>

      <div className="text-center mt-4">
        <p className="mb-0 text-sm">
          Already have an account?{" "}
          <span
            className="hover:text-blue-600 font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </div>
    </form>
  );
};

const SignUp14 = () => {
  return (
    <section
      className="ezy__signup14 light flex items-center justify-center min-h-screen w-full text-black bg-cover bg-right bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/top-view-desk-concept-with-clipboard_23-2148236826.jpg?ga=GA1.1.1781083758.1733397581&semt=ais_hybrid&w=740)",
      }}
    >
      <div className="container px-4 mx-auto w-full h-full">
        <div className="flex justify-center items-center h-full w-full">
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-xl p-4 h-full">
              <div className="flex flex-wrap items-center h-full">
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center justify-center h-full">
                    <img
                      src="https://cdn.easyfrontend.com/pictures/background/abstract-background3.jpg"
                      alt=""
                      className="max-h-[300px] w-full lg:max-h-full lg:h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-6">
                  <div className="flex flex-col justify-center items-center text-center h-full p-2">
                    <h2 className="text-[26px] leading-none font-bold mb-2">
                      REGISTRATION FORM
                    </h2>
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp14;
