import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
 
const RequireAuth = ()=>{
    const isLoggedIn = localStorage.length==0?false:true;
 
    return(
        isLoggedIn
        ?<Outlet/>
        :<Navigate to='auth/login' replace/>
    );
}
 
export default RequireAuth;