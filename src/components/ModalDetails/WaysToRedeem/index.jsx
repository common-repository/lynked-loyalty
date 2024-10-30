const WaysToRedeem = ({textColor, titleColor}) => {
    return (
        <div className="waysToRedeem">
            <div className="title" style={{color: titleColor}}>Collect points, earn vouchers!</div>
            <div className="reward-content-description-wrapper">
                <div className="info--wrapper">
                    <div className="points" style={{color: textColor}} >Collect points by spending in store or online(€/£/$1 = 1 point).
                        When you
                        reach a points target you will receive a reward. E.g. “Collect 100 points and get
                        €10 off
                        your next purchase”.
                    </div>
                    <div className="points" style={{color: textColor}}>Reward details are visible in the Lynked app (IOS/Android) and
                        on your
                        online shopping account for any loyalty program you enrol in with Lynked.
                    </div>
                </div>
                <div className="redeem-rewards-info" style={{color: titleColor}}>You can redeem rewards by shopping online and in store.</div>
            </div>
        </div>
    );
};

export default WaysToRedeem;
