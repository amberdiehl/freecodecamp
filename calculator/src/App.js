import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';


const OPERANDS = ['+', '-', 'x', '/'];
const CURRENT_VALUE_INITIAL = '0';
const DISPLAY_HISTORY_INITIAL = '';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: CURRENT_VALUE_INITIAL,
            displayHistory: DISPLAY_HISTORY_INITIAL,
        };
        this.handleClickClear = this.handleClickClear.bind(this);
        this.handleClickOperative = this.handleClickOperative.bind(this);
        this.handleClickEquals = this.handleClickEquals.bind(this);
        this.handleClickDecimal = this.handleClickDecimal.bind(this);
        this.handleClickNumber = this.handleClickNumber.bind(this);
    }
    handleClickClear(e) {
        e.preventDefault();
        this.setState({
            currentValue: CURRENT_VALUE_INITIAL,
            displayHistory: DISPLAY_HISTORY_INITIAL,
        })
    }
    handleClickOperative(e){
        e.preventDefault();
        let operative = e.target.dataset.value;
        let lastValue = this.state.currentValue.toString().slice(-1);
        if (lastValue === '.') {
            return false;
        }
        this.recordItem(operative, 'operand');
    }
    handleClickEquals(e){
        e.preventDefault();
        let numbers = this.state.displayHistory.split(/[\+\-x/]+/);
        let instructions = this.state.displayHistory.replace(/[0-9\.]/g, '');
        let total = parseFloat(numbers[0]);
        for (let i = 0; i < instructions.length; i++) {
            switch (instructions.charAt(i)){
                case '+':
                    total = total + parseFloat(numbers[i+1]);
                    break;
                case '-':
                    total = total - parseFloat(numbers[i+1]);
                    break;
                case 'x':
                    total = total * parseFloat(numbers[i+1]);
                    break;
                case '/':
                    total = total / parseFloat(numbers[i+1]);
                    break;
                default:
                    total = total + 0;
            }
        }
        let evaluatedTotal = Number.isInteger(total) ? total : total.toFixed(7).replace(/0+$/, '');
        this.recordItem(evaluatedTotal.toString(), 'equals');
    }
    handleClickDecimal(e){
        e.preventDefault();
        const regexDecimals = RegExp(/\./g);
        if (regexDecimals.test(this.state.currentValue)) {
            return false;
        }
        this.recordItem(e.target.dataset.value, 'decimal');
    }
    handleClickNumber(e){
        e.preventDefault();
        let number = e.target.dataset.value;
        let value = this.state.currentValue;
        // Don't allow zeroes to be added to zero state
        if ((value === '0') && (number === '0')) {
            return false;
        }
        // Reset current value when zero or operand provided before adding new value
        if ((value === '0') || OPERANDS.includes(this.state.currentValue)) {
            this.setState({
                currentValue: '',
            }, () => this.recordItem(number, 'number'));
        } else {
            this.recordItem(number, 'number');
        }
    }
    recordItem(item, type) {
        let value = this.state.currentValue;
        let history = this.state.displayHistory;
        let lastValue = history.slice(-1);
        switch(type) {
            case 'number': {
                this.setState({
                    currentValue: value + item,
                    displayHistory: history + item,
                });
                break;
            }
            case 'operand': {
                // Replaces last operand, if found
                let eHistory = (OPERANDS.includes(lastValue)) ?
                    history.substr(0, history.length - 1) : history;
                this.setState({
                    currentValue: item,
                    displayHistory: eHistory + item,
                });
                break;
            }
            case 'decimal': {
                // Removes operand from current value, if found
                let eValue = (OPERANDS.includes(lastValue)) ? '' : value;
                this.setState({
                    currentValue: eValue + item,
                    displayHistory: history + item,
                });
                break;
            }
            case 'equals': {
                this.setState({
                    currentValue: item,
                    displayHistory: item,
                });
                break;
            }
            default: {
                this.setState({
                    currentValue: 'ERROR',
                    displayHistory: '',
                });
                break;
            }
        }
    }
    render() {
        let numberClasses = "btn btn-dark btn-block";
        let operativeClasses = "btn btn-warning btn-block";
        const projectTitle = 'A FreeCodeCamp React Project - "Little Pink Calculator"';
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">{projectTitle}</h1>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-centered">
                        <div className="calculator-container">
                            <div className="row">
                                <div id="display-history"
                                    className="col-sm-11 display col-centered">
                                    {this.state.displayHistory}
                                </div>
                            </div>
                            <div className="row">
                                <div id="display" className="col-sm-11 display col-centered">
                                    {this.state.currentValue}
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm-9">
                                    <ClearButton handleClick={this.handleClickClear}/>
                                </div>
                                <div className="col-sm-3">
                                    <GenericButton id={"divide"}
                                        handleClick={this.handleClickOperative}
                                        classes={operativeClasses} value={"/"}/>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm">
                                    <GenericButton id={"seven"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"7"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"eight"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"8"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"nine"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"9"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"multiply"}
                                        handleClick={this.handleClickOperative}
                                        classes={operativeClasses} value={"x"}/>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm">
                                    <GenericButton id={"four"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"4"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"five"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"5"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"six"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"6"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"subtract"}
                                        handleClick={this.handleClickOperative}
                                        classes={operativeClasses} value={"-"}/>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm">
                                    <GenericButton id={"one"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"1"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"two"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"2"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"three"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"3"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"add"}
                                        handleClick={this.handleClickOperative}
                                        classes={operativeClasses} value={"+"}/>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm-6">
                                    <GenericButton id={"zero"} handleClick={this.handleClickNumber}
                                        classes={numberClasses} value={"0"}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"decimal"}
                                        handleClick={this.handleClickDecimal}
                                        classes={numberClasses} value={"."}/>
                                </div>
                                <div className="col-sm">
                                    <GenericButton id={"equals"}
                                        handleClick={this.handleClickEquals}
                                        classes={operativeClasses} value={"="}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-container">
                    <div className="col-md-4 col-centered">
                        Designed and Coded by Amber Diehl
                    </div>
                </div>
            </div>
        </div>;
    }
}


class GenericButton extends Component {
    render() {
        return <button className={this.props.classes}
            id={this.props.id}
            data-value={this.props.value}
            onClick={this.props.handleClick}>{this.props.value}</button>
    }
}
GenericButton.propTypes = {
    value: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
};


class ClearButton extends Component {
    render() {
        return <button id="clear" className="btn btn-danger btn-block"
            onClick={this.props.handleClick}>CLEAR ALL</button>
    }
}
ClearButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default App;
