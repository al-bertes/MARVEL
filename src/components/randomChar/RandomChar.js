import React, { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from './Spinner';
import Error from '../error/error';

function RandomChar() {
  const [char, setChar] = useState({
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
  });
  const [processState, setProcessState] = useState('loading');

  const marverlServer = new MarvelService();

  const onCharacterLoaded = (data) => {
    setChar(data);
    setProcessState('loaded');
  };

  const onError = () => {
    setProcessState('error');
  };
  const updataChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    setProcessState('loading');
    marverlServer
      .getCharacter(id)
      .then((response) => onCharacterLoaded(response))
      .catch(onError);
  };

  useEffect(() => {
    updataChar();
    const timerId = setInterval(updataChar, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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
      case 'loaded':
        return renderCharCards(char);
      case 'error':
        return <Error />;
      case 'loading':
        return <Spinner />;
      default:
        return <Spinner />;
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
          onClick={updataChar}
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
