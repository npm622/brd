import React from 'react';
import BarChart from './charts/BarChart';

const SalariesChart = (props) => (
  <div style={{width: '100%', height: '100%'}}>
    <BarChart xLabel='Salaries' yLabel='Occurrences' {...props} />
  </div>
)

export default SalariesChart;
