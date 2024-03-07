import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
 
const RequireAuth = ()=>{
    const isLoggedIn = localStorage.length==0?false:true;
    const location = useLocation();
 
    return(
        isLoggedIn
        ?<Outlet/>
        :<Navigate to='auth/login' state={{from:location}} replace/>
    );
}
 
export default RequireAuth;