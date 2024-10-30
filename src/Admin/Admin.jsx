import logo from "../shared/img/logo.png";
import Step from "../components/Step";

import "./styles.scss";
import Login from "../components/Login";
import {useEffect, useState} from "react";
import axios from "axios";
import {ModalLogo} from "../shared/icons/modalLogo";
import PointWay from "../components/PointWay";
import {Earn} from "../shared/icons/earn";
import {Redeem} from "../shared/icons/redeem";

const collectRewards = ["When checking out through your Shopify payment gateway customers need to create a customer account with your business.(or log into their existing customer account)", "The customer online account, and Lynked Loyalty app must use the same email address - this is what connects your store to a particular customer account allowing customers to collect points online and in your store.", "When a customer logs in to their account on your website with their email that matches their Lynked account, they will collect 1 point for every €/£/$ they spend online.", "Their points will be added to their Lynked Loyalty customer app on their mobile device which they can also use to collect points in your store."]

const Admin = () => {
    const [bgColor, setBgColor] = useState('#3fb1ff')
    const [textColor, setTextColor] = useState('#fff')
    const [popUpBgColor, setPopUpBgColor] = useState('#fff')
    const [popUpTextColor, setPopUpTextColor] = useState('#fff')
    const [popUpIconsColor, setPopUpIconsColor] = useState('#fff')
    const [position, setPosition] = useState('right')
    const [saved, setSaved] = useState(false)
    const [registerUrl, setRegisterUrl] = useState('') ;
    const [loginUrl, setLoginUrl] = useState('') ;

    const setModalColors = () => {
        axios.post('/wp-json/lynked/lynked-plugin-settings-save', {
            bg_color: bgColor,
            text_color: textColor,
            popup_bg: popUpBgColor,
            popup_text: popUpTextColor,
            popup_icon: popUpIconsColor,
            lynked_login_url: loginUrl,
            lynked_register_url: registerUrl,
            position
        }).then(res => {
            setSaved(true)
            getModalColors()
            setTimeout(()=>{
                setSaved(false)
            }, 3000)
        })
    }

    const getModalColors = () => {
        axios.get('/wp-json/lynked/lynked-plugin-settings-get').then(res => {
            setTextColor(res.data.settings.text_color ?? 'white')
            setBgColor(res.data.settings.bg_color ?? '#3fb1ff')
            setPosition(res.data.settings.position ?? 'right')
            setPopUpBgColor(res.data.settings.popup_bg ?? '#ffffff')
            setPopUpIconsColor(res.data.settings.popup_icon ?? '#3fb1ff')
            setPopUpTextColor(res.data.settings.popup_text ?? '#000000')
            setLoginUrl(res.data.settings.lynked_login_url ?? res.data.default_login_url)
            setRegisterUrl(res.data.settings.lynked_register_url ?? res.data.default_login_url)
        })
    }

    useEffect(() => {
        getModalColors()
    }, []);


    return (
        <div>
            <div className="header">
                <img src={logo} alt="Lynked" className="logo"/>
            </div>

            <h2 className="title">Welcome to Lynked Loyalty</h2>
            <h3 className="title-h3 subtitle">Omnichannel customer loyalty for your business.</h3>

            <div className="lynked-description ">
                Connect your physical store and e-commerce customer loyalty programs together with Lynked loyalty. Your
                customers can collect loyalty rewards on their mobile device by shopping in your store and through your
                website.
            </div>

            <div className="setupInstruction--wrapper">
                <h3 className="title-h3">Setup Instruction</h3>
                <h4 className="title-h4 ">Let`s get started by following this guide</h4>

                <Step stepNumber={1}
                      description="To connect your e-commerce store to Lynked Loyalty, log in to your Lynked account below. You will be redirected to the Lynked dashboard where you manage your entire loyalty program, including in-store and e-comerce customers."/>

                <h3 className="title-h3 collect">How do customers collect rewards?</h3>

                <ol>
                    <li>Existing or new customers can download Lynked Loyalty for
                        <a className="link" target="_blank"
                           href="https://apps.apple.com/ua/app/lynked-loyalty/id1513972594">iOS</a>/<a
                            className="link withoutSpace" target="_blank"
                            href="https://play.google.com/store/apps/details?id=com.lynkedreactnative">Android</a> and
                        create an account.
                    </li>
                    {collectRewards.map((description, i) => {
                        return <li className="description" key={i}>{description}</li>;
                    })}
                </ol>
            </div>
            <div className="settings--popup">
                <h3 className="title-h3">Setting your Lynked PopUp</h3>
                <div className="settings--container">
                    <div className="settings--form">
                        <div className="field-wrap">
                            <div className="label">Select Header And Button Background Color</div>
                            <div className="color--inputs-wrap">
                                <input type="color" className={'color-input'} value={bgColor}
                                       onChange={e => setBgColor(e.target.value)}/>
                                <input className={'color-input'} style={{padding: '0 5px', marginLeft: '15px'}} type="text" value={bgColor}
                                       onChange={e => setBgColor(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Select Header And Button Text Color</div>
                            <div className="color--inputs-wrap">
                                <input type="color" className={'color-input'} value={textColor}
                                       onChange={e => setTextColor(e.target.value)}/>
                                <input className={'color-input'} style={{padding: '0 5px', marginLeft: '15px'}} type="text" value={textColor}
                                       onChange={e => setTextColor(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Select PopUp Content Background Color</div>
                            <div className="color--inputs-wrap">
                                <input type="color" className={'color-input'} value={popUpBgColor}
                                       onChange={e => setPopUpBgColor(e.target.value)}/>
                                <input className={'color-input'} style={{padding: '0 5px', marginLeft: '15px'}} type="text" value={popUpBgColor}
                                       onChange={e => setPopUpBgColor(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Select PopUp Content Text Color</div>
                            <div className="color--inputs-wrap">
                                <input type="color" className={'color-input'} value={popUpTextColor}
                                       onChange={e => setPopUpTextColor(e.target.value)}/>
                                <input className={'color-input'} style={{padding: '0 5px', marginLeft: '15px'}} type="text" value={popUpTextColor}
                                       onChange={e => setPopUpTextColor(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Select PopUp Content Icon Color</div>
                            <div className="color--inputs-wrap">
                                <input type="color" className={'color-input'} value={popUpIconsColor}
                                       onChange={e => setPopUpIconsColor(e.target.value)}/>
                                <input className={'color-input'} style={{padding: '0 5px', marginLeft: '15px'}} type="text" value={popUpIconsColor}
                                       onChange={e => setPopUpIconsColor(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Select PopUp position</div>
                            <div className="input-wrap" onClick={() => setPosition('right')}>
                                <input type="radio" name={'position'} checked={position === 'right'} value={'right'}
                                       onChange={e => setPosition(e.target.value)}/>
                                <p>Bottom Right</p>
                            </div>
                            <div className="input-wrap" onClick={() => setPosition('left')}>
                                <input type="radio" name={'position'} checked={position === 'left'} value={'left'}
                                       onChange={e => setPosition(e.target.value)}/>
                                <p>Bottom Left</p>
                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Enter Your Join Now Url</div>
                            <div className="color--inputs-wrap">
                                <input type="text" style={{width: '50%'}} value={registerUrl} onChange={(e) => {
                                    setRegisterUrl(e.currentTarget.value)
                                }}/>

                            </div>
                        </div>
                        <div className="field-wrap">
                            <div className="label">Enter Your Sign In Url</div>
                            <div className="color--inputs-wrap">

                                <input type="text" style={{width: '50%'}} value={loginUrl} onChange={(e) => {
                                    setLoginUrl(e.currentTarget.value)
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="popup--show">
                        <div className="reward-block main-reward-block view-block"
                             style={position === 'right' ? {right: 0, background: popUpBgColor} : {
                                 left: 0,
                                 background: popUpBgColor
                             }}>
                            <div className="reward--header" style={{background: `${bgColor}`}}>
                                <div className="closeModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path fill={textColor}
                                              d="M11.06 10l3.713 3.712a.75.75 0 0 1-1.06 1.061L10 11.061l-3.712 3.712a.75.75 0 0 1-1.061-1.06L8.939 10 5.227 6.288a.75.75 0 1 1 1.06-1.061L10 8.939l3.712-3.712a.75.75 0 0 1 1.061 1.06L11.061 10z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 style={{color: `${textColor}`}}>Your Shop Name points!</h4>
                                    <div className="point-logo-wrapper">
                                        <h2 className="pointsBlock" style={{color: `${textColor}`}}>20</h2>
                                        <ModalLogo color={textColor}/>
                                    </div>
                                </div>
                            </div>
                            <div className="reward-content">
                                <div className="reward-inside-block" style={{background: popUpBgColor}}>
                                    <div className="pointWays--wrapper">
                                        <PointWay text="How to earn points" type="earn" icon={<Earn color={popUpIconsColor}/>}
                                                  onCLick={()=>{}} textColor={popUpTextColor}/>
                                        <PointWay text="How to redeem rewards" type="redeem" icon={<Redeem color={popUpIconsColor}/>}
                                                  onCLick={()=>{}} textColor={popUpTextColor}/>
                                    </div>
                                </div>
                            </div>
                            <div className="reward-footer" style={{background: popUpBgColor}}>
                                <p className="card-description" style={{color: popUpTextColor}}>We reward with Lynked Loyalty</p>
                            </div>

                        </div>
                        <div className="rewards--wrapper" style={position === 'right' ? {right: 0} : {left: 0}}>
                            <div className={`rewards--btn closeBlock`} style={{background: `${bgColor}`}}>
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
                        </div>
                    </div>
                </div>
                <div className="save--wrap">
                    <button className="save--btn" disabled={saved} onClick={setModalColors}>{saved ? 'Saved' : 'Save PopUp Settings'}</button>
                </div>

            </div>

            <Login/>
        </div>
    )
}

export default Admin;
