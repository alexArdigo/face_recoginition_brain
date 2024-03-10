import "./style.scss";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {UserType} from "../../App.tsx";

type RegisterTypes = {
    registerName: string
    registerEmail: string
    registerPassword: string
};

type Props = {
    loadUser: (user: UserType) => void
}
const Register = ({loadUser}: Props) => {
    const navigate = useNavigate();
    const [register, setRegister] = useState<RegisterTypes>({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
    });

    const onRegisterSubmit = async (event: React.MouseEvent<HTMLInputElement>) => {
        console.log(register);
        event.preventDefault();

        await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: register.registerName,
                email: register.registerEmail,
                password: register.registerPassword
            })
        })
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                loadUser(data)
                console.log(data);
                if (data.status === 200) {
                    console.log(data)
                    navigate("/sign-in")
                }
            });
    };

    return (
        <main className="pa4 black-80">
            <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="text"
                            name="name"
                            id="name"
                            onChange={(event) => setRegister(prev => ({...prev, registerName: event.target.value}))}

                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={(event) => setRegister(prev => ({...prev, registerEmail: event.target.value}))}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(event) => setRegister(prev => ({...prev, registerPassword: event.target.value}))}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={onRegisterSubmit}
                           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                           type="submit" value="Register"/>
                </div>
                <div className="lh-copy mt3">
                </div>
            </form>
        </main>
    );
};

export default Register;