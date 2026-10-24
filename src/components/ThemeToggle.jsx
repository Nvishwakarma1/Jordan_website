import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      className={`theme-toggle ${isDark ? 'dark-mode' : ''}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle-btn"
    >
      {isDark ? <FiSun className="toggle-icon" /> : <FiMoon className="toggle-icon" />}
    </button>
  );
};

export default ThemeToggle;