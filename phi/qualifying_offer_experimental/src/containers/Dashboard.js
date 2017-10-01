import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchAll as fetchSalaries } from '../store/salaries/actions';
import toJS from '../hocs/toJS'

const mapStateToProps = (state, ownProps) => ({
  qualifyingOfferThreshold: 125 // TODO: make this part of state...
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSalaries() {
    dispatch(fetchSalaries);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Dashboard));
