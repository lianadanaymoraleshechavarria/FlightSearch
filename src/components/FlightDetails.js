import React, { Component } from 'react';
import moment from 'moment';
import '../css/flights.css';
import FlightData from '../Data/flights-json'
import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { MdFlightTakeoff } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";

class FlightDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReturnTrip: false,
      bookingText: 'Reservar este vuelo'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.FlightData !== undefined) {
      if (nextProps.FlightData.returnTrip) {
        this.setState({ isReturnTrip: nextProps.FlightData.returnTrip });
      } else {
        this.setState({ isReturnTrip: nextProps.FlightData.returnTrip });
      }
    }
  }

  render() {
    if (this.props.FlightData !== undefined) {
      let flight = this.props.FlightData;
      flight.depart_time = moment(this.props.FlightData.depart_date).format("hh:mm A");
      flight.arrive_time = moment(this.props.FlightData.arrive_date).format("hh:mm A");
      flight.date = moment(this.props.FlightData.depart_date).format("D M YYYY");
      let returnTrip = {};
      if (this.state.isReturnTrip) {
        FlightData.map((allFlight) => {
          if ((flight.to_code === allFlight.from_code) && (flight.from_code === allFlight.to_code)
            && (moment(flight.endDate._d).format("D M YYYY") === moment(allFlight.arrive_date).format("D M YYYY"))) {
            returnTrip.depart_time = moment(allFlight.depart_date).format("hh:mm A");
            returnTrip.arrive_time = moment(allFlight.arrive_date).format("hh:mm A");
            returnTrip.number = allFlight.number;
            returnTrip.from_code = allFlight.from_code;
            returnTrip.to_code = allFlight.to_code;
            returnTrip.price = allFlight.price;
            returnTrip.date = moment(allFlight.depart_date).format("D M YYYY");
          }
          return null;
        });
      }

      return (
        <div>
          <div className="flight" ref="flightRef">
            <div className='contentCard'>
              <div className="flightsDetails">
                <div className="flightDeparture">
                  <h3><MdFlightTakeoff /> {this.props.FlightData.price}</h3>
                  <hr className="divider"></hr>
                  <p>{this.props.FlightData.number.toUpperCase()}</p>
                  <p>{this.props.FlightData.from_code} <AiOutlineArrowRight /> {this.props.FlightData.to_code}</p>
                  <p><BsCalendarDate /> <b>Fecha: </b>{flight.date}</p>
                  <p><BiTime /> <b>Salida: </b>{flight.depart_time}</p>
                  <p><BiTime /> <b>Regreso: </b>{flight.arrive_time}</p>
                </div>
              </div>
              <div className="flightLogo">
                <div className={`airline ${this.props.FlightData.airline_code}`}></div>
                <button
                  className="bookingButton"
                  onClick={() => this.setState({ bookingText: 'Reservado' })}>
                  {this.state.bookingText}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div></div>
      )
    }
  }
}

export default FlightDetails;