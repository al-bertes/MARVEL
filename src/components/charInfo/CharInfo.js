import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import React, { useEffect, useState } from 'react';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../randomChar/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CharInfo({ charId }) {
  const [charData, setCharData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    homepage: '',
    wiki: '',
    comics: []
  });
  const { processState, getCharacter } = useMarvelService();

  useEffect(() => {
    updateInfo();
  }, [charId]);

  const onLoadedInfoCard = (data) => {
    setCharData(data);
  };

  const updateInfo = () => {
    if (!charId) {
      return;
    }
    getCharacter(charId).then(onLoadedInfoCard);
  };

  const renderCardInfo = ({ name, description, thumbnail, homepage, wiki, comics }) => {
    const listComics = comics.map(({resourceURI}, i) => {
      if (i > 9) {
        // eslint-disable-next-line array-callback-return
        return;
      }
      const pathToComic = resourceURI.split('/');
    
      return (
        <Link to={`/comics/${pathToComic[pathToComic.length - 1]}`} key={i} href={resourceURI}>
          <li key={i} className="char__comics-item">
            {name}
          </li>
        </Link>
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
      case 'loaded':
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

