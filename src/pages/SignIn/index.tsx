import React, {useContext, useState} from "react";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {UserType} from "../../types";
import {UserContext} from "../../utils/UserContext";

type SignInTypes = {
    signInEmail: string;
    signInPassword: string;
};

type Props = {
    loadUser: (user: UserType) => void
}
const SignIn = ({loadUser}: Props) => {
    const navigate = useNavigate();
    const {setEmail} = useContext(UserContext)
    const [signIn, setSignIn] = useState<SignInTypes>({
        signInEmail: "",
        signInPassword: "",
    });

    const onSignInSubmit = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        await fetch("https://face-recoginition-brain-backend.onrender.com/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: signIn.signInEmail,
                password: signIn.signInPassword
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(async (data) => {
                console.log("DATA", data.email);
                if (data) {
                    loadUser(data);
                    setEmail(data.email)
                    navigate("/home");
                }
            });
    };

    return (
        <main className="pa4 black-80">
            <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">
                            Email
                        </label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={(event) => setSignIn(prev => ({...prev, signInEmail: event.target.value}))}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(event) => setSignIn(prev => ({...prev, signInPassword: event.target.value}))}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        onClick={onSignInSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Sign in"
                    />
                </div>
                <div className="lh-copy mt3">
                    <p
                        onClick={() => navigate("/register")}
                        className="f6 link dim black db pointer"
                    >
                        Register
                    </p>
                </div>
            </form>
        </main>
    );
};

export default SignIn;
