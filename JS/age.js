/*
20대,30대,40대,50대,60대,70대 이상
12806, 333299,288320,175868,162950,156152,170402
25.9%, 22.4%, 13.7%, 12.7%, 12.1%, 13.2%
 */

d3.csv("./Data/age.csv", function (error, data) {
    var dictGender = [];
    for (var i in data[0]) {
        dictGender.push({
            name: i,
            val: data[0][i]
        })
    }  
console.log(dictGender) 

var w = 300,
    h = 200,
    r = Math.min(w, h) / 2,
    labelr = r + 30, // radius for label anchor
    donut = d3.layout.pie().sort((a,b) => b.value - a.value), //큰값 -> 작은 값 순으로 정렬
    arc = d3.svg.arc().outerRadius(110); //innerRadius(r*0.5) , 반지름
    var arcOver = d3.svg.arc().outerRadius(120);

var vis = d3.select("#ageGraph")
    .data([dictGender])
    .attr("width", w+150 )
    .attr("height", h);

var arcs = vis.selectAll("g.arc")
    .data(donut.value(function(d) { return d.val }))
  .enter().append("svg:g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (r + 88) + "," + (r+ 110) + ")");
    //.attr("transform", "translate(150,170");

arcs.append("svg:path")
    .style("stroke", "white")
    .attr("fill", function(d, i) {return ["#E95B54","#FBCE4A","#3CAF85","#309FDB","#854E9B","#bbbbbb"][i]; }) //["#E95B54","#FBCE4A","#3CAF85","#309FDB","#854E9B","#bbbbbb"][i];
    .attr("d", arc)
    .on("mouseover", function() { 
    tooltip.style("display", null);
    d3.select(this)
    .attr("stroke", "white")
    .transition()
    .duration(200)
    .attr("d", arcOver)
    .attr("stroke-width", 1);
    })
    .on("mouseout",  function() { 
        tooltip.style("display", "none"); 
        tooltip.style("display", "none"); 
        d3.select(this)
        .attr("stroke", "white")
        .transition()
        .duration(200)
        .attr("d", arc)
        .attr("stroke-width", 1);
    })
    .on("mousemove", function(d) {
        tooltip.style("left", (d3.event.pageX + 10) + "px");
        tooltip.style("top", (d3.event.pageY - 10) + "px");
        //tooltip.text(d.value+"%"+"&#10;"+"hello");
        //d3.select(this).style("stroke","black");
        //333299,288320,175868,162950,156152,170402
        if (d.data.name == "20대"){
            var num = 333299;
            d3.select
            //d3.select(this).style("stroke","skyblue" );
            //d3.select(this).style("stroke-width", "15px");
        }else if (d.data.name == "30대") {
            var num = 288320;
            //d3.select(this).style("stroke","salmon" );
            //d3.select(this).style("stroke-width", "15px");
        }else if (d.data.name == "40대") {
            var num = 175868;
            //d3.select(this).style("stroke","salmon" );
            //d3.select(this).style("stroke-width", "15px");
        }else if (d.data.name == "50대") {
            var num = 162950;
            //d3.select(this).style("stroke","salmon" );
            //d3.select(this).style("stroke-width", "15px");
        }else if (d.data.name == "60대") {
            var num = 156152;
            //d3.select(this).style("stroke","salmon" );
            //d3.select(this).style("stroke-width", "15px");
        }else if (d.data.name == "70대 이상") {
            var num = 170402;
            //d3.select(this).style("stroke","salmon" );
            //d3.select(this).style("stroke-width", "15px");
        }
        tooltip.html("<strong>"+d.data.name+"</strong><br>"+d.value+"%<br>"+num+"명");
    });    

arcs.append("text")
    .attr("text-anchor", "middle")
    .attr("x", function(d) {
        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
        d.cx = Math.cos(a) * (r - 45);
        return d.x = Math.cos(a) * (r+30);
    })
    .attr("y", function(d) {
        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
        d.cy = Math.sin(a) * (r - 45);
        return d.y = Math.sin(a) * (r + 30);
    })
    .text(function(d) { return d.data.name;  })
    .each(function(d) {
        var bbox = this.getBBox();
        d.sx = d.x - bbox.width/2 - 2;
        d.ox = d.x + bbox.width/2 + 2;
        d.sy = d.oy = d.y + 5;
    });

	arcs.append("path")
    .attr("class", "pointer")
    .style("fill", "none")
    .style("stroke", "black")
    
    .attr("d", function(d) {
     console.log(d);
        if(d.cx > d.ox) {
            return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
        } else {
            return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
        }
    });

    var tooltip = d3.select("body").append("div")
        .attr("class", "pieToolTip")
        .attr("data-html", "true")
        .style("display", "none");
})