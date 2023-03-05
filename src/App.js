import './App.css';
import Home from './home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Images from './images/Images';
import SearchResults from './searchResults/SearchResults';
import { ContextProvider } from './Context';
import Video from './video/Video';

function App() {
  return (
    <ContextProvider>
      <div className='app'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/images' element={<Home component='images' />} />
            <Route path='/results' element={<Home component='results' />} />
            <Route path='/videos' element={<Home component='videos' />} />
          </Routes>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
