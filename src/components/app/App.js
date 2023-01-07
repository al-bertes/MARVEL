import AppHeader from '../appHeader/AppHeader';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spinner from '../randomChar/Spinner';
import SingleCharacterPage from '../pages/SingleCharacterPage';
const ComicsPage = React.lazy(() => import('../pages/ComicsPage'));
const MainPage = React.lazy(() => import('../pages/MainPage'));
const Page404 = React.lazy(() => import('../pages/404page'));
const SingleComicPage = React.lazy(() => import('../pages/SingleComicPage'));

function App() {

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
          <Routes>
          <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/comics" element={<ComicsPage/>}/>
            <Route exact path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route exact path="/:charId" element={<SingleCharacterPage/>}/>
            <Route exact path="*" element={<Page404/>}/>
          </Routes>
          </Suspense>
          
        </main>
      </div>
    </Router>
  );
}

export default App;
