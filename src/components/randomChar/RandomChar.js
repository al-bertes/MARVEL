import React, { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from './Spinner';
import Error from '../error/error';

function RandomChar() {
  const [char, setChar] = useState({
    name: '',
    description: '',
    thumbnail: '',
    homepage: '',
    wiki: '',
  });
  const { processState, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharacterLoaded = (data) => {
    setChar(data);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id).then(onCharacterLoaded);
  };

  const renderCharCards = ({ name, description, thumbnail, homepage, wiki }) => {
    const styleForDisableImg = thumbnail.endsWith('image_not_available.jpg') ? 'contain' : 'cover';
    const styleImg = {
      objectFit: styleForDisableImg,
    };
    return (
      <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={styleImg} />

        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">{description}</p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    );
  };
  const renderChar = (processState, char) => {
    switch (processState) {
      case 'loading':
        return <Spinner />;
      case 'loaded':
        return renderCharCards(char);
      default:
        return <Error />;
    }
  };
  return (
    <div className="randomchar">
      {renderChar(processState, char)}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={updateChar}
          disabled={processState === 'loading' ? true : false}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}

export default RandomChar;
