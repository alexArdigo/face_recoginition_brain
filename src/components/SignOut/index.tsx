import "./style.scss"
import React, {Dispatch, SetStateAction, useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "../../utils/UserContext";
import {Image, UserType} from "../../types";

type Props = {
    setUser:  Dispatch<SetStateAction<UserType>>;
    initialState: UserType
    setUserInput: Dispatch<SetStateAction<Image>>;
}

const SignOut: React.FC<Props> = ({setUser, initialState, setUserInput}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {email} = useContext(UserContext);

    const onSignoutSubmit = async () => {

        await fetch("https://face-recoginition-brain-backend.onrender.com/signout", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email
            })
        }).then(data => {
            if (data) {
                setUser(initialState)
                setUserInput({IMAGE_URL: ""})
                navigate("/signin")
            }
        })
    }


    return (
        <nav className="Nav">
            <p
                className={`${location.pathname !== "/home" && "visibility-hidden"} f3 link dim black underline pa3 pointer`}
                onClick={onSignoutSubmit}
            >Sign Out
            </p>
        </nav>
    );
};

export default SignOut;