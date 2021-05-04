<template>
    <div id="trending_area">
        <div id="trendin_wrapper">
            <h3 id="trending_title">Here are the most used drugs according to our data</h3>
            <ChartDrug id="trending_chart" :key="componentKey" :type="type" :label="label" :labels="this.labels" :data="this.data" :backgroundColor="this.backgroundColor" :background="this.background" />
        </div> 
    </div>
</template>

<style scoped>
    #trending_area {
        width: 100%;
        height: 900px;
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
        }
    },
    async created() {
        const names = await axios.get('http://localhost:8080/api/v1/drugs/most-used-drug-names').catch(err => console.log(err));
        const quantities = await axios.get('http://localhost:8080/api/v1/drugs/most-used-drug-quantities').catch(err => console.log(err));

        this.labels = names.data;
        this.data = quantities.data;

        console.log('hehe');
        this.forceRerender();
    },
    components: { ChartDrug }
})
</script>
