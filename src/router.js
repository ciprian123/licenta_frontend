import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import TrendingDrugs from './components/TrendingDrugs.vue';
import PatientStats from './components/PatientStats.vue'

Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {path: '/predictions', component: Home},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/trending', component: TrendingDrugs},
        {path: '/patient-stats', component: PatientStats}
    ]
});
