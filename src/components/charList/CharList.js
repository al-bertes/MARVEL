import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import React from 'react';
import MarvelService from '../../services/MarvelService';

class CharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        charList: [],
        processState: 'filling'  // filling, error, fulfilled
    }
  }
  marverlServer = new MarvelService();

  componentDidMount () {
    this.updateList();
  } 
  onLoadedList = (response) => {
    this.setState({charList: response})
    console.log(this.state)
  }
  updateList = () => {
    this.marverlServer.getAllCharacters().then(this.onLoadedList);
  }
  renderList = ({charList}) => {
    return charList.map(({thumbnail, id, name}) => {
        const styleForDisableImg = (thumbnail.endsWith('image_not_available.jpg')) ? 'contain': 'cover';
    
        const styleImg = {
            objectFit: styleForDisableImg
        }
        return (
            <li key={id} className="char__item">
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
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
  }

}

export default CharList;