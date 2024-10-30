import {useEffect, useState} from "react";
import "./styles.scss";
import {Invisible} from "../../shared/icons/invisible";
import {Visible} from "../../shared/icons/visibility";
import {env} from "../../links/links";

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

function Login({shopName}) {
    const [attributes, setAttributes] = useState(
        {
            email: '',
            password: ''
        }
    );

    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLogin, setIsLogin] = useState( false);
    const [businessAccount, setBusinessAccount] = useState( '');
    const checkSignIn = () => {
        postData(`${env.api}/wordpress/check-if-connected`, {shop: window.location.hostname,}).then(res=>{
            setIsLogin(res.message === 'Shop is connected' ? true : false)
            setBusinessAccount(res.business_account)
        })
    }
    useEffect(() => {
        checkSignIn()
    }, []);

    const handleAttributesChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setAttributes({...attributes, [name]: value});
    }

    const submitAttributesChange = (event) => {
        event.preventDefault();

        if (attributes.password && attributes.email) {
            postData(`${env.api}/wordpress/sign-in`, {
                shop: window.location.hostname,
                password: attributes.password,
                email: attributes.email,
            }).then(res => {
                if (res.bearer_token ?? res.decline_token) {
                    window.open(`${env.dashboard}/?account_info_token=${res.bearer_token ?? res.decline_token}`)
                    setIsLogin(true);
                }

                if (isError) {
                    setIsError(false);
                }
            })
        } else {
            setIsError(true);
        }
    }
    const submitOpenDashboardChange = (event) => {
        event.preventDefault();
        window.open(`${env.dashboard}`);
    }
    return (
        <div className="login--wrapper">
            {!isLogin ? (<>
                <h2 className="title">Login</h2>
                <form className="login--form">
                    <div className="input--wrapper">
                        <input name="email" required type="email" placeholder="Your Email"
                               onChange={handleAttributesChange}
                               value={attributes.email}/>
                        {isError && !attributes.email ? <span className="error">Email is required</span> : null}
                    </div>
                    <div className="input--wrapper">
                        <div className="password--wrapper">
                            <input name="password" required type={showPassword ? "text" : "password"}
                                   placeholder="Your Password"
                                   onChange={handleAttributesChange}
                                   value={attributes.password}/>
                            <button type="button" className="showHidePassword"
                                    onClick={() => setShowPassword(!showPassword)}>
                                {showPassword
                                    ? <Invisible/>
                                    : <Visible/>
                                }
                            </button>
                        </div>
                        {isError && !attributes.password ? <span className="error">Password is required</span> : null}
                    </div>
                    <button onClick={submitAttributesChange} className="login--btn">Login</button>
                </form>
            </>) : (<>
                <h2 style={{marginBottom: '20px'}}>Business account: <b>{businessAccount}</b> is connected!</h2>
                <div className="login--form">
                    <button className="login--btn" onClick={submitOpenDashboardChange}>Dashboard</button>
                </div>
            </>)}
        </div>
    )
}

export default Login;
