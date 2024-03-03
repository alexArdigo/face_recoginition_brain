import "./style.scss";
import {useNavigate} from "react-router-dom";


const SignIn = () => {
    const navigate = useNavigate()

    return (
        <main className="pa4 black-80">
            <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={() => navigate("/")} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => navigate("/register")} className="f6 link dim black db pointer">Register</p>
                </div>
            </form>
        </main>
    );
};

export default SignIn;