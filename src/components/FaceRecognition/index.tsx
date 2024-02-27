import "./style.scss"
import React from "react";

const FaceRecognition: React.FC = () => {
    return (
        <div className="center">
            <img src={'https://samples.clarifai.com/metro-north.jpg'} alt={""} />

        </div>
    );
};

export default FaceRecognition;