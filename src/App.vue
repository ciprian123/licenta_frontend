<template>
<div id="app">  
  <Header/>
  <router-view />
  <Footer/>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
  background: #ECEFF1;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}
#app {
  text-align: center;
}
</style>