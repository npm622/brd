import { connect } from 'react-redux';
import SalariesChart from '../components/SalariesChart';
import toJS from '../hocs/toJS';
import { getChartData } from '../store/salaries/selectors';

const mapStateToProps = (state, ownProps) => ({
  data: getChartData(state)
});

export default connect(mapStateToProps)(toJS(SalariesChart));
