<template>
<div class="container">
    <div class="card">
    <h4 class="card-header">Create an Account</h4>
    <div class="card-body">
        <form @submit.prevent="register">
        <div class="form-group">
            <label for="email">Email</label>
            <input
            id="email"
            type="text"
            v-model="email"
            placeholder="Enter your email"
            class="form-control"
            />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            class="form-control"
            />
        </div>

        <div class="form-actions">
            <button type="submit" class="btn">Submit</button>
        </div>

        <div class="login-link">
            <router-link to="/accounts/login">Already have an account? Login here</router-link>
        </div>
        </form>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
    console.log('Successfully registered!');
    router.push('/accounts/login');
} catch (error) {
    console.error('Registration error:', error.message);
}
};
</script>

<style scoped>
.container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: linear-gradient(135deg, #cdb4db 0%, #bde0fe 100%);
color: white;
}

.card {
width: 24rem;
padding: 2rem;
border-radius: 15px;
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-header {
text-align: center;
font-weight: bold;
font-size: 1.5rem;
color: #590d22;
margin-bottom: 1rem;
}

.form-group {
display: flex;
flex-direction: column;
margin-bottom: 1rem;
}

.form-control {
background: rgba(255, 255, 255, 0.8);
border: none;
color: #333;
padding: 0.75rem;
border-radius: 5px;
}

.form-control::placeholder {
color: #999;
}

.btn {
width: 100%;
padding: 0.75rem;
background-color: #590d22;
color: #ddd;
font-weight: bold;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
}

.btn:hover {
background-color: #7b2c39;
}

.login-link {
text-align: center;
margin-top: 1rem;
}

.login-link a {
color: #590d22;
text-decoration: none;
font-weight: bold;
}

.login-link a:hover {
text-decoration: underline;
}
</style>
