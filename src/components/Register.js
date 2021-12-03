import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import { registerUser } from "../api";
import { storeToken} from "../auth";


export default function Register({setIsLoggedIn}) {
    const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form className="register" onSubmit={(event) => event.preventDefault()}>
      <h1>Register:</h1>
      <label>Name:</label>
      <input
        type="text"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder=""
      />
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder=""
      />
      <label>Username:</label>
      <input
        type="text"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder=""
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder=""
      />
      {/* <button
        onClick={async (event) => {
          event.preventDefault();
          // try {
          //   let submit = await userRegister(name, email, username, password);
          //   if (submit.name) {
          //     alert(submit.message);
          //   } else {
          //     setLoggedIn(true);
          //     alert(submit.message);
          //     return <Redirect to="/" />;
          //   }
          // } catch (error) {
          //   console.error(error);
          }
        }
      >
        Register
      </button>*/}
    </form>
  );



  // const history = useHistory();
  //   return (
  //       <form
  //         className="login-form"
  //         className="login-form"
  //         onSubmit={async (event) => {
  //           event.preventDefault();
            
    
  //           try {
  //             const results = await registerUser(userName, password);
  //   console.log(results, "!!!!!!!!!!")
  //             storeToken(results.token);
  //             setIsLoggedIn(true);
  //             console.log(setIsLoggedIn)
  //             setUserName("");
  //             setPassword("");
  //             history.push("/myroutines");
  //             alert("you are registered!")
  //           } catch (error) {
  //             console.log(error);
  //           } 
  //         }}
  //       >
  //         <div className="container">
  //           <h1 className="login-title">Register</h1>
  //           <div className="imgcontainer">
  //             <i className="far fa-user fa-5x"></i>
  //           </div>
  //           <p>Please fill in this form to create an account.</p>
  //           <>
  //           <div className="registerUsername">
  //             <label htmlFor="email">
  //               <b>Username:</b>
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter Username"
  //               name=""
  //               id="email"
  //               required
  //               value={userName}
  //               onChange={(event) => {
  //                 setUserName(event.target.value);
  //               }}
  //             />
  //             </div>
  //             <label htmlFor="psw">
  //               <b>Password</b>
  //             </label>
  //             <input
  //               type="password"
  //               placeholder="Enter Password"
  //               name="psw"
  //               id="psw"
  //               required
  //             />
    
  //             <label htmlFor="psw-repeat">
  //               <b>Repeat Password</b>
  //             </label>
  //             <input
  //               type="password"
  //               placeholder="Repeat Password"
  //               name="psw-repeat"
  //               id="psw-repeat"
  //               required
  //               value={password}
  //               onChange={(event) => {
  //                 setPassword(event.target.value);
  //               }}
  //             />
  //           </>
    
  //           <button type="submit" className="registerbtn">
  //             Register
  //           </button>
  //         </div>
    
  //         <div className="container signin">
  //           <p>
  //             Already have an account? <a href="/login">Sign in</a>.
  //           </p>
  //         </div>
  //       </form>
  //     );
}

