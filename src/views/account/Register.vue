<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const authStore = useAuthStore();

async function onSubmit(values) {
  const { email, password } = values;

  await authStore.register(email, password);
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h4 class="card-header">Create an Account</h4>
      <div class="card-body">
        <div v-if="authStore.errorMessage" class="alert">{{ authStore.errorMessage }}</div>

        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
          <div class="form-group">
            <label for="email">Email</label>
            <Field
              id="email"
              name="email"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              placeholder="Enter your email"
            />
            <div class="invalid-feedback">{{ errors.email }}</div>
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
              Register
            </button>
          </div>

          <div class="login-link">
            <router-link to="/accounts/login">Already have an account? Login here</router-link>
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

.card-header {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
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

.is-invalid {
  border: 2px solid var(--accent-color);
}

.invalid-feedback {
  color: var(--accent-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
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

.btn:hover {
  background-color: var(--primary-color);
}

.btn:disabled {
  background-color: var(--background-color);
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid var(--text-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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

.form-group {
  display: flex;
  flex-direction: column;
}
</style>
