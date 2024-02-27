
import './App.css'
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import ParticlesBg from 'particles-bg'
import React, {useState} from "react";
import {fetchFaceDetectionAPI} from "./APIs/face_detection_clarifai.ts";
import FaceRecognition from "./components/FaceRecognition";

export type Image = {
    IMAGE_URL: string
}
function App() {
    const [userInput, setUserInput] = useState<Image>({IMAGE_URL: ""})

    const name: string = "Alex"
    const rank: number = 0

    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setUserInput(event.target.value)
    }

    const onSubmit = async () => {
        await fetchFaceDetectionAPI(userInput.IMAGE_URL)
    }

  return (
   <div className={"App"}>
       <ParticlesBg
           type="cobweb"
           bg={true}
           color="#0000ff"
           num={100}

       />
       <Navigation />
       <Logo />
       <Rank name={name} rank={rank}/>
       <ImageLinkForm
           onInputChange={onInputChange}
           onSubmit={onSubmit}/>
       <FaceRecognition />
   </div>
  )
}

export default App
