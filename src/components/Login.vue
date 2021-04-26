<template>
    <div class="login_container">
        <form @submit.prevent="processUserLogin">
            <div class="email_area">
                <label for="email_input">Enter your email...</label><br>
                <input v-model="email" name="email_input" type="email" id="email_input" required/>
            </div>
            <div class="spacer"></div>
            <div class="password_area">
                <label for="password_input">Enter your password...</label><br>
                <input v-model="password" name="password_input" type="password" id="password_input" required/>
            </div>
            <div class="spacer"></div>
            <div class="wrapper">
                <a href="#" id="forgot_password_link" target="_blank">Forgot password?</a>
                <a href="#" id="new_user_link" target="_blank">New user?</a>
            </div>
            <button id="login_button" type="submit" value="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default ({
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async processUserLogin() {
            const data = {
                email: this.email,
                password: this.password
            }
            const response = await axios.post('http://localhost:8080/api/v1/users/login', data)
                //  .then(res => console.log(res))
                 .catch(err => console.log(err));
            if (response != undefined && response.status != 200) {
                console.log('Invalid email of password!');
            } else {
                // console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                this.$router.push('/predictions')
            }
        }
    }
})
</script>

<style scoped>
    .login_container {
        width: 450px;
        height: 406px;
        background: white;
        margin: auto;
        position: relative;
        top: 150px;
        border-radius: 3px;
        margin-bottom: 200px;
    }
    .email_area, .password_area {
        position: relative;
        top: 50px;
    }
    .email_area label, .password_area label {
        text-align: left;
        float: left;
        margin-left: 10%;
    }
    .email_area input, .password_area input {
        width: 80%;
        background: white;
        border: none;
        border-bottom: 2px solid #607D8B;
    }
    .email_area input:focus, .password_area input:focus {
        outline: none;
        border-bottom: 2px solid #E65100;
    }
    .spacer {
        padding: 15px;
    }
    #login_button {
        position: relative;
        top: 120px;
        width: 150px;
        height: 45px;
        background: #E65100;
        border: none;
        color: white;
        border-radius: 3px;
        transition: .3s;
        margin: auto;
        text-align: center;
    }
    #login_button:hover {
        background: #FFA726;
    }
    #forgot_password_link, #new_user_link {
        color: #343434;
        transition: .4s;
    }
    #forgot_password_link:hover, #new_user_link:hover {
        color: #E65100;
    }
    #forgot_password_link {
        float: left;
        margin-left: 10%;
    }
    #new_user_link {
        float: right;
        margin-right: 10%;
    }
    .wrapper {
        width: 100%;
        position: relative;
        top: 50px;
    }
</style>