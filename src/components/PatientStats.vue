<template>
    <div id="trending_area">
        <div id="trendin_wrapper">
            <h3 id="trending_title">Here are the most used drugs according to our data</h3>
            <div id="control_area">
                <button @click="show_quantity_by_location"                class="control_area_btn active">Show quantity by location</button>
                <button @click="show_quantity_by_hospital_section"        class="control_area_btn">Show quantity by hospital section</button>
                <button @click="show_drugs_by_date_of_birth"              class="control_area_btn">Show drugs by date of birth</button>
                <button @click="show_most_used_drugs_by_hospital_section" class="control_area_btn">Show most used drugs by hospital section</button>
                <button @click="show_most_used_drugs_by_age_segments"     class="control_area_btn">Show most used drugs by age segments</button>
                <button @click="show_disease_type_by_age_segments"        class="control_area_btn">Show disease types by age segments</button>
            </div>
            <div id="chart_area">
                <select  name="additional_list_" id="additional_list_">
                    <option value="item1">item1</option>
                    <option value="item2">item2</option>
                    <option value="item3">item3</option>
                    <option value="item4">item4</option>
                </select>
                <ChartDrug id="trending_chart" :key="componentKey" :type="type" :label="label" :labels="this.labels" :data="this.data" :backgroundColor="this.backgroundColor" :background="this.background" />
            </div>
        </div> 
    </div>
</template>

<style scoped>
    #trending_area {
        width: 100%;
        height: 1100px;
        background: #ECEFF1;
        position: relative;
        top: 90px;
    }
    #trendin_wrapper {
        width: 90%;
        margin: auto;
        text-align: center;
    }
    #trending_title {
        padding: 23px 0;
        position: relative;
        top: 20px;
    }
    #control_area {
        width: 20%;
        min-width: 300px;
        height: 500px;
        float: left;
        position: relative;
        top: 30px;
    }
    #chart_area {
        width: 78%;
        float: right;
        height: 600px;
        position: relative;
        top: 50px;
    }
    #trending_chart {
        width: 100%;
        height: 700px;
    }
    .control_area_btn {
        float: left;
        width: 300px;
        text-align: center;
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        border: none;
        background: #FFAB91;
    }
    .active {
        background: #EF6C00;
        color: white;
        font-weight: bold;
        border: none;
    }
    #additional_list_ {
        width: 250px;
    }
</style>
<script>
import ChartDrug from './ChartDrug.vue'
import axios from 'axios'


export default ({
    name: 'TrendingDrugs',
    data() {
        return {
            componentKey: 0,
            type: "bar",
            label: "Quantity",
            labels: [],
            data: [],
            backgroundColor: '#6200EA',
            background: '#6200EA',
        }
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        show_quantity_by_location() { console.log("to be implemented"); },
        show_quantity_by_hospital_section() { console.log("to be implemented"); },
        show_drugs_by_date_of_birth() { console.log("to be implemented"); },
        show_most_used_drugs_by_hospital_section() { console.log("to be implemented"); },
        show_most_used_drugs_by_age_segments() { console.log("to be implemented"); },
        show_disease_type_by_age_segments() { console.log("to be implemented"); }
    },
    async created() {
        const names = await axios.get('http://localhost:8080/api/v1/drugs/most-used-drug-names').catch(err => console.log(err));
        const quantities = await axios.get('http://localhost:8080/api/v1/drugs/most-used-drug-quantities').catch(err => console.log(err));

        this.labels = names.data;
        this.data = quantities.data;

        this.forceRerender();
    },
    components: { ChartDrug }
})
</script>
