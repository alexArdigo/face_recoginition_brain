import "./style.scss";
import Rank from "../../components/Rank/index.tsx";
import ImageLinkForm from "../../components/ImageLinkForm/index.tsx";
import FaceRecognition from "../../components/FaceRecognition/index.tsx";
import React, {ChangeEvent} from "react";
import {CalculatedBoardingBox, Image} from "../../App.tsx";

type Props = {
    boxes:  CalculatedBoardingBox[]
    name: string
    rank: number
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSubmit:  () => Promise<void>;
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