import "./style.scss";
import Tilt from 'react-parallax-tilt';
import brain from "../../assets/brain_logo.png";
import React from "react";

const Logo: React.FC = () => {
    return (
        <div className="Logo">
            <Tilt
                className="Tilt br2 shadow-2"
                style={{height: '150px', width: "150px"}}
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
            >
                <div>
                    <img src={brain} alt="logo"/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;