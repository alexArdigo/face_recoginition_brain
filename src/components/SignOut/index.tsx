import "./style.scss"
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";


const SignOut: React.FC = () => {
    const location = useLocation()
    const navegate = useNavigate()


    return (
        <nav className="Nav">
            <p
                className={`${location.pathname !== "/" && "visibility-hidden"} f3 link dim black underline pa3 pointer`}
                onClick={() => navegate("/signin")}
            >Sign Out
            </p>
        </nav>
    );
};

export default SignOut;