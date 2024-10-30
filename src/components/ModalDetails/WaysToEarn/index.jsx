const WaysToEarn = ({textColor, titleColor}) => {
    return (
        <div className="waysToEarn activeWays">
            <div className="title" style={{color: titleColor}}>Ways to earn points:</div>
            <div className="reward-content-description-wrapper">
                <div className="info--wrapper">
                    <div className="order-info" style={{color: titleColor}}>How to earn points online</div>
                    <p className="points" style={{color: textColor}}>Log into your customer account online (ensure your online shopping email
                        matches your email in the Lynked app) Collect 1 point for every €/£/$ you spend
                        online. Your earned points & vouchers will be added to your Lynked app.
                    </p>
                </div>
                <div className="info--wrapper">
                    <div className="order-info" style={{color: titleColor}}>How to earn points in store</div>
                    <p className="points" style={{color: textColor}}>You can collect points in store by using your Lynked Loyalty app. Present the QR code in your Lynked app at the checkout. The QR code will be scanned and points will be added to your account for every €/£/$ you spend.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WaysToEarn;
