import "./style.scss"
import {CalculatedBoardingBox, Image} from "../../App.tsx";
import {RefObject} from "react";


type Props = {
    image: Image
    imageRef: RefObject<HTMLImageElement>
    boxes: CalculatedBoardingBox[]
}

const FaceRecognition = ({image, imageRef, boxes}: Props) => {


    console.log(boxes);
    return (
        <div className="FaceRecognition">
            <div className="absolute mt2">
                <img ref={imageRef} src={image.IMAGE_URL} alt={""} />
                {boxes && boxes?.map(box => {
                    return <div
                        key={box?.topRow}
                        className="bounding-box"
                        style={{
                            top: box?.topRow,
                            left: box?.leftCol,
                            bottom: box?.bottomRow,
                            right: box?.rightCol,
                        }}
                    ></div>
                })}
            </div>

        </div>
    );
};

export default FaceRecognition;