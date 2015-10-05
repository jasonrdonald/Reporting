function d3async(data, stateDataColumn, valueDataColumn) {

    //d3.json(file, function (err, data) {

        //var config = {"color1":"#d3e5ff","color2":"#08306B","stateDataColumn":"state_or_territory","valueDataColumn":"population_estimate_for_july_1_2013_number"}
        var config = { "color1": "#d3e5ff", "color2": "#08306B", "stateDataColumn": stateDataColumn, "valueDataColumn": valueDataColumn }

        //var WIDTH = 800, HEIGHT = 500;
        var WIDTH = 500, HEIGHT = 250;

        var COLOR_COUNTS = 9;
        //alert('regions');
        var SCALE = 0.5;

        function Interpolate(start, end, steps, count) {
            var s = start,
                e = end,
                final = s + (((e - s) / steps) * count);
            return Math.floor(final);
        }

        function Color(_r, _g, _b) {
            var r, g, b;
            var setColors = function (_r, _g, _b) {
                r = _r;
                g = _g;
                b = _b;
            };

            setColors(_r, _g, _b);
            this.getColors = function () {
                var colors = {
                    r: r,
                    g: g,
                    b: b
                };
                return colors;
            };
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function valueFormat(d) {
            if (d > 1000000000) {
                return Math.round(d / 1000000000 * 10) / 10 + "B";
            } else if (d > 1000000) {
                return Math.round(d / 1000000 * 10) / 10 + "M";
            } else if (d > 1000) {
                return Math.round(d / 1000 * 10) / 10 + "K";
            } else {
                return d;
            }
        }

        var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;

        var rgb = hexToRgb(COLOR_FIRST);

        var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);

        rgb = hexToRgb(COLOR_LAST);
        var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);

        var MAP_STATE = config.stateDataColumn;
        var MAP_VALUE = config.valueDataColumn;

        var width = WIDTH,
            height = HEIGHT;

        var valueById = d3.map();

        var startColors = COLOR_START.getColors(),
            endColors = COLOR_END.getColors();

        var colors = [];

        for (var i = 0; i < COLOR_COUNTS; i++) {
            var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
            var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
            var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
            colors.push(new Color(r, g, b));
        }

        var quantize = d3.scale.quantize()
            .domain([0, 1.0])
            .range(d3.range(COLOR_COUNTS).map(function (i) { return i }));

        var path = d3.geo.path();

        var svg = d3.select("#canvas-svg").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.tsv("data/us-state-names.tsv", function (error, names) {

            name_id_map = {};
            id_name_map = {};
            id_code_map = {};

            for (var i = 0; i < names.length; i++) {
                name_id_map[names[i].name] = names[i].id;
                id_name_map[names[i].id] = names[i].name;
                id_code_map[names[i].id] = names[i].code;
            }

            data.forEach(function (d) {
                var id = name_id_map[d[MAP_STATE]];
                valueById.set(id, +d[MAP_VALUE]);
            });

            quantize.domain([d3.min(data, function (d) { return +d[MAP_VALUE] }),
              d3.max(data, function (d) { return +d[MAP_VALUE] })]);

            d3.json("data/us.json", function (error, us) {
                svg.append("g")
                    .attr("class", "states-choropleth")
                  .selectAll("path")
                    .data(topojson.feature(us, us.objects.states).features)
                  .enter().append("path")
                    .attr("transform", "scale(" + SCALE + ")")
                    .style("fill", function (d) {
                        if (valueById.get(d.id)) {
                            var i = quantize(valueById.get(d.id));
                            var color = colors[i].getColors();
                            return "rgb(" + color.r + "," + color.g +
                                "," + color.b + ")";
                        } else {
                            return "";
                        }
                    })
                    .attr("d", path)
                    .on("mousemove", function (d) {
                        var html = "";
                        var dev1 = mathrandom();
                        var dev2 = mathrandom();
                        var dev3 = mathrandom();
                        var dev4 = valueById.get(d.id) - dev1-dev2-dev3;

                        html += "<div class=\"tooltip_kv\">";
                        html += "<span class=\"tooltip_key\">";
                        html += id_name_map[d.id];
                        html += "</span>";
                        html += "<span class=\"tooltip_value\">";
                        html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
                        html += "</span>";
                        html += "</div>";
                        html += "<span >iPhone 6s Gold</span>";
                        html += "<span class=\"tooltip_value\">" + mathrandom() + "</span>";
                        html += "<br/><span >Nexus 6</span>";
                        html += "<span class=\"tooltip_value\">" + mathrandom() + "</span>";
                        html += "<br/><span >iPhone 6 Silver</span>";
                        html += "<span class=\"tooltip_value\">" + mathrandom() + "</span>";
                        html += "<br/><span >iPhone 5s Black</span>";
                        html += "<span class=\"tooltip_value\">" + mathrandom() + "</span>";

                        $("#tooltip-container").html(html);
                        $(this).attr("fill-opacity", "0.8");
                        $("#tooltip-container").show();
                        $("#tooltip-container").css("background-image", "url('images/iphone-gold.png')");
                        //$("#tooltip-container").html('Age Group: 15');

                        var coordinates = d3.mouse(this);

                        var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;

                        if (d3.event.layerX < map_width / 2) {
                            d3.select("#tooltip-container")
                              .style("top", (d3.event.layerY + 15) + "px")
                              .style("left", (d3.event.layerX + 15) + "px");
                        } else {
                            var tooltip_width = $("#tooltip-container").width();
                            d3.select("#tooltip-container")
                              .style("top", (d3.event.layerY + 15) + "px")
                              .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
                        }

                        //alert(id_name_map[d.id] + "::" + id_code_map[d.id]);
                        //$('#canvas-svg').addClass("state");
                        $('#canvas-svg').attr("statecode", id_code_map[d.id]);

                        $(this).bind(click);
                    })
                    .on("mouseout", function () {
                        $(this).attr("fill-opacity", "1.0");
                        $("#tooltip-container").hide();
                        //alert(id_name_map[]);
                    });


                $("#canvas-svg").bind("click", function (d) {
                    var statecode = $(this).attr("statecode");
                    //alert(statecode);
                    $("#barchart").html('<h3>Age-Group-wise</h3>');
                    
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        data: data,
                        url: "api/values/getAgeGroup/" + statecode,
                        success: function (msg) {
                            //window.location.replace("products.html");
                            //alert(msg.tostring());
                            //alert(msg[0].Region);
                            d3agegroup_async(msg, statecode);
                        },
                        error: function (x, e) {
                            alert('AgeGroup::Failed' + '::' + x.responseText + '::' + x.status);
                        }
                    });
                });

                svg.append("path")
                    .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
                    .attr("class", "states")
                    .attr("transform", "scale(" + SCALE + ")")
                    .attr("d", path);
            });

        });
    //});
}

function d3json(file, stateDataColumn, valueDataColumn)
{
	
	d3.json(file, function(err, data) {

	  //var config = {"color1":"#d3e5ff","color2":"#08306B","stateDataColumn":"state_or_territory","valueDataColumn":"population_estimate_for_july_1_2013_number"}
	  var config = {"color1":"#d3e5ff","color2":"#08306B","stateDataColumn":stateDataColumn,"valueDataColumn":valueDataColumn}
	  
	  //var WIDTH = 800, HEIGHT = 500;
	  var WIDTH = 500, HEIGHT = 250;
	  
	  var COLOR_COUNTS = 9;
	  
	  var SCALE = 0.5;
	  
	  function Interpolate(start, end, steps, count) {
		  var s = start,
			  e = end,
			  final = s + (((e - s) / steps) * count);
		  return Math.floor(final);
	  }
	  
	  function Color(_r, _g, _b) {
		  var r, g, b;
		  var setColors = function(_r, _g, _b) {
			  r = _r;
			  g = _g;
			  b = _b;
		  };
	  
		  setColors(_r, _g, _b);
		  this.getColors = function() {
			  var colors = {
				  r: r,
				  g: g,
				  b: b
			  };
			  return colors;
		  };
	  }
	  
	  function hexToRgb(hex) {
		  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		  return result ? {
			  r: parseInt(result[1], 16),
			  g: parseInt(result[2], 16),
			  b: parseInt(result[3], 16)
		  } : null;
	  }
	  
	  function valueFormat(d) {
		if (d > 1000000000) {
		  return Math.round(d / 1000000000 * 10) / 10 + "B";
		} else if (d > 1000000) {
		  return Math.round(d / 1000000 * 10) / 10 + "M";
		} else if (d > 1000) {
		  return Math.round(d / 1000 * 10) / 10 + "K";
		} else {
		  return d;
		}
	  }
	  
	  var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;
	  
	  var rgb = hexToRgb(COLOR_FIRST);
	  
	  var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
	  
	  rgb = hexToRgb(COLOR_LAST);
	  var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
	  
	  var MAP_STATE = config.stateDataColumn;
	  var MAP_VALUE = config.valueDataColumn;
	  
	  var width = WIDTH,
		  height = HEIGHT;
	  
	  var valueById = d3.map();
	  
	  var startColors = COLOR_START.getColors(),
		  endColors = COLOR_END.getColors();
	  
	  var colors = [];
	  
	  for (var i = 0; i < COLOR_COUNTS; i++) {
		var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
		var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
		var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
		colors.push(new Color(r, g, b));
	  }
	  
	  var quantize = d3.scale.quantize()
		  .domain([0, 1.0])
		  .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));
	  
	  var path = d3.geo.path();
	  
	  var svg = d3.select("#canvas-svg").append("svg")
		  .attr("width", width)
		  .attr("height", height);
	  
	  d3.tsv("data/us-state-names.tsv", function(error, names) {
	  
	  name_id_map = {};
	  id_name_map = {};
	  
	  for (var i = 0; i < names.length; i++) {
		name_id_map[names[i].name] = names[i].id;
		id_name_map[names[i].id] = names[i].name;
	  }
	  
	  data.forEach(function(d) {
		var id = name_id_map[d[MAP_STATE]];
		valueById.set(id, +d[MAP_VALUE]); 
	  });
	  
	  quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
		d3.max(data, function(d){ return +d[MAP_VALUE] })]);
	  
	  d3.json("data/us.json", function(error, us) {
		svg.append("g")
			.attr("class", "states-choropleth")
		  .selectAll("path")
			.data(topojson.feature(us, us.objects.states).features)
		  .enter().append("path")
			.attr("transform", "scale(" + SCALE + ")")
			.style("fill", function(d) {
			  if (valueById.get(d.id)) {
				var i = quantize(valueById.get(d.id));
				var color = colors[i].getColors();
				return "rgb(" + color.r + "," + color.g +
					"," + color.b + ")";
			  } else {
				return "";
			  }
			})
			.attr("d", path)
			.on("mousemove", function(d) {
				var html = "";
	  
				html += "<div class=\"tooltip_kv\">";
				html += "<span class=\"tooltip_key\">";
				html += id_name_map[d.id];
				html += "</span>";
				html += "<span class=\"tooltip_value\">";
				html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
				html += "";
				html += "<br/>Age Group: 15";
				html += "</span>";
				html += "</div>";
				
				$("#tooltip-container").html(html);
				$(this).attr("fill-opacity", "0.8");
				$("#tooltip-container").show();
				
				var coordinates = d3.mouse(this);
				
				var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
				
				if (d3.event.layerX < map_width / 2) {
				  d3.select("#tooltip-container")
					.style("top", (d3.event.layerY + 15) + "px")
					.style("left", (d3.event.layerX + 15) + "px");
				} else {
				  var tooltip_width = $("#tooltip-container").width();
				  d3.select("#tooltip-container")
					.style("top", (d3.event.layerY + 15) + "px")
					.style("left", (d3.event.layerX - tooltip_width - 30) + "px");
				}
			})
			.on("mouseout", function() {
					$(this).attr("fill-opacity", "1.0");
					$("#tooltip-container").hide();
				});
	  
		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "states")
			.attr("transform", "scale(" + SCALE + ")")
			.attr("d", path);
	  });
	  
	  });
	});
}

function d3agegroup(file, regionKey)
{
	//var margin = {top: 20, right: 20, bottom: 30, left: 40},
    //width = 960 - margin.left - margin.right,
    //height = 500 - margin.top - margin.bottom;
	
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
	width = 380 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom

	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
		.range([height, 0]);

	var color = d3.scale.ordinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickFormat(d3.format(".2s"));

	var svg = d3.select("#barchart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var stateIdx = 0;
	var i = 0;
	d3.json(file, function(error, data) {
	//d3.csv(file, function(error, data) {
	  if (error) throw error;
	  //alert(error);

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Region"; });
		
	  data.forEach(function(d) {
		  if(d.Region == regionKey){
			d.hits = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
			//alert('hi');
			stateIdx = i;
		  }
		  else{
			d.hits = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
			//data[0].remove();
			
		  }
		  i++;
	  });

	  //x0.domain(data.map(function(d) { return d.Region; }));
	  x0.domain(data[stateIdx].Region);
//	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  x1.domain(ageNames).rangeRoundBands([0, .9 * width]);
	  //alert(x0.rangeBand());
	  //y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);
	  //alert(d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); }));
	  //alert(d3.max(data[stateIdx].ages, function(d) { return d.value; }));
	  y.domain([0, d3.max(data[stateIdx].hits, function(d) { return d.value; })]);

	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Hits");

	  var state = svg.selectAll(".state")
		.data(data)
		  //.data(data[stateIdx])
		.enter().append("g")
		  .attr("class", "g")
		  .attr("transform", function(d) { return "translate(" + x0(d.Region) + ",0)"; });
		  //.attr("transform", "translate("+x0(d.Region)+",0)");

	  state.selectAll("rect")
		  //.data(function(d) { return d.ages; })
		  .data(data[stateIdx].hits)
		.enter().append("rect")
		  .attr("width", x1.rangeBand())
		  .attr("x", function(d) { return x1(d.name); })
		  .attr("y", function(d) { return y(d.value); })
		  .attr("height", function(d) { return height - y(d.value); })
		  .style("fill", function(d) { return color(d.name); });

	  var legend = svg.selectAll(".legend")
		  .data(ageNames.slice().reverse())
		.enter().append("g")
		  .attr("class", "legend")
		  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  legend.append("rect")
		  .attr("x", width - 18)
		  .attr("width", 18)
		  .attr("height", 18)
		  .style("fill", color);

	  legend.append("text")
		  .attr("x", width - 24)
		  .attr("y", 9)
		  .attr("dy", ".35em")
		  .style("text-anchor", "end")
		  .text(function(d) { return d; });

	});

}

function d3agegroup_async(data, regionKey) {
    //var margin = {top: 20, right: 20, bottom: 30, left: 40},
    //width = 960 - margin.left - margin.right,
    //height = 500 - margin.top - margin.bottom;

    var margin = { top: 0, right: 0, bottom: 20, left: 20 },
	width = 500 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom

    var x0 = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
		.range([height, 0]);

    var color = d3.scale.ordinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");

    var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickFormat(d3.format(".2s"));

    var svg = d3.select("#barchart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var stateIdx = 0;
    var i = 0;
    //d3.json(file, function (error, data) {
        //d3.csv(file, function(error, data) {

        //if (error) throw error;
        //alert(error);

        var ageNames = d3.keys(data[0]).filter(function (key) { return key !== "Region"; });
        
        data.forEach(function (d) {
            //alert('hi');
            if (d.Region == regionKey) {
                //alert(d.Region + 'match' + regionKey);
                d.hits = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
                //alert('hi');
                stateIdx = i;
            }
            else {
                //  alert('else');
                //alert(d.Region + ' mismatch ' + regionKey);
                d.hits = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
                //data[0].remove();

            }
            i++;
        });

    //x0.domain(data.map(function(d) { return d.Region; }));
        
        x0.domain(data[stateIdx].Region);
        //	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        x1.domain(ageNames).rangeRoundBands([0, .8 * width]);
        //alert(x0.rangeBand());
        //y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);
        //alert(d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); }));
        //alert(d3.max(data[stateIdx].ages, function(d) { return d.value; }));
        y.domain([0, d3.max(data[stateIdx].hits, function (d) { return d.value; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Hits");

        var state = svg.selectAll(".state")
          .data(data)
            //.data(data[stateIdx])
          .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + x0(d.Region) + ",0)"; });
        //.attr("transform", "translate("+x0(d.Region)+",0)");

        state.selectAll("rect")
            //.data(function(d) { return d.ages; })
            .data(data[stateIdx].hits)
          .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) { return x1(d.name); })
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); })
            .style("fill", function (d) { return color(d.name); })
            .attr("title", function (d) { return d.name + "\n Hits: " + parseInt(d.value); })
        ;

        var legend = svg.selectAll(".legend")
            .data(ageNames.slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });

    //});

}