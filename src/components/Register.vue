<template>
    <div class="register_container">
        <form @submit.prevent="processUserRegistration">
            <div class="first_name_area">
                <label for="first_name_input">Enter your first name...</label><br>
                <input v-model="first_name" name="first_name_input" type="text" id="first_name_input" required/>
            </div>
            <div class="spacer"></div>
            <div class="last_name_area">
                <label for="last_name_input">Enter your last name...</label><br>
                <input v-model="last_name" name="last_name_input" type="text" id="last_name_input" required/>
            </div>
            <div class="spacer"></div>
            <div class="email_area">
                <label for="email_input">Enter your email...</label><br>
                <input v-model="email" name="email_input" type="email" id="email_input" response/>
            </div>
            <div class="spacer"></div>
            <div class="password_area">
                <label for="password_input">Enter your password...</label><br>
                <input v-model="password" name="password_input" type="password" id="password_input" required/>
            </div>
            <div class="spacer"></div>
            <div class="confirm_password_area">
                <label for="confirm_password_input">Confirm your password...</label><br>
                <input v-model="confirmed_password" name="confirm_password_input" type="password" id="confirm_password_input" required/>
            </div>
            <button id="register_button" type="submit" value="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default ({
    name: 'Register',
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmed_password: ''
        }
    },
    methods: {
        async processUserRegistration() {
            // const config = {
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //     }
            // }
            const data = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
            }
            console.log(data)

            const response = await axios.post('http://localhost:8080/api/v1/users/register', data)
                 .then(res => console.log(res))
                 .catch(err => console.log(err));

            console.log(response);
            this.$router.push('/login');
        }
    }
})
</script>

<style scoped>
    .register_container {
        width: 450px;
        height: 636px;
        background: white;
        margin: auto;
        position: relative;
        top: 150px;
        border-radius: 3px;
        margin-bottom: 200px;
    }
    .first_name_area, .last_name_area, .email_area, .password_area, .confirm_password_area {
        position: relative;
        top: 50px;
    }
    .first_name_area label, .last_name_area label, .email_area label, .password_area label, .confirm_password_area label {
        text-align: left;
        float: left;
        margin-left: 10%;
    }
    .first_name_area input, .last_name_area input, .email_area input, .password_area input, .confirm_password_area input {
        width: 80%;
        background: white;
        border: none;
        border-bottom: 2px solid #607D8B;
    }
    .first_name_area input:focus, .last_name_area input:focus, .email_area input:focus, .password_area input:focus, .confirm_password_area input:focus {
        outline: none;
        border-bottom: 2px solid #E65100;
    }
    .spacer {
        padding: 15px;
    }
    #register_button {
        position: relative;
        top: 100px;
        width: 150px;
        height: 45px;
        background: #E65100;
        border: none;
        color: white;
        border-radius: 3px;
        transition: .3s;
    }
    #register_button:hover {
        background: #FFA726;
    }
</style>
