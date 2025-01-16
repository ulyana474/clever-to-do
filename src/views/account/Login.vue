<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const schema = Yup.object().shape({
  username: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const errorMessage = ref('');
const router = useRouter();

async function onSubmit(values) {
  const { username, password } = values;

  try {
    await signInWithEmailAndPassword(getAuth(), username, password);
    console.log('Login successful');
    errorMessage.value = '';
    router.push('');
  } catch (error) {
    console.error('Login error:', error.message);
    errorMessage.value = 'Invalid username or password. Please try again.';
  }
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h4 class="card-header">Login</h4>
      <div class="card-body">
        <div v-if="errorMessage" class="alert">{{ errorMessage }}</div>

        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
          <div class="form-group">
            <label for="username">Email</label>
            <Field
              id="username"
              name="username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.username }"
              placeholder="Enter your email"
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              placeholder="Enter your password"
            />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>

          <div class="form-actions">
            <button class="btn" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner"></span>
              Login
            </button>
          </div>

          <div class="register-link">
            <router-link to="register">Don't have an account? Register here</router-link>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

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

.alert {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
  padding: 0.75rem;
  border-radius: 5px;
  text-align: center;
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

.is-invalid {
  border: 2px solid #ff6b6b;
}

.invalid-feedback {
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
  background-color: #590d22;
}

.btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #590d22;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

.form-group {
  display: flex;
  flex-direction: column;
}
</style>
