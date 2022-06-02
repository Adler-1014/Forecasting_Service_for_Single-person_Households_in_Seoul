var tooltip = d3.select("body").append("div")
    .attr("class", "toolTip")
    .style("display", "none");

var svgEle;
var svgWidth;
var svgHeight;

var offsetX;
var offsetY;
var barElements_park; // 그래프 요소 저장 변수
var barElements_movie;
var barElements_cctv;
var dataMax;
var barWidth;
var barMargin;

var dataSet_park = [];
var labelName_park = [];
var dataSet_movie = [];
var labelName_movie = [];
var dataSet_cctv = [];
var labelName_cctv = [];


d3.csv("./Data/park.csv", function (error, data) {

    
    for (var i in data[0]) {
        dataSet_park.push(data[0][i]);
        labelName_park.push(i);
    }

    for(var k=0;k<=5;k++)
    {
        dataSet_park[k]*=2.1;
    }

    offsetX = 50;
    offsetY = 0;
    dataMax = 210;
    barWidth = 42;
    barMargin = 3.75;

    svgEle = document.getElementById("parkGraph");
    svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
    svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
    svgWidth = parseFloat(svgWidth);
    svgHeight = parseFloat(svgHeight);

    // 데이터 비율 증가
    // 그래프 그리기

    barElements_park = d3.select('#parkGraph')
        .selectAll("rect")
        .data(dataSet_park) // 데이터 요소에 연결

    barElements_park.enter()
        .append('rect')
        .attr("id",labelName_park)
        .attr('class', 'pabar')
        .attr('height', 0) // 높이 지정
        .attr('width', barWidth) // 너비 지정
        .attr('x', function (d, i) { return i * (barWidth + barMargin) + offsetX }) // x 좌표 지정
        .attr('y', svgHeight - offsetY) // y 좌표 지정
        .on("mouseover", function () {
            d3.select(this)
                .style("fill", "#d34e4e"); // 막대 칠하기 
                tooltip.style("display", null);
                tooltip.text(Math.round(d/2.1));
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
            d3.select(this).style("fill", "#9dbb19");
        })
        .on("mousemove", function(d) {
            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.text(Math.round(d/2.1)); 
        })
        .on("click", function(d){
            //console.log(x)
            d3.select(this)
                .style("fill", "red")
            
            var color = d3.select(this).style("height")
            console.log("hello", color)

            d3.select("#movieGraph")
                .selectAll("rect")
                .style("fill", function(){
                    if ((d3.select(this).style("height") == "69.09px")&(color == "100.8px")){
                        return "red"
                    }
                })
            
            d3.json("./JS/post.js", function(error, data){
                d3.select("#page-wrap")
                    .selectAll("tr")
                    .style("color", function(f){
                    console.log("post", d3.select(this).text())
                    if ((d3.select(this).text().slice(1,4) == "종로구") && (color == "100.8px"))
                        return "red"
                    else if ((d3.select(this).text().slice(1,4) == "노원구") && (color == "84px"))
                        return "red"
                    return "black"
                    
                    });
                })
            
            d3.json("./JS/map.js", function(error, data){
                d3.select("#mapChart")
                .selectAll("path")
                .style("fill", function(d){
                    //console.log("text", d.properties.name)
                    if ((color == "128.1px")&(d.properties.name == "강북구")){
                    return "red"
                    }
                    else if ((color == "102.9px")&(d.properties.name == "도봉구")){
                    return "red"
                    }
                    else if ((color == "100.8px")&(d.properties.name == "종로구")){
                    return "red"
                    }
                    else if ((color == "98.7px")&(d.properties.name == "은평구")){
                    return "red"
                    }
                    else if ((color == "84px")&(d.properties.name == "노원구")){
                    return "red"
                    }
                });
            })

        })
        .transition() // 애니메이션
        .duration(1000)
        .delay(function (d, i) {
            return i * 500;
        })
        .attr("y", function (d, i) {
            return svgHeight - d - offsetY -30;
        })
        .attr("height", function (d, i) {
            return d;
        })

    // 눈금 표시
    var yScale = d3.scale.linear()
        .domain([0, 100])
        .range([dataMax, 0])
    d3.select('#parkGraph').append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(35,40)') // 축 위치 
        .call(
            d3.svg.axis().scale(yScale).orient("left") // 눈금 왼쪽에 적용 
            //.ticks(5)
        )

    // 막대 레이블 표시
    barElements_park.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", function (d, i) { return i * 46 + 20 + offsetX; }) // 표시 순서 위치 계산
        .attr('y', svgHeight - offsetY -10) // y 좌표 지정
        .text(function (d, i) { return labelName_park[i]; }) // 지역 이름 표시 
        .attr("fill", " #d34e4e"); // 글자색  
})


d3.csv("./Data/movie.csv", function (error, data) {
     
    for (var i in data[0]) {
        dataSet_movie.push(data[0][i]);
        labelName_movie.push(i);
    }

    svgEle = document.getElementById("movieGraph");
    svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
    svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
    svgWidth = parseFloat(svgWidth);
    svgHeight = parseFloat(svgHeight);

    offsetX = 50;
    offsetY = 0;
    dataMax = 210;
    barWidth = 42;
    barMargin = 3.75;

    for(var k=0;k<=5;k++)
    {
        dataSet_movie[k]*=21;
    }

    // 데이터 비율 증가

    // 그래프 그리기
    barElements_movie = d3.select('#movieGraph')
        .selectAll("rect")
        .data(dataSet_movie);  // 데이터 요소에 연결

    barElements_movie.enter()
        .append('rect')
        .attr('class', 'mobar')
        .attr('height', 0) // 높이 지정
        .attr('width', barWidth) // 너비 지정
        .attr('x', function (d, i) { return i * (barWidth + barMargin) + offsetX }) // x 좌표 지정
        .attr('y', svgHeight - offsetY) // y 좌표 지정
        .on("mouseover", function () {
            d3.select(this)
                .style("fill", "#d34e4e") // 막대 칠하기 
        tooltip.style("display", null);
        tooltip.text(d/21);
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
            d3.select(this).style("fill", "orange");
        })
        .on("mousemove", function(d) {
            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.text(d/21); 
        })
        .on("click", function(d){
            
            //console.log(x)
            d3.select(this)
                .style("fill", "red")
            
            var color = d3.select(this).style("height")
            console.log("hello", color)

            d3.select("#parkGraph")
                .selectAll("rect")
                .style("fill", function(){
                    if ((d3.select(this).style("height") == "100.8px")&(color == "69.09px")){
                        return "red"
                    }
                })
            d3.select("#cctvGraph")
                .selectAll("rect")
                .style("fill", function(){
                    if ((d3.select(this).style("height") == "190.32px")&(color == "33.096px")){
                        return "red"
                    }
                })
            d3.json("./JS/map.js", function(error, data){
                d3.select("#mapChart")
                .selectAll("path")
                .style("fill", function(d){
                    //console.log("text", d.properties.name)
                    if ((color == "125.79px")&(d.properties.name == "중구")){
                        return "red"
                      }
                      else if ((color == "69.09px")&(d.properties.name == "종로구")){
                        return "red"
                      }
                      else if ((color == "58.38px")&(d.properties.name == "용산구")){
                        return "red"
                      }
                      else if ((color == "33.159px")&(d.properties.name == "광진구")){
                        return "red"
                      }
                      else if ((color == "33.096px")&(d.properties.name == "강남구")){
                        return "red"
                      }
                });
            })
            d3.json("./JS/post.js", function(error, data){
                d3.select("#page-wrap")
                    .selectAll("tr")
                    .style("color", function(f){
                    console.log("post", d3.select(this).text())
                    if ((d3.select(this).text().slice(1,4) == "종로구") && (color == "69.09px"))
                        return "red"
                    else if ((d3.select(this).text().slice(1,4) == "강남구") && (color == "33.096px"))
                        return "red"
                    return "black"
                    
                    });
                })
        })
        .transition() // 애니메이션
        .duration(1000)
        .delay(function(d, i) {
            return i * 500;
        })
        .attr("y", function (d, i) {
            return svgHeight - d - offsetY - 30;
        })
        .attr("height", function (d, i) {
            return d;
        })

    // 눈금 표시
    var yScale = d3.scale.linear()
        .domain([0, 10])
        .range([dataMax, 0])
    d3.select('#movieGraph').append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(35,40)') // 축 위치 
        .call(
            d3.svg.axis().scale(yScale).orient("left") // 눈금 왼쪽에 적용 
            // .ticks(5)
        )
    
    // 막대 레이블 표시
    barElements_movie.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", function (d, i) { return i * 46 + 20 + offsetX; }) // 표시 순서 위치 계산
        .attr('y', svgHeight - offsetY -10) // y 좌표 지정
        .text(function (d, i) { return labelName_movie[i]; }) // 지역 이름 표시 
        .attr("fill", "#d34e4e") // 글자색 흰색 
})


d3.csv("./Data/cctv.csv", function (error, data) {
    for (var i in data[0]) {
        dataSet_cctv.push(data[0][i]);
        labelName_cctv.push(i);
    }

    svgEle = document.getElementById("cctvGraph");
    svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
    svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
    svgWidth = parseFloat(svgWidth);
    svgHeight = parseFloat(svgHeight);

    offsetX = 60;
    offsetY = 10;
    dataMax = 200;
    barWidth = 42;
    barMargin = 3.75;

    // 데이터 비율 증가
    for(var k=0;k<=5;k++)
    {
        dataSet_cctv[k]*=0.04;
    }

    // 그래프 그리기
    barElements_cctv = d3.select('#cctvGraph')
        .selectAll("rect")
        .data(dataSet_cctv) // 데이터 요소에 연결

    barElements_cctv.enter()
        .append('rect')
        .attr('class', 'ccbar')
        .attr('height', 0) // 높이 지정
        .attr('width', barWidth) // 너비 지정
        .attr('x', function (d, i) { return i * (barWidth + barMargin) + offsetX }) // x 좌표 지정
        .attr('y', svgHeight - offsetY) // y 좌표 지정
        .on("mouseover", function () {
            d3.select(this)
                .style("fill", "#d34e4e"); // 막대 칠하기 
            tooltip.style("display", null);
            tooltip.text(d/0.04);
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
            d3.select(this).style("fill", "#5abae6");
        })
        .on("mousemove", function(d) {
            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.text(d/0.04); 
        })
        .on("click", function(d){
            
            //console.log(x)
            d3.select(this)
                .style("fill", "red")
            
            var color = d3.select(this).style("height")
            console.log("hello", color)

            d3.select("#movieGraph")
                .selectAll("rect")
                .style("fill", function(){
                    if ((d3.select(this).style("height") == "33.096px")&(color == "190.32px")){
                        return "red"
                    }
                })
            d3.json("./JS/map.js", function(error, data){
                d3.select("#mapChart")
                .selectAll("path")
                .style("fill", function(d){
                    //console.log("text", d.properties.name)
                    if ((color == "190.32px")&(d.properties.name == "강남구")){
                        return "red"
                      }
                      else if ((color == "128.96px")&(d.properties.name == "관악구")){
      
                        return "red"
                      }
                      else if ((color == "109.84px")&(d.properties.name == "구로구")){
                        return "red"
                      }
                      else if ((color == "108.2px")&(d.properties.name == "서대문구")){
                        return "red"
                      }
                      else if ((color == "102.16px")&(d.properties.name == "성동구")){
                        return "red"
                      }
                });
            })
            d3.json("./JS/post.js", function(error, data){
                d3.select("#page-wrap")
                    .selectAll("tr")
                    .style("color", function(f){
                    console.log("post", d3.select(this).text())
                    if ((d3.select(this).text().slice(1,4) == "강남구") && (color == "190.32px"))
                        return "red"
                    return "black"
                    
                    });
                })
        })
        .transition() // 애니메이션
        .duration(1000)
        .delay(function (d, i) {
            return i * 500;
        })
        .attr("y", function (d, i) {
            return svgHeight - d - offsetY -20;
        })
        .attr("height", function (d, i) {
            return d;
        })

    // 눈금 표시
    var yScale = d3.scale.linear()
        .domain([0, 5000])
        .range([dataMax, 0])
    d3.select('#cctvGraph').append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(50,50)') // 축 위치 
        .call(
            d3.svg.axis().scale(yScale).orient("left") // 눈금 왼쪽에 적용 
            //.ticks(5)
        )

    // 막대 레이블 표시
    barElements_cctv.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", function (d, i) { return i * 46 + 22 + offsetX; }) // 표시 순서 위치 계산
        .attr('y', svgHeight - offsetY -0) // y 좌표 지정
        .text(function (d, i) { return labelName_cctv[i]; }) // 지역 이름 표시 
        .attr("fill", " #d34e4e") // 글자색  
})
