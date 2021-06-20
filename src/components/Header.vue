<template>
    <header>
        <h4>My prediction app</h4>
        <nav>
            <ul id="navigation_link_list">
                <li><router-link v-if="this.hadSavedToken" to="predictions"><span @click="check_token">Predictions</span></router-link></li>
                <li><router-link v-if="this.hadSavedToken" id="trending_link" to="trending"><span @click="check_token">Trending</span></router-link></li>
                <li><router-link v-if="this.hadSavedToken" id="patient_stats_link" to="patient-stats"><span @click="check_token">Patient statistics</span></router-link></li>
                <li><router-link v-if="this.hadSavedToken" id="login_link" to="login"><span @click="clear_token">Logout</span></router-link></li>
                <li><router-link v-if="!this.hadSavedToken" id="login_l_link" to="login"><span @click="check_token">Login</span></router-link></li>
                <li><router-link v-if="!this.hadSavedToken" id="register_link" to="register"><span @click="check_token">Register</span></router-link></li>
            </ul>
        </nav>
    </header>    
</template>

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
    .hidden {
        display: none;
    }
</style>
<script>
export default({
    name: 'Header',
    data() {
        return {
            hadSavedToken: localStorage.getItem('cached_user_jwt') !== null
        }
    },
    created() {
        if (localStorage.getItem('cached_user_jwt') === null) {
            this.$router.push("/login");
            this.hadSavedToken = false;
            return;
        }
        this.hadSavedToken = true;
    },
    methods: {
        clear_token() {
            console.log("Clearing token");
            localStorage.removeItem('cached_user_jwt');
            this.$router.go();
        },
        check_token() {
            this.hadSavedToken = localStorage.getItem('cached_user_jwt') !== null;
        }
    }
})
</script>