<template>
    <div id="trending_area">
        <div id="trendin_wrapper">
            <h3 id="trending_title">Quantity by hospital location</h3>
            <div id="control_area">
                <button @click="show_quantity_by_location"                id="btn_option1" class="control_area_btn active">Show quantity by location</button>
                <button @click="show_quantity_by_hospital_section"        id="btn_option2" class="control_area_btn">Show quantity by hospital section</button>
                <button @click="show_drugs_by_date_of_birth"              id="btn_option3" class="control_area_btn">Show drugs by date of birth</button>
                <button @click="show_most_used_drugs_by_hospital_section" id="btn_option4" class="control_area_btn">Show most used drugs by hospital section</button>
            </div>
            <div id="chart_area">
                <select @change="update_additional_list" name="additional_list" id="additional_list" class="hidden">
                    <option v-bind:key="option" v-for="option in option_list">{{option}}</option>
                </select>
                <select @change="update_hospital_section_list" name="hospital_section_list" id="hospital_section_list" class="hidden">
                    <option v-bind:key="section" v-for="section in hospital_section_list">{{section}}</option>
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
        background: url('../assets/wallpaper_.jpg');
        color: white;
        font-weight: bold;
        border: none;
    }
    #additional_list {
        width: 130px;
        text-align: center;
    }
    #hospital_section_list {
        width: 300px;
    }
    .hidden {
        display: none;
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
            option_list: [],
            hospital_section_list: []
        }
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        async show_quantity_by_location() { 
            document.querySelector("#btn_option1").classList.add('active');
            document.querySelector("#btn_option2").classList.remove('active');
            document.querySelector("#btn_option3").classList.remove('active');
            document.querySelector("#btn_option4").classList.remove('active');
            document.querySelector("#additional_list").classList.add('hidden');

            if (localStorage.getItem('cached_labels1') != null) {
                this.labels = JSON.parse(localStorage.getItem("cached_labels1"));
                this.data = JSON.parse(localStorage.getItem("cached_data1"));
                this.forceRerender();
                return;
            }

            // caching the location and quantity by locations for speed boost on loading component
            const locations = await axios.get('http://localhost:8080/api/v1/patients-stats/distinct-locations').catch(err => console.log(err));

            let quantity_by_location = [];
            for (let i = 0; i < locations.data.length; ++i) {
                let quantity = await axios.get('http://localhost:8080/api/v1/patients-stats/quantity-by-location?location=' + locations.data[i]).catch(err => console.log(err));
                quantity_by_location.push(quantity.data);
            }

            this.labels = locations.data;
            this.data = quantity_by_location;

            if (localStorage.getItem('cached_labels1') === null) {
                localStorage.setItem('cached_labels1', JSON.stringify(this.labels));
                localStorage.setItem('cached_data1', JSON.stringify(this.data));
            }

            this.forceRerender();
        },
        async show_quantity_by_hospital_section() {
            document.querySelector("#trending_title").innerHTML = "Quantity by hospital section";
            document.querySelector("#btn_option1").classList.remove('active');
            document.querySelector("#btn_option2").classList.add('active');
            document.querySelector("#btn_option3").classList.remove('active');
            document.querySelector("#btn_option4").classList.remove('active');
            document.querySelector("#additional_list").classList.add('hidden');
            document.querySelector("#hospital_section_list").classList.add('hidden');

            if (localStorage.getItem('cached_labels2') != null) {
                this.labels = JSON.parse(localStorage.getItem("cached_labels2"));
                this.data = JSON.parse(localStorage.getItem("cached_data2"));
                this.forceRerender();
                return;
            }

            const sections = await axios.get("http://localhost:8080/api/v1/patients-stats/distinct-hospital-section").catch(err => console.log(err));
            let quantity_by_section = [];
            for (let i = 0; i < sections.data.length; ++i) {
                let quantity = await axios.get('http://localhost:8080/api/v1/patients-stats/quantity-by-hospital-section?section=' + sections.data[i]).catch(err => console.log(err));
                quantity_by_section.push(quantity.data);
            }
            
            this.labels = sections.data;
            this.data = quantity_by_section;

            if (localStorage.getItem('cached_labels2') === null) {
                localStorage.setItem('cached_labels2', JSON.stringify(this.labels));
                localStorage.setItem('cached_data2', JSON.stringify(this.data));
            }

            this.forceRerender();
        },
        async show_drugs_by_date_of_birth() { 
            document.querySelector("#trending_title").innerHTML = "Drugs by age segments";
            document.querySelector("#btn_option1").classList.remove('active');
            document.querySelector("#btn_option2").classList.remove('active');
            document.querySelector("#btn_option3").classList.add('active');
            document.querySelector("#btn_option4").classList.remove('active');
            document.querySelector("#additional_list").classList.remove('hidden');
            document.querySelector("#hospital_section_list").classList.add('hidden');
            
            const age_segment = ['1920 - 1930', '1930 - 1940', '1940 - 1950', '1950 - 1960', '1960 - 1970', '1970 - 1980', '1980 - 1990', '1990 - 2000']
            this.option_list = age_segment;

            if (localStorage.getItem('cached_labels3') != null) {
                this.labels = JSON.parse(localStorage.getItem("cached_labels3"));
                this.data = JSON.parse(localStorage.getItem("cached_data3"));
                this.forceRerender();
                return;
            }

            const drugs = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-drugs-by-age-segment?startYear=1920&endYear=1930').catch(err => console.log(err));
            const quantities = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-quantities-by-age-segment?startYear=1950&endYear=1970').catch(err => console.log(err));

            this.labels = drugs.data.splice(0, 50);
            this.data = quantities.data.splice(0, 50);

            if (localStorage.getItem('cached_labels3') === null) {
                localStorage.setItem('cached_labels3', JSON.stringify(this.labels));
                localStorage.setItem('cached_data3', JSON.stringify(this.data));
            }

            this.forceRerender();
        },
        async show_most_used_drugs_by_hospital_section() { 
            document.querySelector("#trending_title").innerHTML = "Drugs by hospital section";
            document.querySelector("#btn_option1").classList.remove('active');
            document.querySelector("#btn_option2").classList.remove('active');
            document.querySelector("#btn_option3").classList.remove('active');
            document.querySelector("#btn_option4").classList.add('active');
            document.querySelector("#additional_list").classList.add('hidden');
            document.querySelector("#hospital_section_list").classList.remove('hidden');
            
            const section_list = await axios.get("http://localhost:8080/api/v1/patients-stats/distinct-hospital-section").catch(err => console.log(err));
            this.hospital_section_list = section_list.data;

            const drugs = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-drugs-by-hospital-section?section=' + section_list.data[0]).catch(err => console.log(err));
            const quantities = await axios.get('http://localhost:8080/api/v1/patients-stats//most-used-drugs-quantities-by-hospital-section?section=' + section_list.data[0]).catch(err => console.log(err));
        
            this.labels = drugs.data;
            this.data = quantities.data;
            
            console.log(drugs);
            console.log(quantities);

            this.forceRerender();
        },
        show_disease_type_by_age_segments() {
            document.querySelector("#trending_title").innerHTML = "Disease type by age segments";
            document.querySelector("#btn_option1").classList.remove('active');
            document.querySelector("#btn_option2").classList.remove('active');
            document.querySelector("#btn_option3").classList.remove('active');
            document.querySelector("#btn_option4").classList.remove('active');
            document.querySelector("#additional_list").classList.add('hidden');
        },
        async update_additional_list(event) {
            const age_segment = event.target.value;
            const startYear = age_segment.split(' - ')[0];
            const endYear = age_segment.split(' - ')[1];

            console.log(startYear, endYear);
            const drugs = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-drugs-by-age-segment?startYear=' + startYear + '&endYear=' + endYear).catch(err => console.log(err));
            const quantities = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-quantities-by-age-segment?startYear='+ startYear + '&endYear=' + endYear).catch(err => console.log(err));

            this.labels = drugs.data.splice(0, 50);
            this.data = quantities.data.splice(0, 50);

            this.forceRerender();
        },
        async update_hospital_section_list(event) {
            const section = event.target.value;
            const drugs = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-drugs-by-hospital-section?section=' + section).catch(err => console.log(err));
            const quantities = await axios.get('http://localhost:8080/api/v1/patients-stats/most-used-drugs-quantities-by-hospital-section?section=' + section).catch(err => console.log(err));
        
            let size = drugs.data.length > 50 ? 50 : drugs.data.length;
            this.labels = drugs.data.splice(0, size);
            this.data = quantities.data.splice(0, size);

            this.forceRerender();
        }
    },
    async created() {
        if (localStorage.getItem('cached_labels2') != null) {
            this.labels = JSON.parse(localStorage.getItem("cached_labels2"));
            this.data = JSON.parse(localStorage.getItem("cached_data2"));
            this.forceRerender();
            return;
        }

        const sections = await axios.get("http://localhost:8080/api/v1/patients-stats/distinct-hospital-section").catch(err => console.log(err));
        let quantity_by_section = [];
        for (let i = 0; i < sections.data.length; ++i) {
            let quantity = await axios.get('http://localhost:8080/api/v1/patients-stats/quantity-by-hospital-section?section=' + sections.data[i]).catch(err => console.log(err));
            quantity_by_section.push(quantity.data);
        }
            
        this.labels = sections.data;
        this.data = quantity_by_section;

        if (localStorage.getItem('cached_labels2') === null) {
            localStorage.setItem('cached_labels2', JSON.stringify(this.labels));
            localStorage.setItem('cached_data2', JSON.stringify(this.data));
        }

        this.forceRerender();
    },
    components: { ChartDrug }
})
</script>
