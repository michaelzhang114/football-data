export function drawGraph() {
	const config = {
		type: "bar",
		data: data,
		options: {
			indexAxis: "y",
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				bar: {
					borderWidth: 2,
				},
			},
			responsive: true,
			plugins: {
				legend: {
					position: "right",
				},
				title: {
					display: true,
					text: "Chart.js Horizontal Bar Chart",
				},
			},
		},
	};

	const DATA_COUNT = 7;
	const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

	const labels = Utils.months({ count: 7 });
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Dataset 1",
				data: Utils.numbers(NUMBER_CFG),
				borderColor: Utils.CHART_COLORS.red,
				backgroundColor: Utils.transparentize(
					Utils.CHART_COLORS.red,
					0.5
				),
			},
			{
				label: "Dataset 2",
				data: Utils.numbers(NUMBER_CFG),
				borderColor: Utils.CHART_COLORS.blue,
				backgroundColor: Utils.transparentize(
					Utils.CHART_COLORS.blue,
					0.5
				),
			},
		],
	};
}
