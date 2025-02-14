import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  createPieChart(column: string, labels: string[], counts: { [key: string]: number }) {
    d3.select(`#${column}-chart`).selectAll("*").remove();
    const width = 100;
    const height = 100;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(`#${column}-chart`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color: any = d3.scaleOrdinal(d3.schemeCategory10);
    const pie: any = d3.pie().value((d: any) => d.value);
    const arc: any = d3.arc().outerRadius(radius - 10).innerRadius(0);

    const data = labels.map(label => ({ label, value: counts[label] }));

    const pieData: any = pie(data);

    const arcs = svg.selectAll('.arc')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .style('fill', (d: any, i: number) => color(i));

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '8px')

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('text-align', 'center')
      .style('padding', '5px')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('z-index', '999')
      .style('border-radius', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    arcs.selectAll('path')
      .on('mouseover', function (event: any, d: any) {
        tooltip.style('display', 'block')
          .html(`Category: ${d.data.label}<br>Count: ${d.data.value}`);
      })
      .on('mousemove', function (event: any) {
        tooltip.style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 35) + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('display', 'none');
      });
  }

  createBarChart(column: string, labels: string[], counts: { [key: string]: number }) {
    d3.select(`#${column}-chart`).selectAll("*").remove();

    const width = 200;
    const height = 100;
    const margin = { top: 0, right: 5, bottom: 0, left: 5 };

    const svg: any = d3.select(`#${column}-chart`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(labels)
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.values(counts)) || 0])
      .nice()
      .range([height, 0]);

    svg.selectAll('.bar')
      .data(labels)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: string) => x(d))
      .attr('y', (d: string) => y(counts[d]))
      .attr('width', x.bandwidth())
      .attr('height', (d: string) => height - y(counts[d]))
      .on('mouseover', function (event: any, d: any) {
        tooltip.style('display', 'block')
          .html(`Category: ${d}<br>Count: ${counts[d]}`);
      })
      .on('mousemove', function (event: any) {
        tooltip.style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 35) + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('display', 'none');
      });

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('visibility', 'hidden');

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .style('visibility', 'hidden');

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('text-align', 'center')
      .style('padding', '5px')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('z-index', '999')
      .style('border-radius', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');
  }
}
