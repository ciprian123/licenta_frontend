<template>
    <div id="trending_area">
        <div id="trendin_wrapper">
            <h3 id="trending_title">Here are the most used drugs according to our data</h3>
            <div id="control_area">
                <button @click="sort_by_quantity" id="sort_by_quantity_btn" class="active">Sort by quantity</button>
                <button @click="sort_by_price" id="sort_by_price_btn">Sort by price</button>
                <button @click="group_by_company" id="group_by_disease_btn">Show company data</button>
            </div>
            <ChartDrug id="trending_chart" :key="componentKey" :type="type" :label="label" :labels="this.labels" :data="this.data" :backgroundColor="this.backgroundColor" :background="this.background" />
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
        width: 80%;
        height: 100px;
        margin: auto;
    }
    #sort_by_price_btn, #sort_by_quantity_btn, #group_by_disease_btn {
        display: inline;
        position: relative;
        top: 50px;
        padding: 10px 15px;
        margin: 0 12px;
        border-radius: 5px;
        font-size: 16px;
        transition: .4s;
        /* border: none; */
    }
    .active {
        background: #EF6C00;
        color: white;
        font-weight: bold;
        border: none;
    }
    #sort_by_price_btn:hover, #sort_by_quantity_btn:hover, #group_by_disease_btn:hover {
        background: #EF6C00;
        color: white;
        font-weight: bold;
        border: none;
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
        async sort_by_price() {
            const sort_by_price_btn = document.querySelector("#sort_by_price_btn");
            const sort_by_quantity_btn = document.querySelector("#sort_by_quantity_btn");
            const group_by_disease_type = document.querySelector("#group_by_disease_btn");

            sort_by_price_btn.classList.add('active');
            sort_by_quantity_btn.classList.remove('active');
            group_by_disease_type.classList.remove('active');

            const names = await axios.get('http://localhost:8080/api/v1/drugs/biggest-prices-name').catch(err => console.log(err));
            const prices = await axios.get('http://localhost:8080/api/v1/drugs/biggest-prices-price').catch(err => console.log(err));

            this.label = "Price"
            this.labels = names.data;
            this.data = prices.data;
            this.backgroundColor = "#37474F";

            this.forceRerender();
        },
        async sort_by_quantity() {
            const sort_by_price_btn = document.querySelector("#sort_by_price_btn");
            const sort_by_quantity_btn = document.querySelector("#sort_by_quantity_btn");
            const group_by_disease_type = document.querySelector("#group_by_disease_btn");

            sort_by_price_btn.classList.remove('active');
            sort_by_quantity_btn.classList.add('active');
            group_by_disease_type.classList.remove('active');

            const names = await axios.get('http://localhost:8080/api/v1/drugs/most-used-drug-names').catch(err => console.log(err));
            const quantities = await axios.get('http://localhost:8080/api/v1/drugs/most-used-drug-quantities').catch(err => console.log(err));

            this.label = "Quantity";
            this.labels = names.data;
            this.data = quantities.data;
            this.backgroundColor = '#6200EA';

            this.forceRerender();
        },
        async group_by_company() {
            const sort_by_price_btn = document.querySelector("#sort_by_price_btn");
            const sort_by_quantity_btn = document.querySelector("#sort_by_quantity_btn");
            const group_by_disease_type = document.querySelector("#group_by_disease_btn");

            sort_by_price_btn.classList.remove('active');
            sort_by_quantity_btn.classList.remove('active');
            group_by_disease_type.classList.add('active');

            const names = await axios.get('http://localhost:8080/api/v1/drugs/company-names').catch(err => console.log(err));
            const quantities = await axios.get('http://localhost:8080/api/v1/drugs/company-quantities').catch(err => console.log(err));

            this.label = "Quantity";
            this.labels = names.data;
            this.data = quantities.data;
            this.backgroundColor = '#3D5AFE';

            this.forceRerender();
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
