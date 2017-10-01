import React, { Component } from 'react';
import withMeasure from '../hocs/withMeasure';
// import QualifyingOffer from './QualifyingOffer';
import SalariesChart from '../containers/SalariesChart';
// import MissingSalaryList from './MissingSalaryList';
import './Dashboard.css';

const dimensions = ['width', 'height']
const MeasuredSalariesChart = withMeasure(dimensions)(SalariesChart);

class Dashboard extends Component {

  componentDidMount() {
    this.props.fetchSalaries();
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard-missing">
        </div>
        <div className="Dashboard-salaries">
          <MeasuredSalariesChart />
        </div>
      </div>
    );
  }
};

// DraftBoard.defaultProps = {
//   league: { teams: [], draftConfig: { selectionOrder: [] }, rosterSlots: [], draftBoard: { selections: [] } }
// }
//
// DraftBoard.propTypes = {
//   league: PropTypes.object,
//   players: PropTypes.array.isRequired
// };

export default Dashboard;
