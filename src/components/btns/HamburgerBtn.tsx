import React from 'react';

// Define the types for the props that the component expects.
type HamburgerBtnProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerBtn: React.FC<HamburgerBtnProps> = ({ setIsMenuOpen, isMenuOpen }) => {
    // This CSS is defined as a string literal and doesn't need type changes.
    const styles = `
    #checkbox {
      display: none;
    }

    .toggle {
      position: relative;
      width: 40px;
      height: 10px;
      cursor: pointer;
      display: block;
      margin: auto;
    }

    .bar {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      border-radius: 2px;
      background: hotpink;
      transition: all 0.35s cubic-bezier(.5, -0.35, .35, 1.5);
    }

    .bar--top {
      bottom: calc(50% + 11px);
    }

    .bar--middle {
      top: 50%;
      transform: translateY(-50%);
    }

    .bar--bottom {
      top: calc(50% + 11px);
    }
    
    #checkbox:checked + .toggle .bar--top {
      transform: rotate(-45deg);
      bottom: 50%;
      transform-origin: center;
    }

    #checkbox:checked + .toggle .bar--middle {
      opacity: 0;
      transform: rotate(-45deg);
    }

    #checkbox:checked + .toggle .bar--bottom {
      transform: rotate(45deg);
      top: 50%;
      transform-origin: center;
    }
  `;

    return (
        <>
            <style>{styles}</style>

            <div id="menuToggle">
                <input
                    id="checkbox"
                    type="checkbox"
                    checked={isMenuOpen}
                    // The event type for onChange on an input is automatically inferred here.
                    onChange={() => setIsMenuOpen(!isMenuOpen)}
                />
                <label className="toggle" htmlFor="checkbox">
                    <div className="bar bar--top"></div>
                    <div className="bar bar--middle"></div>
                    <div className="bar bar--bottom"></div>
                </label>
            </div>
        </>
    );
};

export default HamburgerBtn;