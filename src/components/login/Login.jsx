import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./login.module.css";
import axios from "axios";
import cookie from "cookie";
import { useNavigate } from "react-router-dom";

function Login({ state }) {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = state;
  const [newUser, setNewUser] = useState(false);
  const [newUserBody, setNewUserBody] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (newUser) {
      return setNewUserBody({
        ...newUserBody,
        [name]: value,
      });
    }
    setBody({
      ...body,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted");
    if (newUser) {
      return axios
        .post("https://home-chef-server.vercel.app/create-user", newUserBody)
        .then((results) => {
          console.log(results);
          // console.log(results);
          document.cookie = cookie.serialize("token", results.data.token);
          setLoggedIn(true);
          navigate("/");
        });
    }
    axios
      .post("https://home-chef-server.vercel.app/log-in", body)
      .then((results) => {
        console.log(results);
        document.cookie = cookie.serialize("token", results.data.token);
        setLoggedIn(true);
        navigate("/");
      });
  };

  useEffect(() => {
    console.log(newUserBody);
  }, [newUserBody]);

  return (
    <div className={classes["login-container"]}>
      {newUser ? (
        <form className={classes["login-form"]} onSubmit={handleSubmit}>
          <TextField
            name="first_name"
            value={newUserBody.first_name}
            onChange={handleChange}
            required
            id="first_name"
            label="First Name"
            variant="filled"
          />
          <TextField
            name="last_name"
            value={newUserBody.last_name}
            onChange={handleChange}
            required
            id="last_name"
            label="Last Name"
            variant="filled"
          />
          <TextField
            name="email"
            value={newUserBody.email}
            onChange={handleChange}
            required
            id="email"
            label="Email"
            variant="filled"
          />

          <TextField
            name="username"
            value={newUserBody.username}
            onChange={handleChange}
            required
            id="username"
            label="Username"
            variant="filled"
          />
          <TextField
            name="password"
            value={newUserBody.password}
            onChange={handleChange}
            required
            id="password"
            label="Password"
            type="password"
            variant="filled"
          />
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </form>
      ) : (
        <form className={classes["login-form"]} onSubmit={handleSubmit}>
          <TextField
            name="username"
            value={body.username}
            onChange={handleChange}
            required
            id="username"
            label="Username"
            variant="filled"
          />
          <TextField
            name="password"
            value={body.password}
            onChange={handleChange}
            required
            id="password"
            label="Password"
            type="password"
            variant="filled"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
      )}
      {newUser ? (
        <>
          <h4 className={classes["new-user"]}>Already have an account?</h4>
          <Button
            color="secondary"
            onClick={() => setNewUser(false)}
            variant="contained"
          >
            Log in
          </Button>
        </>
      ) : (
        <>
          <h4 className={classes["new-user"]}>New User? </h4>
          <Button
            color="secondary"
            onClick={() => setNewUser(true)}
            variant="contained"
          >
            sign up
          </Button>
        </>
      )}
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import {
//   MDBContainer,
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane,
//   MDBBtn,
//   MDBIcon,
//   MDBInput,
//   MDBCheckbox,
// } from "mdb-react-ui-kit";

// function App() {
//   const [justifyActive, setJustifyActive] = useState("tab1");

//   const handleJustifyClick = (value) => {
//     if (value === justifyActive) {
//       return;
//     }

//     setJustifyActive(value);
//   };

//   return (
//     <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
//       <MDBTabs
//         pills
//         justify
//         className="mb-3 d-flex flex-row justify-content-between"
//       >
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleJustifyClick("tab1")}
//             active={justifyActive === "tab1"}
//           >
//             Login
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleJustifyClick("tab2")}
//             active={justifyActive === "tab2"}
//           >
//             Register
//           </MDBTabsLink>
//         </MDBTabsItem>
//       </MDBTabs>

//       <MDBTabsContent>
//         <MDBTabsPane show={justifyActive === "tab1"}>
//           <div className="text-center mb-3">
//             <p>Sign in with:</p>

//             <div
//               className="d-flex justify-content-between mx-auto"
//               style={{ width: "40%" }}
//             >
//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="facebook-f" size="sm" />
//               </MDBBtn>

//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="twitter" size="sm" />
//               </MDBBtn>

//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="google" size="sm" />
//               </MDBBtn>

//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="github" size="sm" />
//               </MDBBtn>
//             </div>

//             <p className="text-center mt-3">or:</p>
//           </div>

//           <MDBInput
//             wrapperClass="mb-4"
//             label="Email address"
//             id="form1"
//             type="email"
//           />
//           <MDBInput
//             wrapperClass="mb-4"
//             label="Password"
//             id="form2"
//             type="password"
//           />

//           <div className="d-flex justify-content-between mx-4 mb-4">
//             <MDBCheckbox
//               name="flexCheck"
//               value=""
//               id="flexCheckDefault"
//               label="Remember me"
//             />
//             <a href="!#">Forgot password?</a>
//           </div>

//           <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
//           <p className="text-center">
//             Not a member? <a href="#!">Register</a>
//           </p>
//         </MDBTabsPane>

//         <MDBTabsPane show={justifyActive === "tab2"}>
//           <div className="text-center mb-3">
//             <p>Sign un with:</p>

//             <div
//               className="d-flex justify-content-between mx-auto"
//               style={{ width: "40%" }}
//             >
//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="facebook-f" size="sm" />
//               </MDBBtn>

//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="twitter" size="sm" />
//               </MDBBtn>

//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="google" size="sm" />
//               </MDBBtn>

//               <MDBBtn
//                 tag="a"
//                 color="none"
//                 className="m-1"
//                 style={{ color: "#1266f1" }}
//               >
//                 <MDBIcon fab icon="github" size="sm" />
//               </MDBBtn>
//             </div>

//             <p className="text-center mt-3">or:</p>
//           </div>

//           <MDBInput wrapperClass="mb-4" label="Name" id="form1" type="text" />
//           <MDBInput
//             wrapperClass="mb-4"
//             label="Username"
//             id="form1"
//             type="text"
//           />
//           <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" />
//           <MDBInput
//             wrapperClass="mb-4"
//             label="Password"
//             id="form1"
//             type="password"
//           />

//           <div className="d-flex justify-content-center mb-4">
//             <MDBCheckbox
//               name="flexCheck"
//               id="flexCheckDefault"
//               label="I have read and agree to the terms"
//             />
//           </div>

//           <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
//         </MDBTabsPane>
//       </MDBTabsContent>
//     </MDBContainer>
//   );
// }

// export default App;
