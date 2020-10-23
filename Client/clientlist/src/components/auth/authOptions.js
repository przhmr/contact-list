import React, {useContext} from 'react';

import {useHistory} from "react-router-dom";

import UserContext from "../../context/userContext"


function AuthOptions(){
const history = useHistory();
const {userData, setUserData}= useContext(UserContext)

const register = ()=> history.push("/register");
const login = ()=> history.push("/login");
const logout = ()=>{
setUserData({

    token: undefined,
    user: undefined,

})

localStorage.setItem("auth-token","")
history.push("/login")
}
        return(

            <div className="text-center">
            { userData.user ? (
            
            <button onClick={logout} > Cerrar Sesion</button>): 
                        
           ( <>
            <div className="flex "> 
                <button  onClick={login} >Iniciar Sesion</button>
                <button  onClick={register}>Registrarse</button>
                </div>
            </>
           )}
</div>

        

        )} 

export default AuthOptions;