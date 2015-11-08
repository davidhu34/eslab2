var URL = 'http://localhost:3000';

var RadarChart = Chart.Radar;


class RadarC extends React.Component{
	constructor() {
		super();

		this.state = {
			accel: [],
			climate: [],
			ambient: [],
			gps: [],
			ChartXYZ: null,
			ChartClimate: null,
			ChartAmbient: null,
			canvasGPS: null
		};
	}

	playXYZ(data) {
		var count = 1;
		var inter = setInterval(function () {
									var cxyz = this.state.ChartXYZ;
									cxyz.datasets[0].points.map(function(p, idx){
										return p.value = data[count][idx];
									});
									this.setState({ChartXYZ: cxyz});
									count++;
								 }.bind(this), 1000);
		setTimeout(function(){
			clearInterval(inter);
		}, 1000*data.length-500);
	}
	componentDidMount() {
		$.get('/data', function(data){
			var accelData = [];
			var climateData = [];
			var ambientData = [];
			var gpsData = [];
			data.map( function(data) {
				switch(data.type) {
					case 'accelerometer':
						if(accelData.length < 6)
						accelData.push(data.data);
						break;
					case 'climate':
					if(climateData.length < 6)
						climateData.push(data.data);
						break;
					case 'ambient':
					if(ambientData.length < 6 )
						ambientData.push(data.data);
						break;
					case 'gps':	
					if(gpsData.length < 6)
						gpsData.push(data.data);
						break;
					default:
						break;
				}
			});
			this.setState({
							accel: accelData[0],
							climate: climateData,
							ambient: ambientData,
							gps: gpsData
			});
			console.log(gpsData);
			var canvasXYZ = React.findDOMNode(this.refs.radarXYZ).getContext("2d");
			
			var ChartXYZ = new Chart(canvasXYZ).Radar({
					labels: ["X","Y","Z"],
					datasets: [
						{
							label: "My First dataset",
							fillColor: "rgba(220,220,220,0.2)",
							strokeColor: "rgba(220,220,220,1)",
							pointColor: "rgba(220,220,220,1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220,220,220,1)",
							data: this.state.accel
						}
					]
			});
			var canvasClimate = React.findDOMNode(this.refs.lineClimate).getContext("2d");
			React.findDOMNode(this.refs.lineClimate).width = 1000;
			var canvasAmbient = React.findDOMNode(this.refs.lineAmbient).getContext("2d");
			React.findDOMNode(this.refs.lineAmbient).width = 1000;
			var cdata = {
				labels: this.state.climate.map(function(c, idx){
							return 'data'+idx;}),
				datasets: [
					{
						label: "temperture",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: this.state.climate.map(function(c){
									return c[0];
								})
					},
					{
						label: "humidity",
						fillColor: "rgba(151,187,205,0.2)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: this.state.climate.map(function(c){
									return c[1];
								})
					}
				]
			};
			var adata = {
				labels: this.state.climate.map(function(c, idx){
							return 'data'+idx;}),
				datasets: [
					{
						label: "temperture",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: this.state.ambient.map(function(a) {
									return a[0];
								})
					},
					{
						label: "humidity",
						fillColor: "rgba(151,187,205,0.2)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: this.state.ambient.map(function(a){
									return a[1];
								})
					}
				]
			};
			var ChartClimate = new Chart(canvasClimate).Line(cdata);
			var ChartAmbient = new Chart(canvasAmbient).Line(adata);
			var canvasGPS = React.findDOMNode(this.refs.plainGPS).getContext("2d");
			canvasGPS.beginPath();
			console.log(this.state.gps);
			this.state.gps.map(function(location, idx) {
				if ( idx === 0 )
					canvasGPS.moveTo( (location[0]-121.530)*100000, 150-(location[1]-25.017)*100000 );
				else
					canvasGPS.lineTo( (location[0]-121.530)*100000, 150-(location[1]-25.017)*100000 );
			});

			canvasGPS.strokeStyle="red";

			canvasGPS.stroke();
			

			this.setState({
				ChartXYZ: ChartXYZ,
				ChartClimate: ChartClimate,
				ChartAmbient: ChartAmbient,
				canvasGPS: canvasGPS
			});


			this.playXYZ(accelData);

		}.bind(this), 'json');
	}

	render(){
		if(this.state.ChartXYZ)
			this.state.ChartXYZ.update();
		return (
			<div>
				acceleration by sec
				<canvas ref="radarXYZ" /><br/>
				temperture and humidity
				<canvas ref="lineClimate" /><br/>
				light & sound level
				<canvas ref="lineAmbient" /><br/>
				gps route
				<canvas ref="plainGPS" />
			</div>
		);
	}
}

React.render(<RadarC />, document.getElementById('content'));
