import './charList.scss';
import React, { useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import _ from 'lodash';
import PropTypes from 'prop-types';

function CharList(props) {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210);
  

  const { getAllCharacters} =  useMarvelService();

  useEffect(() => {
    updateList(offset);
  }, []);

  const onLoadedList = (response) => {
    setCharList((charList) => (charList = [...charList, ...response]));
    setOffset(offset => offset + 9);
  };
  const updateList = (offset) => {
    getAllCharacters(offset).then(onLoadedList);
  };
  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  const renderList = (charList) => {
    const { setActiveCard } = props;
    return charList.map(({ thumbnail, id, name }, index) => {
      const styleForDisableImg = thumbnail.endsWith('image_not_available.jpg') ? 'contain' : 'cover';

      const styleImg = {
        objectFit: styleForDisableImg,
      };
      return (
        <li
          tabIndex={0}
          ref={(el) => itemRefs.current[index] = el}
          key={index}
          className="char__item"
          onClick={() => {
            setActiveCard(id);
            focusOnItem(index);
          }}
        >
          <img src={thumbnail} alt="abyss" style={styleImg} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
  };

  return (
    <div className="char__list">
      <ul className="char__grid">{renderList(charList)}</ul>
      <button onClick={updateList} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propTypes = {
  setActiveCard: PropTypes.func,
};

export default CharList;
