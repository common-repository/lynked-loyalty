import ios from "../../../shared/img/ios.png"
import android from "../../../shared/img/android.png"

const description = ["Download Lynked Loyalty for iOS/Android.", "Create an account on the Lynked app with the same email used when shopping online.", "Log into your online shopping Lynked account.", "Ensure your online shopping email matches your Lynked iOS/Android app email. This is to ensure your online and instore loyalty profiles are connected.", "Now you can track & collect points online & in store."];

const Download = ({textColor, titleColor}) => {
    return (
        <div className="download">
            <div className="title" style={{color: titleColor}}>Download Lynked on:</div>
            <div className="reward-content-description-wrapper">
                <div className="download--wrapper">
                    <a target="_blank" style={{color: titleColor}}
                       href="https://apps.apple.com/ua/app/lynked-loyalty/id1513972594">
                        <img src={ios} alt="Download Lynked app on IOS"/>
                    </a>
                    <a target="_blank" style={{color: titleColor}}
                       href="https://play.google.com/store/apps/details?id=com.lynkedreactnative">
                        <img src={android} alt="Download Lynked app on Android"/>
                    </a>
                </div>

                <ol>
                    {description.map((desc, i) => <li key={i} className="card-description" style={{color: textColor}}>{desc}</li>)}
                </ol>
            </div>
        </div>
    );
};

export default Download;
