<template>
    <div id="prediction_area">
        <div class="wrapper">
            <h3>This is where magic happens</h3>
            <div id="drug_choose_area">
                <label for="drug_list">Choose one item from the list below: </label>
                <select @change="updateChart" name="drug_list" id="drug_list">
                    <option v-bind:key="drug" v-for="drug in drugList">{{drug}}</option>
                </select>
            </div>
            <ChartDrug :key="componentKey" :type="type" :label="label" :labels="this.labels" :data="this.data" :backgroundColor="this.backgroundColor" :background="this.background" />
            <div class="future_prediction_area">
                <label for="future_prediction_input">Choose a date in order to predict usage: </label>
                <input @change="generateResults" type="date" id="start" name="future_prediction_input"
                    value="2018-07-22"
                    min="2018-01-01" max="2025-12-31">
                <p id="prediction_result">Prediction result: </p>
                <p id="predicted_quantity">Quantity: </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    body {
        background: white;
    }
    #prediction_area {
        margin: auto;
        width: 90%;
        height: 1150px;
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
        width: 90%;
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
            drugList: [],
            componentKey: 0,
            type: "line",
            label: "Quantity",
            labels: [],
            data: [],
            backgroundColor: '#6200EA',
            background: '#6200EA',
        }
    },
    components: {
        ChartDrug
    },
    async created() {
        // const response = await axios.get('http://localhost:8080/api/v1/predictions', {
        //     headers: {
        //         Autorization: "Bearer " + localStorage.getItem('token')
        //     }
        // }).catch(err => console.log(err));

        const drugListData = await axios.get('http://localhost:8080/api/v1/drugs/distinct-names').catch(err => console.log(err));
        this.drugList = drugListData.data;

        const quantities = await axios.get('http://localhost:8080/api/v1/drugs/get-quantities/?name=' + 'acarbosum').catch(err => console.log(err));
        const dates = await axios.get('http://localhost:8080/api/v1/drugs/get-dates/?name=' + 'acarbosum').catch(err => console.log(err));
        this.labels = dates.data;
        for (let i = 0; i < this.labels.length; ++i) {
            this.labels[i] = this.labels[i].split('T')[0];
        }
        this.data = quantities.data;
        this.forceRerender();
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        async generateResults(event) {
            const predicted_quantity = document.querySelector("#predicted_quantity");
            predicted_quantity.innerHTML = "Quantity: " + Math.random() * 123;
            console.log(event.target.value);

            const selected_drug = document.querySelector("#drug_list").value;
            console.log(selected_drug);

            let date_to_predict = event.target.value;
            let toTimestamp = Date.parse(date_to_predict) / 1000;
            console.log(toTimestamp)
            const predicted_result = await axios.get('http://127.0.0.1:5000/predict?drug=' + selected_drug + '&&timestamp=' + toTimestamp).catch(err => console.log(err));
            if (Number.parseFloat(predicted_result.data) > 0) {
                document.querySelector("#predicted_quantity").innerHTML = "Quantity: " + predicted_result.data;
            } else {
                document.querySelector("#predicted_quantity").innerHTML = "Warning: not enough data to predict";
            }
            console.log(predicted_result.data)
        },
        async updateChart(event) {
            // this.generateChartConfig(event.target.value);
            const drugName = event.target.value;
            const quantities = await axios.get('http://localhost:8080/api/v1/drugs/get-quantities/?name=' + drugName).catch(err => console.log(err));
            const dates = await axios.get('http://localhost:8080/api/v1/drugs/get-dates/?name=' + drugName).catch(err => console.log(err));

            this.labels = dates.data;
            for (let i = 0; i < this.labels.length; ++i) {
                this.labels[i] = this.labels[i].split('T')[0];
            }
            this.data = quantities.data;
            this.forceRerender();
        }
    }
})
</script>
