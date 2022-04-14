import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-input-range/lib/css/index.css';
import 'react-dates/lib/css/_datepicker.css';
import '../css/inputSearch.css';
import '../css/style.css';
import '../css/style.css';
import InputSearch from './inputSearch'
import InputDestination from './inputDestination'
import { FaSearch } from "react-icons/fa";
import { RiArrowLeftRightFill } from "react-icons/ri";

class Search extends Component {

  constructor(props) {
    super(props);
    this.inputSearchClickHandlerOrigin = this.inputSearchClickHandlerOrigin.bind(this);
    this.inputSearchClickHandlerDestination = this.inputSearchClickHandlerDestination.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

    this.state = {
      originCity: '',
      destinationCity: '',
      startDate: moment(),
      endDate: moment(),
      date: moment(),
      returnTrip: true,
      passengers: 1,
      price: {
        min: 500,
        max: 5000,
      }
    }
  }

  onSearchSubmit() {
    console.log(this.state);
    this.props.callback(this.state);
  }

  inputSearchClickHandlerOrigin(value) {
    this.setState({ originCity: value })
  }

  inputSearchClickHandlerDestination(value) {
    this.setState({ destinationCity: value })
  }

  tabSwitch(tab) {
    let returnTrip = (tab === 1) ? false : true;
    this.setState({ returnTrip });
  }

  incrementPassengers() {
    this.setState({
      passengers: this.state.passengers + 1
    });
  }

  decrementPassengers() {
    if (this.state.passengers > 0) {
      this.setState({
        passengers: this.state.passengers - 1
      });
    }
  }

  handleSearch(event) {
    console.log("tabs");
  }

  render() {
    return (
      <div className="banner">
        <div className="col">
          <div className="nav">
            <ul>
              <li><a href="">Vuelos</a></li>
              <li><a href="">Alojamientos</a></li>
              <li><a href="">Autos</a></li>
              <li><a href="">Rutas</a></li>
            </ul>
          </div>
          <div className="cloud"></div>
          <div className="formContent">
            <div className="titles">
              <h1>Busca en cientos de webs de vuelos a la vez.</h1>
              <h2>¡Te damos la bienvenida! Encuentra la mejor oferta para ti!</h2>
            </div>
            <div className="form">
              <div className="formWrap" onSubmit={() => this.handleSearch()}>
                <select className="select">
                  <option
                    value="1"
                    className={"tab" + (this.state.returnTrip ? '' : ' active')}
                    onClick={() => this.tabSwitch(1)}>
                    Solo Ida
                  </option>
                  <option
                    value="2"
                    className={"tab" + (this.state.returnTrip ? ' active' : '')}
                    onClick={() => this.tabSwitch(2)}>
                    Ida y vuelta
                  </option>
                  <option value="3">Multi-Destino</option>
                  <option value="4">Generador de viajes</option>
                </select>
                <select className="select">
                  <option value="1">Económica</option>
                  <option value="2">Económica Premium</option>
                  <option value="3">Negocios</option>
                  <option value="4">Primera</option>
                  <option value="5">Mixta</option>
                </select>
                <InputSearch id='is1' listName='apts' placeholder='hola' onClick={this.inputSearchClickHandlerOrigin} />
                <button type="submit" className="swap"><RiArrowLeftRightFill className="arrowIcon" /></button>
                <InputDestination id='is2' listName='apts' onClick={this.inputSearchClickHandlerDestination} />
                {this.state.returnTrip ||
                  <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date: moment(date) })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                  />
                }
                {this.state.returnTrip &&
                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate: moment(startDate), endDate: moment(endDate) })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                  />
                }
                <div className="box">
                  <button
                    type="button"
                    className="passengerCountButton"
                    onClick={() => this.decrementPassengers()}>
                    -
                  </button>
                  <span className="passengerCount">{this.state.passengers} Pasajeros</span>
                  <button
                    type="button"
                    className="passengerCountButton"
                    onClick={() => this.incrementPassengers()}>
                    +
                  </button>
                </div>
                <button className="search" type="submit" onClick={this.onSearchSubmit}><FaSearch /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;