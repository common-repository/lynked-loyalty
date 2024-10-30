import Voucher from "../ModalDetails/Rewards/Voucher";

import "./styles..scss";

const VouchersList = ({text, vouchers, textColor, titleColor, iconColor}) => {
    return (
        <>
            <div className="reward-title-info" style={{color: titleColor}}>{text}</div>
            <div>
                {vouchers.map((voucher) => <Voucher key={voucher.id} voucher={voucher} titleColor={titleColor} textColor={textColor} iconColor={iconColor}/>)}
            </div>
        </>
    );
};

export default VouchersList;
