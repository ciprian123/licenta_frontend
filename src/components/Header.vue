<template>
    <header>
        <h4>My prediction app</h4>
        <nav>
            <ul>
                <li>
                    <a href="#">Login</a>
                </li>
                <li>
                    <a href="#">Sign up</a>
                </li>
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
        background: #E65100;
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
        padding: 0 12px;
        color: #ECEFF1;
        text-decoration: none;
        font-weight: bold;
    }
</style>