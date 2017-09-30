import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withFauxDOM} from 'react-faux-dom';
// import { format } from 'd3-format';
// import { scaleLinear } from 'd3-scale';
// import { max, min } from 'd3-array';
// import { select } from 'd3-selection';
const d3 = {
  ...require('d3-shape'),
  ...require('d3-array'),
  ...require('d3-scale'),
  ...require('d3-axis'),
  ...require('d3-selection'),
  ...require('d3-transition')
};

class FrequencyChart extends Component {

  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  render() {
    return (
      <div>
        <h2>I'm supposed to be a frequency chart!</h2>
        <svg ref={node => this.node = node} width={960} height={500}></svg>
      </div>
    );
  }

  createChart() {
    const node = this.node

    const m = {top: 50, right: 50, bottom: 50, left: 50};
    const h = 500 - m.top - m.bottom;
    const w = 960 - m.left - m.right;
    const numBins = 50;

    const data = this.props.dataset
        .map(playerSalary => playerSalary.salary);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, w]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([h, 0]);

    const xAxis = d3.axisBottom()
        .scale(x);

    const yAxis = d3.axisLeft()
        .scale(y);

    d3.select(node)
        .append('g')
        .attr('transform', 'translate(' + m.left + ',' + m.top + ')');

    d3.select(node)
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', function(d) { return 'translate(' + x(d.x) + ',' + y(d.y) + ')'; });

    d3.select(node)
        .append('rect')
        .attr('x', 1)
        .attr('width', w/numBins/1.3)
        .attr('height', function(d) { return h - y(d.y); });

    d3.select(node)
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis);

    d3.select(node)
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Count (Histogram)');

    d3.select(node)
  }
}

export default FrequencyChart;
