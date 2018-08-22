import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { data } from "./data";

class App extends Component {
    constructor( props ) {
        super( props );
        this.state = this.getQuote();
        this.handleButton = this.handleButton.bind( this );
    }

    getQuote() {
        let ndx = Math.floor( Math.random() * data.length );
        let twitterURL = "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
            escape( data[ ndx ].quote ) + " - " +
            escape( data[ ndx ].author );
        return (
            {
                quote: data[ ndx ].quote,
                author: data[ ndx ].author,
                tweet: twitterURL
            }
        );
    }
    handleButton( event ) {
        this.setState( this.getQuote() );
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-2">&nbsp;</div>
                <div className="col-sm-8">
                    <div id="quote-box" className="App">
                        <header className="App-header">
                            <h1 className="">Random Quote Machine</h1>
                        </header>
                        <div className="row">
                            <div className="col-sm-3">&nbsp;</div>
                            <div className="col-sm-6 quote-container">
                                <div id="text">{this.state.quote}</div>
                            </div>
                            <div className="col-sm-3">&nbsp;</div>
                       </div>
                        <div id="author">-- {this.state.author}</div>
                        <a id="tweet-quote" className="btn btn-primary"
                           href={this.state.tweet}
                           target="_blank">Tweet this Quote</a>&nbsp;
                        <button id="new-quote" className="btn btn-warning"
                                onClick={this.handleButton}>Next Quote</button>
                    </div>
                </div>
                <div className="col-sm-2">&nbsp;</div>
            </div>
        );
    }
}

export default App;
