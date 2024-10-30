import "./styles.scss";

const Title = ({text, color='#000000'}) => {
    return (
        <div className="list-item-title" style={{color: color}}>{text}</div>
    );
};

export default Title;
