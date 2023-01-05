import AppHeader from '../appHeader/AppHeader';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComicsPage, MainPage, Page404, SingleComicPage } from '../pages';

function App() {

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
          <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/comics" element={<ComicsPage/>}/>
            <Route exact path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route exact path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
