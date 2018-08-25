import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class InputTextArea extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <textarea id="editor"
                onChange={this.props.handleChange}
                onKeyPress={this.props.handleKeyPress}> </textarea>
        );
    }
}
InputTextArea.propTypes = {
    handleChange: PropTypes.func,
    handleKeyPress: PropTypes.func,
};

class MarkdownPreview extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="preview"></div>
        );
    }
}

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleKeyPress(event) {
        if(event.key === 'Enter') {
            let newValue = '  ';
            this.setState({
                inputValue: newValue,
            }, this.updatePreview);
        }
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value,
        }, this.updatePreview);
    }

    updatePreview() {
        console.log(`updatePreview: ${this.state.inputValue}.`);
        document.getElementById('preview').innerHTML = window.marked(this.state.inputValue);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-1">&nbsp;</div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-12 App">
                            <header className="App-header">
                                <h1 className="App-title">Markdown Previewer</h1>
                            </header>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 main-section-left">
                            <InputTextArea
                                inputValue={this.state.inputValue}
                                handleChange={this.handleChange}
                                handleKeyPress={this.handleKeyPress} />
                        </div>
                        <div className="col-md-6 main-section-right">
                            <MarkdownPreview />
                        </div>
                    </div>
                </div>
                <div className="col-md-1">&nbsp;</div>
            </div>
        );
    }
}

export default App;
