// import { useState, useEffect } from 'react'

// import './ThemeToggle.css'

// const ThemeToggle = () => {
//     const [isDark, setIsDark] = useState(false)

//     useEffect(() => {
//         // Check if user has a saved theme preference
//         const savedTheme = localStorage.getItem('theme')
//         if (savedTheme === 'dark') {
//             setIsDark(true)
//             document.documentElement.classList.add('dark-theme')
//         }
//     }, [])

//     const toggleTheme = () => {
//         const newTheme = !isDark
//         setIsDark(newTheme)

//         if (newTheme) {
//             document.documentElement.classList.add('dark-theme')
//             localStorage.setItem('theme', 'dark')
//         } else {
//             document.documentElement.classList.remove('dark-theme')
//             localStorage.setItem('theme', 'light')
//         }
//     }

//     return (
//         <button
//             className="theme-toggle"
//             onClick={toggleTheme}
//             aria-label="Toggle theme"
//             title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
//         >
//             {isDark ? '☀️' : '🌙'}
//         </button>
//     )
// }

// export default ThemeToggle
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import the icons
import './ThemeToggle.css';

const ThemeToggle = () => {
  // Fixed typo: 'useState' instead of 'usestate'
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
    >
      {/* Show Sun if Dark (to switch to light), Moon if Light (to switch to dark) */}
      {isDark ? <FiSun className="toggle-icon" /> : <FiMoon className="toggle-icon" />}
    </button>
  );
};

export default ThemeToggle;