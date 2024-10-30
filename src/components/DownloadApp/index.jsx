import React from 'react';
import {DownloadIcon} from "../../shared/icons/download";
import {Arrow} from "../../shared/icons/arrow";
import Title from "../Title";

const DownloadApp = ({onClick, popupBg, textColor, iconColor, titleColor}) => {
    return (
        <div className="reward-inside-block" style={{background: popupBg}}>
            <div className="pointWays" onClick={() => onClick("download")}>
                <div>
                    <div className="download-item--wrapper">
                        <div className="pointsWays-item">
                            <DownloadIcon color={iconColor}/>
                            <Title text="Download Lynked for iOS/Android" color={titleColor}/>
                        </div>
                        <Arrow color={textColor}/>
                    </div>
                    <p className="card-description downloadApp" style={{color: textColor}}>Download Lynked to manage all of
                        your loyalty programs in one app.</p>
                </div>
            </div>
        </div>    );
};

export default DownloadApp;
