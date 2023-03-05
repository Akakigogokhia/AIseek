import Search from '@mui/icons-material/Search';
import Clear from '@mui/icons-material/Clear';
import { useContext, useState } from 'react';
import './home.css';
import Header from '../header/Header';
import SearchResults from '../searchResults/SearchResults';
import Images from '../images/Images';
import Video from '../video/Video';
import Chat from '../chat/Chat';
import { Context } from '../Context';
import Footer from '../footer/Footer';

export default function Home({ component }) {
  const [question, setQuestion] = useState('');
  const { prompt, setPrompt, data, loading, wallpaper } = useContext(Context);
  const [same, setSame] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSearch = () => {
    setPrompt(question);
    setSame(false);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setPrompt(question);
      setSame(false);
    }
  };

  const regenerate = () => {
    setPrompt(prompt + ' ');
    setSame(true);
  };

  return (
    <main className='home'>
      <div
        className='home_background'
        id='background'
        style={{ backgroundImage: `url(../back/${wallpaper}.jpg)` }}
      ></div>
      <div
        className='home_container'
        style={{ backdropFilter: inputFocused && 'brightness(50%)' }}
      >
        <Header />
        <div className='answer'>
          <section className='home_answerSection'>
            {!component && (
              <Chat
                data={data}
                prompt={prompt}
                loading={loading}
                regenerate={regenerate}
                same={same}
              />
            )}
            {component === 'results' && <SearchResults />}
            {component === 'images' && <Images />}
            {component === 'videos' && <Video />}
          </section>
          <section className='home_search'>
            <div id='inputWrapper'>
              <input
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder='Ask a question'
                type='text'
                id='searchInput'
                className='input'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleEnter}
              />
              <Search id='searchIcon' onClick={handleSearch} />
              {question.length > 0 && (
                <Clear id='clearIcon' onClick={() => setQuestion('')} />
              )}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}
