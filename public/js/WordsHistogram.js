export default class WordsHistogram {
	constructor(container) {
		this.container = container;
	}

	updateBody(sortedWords) {
		Highcharts.chart(this.container.id, {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Count of Top 10 Words'
			},
			xAxis: {
				categories: sortedWords.map(([word]) => word),
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Word Count',
					align: 'high'
				}
			},
			series: [
				{
					showInLegend: false,
					name: 'Word Count',
					data: sortedWords.map(([_, count]) => count)
				}
			]
		});
	}

	clear() {
		while (this.container.firstChild)
			this.container.removeChild(this.container.firstChild);
	}
}
