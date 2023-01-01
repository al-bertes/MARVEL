import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import MarvelService from "../../services/MarvelService";
import React from "react";

const test = new MarvelService();
test.getAllCharacters().then(res => console.log(res));


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null
        }
        this.selectRef = React.createRef();
    }
    setActiveCard = (id) => {
        this.setState({active: id});
    }
    
    render() {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList setActiveCard={this.setActiveCard}/>
                    <CharInfo charId={this.state.active}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    }
}

export default App;