import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/errorNotice";


export default function Login(){

    const [user, setUser]= useState()
    const [error, setError]= useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
    
        try{
        
          const loginUser = { user };
          const loginRes = await Axios.post("http://localhost:5000/users/login",loginUser );
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
        
        }
    
    catch(err){
        console.log(user)
        err.response.data.msg && setError(err.response.data.msg)

    }
    
    };
    

return(

<div className="page">
      <h2 className="text-center w-full">Login</h2>
      {error && (

<ErrorNotice message={error} clearError={ () => setError(undefined)}/>
)} 
      <form className="form flex flex-col " onSubmit={submit}>
       
       <div className=" ">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        </div>
<div>
        <label htmlFor="login-password" >Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        </div>

        

        <input type="submit"  value="Login" />
      </form>
    </div>
)

}
