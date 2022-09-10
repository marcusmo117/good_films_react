import React, { Component } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"


function LogoutComp() {
    
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("user_token")
        if (localStorage.getItem("user_token") !== null) {
            toast.error("Logout unsuccessful, please try again")
        } else {
            toast.success("Logout successful!");
            navigate("/login");
        }
    }    
    
    return(
        <Button variant="danger" onClick={logout}>Logout</Button>
    )
}

export default LogoutComp;