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
  <div class="card m-3">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group">
          <label>Email</label>
          <Field
            name="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <Field
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Login
          </button>
          <router-link to="register" class="btn btn-link">Register</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
