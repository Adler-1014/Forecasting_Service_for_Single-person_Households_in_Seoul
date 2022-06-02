//["#E95B54","#FBCE4A","#3CAF85","#309FDB","#854E9B","#bbbbbb"]
var width = 500,
    height = 420;

var svg = d3.select("#mapChart").append("svg")
    .attr("width", width)
    .attr("height", height);

var map = svg.append("g").attr("id", "map"),
    places = svg.append("g").attr("id", "places");

var projection = d3.geo.mercator()
    .center([126.9895, 37.5651])
    .scale(65000)
    .translate([width/2, height/2]);

var path = d3.geo.path().projection(projection);

var tooltip = d3.select("body").append("div")
.attr("class", "toolTip")
.style("display", "none");

d3.json("./Data/seoul_municipalities_topo_simple.json", function(error, data) {
  var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
  
  map.selectAll('path')
      .data(features)
    .enter().append('path')
      .attr('class', function(d) { console.log(); return 'municipality c' + d.properties.code })
      .attr('d', path)
      .on("mouseover", function (d) {
        d3.select(this)
            .style("fill", "#45A2F5");
      })
      .on("mouseout", function (d) {
        d3.select(this)
            .style("fill", "#bfd8e0");
      })
      .on("click", function (d) {
          d3.json("./JS/barChart.js", function(error, data){
            d3.select("#parkGraph")
              .selectAll("rect")
              .style("fill", function(){
                if ((d3.select(this).style("height") == "128.1px")&(d.properties.name == "강북구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "102.9px")&(d.properties.name == "도봉구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "100.8px")&(d.properties.name == "종로구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "98.7px")&(d.properties.name == "은평구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "84px")&(d.properties.name == "노원구")){
                  return "red"
                }
              });
                d3.select("#movieGraph")
              .selectAll("rect")
              .style("fill", function(){
                if ((d3.select(this).style("height") == "125.79px")&(d.properties.name == "중구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "69.09px")&(d.properties.name == "종로구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "58.38px")&(d.properties.name == "용산구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "33.159px")&(d.properties.name == "광진구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "33.096px")&(d.properties.name == "강남구")){
                  return "red"
                }
              });
              d3.select("#cctvGraph")
              .selectAll("rect")
              .style("fill", function(){
                if ((d3.select(this).style("height") == "190.32px")&(d.properties.name == "강남구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "128.96px")&(d.properties.name == "관악구")){

                  return "red"
                }
                else if ((d3.select(this).style("height") == "109.84px")&(d.properties.name == "구로구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "108.2px")&(d.properties.name == "서대문구")){
                  return "red"
                }
                else if ((d3.select(this).style("height") == "102.16px")&(d.properties.name == "성동구")){
                  return "red"
                }
              });
          })
          d3.json("./JS/post.js", function(error, data){

            d3.select("#page-wrap")
              .selectAll("tr")
              .style("color", function(f){
                console.log("post", d3.select(this).text())

                if (d3.select(this).text().slice(1,4) == d.properties.name)
                  return "red"
                else if (d3.select(this).text().slice(1,5) == d.properties.name)
                  return "red"
                return "black"
              
              });
            })

          d3.select(this)
            .style("fill", "red")
          //alert(d.properties.name );
      });

  map.selectAll('text')
      .data(features)
    .enter().append("text")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("class", "municipality-label")
      .text(function(d) { return d.properties.name; })

});


//https://kbig.kr/portal/kbig/datacube/dataset/dataset?datasetId=nation_clinics_and_hospitals
d3.csv("./Data/placess00.csv", function(data) {

  // create a list of keys
  var keys = ["일반병원", "종합병원", "치과", "한방병원", "요양병원"]
  var keys_color = ["#E95B54", "#FBCE4A", "#3CAF85", "#309FDB", "#854E9B"]

  // Usually you have a color scale in your chart already
  var color = d3.scale.ordinal()
    .domain(keys)
    .range(d3.schemeSet2);

  // Add one dot in the legend for each name.
  map.selectAll("mydots")
    .data(keys_color)
    .enter()
    .append("circle")
      .attr("cx", 70)
      .attr("cy", function(d, i){ return 60 + i*20}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function(d) {return d})
      .on("mouseover", function (k) {
        places.selectAll("circle")
            .style("fill", function(d) {
              if ((k == "#E95B54") & (d.co == 0))
                return k
              else if ((k == "#FBCE4A") & (d.co == 1))
                return k
              else if ((k == "#3CAF85") & d.co == 2)
                return k
              else if ((k == "#309FDB") & d.co == 3)
                return k
              else if ((k == "#854E9B") & d.co == 4)
                return k

              return "#d3d3d3"
            });
      })
      .on("mouseout", function () {
        places.selectAll("circle")
        .style("fill", function(d) {
          if (d.co == 0)
            return "#E95B54" //일반 병원
          else if (d.co == 1)
            return "#FBCE4A" //종합 병원           
          else if (d.co == 2)
            return "#3CAF85" //치과
          else if (d.co == 3)
            return "#309FDB" //한방병원            
          else
            return "#854E9B" // 요양병원
        })
      })

  // Add one dot in the legend for each name.
  map.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
      .attr("x", 120)
      .attr("y", function(d,i){ return 60 + i*20}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", "black")
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
    places.selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
        .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; })
        .attr("r", function(d) { return d.scale })
        .attr("fill", function(d) {
          if (d.co == 0){
            return "#E95B54" //일반 병원
          }
          else if (d.co == 1){
            return "#FBCE4A" //종합 병원
          }
          else if (d.co == 2){
            return "#3CAF85" //치과
          }
          else if (d.co == 3){
            return "#309FDB" //한방병원
          }
          else{
            return "#854E9B" // 요양병원
          }
        })
        .on("mouseover", function (d) {
          d3.select(this)
              .style("fill", "black");
              tooltip.style("display", null);
              tooltip.text(d.name, + " (병상 수 : " + d.size + ")");
        })
        .on("mouseout", function () {
          tooltip.style("display", "none");
          d3.select(this).style("fill", "orange");
          d3.select(this)
          .style("fill", function(d) {
            if (d.co == 0){
              return "#E95B54" //일반 병원
            }
            else if (d.co == 1){
              return "#FBCE4A" //종합 병원
            }
            else if (d.co == 2){
              return "#3CAF85" //치과
            }
            else if (d.co == 3){
              return "#309FDB" //한방병원
            }
            else{
              return "#854E9B" // 요양병원
            }
          })
        })
        .on("mousemove", function(d) {
          tooltip.style("left", (d3.event.pageX + 10) + "px");
          tooltip.style("top", (d3.event.pageY - 10) + "px");
          tooltip.text(d.name + " (병상 수 : " + d.size + ")");
      })

        /*
    places.selectAll("text")
        .data(data)
      .enter().append("text")
        .attr("x", function(d) { return projection([d.lon, d.lat])[0]; })
        .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 8; })
        .text(function(d) { return d.scale }) 
        .on("mouseover", function () {
          d3.select(this)
          .text(function(d) { return d.name })
        })
        */
});