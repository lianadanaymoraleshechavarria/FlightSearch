import React, { Component } from 'react';
import '../css/destinations.css';

class Destinations extends Component {

    render() {
        return (
            <div className="popularDestination">
                <div className="contentTitle">
                    <h1>Destinos Populares</h1>
                    <p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day.</p>
                </div>
                <div className="row">
                    <div className="d1">
                        <div className="contetnButton">
                            <a className="btn">$150</a>
                            <h4>Mountain River</h4>
                            <p>Paraguay</p>
                        </div>
                    </div>
                    <div className="d2">
                        <div className="contetnButton">
                            <a className="btn">$250</a>
                            <h4>Dream City</h4>
                            <p>Paris</p>
                        </div>
                    </div>
                    <div className="d3">
                        <div className="contetnButton">
                            <a className="btn">$350</a>
                            <h4>Cloud Mountain</h4>
                            <p>Sri Lanka</p>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default Destinations;