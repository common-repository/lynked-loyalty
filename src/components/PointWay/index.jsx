import Title from "../Title";
import {Arrow} from "../../shared/icons/arrow";

const PointWay = ({text, icon, type, onCLick, textColor}) => {
    return (
        <div className="pointWays" onClick={() => onCLick(type)}>
            <div className="pointsWays-item">
                {icon}
                <Title text={text} color={textColor}/>
            </div>
            <Arrow color={textColor}/>
        </div>
    );
};

export default PointWay;
