import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart | undefined;
  selectedData: string = 'data1'; // Property to track the selected button
  selectedChartType: string = 'proportion'; // Property to track the selected chart type
  title:string = 'Hygiene LL'

  constructor() { }

  ngOnInit(): void {
    this.createChart();
    this.loadData1(); // Load initial data
    this.title = 'Hygiene LL';
  }

  ngOnDestroy(): void {
    if (this.chart!) {
      this.chart!.dispose();
    }
  }

  createChart(): void {
    // Disable AmCharts logo
    am4core.options.autoDispose = true;
    am4core.options.commercialLicense = true;

    // Themes
    am4core.useTheme(am4themes_animated);

    this.chart! = am4core.create('chartdiv', am4charts.XYChart);

    if (this.selectedChartType === 'mean') {
      // this.loadData();
    } else if (this.selectedChartType === 'proportion'){
      this.createProportionChart();
    } else if (this.selectedChartType ==='combination'){
      if(this.selectedData=='data1'){
        const data = [
          { x: "Tx1", y: 1.1, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 1.1, error: 0.1,error2:0.2, asterisks: 0 },
          { x: "Tx3", y: 1, error: 0.2,error2:0.1, asterisks: 0 },
          { x: "Tx4", y: 1, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx5", y: 1.1, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx6", y: 1, error: 0.2,error2:0.1, asterisks: 0 },
          { x: "Tx7", y: 1, error: 0.2,error2:0.1, asterisks: 0 },
          { x: "Tx8", y: 0.9, error: 0.2,error2:0.3, asterisks: 0 }
      ];
        this.createCombinedProportionChart(data);
      } else if(this.selectedData=='data2'){
        const data = [
          { x: "Tx1", y: 1.1, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 0.9, error: 0.1,error2:0.2, asterisks: 3 },
          { x: "Tx3", y: 0.8, error: 0.1,error2:0.1, asterisks: 3 },
          { x: "Tx4", y: 0.8, error: 0.1,error2:0.1, asterisks: 3 },
          { x: "Tx5", y: 0.8, error: 0.2,error2:0.1, asterisks: 1 },
          { x: "Tx6", y: 0.8, error: 0.1,error2:0.2, asterisks: 2 },
          { x: "Tx7", y: 0.9, error: 0.2,error2:0.2, asterisks: 0 },
          { x: "Tx8", y: 0.7, error: 0.3,error2:0.2, asterisks: 0 }
      ];
        this.createCombinedProportionChart(data);
      } else if(this.selectedData=='data3'){
        const data = [
          { x: "Tx1", y: 1.6, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 1.4, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx3", y: 1.4, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx4", y: 1.3, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx5", y: 1.4, error: 0.1,error2:0.2, asterisks: 0 },
          { x: "Tx6", y: 1.3, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx7", y: 1.3, error: 0.2,error2:0.1, asterisks: 0 },
          { x: "Tx8", y: 1.2, error: 0.2,error2:0.3, asterisks: 0 }
      ];
        this.createCombinedProportionChart(data);
      } else if(this.selectedData=='data4'){
        const data = [
          { x: "Tx1", y: 1.8, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 1.6, error: 0.1,error2:0.2, asterisks: 1 },
          { x: "Tx3", y: 1.6, error: 0.1,error2:0.1, asterisks: 3 },
          { x: "Tx4", y: 1.6, error: 0.1,error2:0.2, asterisks: 3 },
          { x: "Tx5", y: 1.5, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx6", y: 1.5, error: 0.1,error2:0.2, asterisks: 2 },
          { x: "Tx7", y: 1.5, error: 0.1,error2:0.2, asterisks: 0 },
          { x: "Tx8", y: 1.3, error: 0.2,error2:0.3, asterisks: 0 }
      ];
        this.createCombinedProportionChart(data);
      }
      
    }
  }

  createProportionChart(): void {
    d3.select("#chartdivnew svg").remove();
    
    // Create axes
    let categoryAxis = this.chart!.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;

    // Set renderer minGridDistance to 1 to ensure all categories are visible
    categoryAxis.renderer.minGridDistance = 1;

    let valueAxis = this.chart!.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.renderer.labels.template.adapter.add("text", (text) => {
        return text + "%";
    });

    // Add a two-line y-axis label with bold "Disability"
    valueAxis.title.text = "\u2003\u2003\u2003\u2003[bold]DAS[/]\nProportion( % of Total)";
    valueAxis.title.align = "center";
    valueAxis.title.fontSize = 14; // Adjust font size as needed

    // Create series
    let series1 = this.chart!.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "category";
    series1.name = "None to Mild \n Disability";
    series1.stacked = true;
    series1.columns.template.fill = am4core.color("rgb(33, 192, 158)");
    series1.columns.template.stroke = am4core.color("rgb(33, 192, 158)");
    series1.columns.template.width = am4core.percent(55); // Adjust the value as needed

    let series2 = this.chart!.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "category";
    series2.name = "Moderate to Severe\n Disability";
    series2.stacked = true;
    series2.columns.template.fill = am4core.color("rgb(254,123,0)");
    series2.columns.template.stroke = am4core.color("rgb(254,123,0)");
    series2.columns.template.width = am4core.percent(55); // Adjust the value as needed

    // Add tooltips for amCharts
    series1.columns.template.tooltipText = "None to Mild Disability: {valueY}%";
    series2.columns.template.tooltipText = "Moderate or Severe Disability: {valueY}%";

    const customNValues = ["n=275", "n=242", "n=212", "n=183","n=147","n=108","n=78","n=27"];

// Add "n" values to the category labels on x-axis
categoryAxis.renderer.labels.template.adapter.add("text", function(text, target) {
    const dataIndex = target.dataItem.index;
    const customNValue = customNValues[dataIndex];
    return text + "\n" + customNValue;
});

    this.chart!.legend = new am4charts.Legend();
    this.chart!.legend.position = "right";
    this.chart!.legend.valign = "top";
}






  createCombinedProportionChart(data: any[]): void {
    // Create axes for amCharts
    let categoryAxis = this.chart!.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 1; // Ensure all categories are visible

    let valueAxis = this.chart!.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.renderer.labels.template.adapter.add("text", (text) => {
        return text + "%";
    });

    // Add a two-line y-axis label with bold "Disability"
    valueAxis.title.text = "\u2003\u2003\u2003\u2003[bold]DAS[/]\nProportion( % of Total)";
    valueAxis.title.align = "center";
    valueAxis.title.fontSize = 14; // Adjust font size as needed
    // Create series for amCharts
    let series1 = this.chart!.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "category";
    series1.name = "None to Mild \n Disability";
    series1.stacked = true;
    series1.columns.template.fill = am4core.color("rgb(33, 192, 158)");
    series1.columns.template.stroke = am4core.color("rgb(33, 192, 158)");
    series1.columns.template.width = am4core.percent(55); // Adjust the value as needed

    let series2 = this.chart!.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "category";
    series2.name = "Moderate to Severe\n Disability";
    series2.stacked = true;
    series2.columns.template.fill = am4core.color("rgb(254,123,0)");
    series2.columns.template.stroke = am4core.color("rgb(254,123,0)");
    series2.columns.template.width = am4core.percent(55); // Adjust the value as needed

    // Add tooltips for amCharts
    series1.columns.template.tooltipText = "None to Mild Disability: {valueY}%";
    series2.columns.template.tooltipText = "Moderate or Severe Disability: {valueY}%";
    const customNValues = ["n=275", "n=242", "n=212", "n=183","n=147","n=108","n=78","n=27"];

    // Add "n" values to the category labels on x-axis
    categoryAxis.renderer.labels.template.adapter.add("text", function(text, target) {
        const dataIndex = target.dataItem.index;
        const customNValue = customNValues[dataIndex];
        return text + "\n" + customNValue;
    });
    

     this.chart!.legend = new am4charts.Legend();
     this.chart!.legend.position = "right";
     this.chart!.legend.valign = "top";
    
     // Customize legend markers to be circular
  // Customize legend markers to be circular
 
 

    // Create D3 x and y axis
    const margin = { top: 40, right: 20, bottom: 50, left: 60 }; // Adjusted margins for moving the chart down
    const width = 800 - margin.left - margin.right;
    const height = 446 - margin.top - margin.bottom; // Increased height

    const svg = d3.select("#chartdiv").append("svg")
        .attr("width", width + margin.left + margin.right +40)
        .attr("height", 480)
        .style("position", "absolute")
        .style("top", "0px")
        .append("g")
        .attr("transform", "translate(" + (25) + "," + 75 + ")");

    // Update axis labels
    const customXAxisLabels = ["n=", "Tx1", "Tx2", "Tx3", "Tx4", "Tx5", "Tx6", "Tx7", "Tx8"];
    const customYAxisLabels = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

    const x = d3.scaleBand()
        .domain(customXAxisLabels)
        .range([-2, width+13])
        .padding(0);

    const y = d3.scaleLinear()
        .domain([0, d3.max(customYAxisLabels)!])
        .range([height, -60]);

    const xAxis = d3.axisBottom(x).tickSize(0); // Remove ticks
    const yAxis = d3.axisRight(y); // Move the y-axis to the right

    const yAxisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width+12) + ", 0)") // Adjusted translation
        .call(yAxis)
        .selectAll("text") // Adjust font size of axis labels
        .style("font-size", "14px");

        svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("y", -810)
        .attr("x",160 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-weight','bold')
        .text("DAS Score");

        svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("y", -790)
        .attr("x",160 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("(Model Estimated Mean)");

    // Draw the x-axis
    const xaxisGroup = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll(".tick text") // Select all x-axis labels
        .style("font-size", "16px") // Increase font size for x-axis labels
        .style('fill','transparent')
        .attr("transform", "translate(0,10)"); // Adjust label position if needed

    // Remove x-axis line
    svg.select(".x-axis").select("path").remove();

    // svg.selectAll(".horizontal-grid-line")
    //     .data(customYAxisLabels) // Exclude the first label
    //     .enter().append("line")
    //     .attr("class", "horizontal-grid-line")
    //     .attr("x1", 0)
    //     .attr("x2", width + 60) // Adjusted width
    //     .attr("y1", d => y(d))
    //     .attr("y2", d => y(d))
    //     .style("stroke", "#ccc")
    //     .style("stroke-width", 0.5); // Add dashed style to the grid lines

    // svg.selectAll(".vertical-grid-line")
    //     .data(customXAxisLabels) // Exclude the first and last labels
    //     .enter().append("line")
    //     .attr("class", "vertical-grid-line")
    //     .attr("x1", d => x(d)! + x.bandwidth() / 2)
    //     .attr("x2", d => x(d)! + x.bandwidth() / 2)
    //     .attr("y1", -60)
    //     .attr("y2", height)
    //     .style("stroke", "#ccc")
    //     .style("stroke-width", 0.5); // Add dashed style to the grid lines

   // Draw the error bars with animation
   svg.selectAll(".error-bar")
   .data(data)
   .enter()
   .append("line")
   .attr("class", "error-bar")
   .attr("stroke", "black")
   .attr("stroke-width", 2)
   .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
   .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
   .attr("y1", d => y(d.y))
   .attr("y2", d => y(d.y)) // Start at the center
   .transition()
   .duration(1000)
   .attr("y1", d => y(d.y))
   .attr("y2", d => y(d.y + d.error));

   

// Draw the center dots
svg.selectAll(".dot")
   .data(data)
   .enter()
   .append("circle")
   .attr("class", "dot")
   .attr("cx", d => x(d.x)! + x.bandwidth() / 2)
   .attr("cy", d => y(d.y))
   .attr("r", 0) // Set initial radius to 0
   .attr("fill", "black")
   .transition() // Add transition for animation
   .delay((d, i) => i * 100) // Delay each circle's animation
   .duration(500) // Animation duration
   .attr("r", 5); // Set the final radius

// Draw the error bars with horizontal lines at the ends
svg.selectAll(".error-bar2")
   .data(data)
   .enter()
   .append("line")
   .attr("class", "error-bar2")
   .attr("stroke", "black")
   .attr("stroke-width", 2)
   .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
   .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
   .attr("y1", d => y(d.y))
   .attr("y2", d => y(d.y)) // Start at the center
   .transition()
   .duration(1000)
   .attr("y1", d => y(d.y - d.error2))
   .attr("y2",d => y(d.y));

    const horizontalline = 15;

    // Draw horizontal lines at the ends of the error bars with animations
    svg.selectAll(".end-line-top")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "end-line-top")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y1", d => y(d.y + d.error))
        .attr("y2", d => y(d.y + d.error))
        .transition() // Add animation
        .duration(1000) // Set animation duration
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2 - horizontalline) // Adjust the starting position
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2 + horizontalline); // Adjust the ending position

    svg.selectAll(".end-line-bottom")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "end-line-bottom")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y1", d => y(d.y - d.error2))
        .attr("y2", d => y(d.y - d.error2))
        .transition() // Add animation
        .duration(1000) // Set animation duration
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2 - horizontalline) // Adjust the starting position
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2 + horizontalline); // Adjust the ending position

    // Draw the asterisks on top of the error bars
    svg.selectAll(".asterisks")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "asterisks")
        .attr("x", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y", d => y(d.y + d.error) ) // Adjust the position slightly above the top of the error bar
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text(d => '*'.repeat(d.asterisks)); // Repeat '*' based on the number of asterisks

 // Add tooltip container
const tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("position", "absolute")
.style("background-color", "black") // Change background color to black
.style("color", "white") // Change font color to white
.style("font-size","11px")
.style("border", "1px solid #ccc")
.style("padding", "10px")
.style("border-radius", "5px")
.style("pointer-events", "none")
.style("opacity", 0)
.style("z-index", 1000);

svg.selectAll(".dot")
    .on("mouseover", function (event, d:any) {
        // Change cursor to pointer (hand) when mouseover
        d3.select(this).style("cursor", "pointer");

        tooltip.transition()
            .duration(200)
            .style("opacity", 1);
        tooltip.html("Upper 95% CI: " + (d3.format(".2f")(d.y + d.error)).replace(/\.?0+$/, "") + "<br/>Estimate: " + (d3.format(".2f")(d.y)).replace(/\.?0+$/, "") + "<br/>Lower 95% CI: " + (d3.format(".2f")(d.y - d.error2)).replace(/\.?0+$/, ""))
            .style("left", (event.pageX - 30) + "px")
            .style("top", (event.pageY - 100) + "px");
    })
    .on("mouseout", function (d) {
        // Change cursor back to default when mouseout
        d3.select(this).style("cursor", "default");

        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });

}

  createErrorLineChart(data: any[]): void {
    d3.select("#chartdiv svg").remove();
    d3.select("#chartdivnew svg").remove();
    
    // Dispose of the current chart
    if (this.chart!) {
        this.chart!.dispose();
    }

    // Create D3 x and y axis
    const margin = { top: 40, right: 20, bottom: 50, left: 60 }; // Adjusted margins for moving the chart down
    const width = 800 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom; // Increased height

    const svg = d3.select("#chartdiv").append("svg")
        .attr("width", width + margin.left + margin.right + 200)
        .attr("height", 480)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 75 + ")");

    // Update axis labels
    const customXAxisLabels = ['', "Tx1", "Tx2", "Tx3", "Tx4", "Tx5", "Tx6", "Tx7", "Tx8"];
    const customYAxisLabels = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

   
// Add "123" below each label

    const x = d3.scaleBand()
        .domain(customXAxisLabels)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(customYAxisLabels)!])
        .range([height, -60]);

    const xAxis = d3.axisBottom(x).tickSize(0); // Remove ticks
    const yAxis = d3.axisRight(y); // Move the y-axis to the right

    const yAxisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width + 60) + ", 0)") // Adjusted translation
        .call(yAxis)
        .selectAll("text") // Adjust font size of axis labels
        .style("font-size", "14px");

//DAS Score (Model Estimated Mean)Hygiene
        svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("y", -870)
        .attr("x",160 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-weight','bold')
        .text("DAS Score");

        svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("y", -850)
        .attr("x",160 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("(Model Estimated Mean)");

        svg.append("text")
        .attr("transform", "rotate(0)")
        .attr("y", 389)
        .attr("x",45)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("n=");


    // Draw the x-axis
    const xaxisGroup = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll(".tick text") // Select all x-axis labels
        .style("font-size", "14px") // Increase font size for x-axis labels
        .attr("transform", "translate(0,10)"); // Adjust label position if needed

 // Array of numbers and corresponding strings for each label
const numbers = [
  "",
  "275",
  "242",
  "212",
  "183",
  "147",
  "108",
  "78",
  "27",

];

// Add numbers and strings below each label
xaxisGroup.append("tspan")
  .attr("x", 0)
  .attr("dy", "1.5em")
  .style("font-size", "14px")
  .text((d, i) => numbers[i]); // Append corresponding number and string

    // Remove x-axis line
    svg.select(".x-axis").select("path").remove();
    

    svg.selectAll(".horizontal-grid-line")
        .data(customYAxisLabels) // Exclude the first label
        .enter().append("line")
        .attr("class", "horizontal-grid-line")
        .attr("x1", 0)
        .attr("x2", width + 60) // Adjusted width
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .style("stroke", "#ccc")
        .style("stroke-width", 0.5); // Add dashed style to the grid lines

    svg.selectAll(".vertical-grid-line")
        .data(customXAxisLabels) // Exclude the first and last labels
        .enter().append("line")
        .attr("class", "vertical-grid-line")
        .attr("x1", d => x(d)! + x.bandwidth() / 2)
        .attr("x2", d => x(d)! + x.bandwidth() / 2)
        .attr("y1", -60)
        .attr("y2", height)
        .style("stroke", "#ccc")
        .style("stroke-width", 0.5); // Add dashed style to the grid lines

    // Draw the error bars with animation
    svg.selectAll(".error-bar")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "error-bar")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y1", d => y(d.y))
        .attr("y2", d => y(d.y)) // Start at the center
        .transition()
        .duration(1000)
        .attr("y1", d => y(d.y))
        .attr("y2", d => y(d.y + d.error));

        

    // Draw the center dots
    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.x)! + x.bandwidth() / 2)
        .attr("cy", d => y(d.y))
        .attr("r", 0) // Set initial radius to 0
        .attr("fill", "black")
        .transition() // Add transition for animation
        .delay((d, i) => i * 100) // Delay each circle's animation
        .duration(500) // Animation duration
        .attr("r", 5); // Set the final radius

    // Draw the error bars with horizontal lines at the ends
    svg.selectAll(".error-bar2")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "error-bar2")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y1", d => y(d.y))
        .attr("y2", d => y(d.y)) // Start at the center
        .transition()
        .duration(1000)
        .attr("y1", d => y(d.y - d.error2))
        .attr("y2",d => y(d.y));

    const horizontalline = 15;

    // Draw horizontal lines at the ends of the error bars with animations
    svg.selectAll(".end-line-top")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "end-line-top")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y1", d => y(d.y + d.error))
        .attr("y2", d => y(d.y + d.error))
        .transition() // Add animation
        .duration(1000) // Set animation duration
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2 - horizontalline) // Adjust the starting position
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2 + horizontalline); // Adjust the ending position

    svg.selectAll(".end-line-bottom")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "end-line-bottom")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y1", d => y(d.y - d.error2))
        .attr("y2", d => y(d.y - d.error2))
        .transition() // Add animation
        .duration(1000) // Set animation duration
        .attr("x1", d => x(d.x)! + x.bandwidth() / 2 - horizontalline) // Adjust the starting position
        .attr("x2", d => x(d.x)! + x.bandwidth() / 2 + horizontalline); // Adjust the ending position

    // Draw the asterisks on top of the error bars
    svg.selectAll(".asterisks")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "asterisks")
        .attr("x", d => x(d.x)! + x.bandwidth() / 2)
        .attr("y", d => y(d.y + d.error)) // Adjust the position slightly above the top of the error bar
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text(d => '*'.repeat(d.asterisks)); // Repeat '*' based on the number of asterisks

  // Add tooltip container
const tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("position", "absolute")
.style("background-color", "black") // Change background color to black
.style("color", "white") // Change font color to white
.style("font-size","11px")
.style("border", "1px solid #ccc")
.style("padding", "10px")
.style("border-radius", "5px")
.style("pointer-events", "none")
.style("opacity", 0)
.style("z-index", 1000);

svg.selectAll(".dot")
    .on("mouseover", function (event, d:any) {
        // Change cursor to pointer (hand) when mouseover
        d3.select(this).style("cursor", "pointer");

        tooltip.transition()
            .duration(200)
            .style("opacity", 1);
        tooltip.html("Upper 95% CI: " + (d3.format(".2f")(d.y + d.error)).replace(/\.?0+$/, "") + "<br/>Estimate: " + (d3.format(".2f")(d.y)).replace(/\.?0+$/, "") + "<br/>Lower 95% CI: " + (d3.format(".2f")(d.y - d.error2)).replace(/\.?0+$/, ""))
            .style("left", (event.pageX - 30) + "px")
            .style("top", (event.pageY - 100) + "px");
    })
    .on("mouseout", function (d) {
        // Change cursor back to default when mouseout
        d3.select(this).style("cursor", "default");

        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });



}









  

  updateChartData(data: any[]): void {
    if (this.chart!) {
      // Store legend state
      let hiddenState: { [key: string]: boolean } = {};
      this.chart!.series.each((series) => {
        hiddenState[series.name] = series.isHiding || series.isHidden;
      });

      // Dispose of the current chart
      this.chart!.dispose();

      // Recreate the chart
      this.createChart();

      // Update chart data
      this.chart!.data = data;

      // Reapply legend state
      this.chart!.series.each((series) => {
        if (hiddenState[series.name]) {
          series.hide();
        }
      });

      // Animate the chart
      this.chart!.invalidateRawData();
    }
  }

  loadData1(): void {
    this.title = 'Hygiene LL';
    if(this.selectedChartType=='proportion'){
    this.selectedData = 'data1'; 
    const data = [{
      "category": "Tx 1",
      "value1": 61.5,
      "value2": 38.5
    }, {
      "category": "Tx 2",
      "value1": 64.5,
      "value2": 35.5
    }, {
      "category": "Tx 3",
      "value1": 70.3,
      "value2": 29.7
    }, {
      "category": "Tx 4",
      "value1": 69.4,
      "value2": 30.6
    },{
      "category": "Tx 5",
      "value1": 63.9,
      "value2": 36.1
    },{
      "category": "Tx 6",
      "value1": 71.3,
      "value2": 28.7
    },{
      "category": "Tx 7",
      "value1": 69.2,
      "value2": 30.8
    },{
      "category": "Tx 8",
      "value1": 66.7,
      "value2": 33.7
    }];
    this.updateChartData(data);}
    else if (this.selectedChartType=='mean'){
      this.selectedData = 'data1'; 
      const data = [
        { x: "Tx1", y: 1.1, error: 0.1,error2:0.1, asterisks: 0 },
        { x: "Tx2", y: 1.1, error: 0.1,error2:0.2, asterisks: 0 },
        { x: "Tx3", y: 1, error: 0.2,error2:0.1, asterisks: 0 },
        { x: "Tx4", y: 1, error: 0.1,error2:0.1, asterisks: 0 },
        { x: "Tx5", y: 1.1, error: 0.1,error2:0.1, asterisks: 0 },
        { x: "Tx6", y: 1, error: 0.2,error2:0.1, asterisks: 0 },
        { x: "Tx7", y: 1, error: 0.2,error2:0.1, asterisks: 0 },
        { x: "Tx8", y: 0.9, error: 0.2,error2:0.3, asterisks: 0 }
    ];
this.createErrorLineChart(data); // Re-create chart with updated data
    } else if (this.selectedChartType=='combination'){
      this.selectedData = 'data1'; 

    const datanew = [{
      "category": "Tx 1",
      "value1": 61.5,
      "value2": 38.5
    }, {
      "category": "Tx 2",
      "value1": 64.5,
      "value2": 35.5
    }, {
      "category": "Tx 3",
      "value1": 70.3,
      "value2": 29.7
    }, {
      "category": "Tx 4",
      "value1": 69.4,
      "value2": 30.6
    },{
      "category": "Tx 5",
      "value1": 63.9,
      "value2": 36.1
    },{
      "category": "Tx 6",
      "value1": 71.3,
      "value2": 28.7
    },{
      "category": "Tx 7",
      "value1": 69.2,
      "value2": 30.8
    },{
      "category": "Tx 8",
      "value1": 66.7,
      "value2": 33.7
    }];
    this.updateChartData(datanew);
    }

    
    
  }

  loadData2(): void {
    this.title = 'Pain LL';
    if(this.selectedChartType=='proportion'){
      this.selectedData = 'data2'; 
      const data = [{
        "category": "Tx 1",
        "value1": 64.4,
        "value2": 35.6
      }, {
        "category": "Tx 2",
        "value1": 75.6,
        "value2": 24.4
      }, {
        "category": "Tx 3",
        "value1": 79.7,
        "value2": 20.3
      }, {
        "category": "Tx 4",
        "value1": 80.3,
        "value2": 19.7
      },{
        "category": "Tx 5",
        "value1": 78.9,
        "value2": 21.1
      },{
        "category": "Tx 6",
        "value1": 80.6,
        "value2": 19.4
      },{
        "category": "Tx 7",
        "value1": 78.2,
        "value2": 21.8
      },{
        "category": "Tx 8",
        "value1": 81.5,
        "value2": 18.5
      }];
      this.updateChartData(data);}
      else if (this.selectedChartType=='mean'){
        this.selectedData = 'data2'; 
        const data = [
          { x: "Tx1", y: 1.1, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 0.9, error: 0.1,error2:0.2, asterisks: 3 },
          { x: "Tx3", y: 0.8, error: 0.1,error2:0.1, asterisks: 3 },
          { x: "Tx4", y: 0.8, error: 0.1,error2:0.1, asterisks: 3 },
          { x: "Tx5", y: 0.8, error: 0.2,error2:0.1, asterisks: 1 },
          { x: "Tx6", y: 0.8, error: 0.1,error2:0.2, asterisks: 2 },
          { x: "Tx7", y: 0.9, error: 0.2,error2:0.2, asterisks: 0 },
          { x: "Tx8", y: 0.7, error: 0.3,error2:0.2, asterisks: 0 }
      ];
  this.createErrorLineChart(data); // Re-create chart with updated data
      }else if (this.selectedChartType=='combination'){
        this.selectedData = 'data2'; 
  
        const datanew = [{
          "category": "Tx 1",
          "value1": 64.4,
          "value2": 35.6
        }, {
          "category": "Tx 2",
          "value1": 75.6,
          "value2": 24.4
        }, {
          "category": "Tx 3",
          "value1": 79.7,
          "value2": 20.3
        }, {
          "category": "Tx 4",
          "value1": 80.3,
          "value2": 19.7
        },{
          "category": "Tx 5",
          "value1": 78.9,
          "value2": 21.1
        },{
          "category": "Tx 6",
          "value1": 80.6,
          "value2": 19.4
        },{
          "category": "Tx 7",
          "value1": 78.2,
          "value2": 21.8
        },{
          "category": "Tx 8",
          "value1": 81.5,
          "value2": 18.5
        }];
      this.updateChartData(datanew);
      }
  }

  loadData3(): void {
    this.title = 'Dressing LL';
    if(this.selectedChartType=='proportion'){
      this.selectedData = 'data3'; 
      const data = [{
        "category": "Tx 1",
        "value1": 50.2,
        "value2": 49.8
      }, {
        "category": "Tx 2",
        "value1": 58.7,
        "value2": 41.3
      }, {
        "category": "Tx 3",
        "value1": 59.4,
        "value2": 40.6
      }, {
        "category": "Tx 4",
        "value1": 62.8,
        "value2": 37.2
      },{
        "category": "Tx 5",
        "value1": 59.9,
        "value2": 40.1
      },{
        "category": "Tx 6",
        "value1": 70.4,
        "value2": 29.6
      },{
        "category": "Tx 7",
        "value1": 62.8,
        "value2": 37.2
      },{
        "category": "Tx 8",
        "value1": 63,
        "value2": 37
      }];
      this.updateChartData(data);}
      else if (this.selectedChartType=='mean'){
        this.selectedData = 'data3'; 
        const data = [
          { x: "Tx1", y: 1.6, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 1.4, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx3", y: 1.4, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx4", y: 1.3, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx5", y: 1.4, error: 0.1,error2:0.2, asterisks: 0 },
          { x: "Tx6", y: 1.3, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx7", y: 1.3, error: 0.2,error2:0.1, asterisks: 0 },
          { x: "Tx8", y: 1.2, error: 0.2,error2:0.3, asterisks: 0 }
      ];


  this.createErrorLineChart(data); // Re-create chart with updated data
      }else if (this.selectedChartType=='combination'){
        this.selectedData = 'data3'; 
  
      const datanew =  [{
        "category": "Tx 1",
        "value1": 50.2,
        "value2": 49.8
      }, {
        "category": "Tx 2",
        "value1": 58.7,
        "value2": 41.3
      }, {
        "category": "Tx 3",
        "value1": 59.4,
        "value2": 40.6
      }, {
        "category": "Tx 4",
        "value1": 62.8,
        "value2": 37.2
      },{
        "category": "Tx 5",
        "value1": 59.9,
        "value2": 40.1
      },{
        "category": "Tx 6",
        "value1": 70.4,
        "value2": 29.6
      },{
        "category": "Tx 7",
        "value1": 62.8,
        "value2": 37.2
      },{
        "category": "Tx 8",
        "value1": 63,
        "value2": 37
      }];
      this.updateChartData(datanew);
      }
  }

  loadData4(): void {
    this.title = 'Posture LL';
    if(this.selectedChartType=='proportion'){
      this.selectedData = 'data4'; 
      const data = [{
        "category": "Tx 1",
        "value1": 35.6,
        "value2": 64.4
      }, {
        "category": "Tx 2",
        "value1": 46.7,
        "value2": 53.3
      }, {
        "category": "Tx 3",
        "value1": 54.2,
        "value2": 45.8
      }, {
        "category": "Tx 4",
        "value1": 53.6,
        "value2": 46.4
      },{
        "category": "Tx 5",
        "value1": 49.7,
        "value2": 50.3
      },{
        "category": "Tx 6",
        "value1": 62,
        "value2": 38
      },{
        "category": "Tx 7",
        "value1": 52.6,
        "value2": 47.4
      },{
        "category": "Tx 8",
        "value1": 66.7,
        "value2": 33.3
      }];
      this.updateChartData(data);}
      else if (this.selectedChartType=='mean'){
        this.selectedData = 'data4'; 
        const data = [
          { x: "Tx1", y: 1.8, error: 0.1,error2:0.1, asterisks: 0 },
          { x: "Tx2", y: 1.6, error: 0.1,error2:0.2, asterisks: 1 },
          { x: "Tx3", y: 1.6, error: 0.1,error2:0.1, asterisks: 3 },
          { x: "Tx4", y: 1.6, error: 0.1,error2:0.2, asterisks: 3 },
          { x: "Tx5", y: 1.5, error: 0.1,error2:0.1, asterisks: 1 },
          { x: "Tx6", y: 1.5, error: 0.1,error2:0.2, asterisks: 2 },
          { x: "Tx7", y: 1.5, error: 0.1,error2:0.2, asterisks: 0 },
          { x: "Tx8", y: 1.3, error: 0.2,error2:0.3, asterisks: 0 }
      ];

  this.createErrorLineChart(data); // Re-create chart with updated data
      }else if (this.selectedChartType=='combination'){
        this.selectedData = 'data4'; 
  
      const datanew = [{
        "category": "Tx 1",
        "value1": 35.6,
        "value2": 64.4
      }, {
        "category": "Tx 2",
        "value1": 46.7,
        "value2": 53.3
      }, {
        "category": "Tx 3",
        "value1": 54.2,
        "value2": 45.8
      }, {
        "category": "Tx 4",
        "value1": 53.6,
        "value2": 46.4
      },{
        "category": "Tx 5",
        "value1": 49.7,
        "value2": 50.3
      },{
        "category": "Tx 6",
        "value1": 62,
        "value2": 38
      },{
        "category": "Tx 7",
        "value1": 52.6,
        "value2": 47.4
      },{
        "category": "Tx 8",
        "value1": 66.7,
        "value2": 33.3
      }];
      this.updateChartData(datanew);
      }
  }

  loadProportionChart(): void {
    this.selectedChartType = 'proportion';
    if(this.selectedData=='data1'){
      this.loadData1();
    }
    else if(this.selectedData=='data2'){
      this.loadData2();
    }
    else if(this.selectedData=='data3'){
      this.loadData3();
    }
    else if(this.selectedData=='data4'){
      this.loadData4();
    }
    
  }

  loadMeanChart(): void {
    this.selectedChartType = 'mean';
    if(this.selectedData=='data1'){
      this.loadData1();
    }
    else if(this.selectedData=='data2'){
      this.loadData2();
    }
    else if(this.selectedData=='data3'){
      this.loadData3();
    }
    else if(this.selectedData=='data4'){
      this.loadData4();
    }
  }

  loadCombinationChart(): void {
    this.selectedChartType = 'combination';
    if(this.selectedData=='data1'){
      this.loadData1();
    }
    else if(this.selectedData=='data2'){
      this.loadData2();
    }
    else if(this.selectedData=='data3'){
      this.loadData3();
    }
    else if(this.selectedData=='data4'){
      this.loadData4();
    }

  }
}
