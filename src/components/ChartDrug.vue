<template>
    <div>
        <canvas id="drug_prediction_chart"></canvas>
    </div>
</template>

<style scoped>
#drug_prediction_chart {
    width: 800px;
    height: 400px;
    margin: auto;
    position: relative;
    top: 50px;
}
</style>

<script>
import Chart from '../../node_modules/chart.js/dist/chart.js'
import customizeDrugChart from '../chart_config.js'

export default {
    name: 'ChartDrug',
    data() {
        return {
            labels_to_predict: [],
            data_to_predict: [],
            drugPredictionChartData: customizeDrugChart(
                                                    this.type,
                                                    this.label,
                                                    this.labels,
                                                    this.data,
                                                    this.backgroundColor,
                                                    this.background
                                                )
        }
    },
    methods: {
        generateChart() {
            const ctx = document.querySelector('#drug_prediction_chart');
            new Chart(ctx, this.drugPredictionChartData);
        }
    },
    mounted() {
        this.generateChart();
    },
    props: {
        type: String,
        label: String,
        labels: Array, 
        data: Array, 
        backgroundColor: String,
        borderColor: String,
        updateComponent: Boolean
    }
}
</script>