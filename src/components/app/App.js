import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';
import MarvelService from '../../services/MarvelService';
import React, { useState } from 'react';

const test = new MarvelService();
test.getAllCharacters().then((res) => console.log(res));

function App() {
  const [active, setActiveId] = useState(null);

  const setActiveCard = (id) => {
    setActiveId(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList setActiveCard={setActiveCard} /> <CharInfo charId={active} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
}

export default App;
