import {useDispatch, useSelector} from "react-redux";

import Modal from "../components/Modal";
import ModalDetails from "../components/ModalDetails";
import logo from "../shared/img/logo_modal.png"
import {generalSelector, rewardsSelector} from "../store/selectors";
import {fetchRewardCount, fetchRewards} from "../store/reducers/rewards/rewardsThunksAction";
import {openCloseModal, setType} from "../store/reducers/general/generalSlice";

import "./styles.scss";
import {useEffect, useState} from "react";
import {fetchShopName} from "../store/reducers/general/generalThunksAction";
import blackLogoModal from "../shared/img/black-logo-modal.png";
import {ModalLogo} from "../shared/icons/modalLogo";
import {env} from "../links/links";

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })

    return await response.json();
}
const Dashboard = ({bgColor, textColor, position, popupText, popupBg, popupIcon, loginUrl, registerUrl}) => {
    const {isOpen, type, shopName, user} = useSelector(generalSelector);
    const {rewardCount, lynkedLogin} = useSelector(rewardsSelector);
    const [isLogin, setIsLogin] = useState(false)

    const dispatch = useDispatch();
    const host = window.location.hostname;

    const openModal = () => {
        if (user) {
            dispatch(fetchRewards({email: user, shop: host}));
        }
        dispatch(openCloseModal(!isOpen))
        dispatch(setType(null));
    };
    const checkSignIn = () => {
        postData(`${env.api}/wordpress/check-if-connected`, {shop: host}).then(res=>{
            setIsLogin(res.message === 'Shop is connected')
        })
    }
    useEffect(() => {
        checkSignIn()
    }, []);

    useEffect(() => {
        if (user && !isOpen) {
            dispatch(fetchRewardCount({email: user, shop: host }))
        }
    });

    useEffect(() => {
        dispatch(fetchShopName());
    }, [shopName]);

    return (
        isLogin ?
        <>
            {type && <ModalDetails isLogin={!!user} lynkedLogin={lynkedLogin} loginUrl={loginUrl} registerUrl={registerUrl} openModal={openModal} bgColor={bgColor} popupBg={popupBg} popupText={popupText} popupIcon={popupIcon} textColor={textColor} position={position}/>}
            {isOpen && !type && <Modal isLogin={!!user} loginUrl={loginUrl} registerUrl={registerUrl} lynkedLogin={lynkedLogin} openModal={openModal} bgColor={bgColor} popupBg={popupBg} popupText={popupText} popupIcon={popupIcon} textColor={textColor} position={position}/>}
            {bgColor ? <div className="rewards--wrapper" style={position === 'right' ? {right: 0} : {left: 0}}>
                {(!!rewardCount && !isOpen) && <div className="rewardCount">{rewardCount}</div>}
                <div className={`rewards--btn ${isOpen ? "openBlock" : "closeBlock"}`}
                     onClick={openModal} style={{background: `${bgColor}`}}>
                    <div className="reward--btn">
                        <ModalLogo color={textColor}/>
                        <span style={{color: `${textColor}`}}>Loyalty Club</span>
                    </div>
                    <div className="close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path fill={textColor}
                                  d="M11.06 10l3.713 3.712a.75.75 0 0 1-1.06 1.061L10 11.061l-3.712 3.712a.75.75 0 0 1-1.061-1.06L8.939 10 5.227 6.288a.75.75 0 1 1 1.06-1.061L10 8.939l3.712-3.712a.75.75 0 0 1 1.061 1.06L11.061 10z"/>
                        </svg>
                    </div>
                </div>
            </div> : null}

        </> : null
    );
}

export default Dashboard;
