import React, { Component } from 'react';
import moment from 'moment';
import '../css/flights.css';
import FlightDetails from './FlightDetails';
import FlightData from '../Data/flights-json'
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";

class FlightsResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReturnTrip: true,
      flights: FlightData,
      searchData: '',
      returnFlight: ''
    };
    this.checkFlightAvailability = this.checkFlightAvailability.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchData: nextProps.data });
  }

  checkFlightAvailability(flight) {
    let result = this.state.searchData;

    if ((result.originCity === flight.from_code) && (result.destinationCity === flight.to_code) && ((result.price.min <= flight.price) && (flight.price <= result.price.max))) {
      if (result.returnTrip) {
        if ((moment(result.startDate._d).format("D M YYYY") === moment(flight.arrive_date).format("D M YYYY"))) {
          flight.returnTrip = true;
          flight.endDate = result.endDate;
          return flight
        }
      }

      else {
        if ((moment(result.date._d).format("D M YYYY") === moment(flight.arrive_date).format("D M YYYY"))) {
          flight.returnTrip = false;
          return flight
        }
      }
    }
  }

  render() {
    var flightsAvailable;
    if (this.state.searchData === '') {
      flightsAvailable = this.state.flights.map((flight) => {
        return <FlightDetails FlightData={flight}></FlightDetails>
      });
    }
    else {
      flightsAvailable = this.state.flights.map((flight) => {
        return <FlightDetails FlightData={this.checkFlightAvailability(flight)}></FlightDetails>
      });
    }

    debugger;
    let flightDetails = this.state.searchData;
    if (flightDetails) {
      flightDetails = {
        depart_day: moment(flightDetails.startDate).format("Do MMM YYYY"),
        return_day: moment(flightDetails.endDate).format("Do MMM YYYY"),
        date: moment(flightDetails.date).format("Do MMM YYYY")
      };
    }

    return (
      <div className="flights">
        <div><h1 className="titleResult">Vuelos Disponibles</h1></div>
        <div className="contentWrapper">
          {this.state.searchData &&
            <div>
              <span>{this.state.searchData.originCity}<AiOutlineArrowRight /></span>
              <span> {this.state.searchData.destinationCity} </span>
              {
                this.state.searchData.returnTrip &&
                <span> <AiOutlineArrowRight /> {this.state.searchData.originCity} </span>
              }
            </div>
          }
          {this.state.searchData &&
            <div className="flight">
              <h3>Fecha: {flightDetails.date}</h3>
              <hr className="divider"></hr>
              <p>{this.state.searchData.originCity}<AiOutlineArrowRight />
                {this.state.searchData.destinationCity}</p>
              {
                this.state.searchData.returnTrip &&
                <p> <AiOutlineArrowRight /> {this.state.searchData.originCity} </p>
              }
              {
                this.state.searchData.returnTrip &&
                <div>
                  <p><BsCalendarDate /> <b>Salida:</b> {flightDetails.depart_day} </p>
                  <p><BsCalendarDate /> <b>Regreso:</b> {flightDetails.return_day} </p>
                </div>
              }
            </div>
          }
          {flightsAvailable}
        </div>
      </div >
    );
  }
}

export default FlightsResult;