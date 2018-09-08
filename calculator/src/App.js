import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: 0,
            displayHistory: '',
        };
        this.handleClickNumber = this.handleClickNumber.bind(this);
        this.handleClickClear = this.handleClickClear.bind(this);
    }
    handleClickNumber(e){
        e.preventDefault();
        let number = e.target.dataset.value;
        if (this.state.currentValue === 0) {
            this.setState({
                currentValue: '',
            }, () => this.recordNumber(number));
        } else {
            this.recordNumber(number);
        }
    }
    recordNumber(number) {
        this.setState({
            currentValue: this.state.currentValue + number,
            displayHistory: this.state.displayHistory + number,
        })
    }
    handleClickClear(e) {
        e.preventDefault();
        this.setState({
            currentValue: 0,
            displayHistory: '',
        })
    }
    render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">A FreeCodeCamp Project - React Calculator</h1>
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
                                    <button className="btn btn-warning btn-block">/</button>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={7}/>
                                </div>
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={8}/>
                                </div>
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={9}/>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-warning btn-block">x</button>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={4}/>
                                </div>
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={5}/>
                                </div>
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={6}/>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-warning btn-block">-</button>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={1}/>
                                </div>
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={2}/>
                                </div>
                                <div className="col-sm">
                                    <NumberButton handleClick={this.handleClickNumber} value={3}/>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-warning btn-block">+</button>
                                </div>
                            </div>
                            <div className="row row-container">
                                <div className="col-sm-6">
                                    <NumberButton handleClick={this.handleClickNumber} value={0}/>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-dark btn-block">.</button>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-warning btn-block">=</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}


class NumberButton extends Component {
    render() {
        return <button className="btn btn-dark btn-block"
            data-value={this.props.value}
            onClick={this.props.handleClick}>{this.props.value}</button>
    }
}
NumberButton.propTypes = {
    value: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};


class ClearButton extends Component {
    render() {
        return <button className="btn btn-danger btn-block"
            onClick={this.props.handleClick}>Clear</button>
    }
}
ClearButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default App;
