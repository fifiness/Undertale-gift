import soundEffects from '../utils/soundEffects';
import './SideMenu.css';

const SideMenu = ({ onItemsClick }) => {
    const handleItemClick = () => {
        soundEffects.playConfirm();
        onItemsClick();
    };

    const handleHover = () => {
        soundEffects.playTextBlip();
    };

    return (
        <div className="side-menu">
            {/* Top Box: Status */}
            <div className="side-box status-box">
                <h2 className="char-name">amina</h2>
                <div className="status-details">
                    <span className="lv-label">LV 20</span>
                    <div className="hp-container">
                        <span className="hp-label">HP</span>
                        <div className="hp-bar">
                            <div className="hp-fill" style={{ width: '100%' }}></div>
                        </div>
                        <span className="hp-num">99 / 99</span>
                    </div>
                </div>
            </div>

            {/* Middle Box: Buttons */}
            <div className="side-box buttons-box">
                <button
                    className="side-button"
                    onClick={handleItemClick}
                    onMouseEnter={handleHover}
                >
                    ITEM
                </button>
                <button className="side-button" onMouseEnter={handleHover}>
                    STAT
                </button>
                <button className="side-button" onMouseEnter={handleHover}>
                    CELL
                </button>
            </div>

            {/* Bottom Box: Soul */}
            <div className="side-box soul-box">
                <div className="soul-container">
                    <svg viewBox="0 0 16 16" width="48" height="48" className="pixel-soul">
                        {/* Red Heart Shape */}
                        <path d="M2,4 V7 H3 V9 H4 V11 H5 V12 H7 V13 H9 V12 H11 V11 H12 V9 H13 V7 H14 V4 H12 V3 H10 V4 H9 V5 H7 V4 H6 V3 H4 V4 Z" fill="#ff0000" />
                        {/* Improved Smiley Face */}
                        <rect x="5" y="6" width="1" height="1" fill="black" />
                        <rect x="10" y="6" width="1" height="1" fill="black" />
                        <path d="M5,9 H11 V10 H5 Z" fill="black" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
