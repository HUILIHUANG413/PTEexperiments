var margin = {top: 100, right: 100, bottom: 100, left: 100}
  , width = 770- margin.left - margin.right
  , height = 640 - margin.top - margin.bottom;

  var xScale = d3.scaleLinear()
      .domain([0, 1.1]) // input
      .range([0, width]); // output

  var yScale = d3.scaleLinear()
      .domain([0.63, 0.74]) // input
      .range([height, 0]); // output

data = d3.dsv(",", "output/logisticreg-mr.csv", function(d) {
            return {
                x: +d["x"],
                y: +d["y"]
            };
        }).then(function(data) {

  var svg1 = d3.select("#mr-line").append("svg")
      .attr("id", "mr-line-dblp")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg1.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", - height / 2)
      .attr("y", - 60)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("F");

  svg1.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .text("x");

  svg1.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("mr dataset");

  var xScale = d3.scaleLinear()
      .domain([0, 1.1]) // input
      .range([0, width]); // output

  var yScale = d3.scaleLinear()
      .domain([0.64, 0.72]) // input
      .range([height, 0]); // output

  var line_five = d3.line()
      .x(function(d, i) {return xScale(d.x); }) // set the x values for the line generator
      .y(function(d) {return yScale(d.y); }); // set the y values for the line generator

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  svg1.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

  svg1.append("path")
      .datum(data) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("fill", "none")
      .attr("stroke", function(d) {return d3.rgb("#FFC300");})
      .attr("stroke-width", 2)
      .attr("d", line_five) // 11. Calls the line generator

  tip = d3.tip().attr('class', 'd3-tip').html(function(d) {temp = 0; temp2 = 0; data.forEach(function(da) {if (da.x == d.x && da.y == d.y) {temp = da.x; temp2 = da.y;};}); return "<div>x: " + temp + "</div><div>y: " + temp2 + "</div>"; });
    svg1.call(tip);

  svg1.selectAll().data(data).enter().append("circle").attr("id", function(d, i) { return d.x + '-' + d.y}).attr("class", "dot").attr("cx", function(d, i) { return xScale(d.x); }).attr("cy", function(d, i) { return yScale(d.y) }).style("fill", "#FFC300").attr("r", 5).on("mouseover", tip.show).on("mouseout", tip.hide);

});