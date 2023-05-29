import React, { useEffect, useState } from 'react';
import './App.css';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [bgColor, setBgColor] = useState('#FFC0CB');
  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [useExternalUrl, setUseExternalUrl] = useState(false); // This state is missing in your code.
  const [isBowClicked, setIsBowClicked] = useState(false);
  const [isBowFalling, setIsBowFalling] = useState(false);
  const [fromField, setFrom] = useState('');
  const [toField, setTo] = useState('');
  const [wrapPaper, setWrapPaper] = useState('');
  const [isTransitionFinished, setIsTransitionFinished] = useState(false);
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setBgColor(urlParams.get('bgColor') || '#FFC0CB');
    setGreeting(urlParams.get('greeting') || 'Happy Valentine\'s Day!');
    setMessage(urlParams.get('message') || 'I love you!');
    setImage(urlParams.get('image') || 'https://example.com/heart.png');
    setFrom(urlParams.get('from') || '');
    setTo(urlParams.get('to') || '');
    setUrl(urlParams.get('url') || '');
    setWrapPaper(urlParams.get('wrapPaper') || '');
    setIncludeGiftWrap(urlParams.get('includeGiftWrap') === 'true');
    setUseExternalUrl(urlParams.get('useExternalUrl') === 'true');
  }, []);
  useEffect(() => {
    if (!includeGiftWrap) {
      setIsBowClicked(true);
      setTimeout(() => {
        setIsTransitionFinished(true);
      }, 2000);
    }
  }, [includeGiftWrap]);

  useEffect(() => {
    if (!includeGiftWrap && useExternalUrl && isTransitionFinished) {
      window.location.href = url;
    }
  }, [includeGiftWrap, useExternalUrl, isTransitionFinished, url]);

  const handleBowClick = () => {
    setIsBowFalling(true);
    setTimeout(() => {
      setIsBowClicked(true);
      setTimeout(() => {
        setIsTransitionFinished(true);
        // Add a check for includeGiftWrap and useExternalUrl checkboxes here
        if (includeGiftWrap && useExternalUrl) {
          window.location.href = url;
        }
      }, 10); // Adjust this delay as needed
    }, 1000);
  };

  return (
    <CSSTransition
      in={isBowClicked}
      timeout={1000}
      classNames="fade"
      onEntered={() => setWrapPaper('')}
    >
      <div 
        className="App" 
        style={{ 
          backgroundColor: isBowClicked ? `#${bgColor}` : '', 
          backgroundImage: isBowClicked ? '' : `url(${wrapPaper})` 
        }}
      >
        {!isBowClicked && (
          <div className={`plus-container ${isBowFalling ? 'clicked' : ''}`}>
            <img src="/bow.png" alt="Bow" onClick={handleBowClick} className={`bow ${isBowFalling ? 'clicked' : ''}`} />
            <div className={`horizontal-bar ${isBowFalling ? 'clicked' : ''}`}></div>
            <div className={`vertical-bar ${isBowFalling ? 'clicked' : ''}`}></div>
            <div className="gift-tag">
              <div className="gift-tag-line">To: {toField}</div>
              <div className="gift-tag-line">From: {fromField}</div>
            </div>
          </div>
        )}
        {isBowClicked && (
          <div className={`present ${isBowClicked ? 'unwrapped' : ''}`}>
            <header className="App-header">
              <h1>{greeting}</h1>
              <p>{message}</p>
              {image && <img src={image} alt="Valentine's Day" />}
              {url && <p>External URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
            </header>
          </div>
        )}
      </div>
    </CSSTransition>
  );
}

export default App;
