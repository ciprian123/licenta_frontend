<template>
    <header>
        <h4>My prediction app</h4>
        <nav>
            <ul id="navigation_link_list">
                <li><router-link to="predictions">Predictions</router-link></li>
                <li><router-link to="trending">Trending</router-link></li>
                <li><router-link to="patient-stats">Patient statistics</router-link></li>
                <li><router-link id="login_link" to="login">Logout</router-link></li>
            </ul>
        </nav>
    </header>    
</template>

<script>
export default ({
    name: "Header"
})
</script>


<style scoped>
    header {
        width: 100%;
        height: 90px;
        /* background: #E65100; */
        background: url('../assets/wallpaper_.jpg');
        position: absolute;
        top: 0;
    }
    header h4 {
        color: white;
        text-align: left;
        margin: 32px;
    }
    nav {
        width: 30%;
        float: right;
    }
    nav ul {
        list-style-type: none;
        position: relative;
        bottom: 60px;
    }
    nav ul li {
        display: inline;
    }
    nav ul li a {
        padding: 7px 10px;
        margin-right: 15px;
        padding-left: 2px;
        color: #ECEFF1;
        text-decoration: none;
        font-weight: bold;
    }
    .router-link-active {
        color: #263238;
        font-weight: bold;
        padding-bottom: 33px;
        border-bottom: 5px solid #263238;
    }
    #prediction_icon, #trending_icon {
        width: 28px;
        height: 28px;
    }
    #statistics_icon {
        width: 26px;
        height: 26px;
    }
</style>
<script>
export default({
    name: 'Header',
    methods: {
        mark_as_active_predictions() {
            document.querySelector("#predictions_link").classList.add("active");
            document.querySelector("#trending_link").classList.remove("active");
            document.querySelector("#predictions_link").classList.remove("active");
        },
        mark_as_active_trending() {
            document.querySelector("#predictions_link").classList.remove("active");
            document.querySelector("#trending_link").classList.add("active");
            document.querySelector("#predictions_link").classList.remove("active");
        },
        mark_as_active_patient_stats() {
            document.querySelector("#predictions_link").classList.remove("active");
            document.querySelector("#trending_link").classList.remove("active");
            document.querySelector("#predictions_link").classList.add("active");
        }
    }
})
</script>