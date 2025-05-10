<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" />
        </div>
        <div class="input-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" v-model="confirmPassword"  />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p>
        Already have an account?
        <router-link to="/">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      successMessage: ''
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        console.log('User signed up:', userCredential.user);
        this.successMessage = 'Sign-up successful! You can now log in.';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      } catch (error) {
        console.error('Error signing up:', error);
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.signup-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px;
}
h2 {
  margin-bottom: 20px;
}
.input-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #333;
}
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
