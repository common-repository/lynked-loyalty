import {Close} from "../../shared/icons/close";

import "./styles.scss";

const CloseModal = ({openModal, color}) => {
    return (
        <div className="closeModal" onClick={openModal}>
            <Close color={color}/>
        </div>
    );
};

export default CloseModal;
