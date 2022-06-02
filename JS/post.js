d3.csv("./Data/post.csv", function (error, data) {
    if (error) throw error;

    var sortAscending = true;
    var table = d3.select('#page-wrap').append('table')
    var titles = d3.keys(data[0]);
    var headers = table.append('thead').append('tr')
        .selectAll('th')
        .data(titles).enter()
        .append('th')
        .text(function (d) {
            return d;
        })
        .on("mousever",function mousever(p){
            $("")
        })
        .on('click', function (d) {
            headers.attr('class', 'header');
            if (sortAscending) {
                rows.sort(function (a, b){
                    return d3.ascending(b[d],a[d])} );
                sortAscending = false;
                this.className = 'aes';
            
            } else {
                sortAscending = true;
                this.className = 'des';
                rows.sort(function (a, b) { return d3.descending(b[d], a[d]) });
            }
            
            a.toLowerCase()
        });

    var rows = table.append('tbody').selectAll('tr')
        .data(data).enter()
        .append('tr')
        .on("click", function(d) {
            console.log(d3.select(this).text().slice(1,4));
            d3.select(this)
                .style("color", "red")

                var city = d3.select(this).text().slice(1,4)
            
                d3.json("./JS/barChart.js", function(error, data){
                    d3.select("#parkGraph")
                      .selectAll("rect")
                      .style("fill", function(){
                        if ((d3.select(this).style("height") == "128.1px")&(city == "강북구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "102.9px")&(city == "도봉구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "100.8px")&(city == "종로구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "98.7px")&(city == "은평구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "84px")&(city == "노원구")){
                          return "red"
                        }
                      });
                        d3.select("#movieGraph")
                      .selectAll("rect")
                      .style("fill", function(){
                        if ((d3.select(this).style("height") == "125.79px")&(city == "중구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "69.09px")&(city == "종로구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "58.38px")&(city == "용산구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "33.159px")&(city == "광진구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "33.096px")&(city == "강남구")){
                          return "red"
                        }
                      });
                      d3.select("#cctvGraph")
                      .selectAll("rect")
                      .style("fill", function(){
                        if ((d3.select(this).style("height") == "190.32px")&(city == "강남구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "128.96px")&(city == "관악구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "109.84px")&(city == "구로구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "108.2px")&(city == "서대문구")){
                          return "red"
                        }
                        else if ((d3.select(this).style("height") == "102.16px")&(city == "성동구")){
                          return "red"
                        }
                      });
                  })
                    
                  d3.json("./JS/map.js", function(error, data){
                    d3.select("#mapChart")
                    .selectAll("path")
                    .style("fill", function(d){
                        //console.log("text", d.properties.name)
                        if (city == d.properties.name)
                            return "red"
                    });
                })

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("color", "black")
        });
    rows.selectAll('td')
        .data(function (d) {
            return titles.map(function (k) {
                return { 'value': d[k], 'name': k };
            });
        }).enter()
        .append('td')
        .attr('data-th', function (d) {
            return d.name;
        })
        .text(function (d) {
            return d.value;
        })
        
    
});