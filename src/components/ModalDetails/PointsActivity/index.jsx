import {useSelector} from "react-redux"
    ;
import PointActivity from "./PointActivity";
import {rewardsSelector} from "../../../store/selectors";

const PointsActivity = ({textColor, titleColor, popupBg}) => {
    const {activities} = useSelector(rewardsSelector)

    return (
        <>
            <div className="title" style={{color: titleColor}}>Points activity</div>
            <div className="balance-block" style={{color: textColor, background: popupBg}}>
                Your points balance may not reflect your latest activity
            </div>
            <div className="points-list">
                {activities.map((activity, i) => <PointActivity key={i} {...activity} textColor={textColor} titleColor={titleColor}/>) }
            </div>
        </>

    );
};

export default PointsActivity;
