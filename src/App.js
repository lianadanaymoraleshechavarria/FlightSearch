import React, { Component } from 'react';

import Search from './components/Search';
import FlightResult from './components/FlightsResult';
import Destinations from './components/Destinations';
 
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:""
    }
  }

  formChildSearch(params) {
  this.setState({
    data : params
  })
}
  render() {
    return (
      <div>
        <Search callback={this.formChildSearch.bind(this)}/>
        <FlightResult data={this.state.data}/>
        <Destinations />
      </div>
    );
  }
}

export default App;
