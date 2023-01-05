import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ComicsList = () => {
  const [comicsList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210);
  

  const { getCommics} =  useMarvelService();

  useEffect(() => {
    updateList();
  }, []);

  const onLoadedList = (response) => {
    setCharList((comicsList) => (comicsList = [...comicsList, ...response]));
    setOffset((offset) => (offset = offset + 8));
  };
  const updateList = () => {
    getCommics(offset).then(onLoadedList);
  };
console.log(comicsList)

const renderList = (charList) => {
  // const { setActiveCard } = props;
  return charList.map(({ thumbnail, id, title, prices }, index) => {

    return (
      <li className="comics__item" key={index}>
        <Link to={`/comics/${id}`}>
          <img src={thumbnail} alt="abyss" className="comics__item-img" />
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">{prices}$</div>
        </Link>
      </li>
    );
  });
};
  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {renderList(comicsList)}
      </ul>
      <button onClick={updateList} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
