import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import { useState } from 'react';
import SearchChar from '../searchChar/SearchChar';

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
        <div>
          <CharInfo charId={active} />
          <SearchChar/>
          </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
