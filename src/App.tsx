import './App.css';
import Logo from "./components/Logo";
import ParticlesBg from 'particles-bg';
import React, {useRef, useState} from "react";
import {fetchFaceDetectionAPI} from "./APIs/face_detection_clarifai.ts";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignOut from "./components/SignOut";
import SignIn from "./pages/SignIn";

/// TYPES
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

export type UserType = {
    id: number
    name: string
    email: string
    password: string
    entries: number
    joined: string
}

//// REACT
function App() {
    const [userInput, setUserInput] = useState<Image>({IMAGE_URL: ""});
    const boardingBoxRef = useRef<BoardingBox[]>([]);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [boxes, setBoxes] = useState<CalculatedBoardingBox[]>([]);
    const [user, setUser] = useState<UserType>({
        id: 0,
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: '',

    });

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInput({IMAGE_URL: event.target.value});
    };

    const onSubmit = async () => {
        boardingBoxRef.current = await fetchFaceDetectionAPI(userInput.IMAGE_URL);
        const calculatedBoxes: CalculatedBoardingBox[] = calculateBoxArea();
        setBoxes([...calculatedBoxes]);

        if (user) {
            fetch('http://localhost:3000/image', {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id
                })
            }).then(response => response.json())
                .then(data => setUser(prevState => ({...prevState, entries: data})));
        }
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

    const loadUser = (user: UserType) => {
        return setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            entries: user.entries,
            joined: user.joined,
        });
    };

    return (
        <div className={"App"}>
            <ParticlesBg
                type="cobweb"
                bg={true}
                color="#00ffff"
                num={100}

            />
            <SignOut/>
            <Logo/>
            <Routes>
                <Route
                    path={"/signin"}
                    element={
                        <SignIn
                            loadUser={loadUser}
                        />
                    }
                />
                <Route
                    path={"/register"}
                    element={
                        <Register
                            loadUser={loadUser}
                        />
                    }/>
                <Route
                    path={"/"}
                    element={
                        <Home
                            boxes={boxes}
                            name={user.name}
                            rank={user.entries}
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
