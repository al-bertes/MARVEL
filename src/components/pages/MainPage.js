import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import { useState } from 'react';

const MainPage = () => {
  const [active, setActiveId] = useState(null);

  const setActiveCard = (id) => {
    setActiveId(id);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList setActiveCard={setActiveCard} />
        <CharInfo charId={active} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
