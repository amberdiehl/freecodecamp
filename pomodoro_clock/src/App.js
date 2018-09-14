import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';


const INITIAL_TIME_LEFT = '25:00';
const INITIAL_SESSION_LENGTH = '25';
const INITIAL_BREAK_LENGTH = '5';
const START_ICON = 'fas fa-play-circle';
const STOP_ICON = 'fas fa-stop-circle';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: INITIAL_TIME_LEFT,
            breakValue: INITIAL_BREAK_LENGTH,
            sessionValue: INITIAL_SESSION_LENGTH,
            isRunning: false,
            iconStartStop: START_ICON,
        };
        this.handleClickTimeWidget = this.handleClickTimeWidget.bind(this);
        this.handleClickStartStop = this.handleClickStartStop.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);
    }
    handleClickTimeWidget(type, button) {
        if (this.state.isRunning) {
            return false;
        }
        const widgetStateKey = `${type}Value`;
        let currentValue = parseInt(this.state[widgetStateKey]);
        let newValue = 0;
        newValue = (button === '+') ? currentValue + 1 : currentValue - 1;
        newValue = (newValue > 60) ? 60 : newValue;
        newValue = (newValue < 0) ? 0 : newValue;
        this.setState({
            [widgetStateKey]: newValue.toString(),
        });
        if (type === 'session') {
            this.setState({
                timeLeft: `${newValue}:00`,
            })
        }
    }
    handleClickStartStop() {
        if (this.state.isRunning) {
            this.setState({
                isRunning: false,
                iconStartStop: START_ICON,
            })
        } else {
            this.setState({
                isRunning: true,
                iconStartStop: STOP_ICON,
            })
        }
    }
    handleClickReset() {
        this.setState({
            timeLeft: INITIAL_TIME_LEFT,
            breakValue: INITIAL_BREAK_LENGTH,
            sessionValue: INITIAL_SESSION_LENGTH,
            isRunning: false,
            iconStartStop: START_ICON,
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className={"row"}>
                        <div className={"col-sm-5 col-centered"}>
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">
                                A FreeCodeCamp React Project - Pomodoro Clock
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-centered">
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Pomodoro Clock Setup</p>
                                    <div className={"row"}>
                                        <TimeWidget
                                            value={this.state.breakValue}
                                            widgetType={"break"}
                                            onClick={this.handleClickTimeWidget}
                                        />
                                        <TimeWidget
                                            value={this.state.sessionValue}
                                            widgetType={"session"}
                                            onClick={this.handleClickTimeWidget}
                                        />
                                    </div>
                                    <ControlWidget
                                        onClickStartStop={this.handleClickStartStop}
                                        icon={this.state.iconStartStop}
                                        onClickReset={this.handleClickReset}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="the-clock">
                                        <div className="clock-bottom">
                                            <div className="right-feet"/>
                                            <div className="left-feet"/>
                                        </div>
                                        <div className="clock-top">
                                            <div className="bell-top-right" />
                                            <div className="right-bell"/>
                                            <div className="bell-top-left"/>
                                            <div className="left-bell"/>
                                        </div>
                                        <div className="clock-middle">
                                            <div className="face">
                                                <div className="sparkle"/>
                                                <div id="time-left">{this.state.timeLeft}</div>
                                                <div id="timer-label" className="time-left">
                                                    session</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-centered">
                            <p>Designed and Coded by Amber Diehl</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class TimeWidget extends Component {
    render() {
        const widgetLabel = `${this.props.widgetType.charAt(0).toUpperCase() + 
            this.props.widgetType.substr(1)} Length`;
        const widgetLabelId = `${this.props.widgetType}-label`;
        const widgetLengthId = `${this.props.widgetType}-length`;
        const widgetButtonIncrementId = `${this.props.widgetType}-increment`;
        const widgetButtonDecrementId = `${this.props.widgetType}-decrement`;
        return (
            <div className={"col-sm-5 col-centered"}>
                <div className={"row"}>
                    <div id={widgetLabelId} className={"col-sm-12"}>{widgetLabel}</div>
                </div>
                <div className={"row"}>
                    <div className="col-sm-12">
                        <button id={widgetButtonIncrementId} className="btn btn-success btn-block"
                            onClick={() => {this.props.onClick(this.props.widgetType, '+')}}>
                            <i className="fas fa-chevron-circle-up" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div id={widgetLengthId} className="col-sm-12 length-value">
                        {this.props.value}</div>
                </div>
                <div className={"row"}>
                    <div className="col-sm-12">
                        <button id={widgetButtonDecrementId} className="btn btn-success btn-block"
                            onClick={() => {this.props.onClick(this.props.widgetType, '-')}}>
                            <i className="fas fa-chevron-circle-down" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
TimeWidget.propTypes = {
    value: PropTypes.string.isRequired,
    widgetType: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};


class ControlWidget extends Component {
    render() {
        return (
            <div className={"row"}>
                <div className={"col-md-12 control-wrapper"}>
                    <div className={"row"}>
                        <div className={"col-md-12 controls"}>Start, Stop, and Reset Controls</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <button id={"start_stop"} className="btn btn-success btn-block"
                                onClick={this.props.onClickStartStop}>
                                <i className={this.props.icon} aria-hidden="true"/>
                            </button>
                        </div>
                        <div className={"col-md-6"}>
                            <button id={"reset"} className="btn btn-warning btn-block"
                                onClick={this.props.onClickReset}>
                                <i className="fas fa-redo-alt" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ControlWidget.propTypes = {
    onClickStartStop: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    onClickReset: PropTypes.func.isRequired,
};

export default App;
