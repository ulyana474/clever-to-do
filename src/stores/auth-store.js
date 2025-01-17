import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import router from '@/router';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged 
} from 'firebase/auth';


export const useAuthStore = defineStore('auth', () => {

  const user = ref(JSON.parse(localStorage.getItem('user')));
  const returnUrl = ref(null);
  const errorMessage = ref('')

  const isAuthenticated = computed(() => !!user.value);

  const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        console.log('Login successful');
        errorMessage.value = '';
        router.push('/calendar');
      } catch (error) {
        console.error('Login error:', error.message);
        errorMessage.value = 'Invalid email or password. Please try again.';
      }
  };

  const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
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
  }

  function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
          unsubscribe()
          resolve(user)
        },
        reject
      )
    })
  }

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');

    router.push('/account/login');
  };

  return {
    user,
    returnUrl,
    isAuthenticated,
    errorMessage,
    login,
    register,
    logout,
    getCurrentUser
  };
});
