import {useSelector} from "react-redux";
import {generalSelector} from "../../../../store/selectors";

const PointActivity = ({point_add, point, date, vouchers, titleColor, textColor}) => {
    const {currency} = useSelector(generalSelector);

    return (
        <div className="point-item">
            <div className="pointCount-item">
                <span className="order-info" style={{color: titleColor}}>Placed an order</span>
                {
                    point_add && <span style={{color: textColor}}>+{point} Points</span>
                }
                {vouchers && vouchers.length > 0 && vouchers.map(voucher => <span
                    style={{color: textColor}}>{currency}{voucher.reward} voucher used</span>)}
            </div>
            <div style={{color: textColor}}>{date}</div>
        </div>
    );
};

export default PointActivity;
