import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FrequencyChart from '../components/FrequencyChart'
import { connect } from 'react-redux';
import * as salariesActions from '../store/salaries/actions';
import * as salariesSelectors from '../store/salaries/reducer';

import './SalariesScreen.css';

class SalariesScreen extends Component {

  componentDidMount() {
    this.props.dispatch(salariesActions.fetchPlayerSalaries());
  }

  render() {
    return (
      <div className="SalariesScreen">
        <FrequencyChart
          dataset={this.props.playerSalaries} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playerSalaries: salariesSelectors.getPlayerSalaries(state),
    salaryBuckets: salariesSelectors.getSalaryBuckets(state),
    unavailableSalaries: salariesSelectors.getUnavailableSalaries(state)
  };
}

export default connect(mapStateToProps)(SalariesScreen);
