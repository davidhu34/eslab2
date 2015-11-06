var URL = 'http://localhost:3000';

var RadarChart = Chart.Radar;


class RadarC extends React.Component{
	constructor() {
		super();

		this.state = {
			data: []
		};
	}
	play(data, len) {
		var count = 1;
			setInterval(function(){
				this.setState({data: data.xyz[count]});
				console.log(count);
				count++;
				if(count === len) {
					clearInterval(this);
				};
				
			}.bind(this), 1000);
	}
	componentDidMount() {
		$.get('/data', function(data){
			this.setState({data: data.xyz[0]});
			this.play(data);
		}.bind(this), 'json');
	}

	render(){
		if ( React.findDOMNode(this.refs.radar) ) {
			var rcanvas = React.findDOMNode(this.refs.radar).getContext("2d");
			var RadarChart = new Chart(rcanvas).Radar({
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
				            data: this.state.data
				        }
					]
			});
		}
		return (
			<div>
				asdg
				<canvas ref="radar" />
			</div>
		);
	}
}

React.render(<RadarC />, document.getElementById('content'));