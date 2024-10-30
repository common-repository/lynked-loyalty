import VouchersList from "../../VouchersList";
import {useSelector} from "react-redux";
import {rewardsSelector} from "../../../store/selectors";

const Rewards = ({textColor, titleColor, iconColor}) => {
    const {vouchers} = useSelector(rewardsSelector);

    const activeVouchers = [];
    const inactiveVouchers = vouchers.reduce((acc, points) => {
        if (points.is_active) {
            activeVouchers.push(points);
        } else {
            acc.push(points);
        }

        return acc;
    }, []);

    return (
        <div className="vouchers activeWays">
            <div className="title" style={{color: titleColor}}>Your rewards</div>
            <div className="reward-content-description-wrapper">
                {!!activeVouchers.length && <VouchersList text="Active rewards" vouchers={activeVouchers} textColor={textColor} titleColor={titleColor} iconColor={iconColor}/>}
                {!!inactiveVouchers.length && <VouchersList text="Will be active soon" vouchers={inactiveVouchers} textColor={textColor} titleColor={titleColor} iconColor={iconColor}/>}
            </div>
        </div>    );
};

export default Rewards;
