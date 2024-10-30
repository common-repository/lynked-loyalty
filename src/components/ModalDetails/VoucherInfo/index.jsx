import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Success} from "../../../shared/icons/success";
import {generalSelector, rewardsSelector} from "../../../store/selectors";
import {Copy} from "../../../shared/icons/copy";
import Title from "../../Title";
import {VoucherIcon} from "../../../shared/icons/voucherIcon";
import {fetchCreateDiscount} from "../../../store/reducers/rewards/rewardsThunksAction";
import {setIsShow, setIsSuccessAdd} from "../../../store/reducers/rewards/rewardsSlice";

import "./styles.scss";

const VoucherInfo = ({textColor, btnTextColor,  titleColor, iconColor, btnBg}) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const {activeReward, isShow, isSuccessAdd} = useSelector(rewardsSelector);
    const {currency} = useSelector(generalSelector);
    const dispatch = useDispatch();

    let activateTime = '';

    const {points, activated_after_day, activated_after_hour, code, reward, is_active} = activeReward;

    if (activated_after_day) {
        activateTime = activated_after_day > 1 ? ` ${activated_after_day} days` : 'a day';
    } else {
        activateTime = ` ${activated_after_hour} hour${activated_after_hour > 1 ? 's' : ''}`
    }

    const copyCode = () => {
        navigator.clipboard.writeText(code).then(r => {
            setIsSuccess(true);
            applyVoucher();

            const time = setTimeout(() => {
                setIsSuccess(false);
                clearTimeout(time);
            }, 1500);
        });
    }

    const applyVoucher = (isAdd) => {
        if (isAdd) {
            dispatch(setIsShow(true));
        }
        dispatch(fetchCreateDiscount({
            shop: window.location.hostname,
            code,
            reward,
            isAdd: !!isAdd
        })).then(()=> {
            if(window.location.href.includes("cart") || window.location.href.includes('checkout')) {
                !!isAdd && window.location.reload();
            }
        })
    }

    useEffect(() => {
        if(isSuccessAdd) {
            const id = setTimeout(() => {
                dispatch(setIsSuccessAdd(false));
                clearTimeout(id);
            }, 300);
        }
    }, isSuccessAdd)

    return (
        <div className="voucher-inside">
            <div className="reward-content-description-wrapper">
                <div className="pointsWays-item">
                    <VoucherIcon color={iconColor}/>
                    <div>
                        <Title text={`${currency}${reward} off voucher`} color={titleColor}/>
                        <div className="card-description" style={{color: textColor}}>Spent {points} Points</div>
                    </div>
                </div>

                {is_active ?
                    <div>
                        <div className="card-description discount-expl" style={{color: textColor}}>
                            Use this discount code on your next order!
                        </div>

                        <div className="copy-code--wrapper">
                            <input type="text" readOnly className="copy-code--input" value={code}/>
                            <button className="system-btn" onClick={copyCode}>
                                {isSuccess ? <Success /> : <Copy />}
                            </button>
                        </div>
                        <div className="apply-voucher--btn" style={{background: btnBg}} onClick={applyVoucher}>
                            {isShow && isSuccessAdd
                                ? <Success color={iconColor}/> : isShow
                                    ? <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    : <span style={{color: btnTextColor}}>Apply voucher</span>
                            }
                        </div>
                    </div>
                    : <div className="apply-voucher--btn inactive-voucher" style={{color: btnTextColor, background: btnBg}}>Will activate in {activateTime}</div>
                }
            </div>
        </div>
    );
};

export default VoucherInfo;
