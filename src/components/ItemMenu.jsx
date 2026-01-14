import soundEffects from '../utils/soundEffects';
import './ItemMenu.css';

const items = [
    "a heart that wants to be good no matter what",
    "a soul that appreciates beautiful things",
    "cnx ta3 darkom",
    "Skhana ta3 Tahir fe sif"
];

const ItemMenu = ({ onClose }) => {
    const handleHover = () => {
        soundEffects.playTextBlip();
    };

    const handleBack = () => {
        soundEffects.playEnd();
        onClose();
    };

    return (
        <div className="item-menu-overlay" onClick={handleBack}>
            <div className="item-menu" onClick={(e) => e.stopPropagation()}>
                <div className="item-list">
                    {items.map((item, index) => (
                        <div key={index} className="item-row" onMouseEnter={handleHover}>
                            <span className="item-heart-icon">❤️</span>
                            <span className="item-text">* {item}</span>
                        </div>
                    ))}
                </div>
                <button className="close-item-btn" onClick={handleBack}>
                    [ BACK ]
                </button>
            </div>
        </div>
    );
};

export default ItemMenu;
