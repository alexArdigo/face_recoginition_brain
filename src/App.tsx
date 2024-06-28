import './App.css';
import Logo from "./components/Logo";
import ParticlesBg from 'particles-bg';
import React, {useContext, useRef, useState} from "react";
import {fetchFaceDetectionAPI} from "./APIs/ClarifaiFaceDetection";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignOut from "./components/SignOut";
import SignIn from "./pages/SignIn";
import { Image, UserType, CalculatedBoardingBox, BoardingBox} from "./types";
import {fetchPutImage} from "./utils/FetchPutImage";
import {UserContext} from "./utils/UserContext";


function App() {
    const [userInput, setUserInput] = useState<Image>({IMAGE_URL: ""});
    const boardingBoxRef = useRef<BoardingBox[]>([]);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [boxes, setBoxes] = useState<CalculatedBoardingBox[]>([]);
    const {getUserId} = useContext(UserContext);
    const initialState: UserType = {
        id: 0,
        name: '',
        email: '',
        entries: 0,
        joined: '',

    }
    const [user, setUser] = useState<UserType>(initialState);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInput({IMAGE_URL: event.target.value});
    };

    const onSubmit = async () => {
        boardingBoxRef.current = await fetchFaceDetectionAPI(userInput.IMAGE_URL);
        const calculatedBoxes: CalculatedBoardingBox[] = calculateBoxArea();
        setBoxes([...calculatedBoxes]);

        if (user) {
            const data = await fetchPutImage(user.id)
            return setUser(prevState => ({...prevState, entries: data.entries}))
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

    const loadUser = async (userLoaded: UserType) => {
        getUserId(userLoaded.id)
        return setUser({
            id: userLoaded.id,
            name: userLoaded.name,
            email: userLoaded.email,
            entries: userLoaded.entries,
            joined: userLoaded.joined,
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
            <SignOut setUser={setUser} initialState={initialState} setUserInput={setUserInput}/>
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
                    path={"/home"}
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
                <Route
                    path="*"
                    element={<Navigate to="/signin" replace />}
                />
            </Routes>
        </div>
    );
}

export default App;
