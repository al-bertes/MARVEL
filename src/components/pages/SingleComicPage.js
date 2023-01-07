import { Link, useParams } from 'react-router-dom';
import './singleComicPage.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

const SingleComicPage = () => {
  const {comicId} = useParams();
  
  const [comicsData, setComicsData] = useState({
    thumbnail: '',
    title: '',
    prices: '',
    description: '',
    pageCount: '', 
  });
  const { getSingleCommics } = useMarvelService();

  useEffect(() => {
    updateInfo();
  }, [comicId]);

  const onLoadedInfoCard = (data) => {
    setComicsData(data);
  };

  const updateInfo = () => {
    getSingleCommics(comicId).then(onLoadedInfoCard);
  };

  return (
    <div className="single-comic">
      <img src={comicsData.thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comicsData.title}</h2>
        <p className="single-comic__descr">
          {comicsData.description}
        </p>
        <p className="single-comic__descr">{comicsData.pageCount}</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{comicsData.prices}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
