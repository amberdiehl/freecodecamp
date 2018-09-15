import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';


const INITIAL_SESSION_LENGTH = '25';
const INITIAL_SESSION_COUNT = 1;
const SESSION = 'session';
const INITIAL_BREAK_LENGTH = '5';
const INITIAL_BREAK_COUNT = 1;
const BREAK = 'break';
const INITIAL_TIME_LEFT = '25:00';
const INITIAL_TIME_TYPE = SESSION;
const START_ICON = 'fas fa-play-circle';
const START_BUTTON_STYLE = 'btn btn-success btn-block';
const STOP_ICON = 'fas fa-stop-circle';
const STOP_BUTTON_STYLE = 'btn btn-danger btn-block';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: INITIAL_TIME_LEFT,
            timeType: INITIAL_TIME_TYPE,
            sessionValue: INITIAL_SESSION_LENGTH,
            breakValue: INITIAL_BREAK_LENGTH,
            sessionCount: INITIAL_SESSION_COUNT,
            breakCount: INITIAL_BREAK_COUNT,
            iconStartStop: START_ICON,
            styleStartStop: START_BUTTON_STYLE,
            isRunning: false,
            timer: null,
        };
        this.audioItem = React.createRef();
        this.handleClickTimeWidget = this.handleClickTimeWidget.bind(this);
        this.handleClickStartStop = this.handleClickStartStop.bind(this);
        this.evaluateTimeLeft = this.evaluateTimeLeft.bind(this);
        this.changeTimeLeft = this.changeTimeLeft.bind(this);
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
        newValue = (newValue < 1) ? 1 : newValue;
        this.setState({
            [widgetStateKey]: newValue.toString(),
        });
        if (type === 'session') {
            this.setState({
                timeLeft: `${this.formatTimePart(newValue)}:00`,
            })
        }
    }
    handleClickStartStop() {
        if (this.state.isRunning) {
            clearInterval(this.state.timer);
            this.setState({
                isRunning: false,
                iconStartStop: START_ICON,
                styleStartStop: START_BUTTON_STYLE,
            });
        } else {
            this.setState({
                isRunning: true,
                iconStartStop: STOP_ICON,
                styleStartStop: STOP_BUTTON_STYLE,
                timer: setInterval(this.evaluateTimeLeft, 1000),
            });
        }
    }
    evaluateTimeLeft() {
        let switchTo, valueKey, countKey, newCount;
        const node = this.audioItem.current;
        if (this.state.timeLeft === '00:00') {
            node.currentTime=0;
            node.play();
            if ((this.state.sessionCount === 0) && (this.state.breakCount === 0 )) {
                clearInterval(this.state.timer);
            } else {
                switchTo = (this.state.timeType === SESSION) ? BREAK : SESSION;
                valueKey = `${switchTo}Value`;
                countKey = `${this.state.timeType}Count`;
                newCount = this.state[countKey] - 1;
                this.setState({
                    timeLeft: `${this.formatTimePart(this.state[valueKey])}:00`,
                    timeType: switchTo,
                    [countKey]: newCount,
                })
            }
        } else {
            this.changeTimeLeft();
        }
    }
    changeTimeLeft() {
        let minutes = parseInt(this.state.timeLeft.split(':')[0]);
        let seconds = parseInt(this.state.timeLeft.split(':')[1]);
        seconds -= 1;
        if (seconds < 0) {
            seconds = 59;
            minutes -= 1;
        }
        if (minutes < 0) {
            seconds = 0;
            minutes = 0;
        }
        this.setState({
            timeLeft: `${this.formatTimePart(minutes)}:${this.formatTimePart(seconds)}`,
        })
    }
    formatTimePart(timePart) {
        return (timePart < 10) ? `0${timePart}` : timePart;
    }
    handleClickReset() {
        const node = this.audioItem.current;
        node.pause();
        node.currentTime=0;
        clearInterval(this.state.timer);
        this.setState({
            timeLeft: INITIAL_TIME_LEFT,
            timeType: INITIAL_TIME_TYPE,
            sessionValue: INITIAL_SESSION_LENGTH,
            sessionCount: INITIAL_SESSION_COUNT,
            breakValue: INITIAL_BREAK_LENGTH,
            breakCount: INITIAL_BREAK_COUNT,
            iconStartStop: START_ICON,
            styleStartStop: START_BUTTON_STYLE,
            isRunning: false,
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
                                <div className="col-md-6 left-side">
                                    <p className={"setup-title"}>Pomodoro Clock Setup</p>
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
                                        styleStartStop={this.state.styleStartStop}
                                        onClickReset={this.handleClickReset}/>
                                    <audio id="beep" ref={this.audioItem}
                                        src="./media/Cuckoo.mp3" type="audio/mp3"/>
                                </div>
                                <div className="col-md-6 right-side">
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
                                                    {this.state.timeType}</div>
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
                    <div id={widgetLabelId} className={"col-sm-12 widget-label"}>
                        {widgetLabel}</div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-12 widget-wrapper"}>
                        <div className={"row"}>
                            <div className="col-sm-12">
                                <button id={widgetButtonIncrementId}
                                    className="btn btn-success btn-block widget-button-top"
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
                                <button id={widgetButtonDecrementId}
                                    className="btn btn-success btn-block widget-button-bottom"
                                    onClick={() => {this.props.onClick(this.props.widgetType, '-')}}>
                                    <i className="fas fa-chevron-circle-down" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
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
                        <div className={"col-md-12 controls-title"}>
                            Start/Stop, and Reset Controls</div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <button id={"start_stop"} className={this.props.styleStartStop}
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
    styleStartStop: PropTypes.string.isRequired,
    onClickReset: PropTypes.func.isRequired,
};

export default App;
