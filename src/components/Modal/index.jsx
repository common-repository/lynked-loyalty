import {useDispatch, useSelector} from "react-redux";

import {Activity} from "../../shared/icons/activity";
import {Redeem} from "../../shared/icons/redeem";
import {Earn} from "../../shared/icons/earn";
import DownloadApp from "../DownloadApp";
import Title from "../Title";
import PointWay from "../PointWay";
import {Arrow} from "../../shared/icons/arrow";
import {generalSelector, rewardsSelector} from "../../store/selectors";

import "./styles.scss";
import {setType} from "../../store/reducers/general/generalSlice";
import CloseModal from "../CloseModal";
import {ModalLogo} from "../../shared/icons/modalLogo";

const Modal = ({isLogin, lynkedLogin, openModal, textColor, bgColor, position, popupIcon, popupBg, popupText, loginUrl, registerUrl}) => {
    const dispatch = useDispatch();
    const {points, vouchers} = useSelector(rewardsSelector);
    const {shopName} = useSelector(generalSelector);
    const {rewardCount} = useSelector(rewardsSelector);

    const handleCLick = (type) => {
        dispatch(setType(type));
    }

    return (
        <div className="reward-block main-reward-block view-block" style={position === 'right' ? {right: 0, background: popupBg} : {left: 0, background: popupBg}}>
            <div className="reward--header" style={{background: `${bgColor}`}}>
                <CloseModal openModal={openModal} color={textColor}/>

                {isLogin ?
                    lynkedLogin ?
                        <div>
                            <h4 style={{color: `${textColor}`}}>Your {shopName} points!</h4>
                            <div className="point-logo-wrapper">
                                <h2 className="pointsBlock" style={{color: `${textColor}`}}>{points}</h2>
                                <ModalLogo color={textColor}/>
                            </div>
                        </div>
                        : <div>
                            <h4 style={{color: `${textColor}`}}>Welcome to</h4>
                            <h2 style={{color: `${textColor}`}}>{shopName}</h2>
                        </div>
                    :
                    <div>
                        <h4 style={{color: `${textColor}`}}>Welcome to</h4>
                        <h2 style={{color: `${textColor}`}}>{shopName}</h2>
                    </div>
                }
            </div>
            <div className="reward-content">
                {!isLogin || !lynkedLogin ?
                    <>
                        <div className="reward-inside-block" style={{background: popupBg}}>
                            <div className="title" style={{color: popupText}}>Join our loyalty program</div>
                            <p className="card-description" style={{color: popupText}}>Use Lynked Loyalty to collect rewards everytime you
                                shop.</p>
                            <a href={`${registerUrl}`} className="joinNow" style={{background: `${bgColor}`, color: textColor}}>Join now</a>
                            <p className="card-description" style={{color: popupText}}>Already have an
                                account?<a
                                    href={`${loginUrl}`} style={{color: `${bgColor}`}}>Sign in</a></p>
                        </div>
                        <DownloadApp onClick={handleCLick}  popupBg={popupBg} iconColor={popupIcon} textColor={popupText} titleColor={popupText}/>
                    </>
                    : !!vouchers.length && <>
                    {!!rewardCount && <div className="rewardCount rewardCountSmall">{rewardCount}</div>}
                        <div className="reward-inside-block voucher--wrapper" style={{background: popupBg}}>
                            <div className="pointWays" onClick={() => handleCLick("vouchers")}>
                                <div className="vouchers-action-wrapper">
                                    <Title text="Your vouchers" color={popupText}/>
                                    <div className="card-description" style={{color: popupText}}>You
                                        have {vouchers.length} reward{vouchers.length > 1 ? 's' : ''}
                                    </div>
                                </div>
                                <Arrow color={popupText}/>
                            </div>
                        </div>
                    </>
                }

                <div className="reward-inside-block" style={{background: popupBg}}>
                    {(!isLogin || !lynkedLogin) &&
                        <>
                            <div className="title" style={{color: popupText}}>Earn Points</div>
                            <p className="card-description" style={{color: popupText}}>Earn points for spending online or in store with
                                businesses using Lynked. Turn those points into excellent rewards!</p>
                        </>
                    }
                    <div className="pointWays--wrapper">
                        <PointWay text="How to earn points" type="earn" textColor={popupText} icon={<Earn color={popupIcon}/>} onCLick={handleCLick}/>
                        <PointWay text="How to redeem rewards" textColor={popupText} type="redeem" icon={<Redeem color={popupIcon}/>} onCLick={handleCLick}/>
                    </div>
                </div>
                {isLogin && lynkedLogin &&
                    <>
                        <DownloadApp onClick={handleCLick} popupBg={popupBg} iconColor={popupIcon} textColor={popupText} titleColor={popupText}/>

                        <div className="reward-inside-block" style={{background: popupBg}}>
                            <PointWay text="Your activity" textColor={popupText} icon={<Activity color={popupIcon}/>} onCLick={handleCLick} type="activity"/>
                        </div>
                    </>
                }
            </div>
            <div className="reward-footer" style={{background: popupBg}}>
                <p className="card-description" style={{color:popupText}}>We reward with Lynked Loyalty</p>
            </div>
        </div>
    );
};

export default Modal;
