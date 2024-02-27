import "./style.scss";
import {ReactElement} from "react";

type Props = {
    name: string
    rank: number
}

const Rank = ({name, rank}: Props) => {
    const rankStyled: ReactElement = <span style={{fontSize: "40px"}}>{rank}</span>;

    return (
        <div className="Rank">
            <div className="white f3">
                <p>{name}, your current rank is #{rankStyled}</p>
            </div>
        </div>
    );
};

export default Rank;