import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const AudioPlayer = (props) => {
    return (
        <div id={props.id} className="col-md-2 drum-pad">
            {props.letter}
            <audio id={props.letter} className="clip" src={props.item}
                type="audio/wav">
            </audio>
        </div>
    );
};
AudioPlayer.propTypes = {
    id: PropTypes.string.isRequired,
    letter: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validKeys: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'],
            keyError: '',
            errorStyle: {display: 'none'},
            display: '',
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        let keyPressed = (/[a-z]/.test(event.key)) ? event.key.toUpperCase() : event.key;
        if (this.state.validKeys.includes(keyPressed)) {
            let audioItem = document.getElementById(keyPressed);
            this.setState({display: audioItem.parentElement.id});
            audioItem.currentTime=0;
            let playPromise = audioItem.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Automatic playback started!
                }).catch((error) => {
                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                    console.log(`Ooops! ${error}`);
                });
            }
        } else {
            this.setState({display: ''});
            this.setState({keyError: event.key});
            this.setState({errorStyle: {display: 'block'}});
            setTimeout( () => {
                this.setState({errorStyle: {display: 'none'}});
            }, 3000);
        }
    }

    componentDidMount(){
        document.addEventListener("keypress", this.handleKeyPress, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keypress", this.handleKeyPress, false);
    }

    render() {
        const instructions = "For each item to the right, there is an associated drum sound. " +
            "To hear its sound, using your keyboard, press the letter shown. " +
            "You can use upper or lower case.";
        return (
            <div id="drum-machine" className="row">
                <div className="col-md-10 col-centered App" tabIndex="0">
                    <div className="row">
                        <div className="col-md-12">
                            <header className="App-header">
                                <h1 className="App-title">The Drum Machine</h1>
                            </header>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 container-left">
                            <p className="instructions">{instructions}</p>
                            <div id="error" style={this.state.errorStyle}>
                                Oops! I don't have a drum sound for {this.state.keyError}.
                                <br/>Please try again.</div>
                        </div>
                        <div className="col-md-6 container-right">
                            <div className="row">
                                <AudioPlayer id={"clap"} letter={"Q"}
                                    item={"./media/Clap.wav"}/>
                                <AudioPlayer id={"crash"} letter={"W"}
                                    item={"./media/Crash.wav"}/>
                                <AudioPlayer id={"hat"} letter={"E"}
                                    item={"./media/Hat.wav"}/>
                            </div>
                            <div className="row">
                                <AudioPlayer id={"kick"} letter={"A"}
                                    item={"./media/Kick.wav"}/>
                                <AudioPlayer id={"perc"} letter={"S"}
                                    item={"./media/Perc.wav"}/>
                                <AudioPlayer id={"revhat"} letter={"D"}
                                    item={"./media/RevHat.wav"}/>
                            </div>
                            <div className="row">
                                <AudioPlayer id={"scratch"} letter={"Z"}
                                    item={"./media/Scratch.wav"}/>
                                <AudioPlayer id={"snare"} letter={"X"}
                                    item={"./media/Snare.wav"}/>
                                <AudioPlayer id={"tom"} letter={"C"}
                                    item={"./media/Tom.wav"}/>
                            </div>
                            <div className="row">
                                <p>Clip played: <span id="display">{this.state.display}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
