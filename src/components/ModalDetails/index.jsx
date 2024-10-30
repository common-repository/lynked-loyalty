import {useDispatch, useSelector} from "react-redux";

import {Arrow} from "../../shared/icons/arrow";
import Download from "./Download";
import PointsActivity from "./PointsActivity";
import VoucherInfo from "./VoucherInfo";
import Rewards from "./Rewards";
import WaysToRedeem from "./WaysToRedeem";
import WaysToEarn from "./WaysToEarn";
import {setType} from "../../store/reducers/general/generalSlice";
import {generalSelector, rewardsSelector} from "../../store/selectors";

import "./styles.scss";
import CloseModal from "../CloseModal";

const ModalDetails = ({isLogin, lynkedLogin, openModal, bgColor, textColor, position, popupText, popupBg, popupIcon, loginUrl, registerUrl }) => {
    const dispatch = useDispatch();
    const { type,shopName } = useSelector(generalSelector);
    const { points } = useSelector(rewardsSelector);

    const clickBack = () => {
        dispatch(setType(type === "voucherInfo" ? "vouchers" : null));
    }

    return (
        <div className="reward-block reward-detail-block view-block" style={position === 'right' ? {right: 0, background: popupBg} : {left: 0, background: popupBg}}>
            <div>
                <div className="reward--header" style={{background: `${bgColor}`}}>
                    <CloseModal openModal={openModal} color={textColor}/>

                    <div className="point-back--wrapper">
                        <button className="reward-back" onClick={clickBack}>
                            <Arrow color={textColor}/>
                        </button>

                        {isLogin ?
                            lynkedLogin ?
                                <h4 className="pointsBlock" style={{color: `${textColor}`}}>Your Lynked Loyalty
                                    points: {points}</h4> : <h4 style={{color: `${textColor}`}}>{shopName}</h4>
                            : <h4 style={{color: `${textColor}`}}>{shopName}</h4>
                        }
                    </div>
                </div>

                <div className="reward-content--wrapper">
                    {type === 'earn' && <WaysToEarn titleColor={popupText} textColor={popupText}/>}
                    {type === 'redeem' && <WaysToRedeem titleColor={popupText} textColor={popupText}/>}
                    {type === 'vouchers' && <Rewards titleColor={popupText} textColor={popupText} iconColor={popupIcon}/>}
                    {type === 'voucherInfo' && <VoucherInfo btnTextColor={textColor} titleColor={popupText} textColor={popupText} btnBg={bgColor} iconColor={popupIcon}/>}
                    {type === 'download' && <Download titleColor={popupText} textColor={popupText}/>}
                    {type === 'activity' && <PointsActivity titleColor={popupText} textColor={popupText} popupBg={popupBg} />}


                    {isLogin ?
                        <div className="reward-footer" style={{background: popupBg}}>
                            <p className="card-description" style={{color: popupText}}>We reward with Lynked Loyalty</p>
                        </div>
                        : <div className="info--footer" style={{background: popupBg}}>
                            <a href={registerUrl} className="joinNow" style={{color: textColor, background: bgColor}}>Join now</a>
                            <p className="card-description" style={{color: popupText}}>Already have an account?
                                <a href={loginUrl} style={{color: bgColor}}>Sign in</a>
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default ModalDetails;
