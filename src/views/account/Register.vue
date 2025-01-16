<template>
<div class="container">
    <div class="card">
    <h4 class="card-header">Create an Account</h4>
    <div v-if="errorMessage" class="alert">{{ errorMessage }}</div>
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

const errorMessage = ref('');

const register = async () => {
try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
    console.log('Successfully registered!');
    router.push('/accounts/login');
    errorMessage.value = '';
} catch (error) {
    if (error.code == "auth/email-already-in-use") {
        errorMessage.value = "The email address is already in use";
    } else if (error.code == "auth/invalid-email") {
        errorMessage.value = "The email address is not valid.";
    } else if (error.code == "auth/operation-not-allowed") {
        errorMessage.value = "Operation not allowed.";
    } else if (error.code == "auth/weak-password") {
        errorMessage.value = "The password is too weak.";
    }
}
};
</script>

<style scoped>
.container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: linear-gradient(135deg, var(--secondary-color) 0%, var(--background-color) 100%);
color: var(--background-color);
}

.card {
width: 24rem;
padding: 2rem;
border-radius: 15px;
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.alert {
  background-color: rgba(255, 0, 0, 0.1);
  color: var(--accent-color);
  padding: 0.75rem;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 1rem;
  font-size: small;
}

.card-header {
text-align: center;
font-weight: bold;
font-size: 1.5rem;
color: var(--primary-color);
margin-bottom: 1rem;
}

.form-group {
display: flex;
flex-direction: column;
}

.form-control {
background: rgba(255, 255, 255, 0.8);
border: none;
color: var(--text-color);
padding: 0.75rem;
border-radius: 5px;
}

.form-control::placeholder {
color: var(--text-color);
}

.btn {
width: 100%;
padding: 0.75rem;
background-color: var(--primary-color);
color: var(--background-color);
font-weight: bold;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
}

.login-link {
text-align: center;
margin-top: 1rem;
}

.login-link a {
color: var(--primary-color);
text-decoration: none;
font-weight: bold;
}

.login-link a:hover {
text-decoration: underline;
}
</style>
