import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function Header() {
  const location = useLocation().pathname;
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  return (
    <main className="header">
      <Link to="/">
        <img id="logo" src="../logo-main.png" />
      </Link>
      <nav id="home_nav">
        <Link to="/" className="link">
          <div id="chat" className={location === '/' ? 'focus' : ''}>
            Chat
          </div>
        </Link>
        <Link to="/results" className="link">
          <div id="results" className={location === '/results' ? 'focus' : ''}>
            Web Results
          </div>
        </Link>
        <Link to="/images" className="link">
          <div id="images" className={location === '/images' ? 'focus' : ''}>
            Images
          </div>
        </Link>
        <Link to="/videos" className="link">
          <div id="videos" className={location === '/videos' ? 'focus' : ''}>
            Videos
          </div>
        </Link>
      </nav>
      <section
        ref={menuRef}
        className={visible ? 'menu-section menu-open' : 'menu-section'}
      >
        <img
          id="menuBar"
          src="../menu.png"
          onClick={() => setVisible(!visible)}
        />
        {visible && (
          <div className="menu">
            <Link
              to="/"
              className="menu-link"
              onClick={() => setVisible(false)}
            >
              <div>Chat</div>
            </Link>
            <Link
              to="/results"
              className="menu-link"
              onClick={() => setVisible(false)}
            >
              <div>Web Results</div>
            </Link>
            <Link
              to="/images"
              className="menu-link"
              onClick={() => setVisible(false)}
            >
              <div>Images</div>
            </Link>
            <Link
              to="/videos"
              className="menu-link"
              onClick={() => setVisible(false)}
            >
              <div>Videos</div>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
