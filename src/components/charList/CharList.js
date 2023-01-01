import './charList.scss';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import _ from 'lodash';
import PropTypes from 'prop-types';

class CharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        charList: [],
        offset: 210,
        processState: 'filling'  // filling, error, fulfilled
    }
    
  }
  
  marverlServer = new MarvelService(this.configurationUpdate);

  componentDidMount () {
    this.updateList();

  } 

  onLoadedList = (response) => {
    this.setState(({charList, offset}) => {
      return {charList: [...charList, ...response], offset: offset + 9}
    })
    
  }
  updateList = () => {
    this.marverlServer.getAllCharacters(this.state.offset).then(this.onLoadedList);
  }
  itemRefs = [];

  setRef = (ref) => {
      this.itemRefs.push(ref);
  }

  focusOnItem = (id) => {
      this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
      this.itemRefs[id].classList.add('char__item_selected');
      this.itemRefs[id].focus();
  }

  renderList = ({charList}) => {
    const { setActiveCard } = this.props;
    return charList.map(({thumbnail, id, name}, index) => {
        const styleForDisableImg = (thumbnail.endsWith('image_not_available.jpg')) ? 'contain': 'cover';
    
        const styleImg = {
            objectFit: styleForDisableImg
        }
        return (
            <li 
                tabIndex={0}
                ref={this.setRef} 
                key={id} className="char__item" 
                onClick={() => {
                  setActiveCard(id); 
                  this.focusOnItem(index);
                }}>
              <img src={thumbnail} alt="abyss" style={styleImg}/>
              <div className="char__name">{name}</div>
            </li>
        )
    })
  }
  render () {
    
    return (
        <div className="char__list">
            <ul className="char__grid">
                {this.renderList(this.state)}
            </ul>
            <button onClick={this.updateList} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
  }

}
CharList.propTypes = {
  setActiveCard: PropTypes.func
}

export default CharList;