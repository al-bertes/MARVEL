import React from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from './Spinner';
import Error from '../error/error';
class RandomChar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      char:  {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null
      },
      processState: 'loading'
    }
  }
  marverlServer = new MarvelService();

  onCharacterLoaded = (data) => {
    this.setState({char: data, processState: 'loaded'});
  }
  onError = () => {
    this.setState({processState: 'error'})
  }
  updataChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.setState({processState: 'loading'})
    this.marverlServer.getCharacter(id).then(response => this.onCharacterLoaded(response)).catch(this.onError )
  }
  componentDidMount () {
    this.updataChar();
    
    // this.timerID = setInterval(this.updataChar, 4000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  renderCharCards = ( { name, description, thumbnail, homepage, wiki}) => {
    const styleForDisableImg = (thumbnail.endsWith('image_not_available.jpg')) ? 'contain': 'cover';
    
   const styleImg = {
    objectFit: styleForDisableImg
   }
    return (
        <div className="randomchar__block">
           <img src={thumbnail}  alt="Random character" className="randomchar__img" style={styleImg}/>
         
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
        )
  }
  renderChar = ({ processState, char}) => {
    switch(processState) {
        case 'loaded':
            return this.renderCharCards(char);
        case 'error':
            return <Error/>
        case 'loading':
            return <Spinner/>
        default:
            return <Spinner/>
            }
  }
  render() {
    
    return (
      <div className="randomchar">
        {this.renderChar(this.state)}
        
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main" onClick={this.updataChar} disabled={(this.state.processState === 'loading') ? true  : false}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
      
    )
  }
}

export default RandomChar;