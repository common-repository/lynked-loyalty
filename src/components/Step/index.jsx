import React from 'react';

import "./styles.css";


const Step = ({stepNumber, description, children}) => {
    return (
        <div className="step--wrapper">
            <div className="stepTitle">Step {stepNumber}</div>
            <p className="description">{description}{children}</p>
        </div>
    );
};

export default Step;
