/*spline.js*/
var channel = "c3-spline" + Math.random();
  eon.chart({
  history: true,
  channel: channel,
  flow: true,
  generate: {
    bindto: '#chart',
    data: {
      x: 'x',
      labels: false
    },
    axis : {
      x : {
        type : 'timeseries',
        tick: {
          format: '%H:%M:%S'
        }
      }
    }
  }
});


var pubnub = PUBNUB.init({
  publish_key: 'demo',
  subscribe_key: 'demo'
});

var dataX = [
				getaxis(),
				data(1),
				data(2),
				data(3),
				data(4),
				data(5)
			];

setInterval(function(){

/*
  pubnub.publish({
    channel: channel,
    message: {
      columns: [
        ['x', new Date().getTime()],
        ['Promo1', Math.floor(Math.random() * 99)],
        ['Promo2', Math.floor(Math.random() * 99)],
        ['Promo3', Math.floor(Math.random() * 99)],
        ['Promo4', Math.floor(Math.random() * 99)]
      ]
    }
  });
  */
  
	
			
	//ajax call
	//on success
	/*
	d3.json("data/spline2.json", function(err, data){
		//alert(data.columns[0]);
		
		var dataX = [
				getaxis(),
				data(1),
				data(2),
				data(3),
				data(4),
				data(5)
		];
        
		var dataX = [
            ['x', new Date().getTime()],
            ['Promo1', Math.floor(Math.random() * 99)],
            ['Promo2', Math.floor(Math.random() * 99)],
            ['Promo3', Math.floor(Math.random() * 99)],
            ['Promo4', Math.floor(Math.random() * 99)]
		];
		
		//dataX = [getaxis(), data.columns[1], data.columns[2], data.columns[3], data.columns[4]];
		
		pubnub.publish({
			channel: channel,
			message: {
			  columns: dataX
			}
		  });
	});
			*/
	function getaxis() {
	    return ['x', new Date().getTime()];
	}

    //generate dummy data
	function data(i) {
	    return ['Promo' + i, mathrandom()];
	}

	
}, 3000);

	function getaxis(){
		return ['x', new Date().getTime()];
	}
	
	//generate dummy data
	function data(i){
		return [ 'Promo' + i, mathrandom()];
	}

	function mathrandom() {
		return Math.floor(Math.random() * 99);
	}
	