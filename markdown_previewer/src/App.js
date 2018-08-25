import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class InputTextArea extends React.Component {
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

    componentDidMount() {
        let defaultState = "# I am a H1 heading\n" +
            "## I am a H2 heading\n" +
            "[I am an inline-style link](https://www.google.com)\n" +
            "Inline `code` has a `single back-tick` that surrounds it\n" +
            "```javascript\nlet sillyMessage = 'Hello World!';\nalert(sillyMessage);\n```\n" +
            ">I am a block quote that spans over\n" +
            ">more than one line.\n" +
            "![alt text](https://github.com/adam-p/markdown-here/raw/master/" +
            "src/common/images/icon48.png \"Logo Title Text 1\")\n" +
            "**And I am some bold text!**\n" +
            "1. I am an ordered list item\n" +
            "1. I am another orderd list item\n\n" +
            "And last, but not least:\n" +
            "* I am an unordered list item";
        this.setState({
            inputValue: defaultState,
        }, this.updatePreview);
        document.getElementById('editor').value = defaultState;
    }

    updatePreview() {
        document.getElementById('preview').innerHTML =
            window.marked(this.state.inputValue, {breaks:true});
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
