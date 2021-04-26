export function customizeDrugChart(type, label, labels, data, backgroundColor, borderColor) {
    return {
        type: type,
        data: {
        labels: labels,
            datasets: [
            {
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 3
            }
        ]
        },
        options: {
            responsive: true,
            lineTension: 1,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            padding: 25
                        }
                    }
                ]
            }
        }
    }
}
  
export default customizeDrugChart;