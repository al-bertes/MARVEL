import { Link, useParams } from 'react-router-dom';
import './singleComicPage.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

const SingleCharacterPage = () => {
  const {charId} = useParams();

  const [comicsData, setComicsData] = useState({});
  const { getCharacter } = useMarvelService();
console.log(comicsData)
  useEffect(() => {
    updateInfo();
  }, [charId]);

  const onLoadedInfoCard = (data) => {
    setComicsData(data);
  };

  const updateInfo = () => {
    getCharacter(charId).then(onLoadedInfoCard);
  };

  return (
    <div className="single-comic">
      <img src={comicsData.thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comicsData.title}</h2>
        <p className="single-comic__descr">
          {comicsData.description}
        </p>
      </div>
      <Link to="/" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharacterPage;
