import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import React, { useEffect, useState } from 'react';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../randomChar/Spinner';
import PropTypes from 'prop-types';

function CharInfo({ charId }) {
  const [charData, setCharData] = useState({
    name: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
    description: null,
    comics: null,
  });
  const [processState, setProcessState] = useState('waiting');

  const marverlServer = new MarvelService();

  useEffect(() => {
    updateInfo();
  }, [charId]);

  const onLoadedInfoCard = (data) => {
    setCharData(data);
    setProcessState('fullfiled');
  };

  const updateInfo = () => {
    if (!charId) {
      return;
    }
    setProcessState('loading');
    marverlServer.getCharacter(charId).then(onLoadedInfoCard).catch(setProcessState('error'));
  };

  const renderCardInfo = ({ name, description, thumbnail, homepage, wiki, comics }) => {
    const listComics = comics.map((item, i) => {
      if (i > 9) {
        // eslint-disable-next-line array-callback-return
        return;
      }
      return (
        <a key={i} href={item.resourceURI}>
          <li key={i} className="char__comics-item">
            {item.name}
          </li>
        </a>
      );
    });
    const styleForDisableImg = thumbnail.endsWith('image_not_available.jpg') ? 'contain' : 'cover';

    const styleImg = {
      objectFit: styleForDisableImg,
    };
    return (
      <>
        <div className="char__basics">
          <img src={thumbnail} alt="abyss" style={styleImg} />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>

        {comics.length > 0 ? (
          <ul className="char__comics-list">{listComics}</ul>
        ) : (
          'There is no comics with this character'
        )}
      </>
    );
  };

  const renderInfo = (processState, char) => {
    switch (processState) {
      case 'waiting':
        return <Skeleton />;
      case 'fullfiled':
        return renderCardInfo(char);
      case 'error':
        return <Spinner />;
      default:
        return null;
    }
  };

  return <div className="char__info">{renderInfo(processState, charData)}</div>;
}

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
