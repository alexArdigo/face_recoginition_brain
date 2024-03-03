import "./style.scss";
import Rank from "../Rank";
import ImageLinkForm from "../ImageLinkForm";
import FaceRecognition from "../FaceRecognition";
import React, {FormEvent} from "react";
import {CalculatedBoardingBox, Image} from "../../App.tsx";

type Props = {
    boxes:  CalculatedBoardingBox[]
    name: string
    rank: number
    onInputChange: (event: FormEvent<HTMLInputElement>) => void
    onSubmit:  (event: FormEvent<HTMLInputElement>) => void
    userInput: Image
    imageRef:  React.MutableRefObject<HTMLImageElement | null>
}

const Home = ({boxes, name, rank, onInputChange, onSubmit, userInput, imageRef}: Props) => {

    return (
        <div>
            <Rank name={name} rank={rank}/>
            <ImageLinkForm
                onInputChange={onInputChange}
                onSubmit={onSubmit}
            />
            <FaceRecognition
                image={userInput}
                imageRef={imageRef}
                boxes={boxes}
            />
        </div>
    );
};

export default Home;