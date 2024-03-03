import './App.css';
import Logo from "./components/Logo";
import ParticlesBg from 'particles-bg';
import React, {useRef, useState} from "react";
import {fetchFaceDetectionAPI} from "./APIs/face_detection_clarifai.ts";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import SignOut from "./components/SignOut";
import SignIn from "./components/SignIn";

export type Image = {
    IMAGE_URL: string
}

type BoardingBox = {
    topRow?: string
    leftCol?: string
    bottomRow?: string
    rightCol?: string
} | undefined

export type CalculatedBoardingBox = {
    topRow?: number
    leftCol?: number
    bottomRow?: number
    rightCol?: number
} | undefined


function App() {
    const [userInput, setUserInput] = useState<Image>({IMAGE_URL: ""});
    const boardingBoxRef = useRef<BoardingBox[]>([]);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [boxes, setBoxes] = useState<CalculatedBoardingBox[]>([]);
    const location = useLocation()

    const name: string = "Alex";
    const rank: number = 0;

    const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setUserInput({IMAGE_URL: event.target.value});
    };

    const onSubmit = async () => {
        boardingBoxRef.current = await fetchFaceDetectionAPI(userInput.IMAGE_URL);
        const calculatedBoxes: CalculatedBoardingBox[] = calculateBoxArea();
        setBoxes([...calculatedBoxes]);
    };

    const calculateBoxArea = (): CalculatedBoardingBox[] => {
        return boardingBoxRef.current.map(box => {
            const width: number | undefined = imageRef.current?.width;
            const height: number | undefined = imageRef.current?.height;
            return {
                topRow: height ? Number(box?.topRow) * height : undefined,
                leftCol: width ? Number(box?.leftCol) * width : undefined,
                bottomRow: height ? height - (Number(box?.bottomRow) * height) : undefined,
                rightCol: width ? width - (Number(box?.rightCol) * width) : undefined,
            };
        });

    };


    return (
        <div className={"App"}>
            <ParticlesBg
                type="cobweb"
                bg={true}
                color="#0000ff"
                num={100}

            />
            {location.pathname === "/" && <SignOut/>}
            <Logo/>
            <Routes>
                <Route path={"/sign-in"} element={<SignIn/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route
                    path={"/"}
                    element={
                        <Home
                            boxes={boxes}
                            name={name}
                            rank={rank}
                            onInputChange={onInputChange}
                            onSubmit={onSubmit}
                            userInput={userInput}
                            imageRef={imageRef}
                        />
                    }
                />
            </Routes>


        </div>
    );
}

export default App;
