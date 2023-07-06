import React, { useContext, useState } from 'react';
import { FaMoon, FaLightbulb } from 'react-icons/fa6';
import './ThemeToggleSwitch.css';

const ThemeToggleSwitch = ({ setCurrTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode((prevState) => {
      const newMode = !prevState;
      const newTheme = newMode ? 'dark' : 'light';
      setCurrTheme(newTheme);
      return newMode;
    });
  };

  return (
    <div
      className={`toggle-switch ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleToggle}
    >
      <div className="icons">
        <FaLightbulb />
        <div className="switch">
          <div className="switch-handle"></div>
        </div>
        <FaMoon />
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
