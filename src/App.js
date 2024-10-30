import {Provider} from "react-redux";

import Dashboard from "./Dashboard/Dashboard";
import {store} from "./store";
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {

    const [bgColor, setBgColor] = useState('')
    const [textColor, setTextColor] = useState('white')
    const [position, setPosition] = useState('right')
    const [popUpBgColor, setPopUpBgColor] = useState('#fff')
    const [popUpTextColor, setPopUpTextColor] = useState('#fff')
    const [popUpIconsColor, setPopUpIconsColor] = useState('#fff')
    const [registerUrl, setRegisterUrl] = useState('') ;
    const [loginUrl, setLoginUrl] = useState('') ;

    const getModalColors = () => {
        axios.get('/wp-json/lynked/lynked-plugin-settings-get').then(res=>{
            console.log(res.data)
            setTextColor(res.data.settings.text_color ?? 'white' )
            setBgColor(res.data.settings.bg_color ?? 'rgb(86, 163, 243)')
            setPosition(res.data.settings.position ?? 'right');
            setPopUpBgColor(res.data.settings.popup_bg ?? '#ffffff');
            setLoginUrl(res.data.settings.lynked_login_url ?? res.data.default_login_url);
            setRegisterUrl(res.data.settings.lynked_register_url ?? res.data.default_login_url);
            setPopUpIconsColor(res.data.settings.popup_icon ?? '#3fb1ff');
            setPopUpTextColor(res.data.settings.popup_text ?? '#000000');

        })
    }
    useEffect(() => {
        getModalColors()
    }, []);
    return (
        <div>
            <Provider store={store}>
                <Dashboard bgColor={bgColor} textColor={textColor} position={position} popupBg={popUpBgColor} popupText={popUpTextColor} popupIcon={popUpIconsColor} loginUrl={loginUrl} registerUrl={registerUrl}/>
            </Provider>
        </div>
    );
}

export default App;
