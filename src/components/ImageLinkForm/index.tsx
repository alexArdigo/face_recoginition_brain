import "./style.scss";
import React, {MouseEventHandler} from "react";


type Props = {
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: MouseEventHandler<HTMLButtonElement> | undefined
}

const ImageLinkForm = ({onInputChange, onSubmit}: Props) => {
    return (
        <div className="ImageLinkForm">
            <p className="f3">
                {"This Magic Brain will detect faces in your pictures. Give it a try"}
            </p>
            <div className="input-button pa4 br3 shadow-2">
                <input
                    className="f4 pa2 w-70 center"
                    type="text"
                    onChange={event => onInputChange(event)}
                />
                <button
                    className="grow f4  link ph3 pv2 dib white bg-light-purple"
                    onClick={onSubmit}
                >Detect
                </button>
            </div>
        </div>
    );
};

export default ImageLinkForm;