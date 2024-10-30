import {VoucherIcon} from "../../../../shared/icons/voucherIcon";
import {Arrow} from "../../../../shared/icons/arrow";
import Title from "../../../Title";
import {useDispatch, useSelector} from "react-redux";
import {setType} from "../../../../store/reducers/general/generalSlice";
import {setActiveReward} from "../../../../store/reducers/rewards/rewardsSlice";
import {generalSelector} from "../../../../store/selectors";

const Voucher = ({voucher, textColor, iconColor, titleColor}) => {
    const {reward, points} = voucher;
    const dispatch = useDispatch();
    const {currency} = useSelector(generalSelector);

    const handleClick = () => {
        dispatch(setType("voucherInfo"));
        dispatch(setActiveReward(voucher));
    }

    return (
        <div className="pointWays" onClick={handleClick}>
            <div className="pointsWays-item">
                <VoucherIcon color={iconColor}/>
                <div>
                    <Title text={`${currency}${reward} off voucher`} color={titleColor}/>
                    <div className="card-description" style={{color: textColor}}>Spent {points} Point{points > 1 ? 's' : ''}</div>
                </div>
            </div>

            <Arrow color={textColor}/>
        </div>
    )
}

export default Voucher;
