var svg = d3
.select("#lineSvg")
.append("svg")
.attr("id", "lineSvg")

var width = 400;
var height = 250;

var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5);

var y = d3.scale.linear().range([height, height - 150]);

var line = d3.svg
.line()
.x(function (d) {
    return x(d.date);
})
.y(function (d) {
    return y(d.value);
});

var g = svg.append("g").attr("transform", "translate(20, 0)");

d3.json("./Data/population.json", function (data) {
data.forEach(function (d) {
    d.value;
    d.date;
});

x.domain(
    data.map(function (d) {
    return d.date;
    })
);
y.domain([
    0,
    d3.max(data, function (d) {
    return d.value;
    }),
]);

g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
    return x(d.date);
    })
    .attr("cy", function (d) {
    return y(d.value);
    })
    .attr("r", 10)
    .style("fill", "grey")

    .on("mouseover", function (d) {
    d3.select(this)
        .transition()
        .duration(500)
        .style("fill", "red")
        .attr("r", 20);

    g.append("text")
        .attr("x", function () {
        return x(d.date) - 25;
        })
        .attr("y", function () {
        return y(d.value) - 30;
        })
        .text(function () {
        return d.value;
        })
        .attr("id", "text_id");

    g.append("line")
        .attr("x1", function () {
        return x(d.date);
        })
        .attr("y1", function () {
        return y(d.value);
        })
        .attr("x2", function () {
        return x(d.date);
        })
        .attr("y2", height)
        .style("stroke-dasharray", "5,5")
        .style("stroke", "black");
    })
    .on("mouseout", function (d) {
    d3.select(this)
        .transition()
        .duration(500)
        .style("fill", "grey")
        .attr("r", 10);

    d3.select("#text_id").remove();
    d3.selectAll("line").remove();
    });

svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d, i) {
    return d.date;
    })
    .attr("y", 220)
    .attr("x", function (d) {
    return x(d.date);
    });

g.selectAll("path")
    .data([data])
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", line);
});
