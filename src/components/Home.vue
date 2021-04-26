<template>
    <div id="prediction_area">
        <div class="wrapper">
            <h3>This is where magic happens</h3>
            <div id="drug_choose_area">
                <label for="drug_list">Choose one item from the list below: </label>
                <select @change="updateChart" name="drug_list" id="drug_list">
                    <option value="1">Drug1</option>
                    <option value="2">Drug2</option>
                    <option value="3">Drug3</option>
                    <option value="4">Drug4</option>
                    <option value="5">Drug5</option>
                </select>
            </div>
            <ChartDrug :key="componentKey" :type="type" :label="label" :labels="this.labels" :data="this.data" :backgroundColor="this.backgroundColor" :background="this.background" />
            <div class="future_prediction_area">
                <label for="future_prediction_input">Choose a date in order to predict usage: </label>
                <input @change="generateResults" type="date" id="start" name="future_prediction_input"
                    value="2018-07-22"
                    min="2018-01-01" max="2025-12-31">
                <p id="prediction_result">Prediction result: </p>
                <p id="predicted_quantity">Quantity: 126</p>
                <p id="predicted_probability">Probability: 0.87</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #prediction_area {
        width: 100%;
        height: 800px;
        background: #ECEFF1;
        position: relative;
        top: 90px;
    }
    .wrapper {
        position: relative;
        top: 40px;
    }
    #drug_choose_area {
        position: relative;
        top: 20px;
    }
    #drug_choose_area label {
        display: block;
    }
    #drug_choose_area select {
        width: 250px;
    }
    .future_prediction_area {
        position: relative;
        top: 100px;
        width: 100%;
        height: 200px;
        background: #212121;
        padding-top: 20px;
        color: white;
    }
    #drug_prediction_chart {
        width: 800px;
        height: 400px;
        margin: auto;
        position: relative;
        top: 50px;
    }
</style>
<script>
import axios from 'axios'
import ChartDrug from './ChartDrug.vue'


export default ({
    name: 'Home',
    data() {
        return {
            componentKey: 0,
            type: "line",
            label: "Quantity",
            labels: ['12.02.2020', '16.02.2020', '1.03.2020', '2.03.2020', '9.03.2020', '12.03.2020', '12.03.2020', '16.03.2020', '13.03.2020', '2.04.2020', '9.04.2020', '12.04.2020'],
            data: [100, 99, 70, 120, 86, 56, 61, 56, 12, 11, 17, 30],
            backgroundColor: '#EF6C00',
            background: '#EF6C00',
        }
    },
    components: {
        ChartDrug
    },
    async created() {
        const response = await axios.get('http://localhost:8080/api/v1/predictions', {
            headers: {
                Autorization: "Bearer " + localStorage.getItem('token')
            }
        }).catch(err => console.log(err));
        console.log(response);
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
            console.log("hehe");
        },
        generateResults() {
            const predicted_quantity = document.querySelector("#predicted_quantity");
            const predicted_probability = document.querySelector("#predicted_probability");
            predicted_quantity.innerHTML = "Quantity: " + Math.random() * 123;
            predicted_probability.innerHTML = "Probability" + 0.2 + Math.random();
            console.log("E bine!");
        },
        generateChartConfig(idx) {
            this.forceRerender();
            if (idx == 1) {
                console.log("111111111111111");
                this.type = "line",
                this.label = "Quantity",
                this.labels = ['12.02.2020', '16.02.2020', '1.03.2020', '2.03.2020', '9.03.2020', '12.03.2020', '12.03.2020', '16.03.2020', '13.03.2020', '2.04.2020', '9.04.2020', '12.04.2020'],
                this.data = [100, 99, 70, 120, 86, 56, 61, 56, 12, 11, 17, 30],
                this.backgroundColor = '#EF6C00',
                this.background = '#EF6C00'
            } else if (idx == 2) {
                console.log("2222222222222222");
                this.type = "line",
                this.label = "Quantity",
                this.labels = ['2.02.2020', '6.02.2020', '11.03.2020', '12.03.2020', '19.03.2020', '22.03.2020', '23.03.2020', '26.03.2020', '27.03.2020', '2.04.2020', '9.04.2020', '12.04.2020'],
                this.data = [10, 19, 90, 120, 186, 156, 161, 256, 12, 81, 107, 130],
                this.backgroundColor = '#69F0AE',
                this.background = '#69F0AE'
            } else if (idx == 3) {
                this.type = "line",
                this.label = "Quantity",
                this.labels = ['2.02.2021', '6.02.2021', '11.03.2021', '12.03.2021', '19.03.2021', '22.03.2021', '23.03.2021', '26.03.2021', '27.03.2021', '2.04.2021', '9.04.2021', '12.04.2021'],
                this.data = [210, 49, 240, 120, 386, 256, 161, 356, 102, 181, 207, 330],
                this.backgroundColor = '#2962FF',
                this.background = '#2962FF'
            } else if (idx == 4) { 
                this.type = "line",
                this.label = "Quantity",
                this.labels = ['2.02.2021', '6.02.2021', '11.03.2021', '12.03.2021', '19.03.2021', '22.03.2021', '23.03.2021', '26.03.2021', '27.03.2021', '2.04.2021', '9.04.2021', '12.04.2021'],
                this.data = [10, 49, 40, 20, 86, 56, 61, 56, 12, 81, 27, 89],
                this.backgroundColor = '#6200EA',
                this.background = '#6200EA'
            } else if (idx == 5) {
                this.type = "line",
                this.label = "Quantity",
                this.labels = ['2.02.2021', '6.02.2021', '11.03.2021', '12.03.2021', '19.03.2021', '22.03.2021', '23.03.2021', '26.03.2021', '27.03.2021', '2.04.2021', '9.04.2021', '12.04.2021'],
                this.data = [100, 490, 400, 200, 860, 560, 610, 560, 120, 810, 270, 890],
                this.backgroundColor = '#000000',
                this.background = '#000000'
            }
        },
        updateChart(event) {
            this.generateChartConfig(event.target.value);
            console.log(event.target.value);
        }
    }
})
</script>
