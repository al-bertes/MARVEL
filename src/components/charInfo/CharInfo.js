import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import React from 'react';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../randomChar/Spinner';
import PropTypes from 'prop-types';

class CharInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charData: { 
              name: null,
              thumbnail: null,
              homepage: null,
              wiki: null,
              description: null,
              comics: null
            },
           processState: 'waiting'
        }
    }
    marverlServer = new MarvelService();

    componentDidMount () {
        this.updateInfo();
    }
    componentDidUpdate (prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateInfo()
        }
    }
    

    onLoadedInfoCard = (data) => {
        this.setState({charData: data, processState: 'fullfiled'})
    };

    updateInfo = () => {
        if (!this.props.charId) {
            return;
        }
        this.setState({processState: 'loading'})
        this.marverlServer.getCharacter(this.props.charId)
                          .then(this.onLoadedInfoCard)
                          .catch(this.setState({processState: 'error'}))

    }

    renderCardInfo = ({ name, description, thumbnail, homepage, wiki, comics }) => {

        const listComics = comics.map((item, i) => {
            if (i > 9) {
                // eslint-disable-next-line array-callback-return
                return;
            }
            return (
                <a key={i} href={item.resourceURI}>
                    <li key={i} className="char__comics-item" >
                    {item.name}
                 </li>
                </a>
                )
            })
            const styleForDisableImg = (thumbnail.endsWith('image_not_available.jpg')) ? 'contain': 'cover';
    
            const styleImg = {
                objectFit: styleForDisableImg
            }
        return (
            <> 
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={styleImg}/>
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
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            
                {(comics.length > 0) ? <ul className="char__comics-list">
                  {listComics}  
                </ul> : 'There is no comics with this character'}
            </>
        )
    }
    renderInfo = (processState, char) => {
        switch(processState) {
            case('waiting'):
                return <Skeleton/>;
            case('fullfiled'):
                return this.renderCardInfo(char);
            case('error'):
                return <Spinner/>
            default:
                return null;
        }
    }
    render() {
        const { processState, charData } = this.state;
        return (
            <div className="char__info">
                {this.renderInfo(processState, charData)}
            </div>
        )
    }
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;