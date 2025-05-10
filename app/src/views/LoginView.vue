<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email"/>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password"  />
        </div>
        <button type="submit">Login</button>
        
      </form>
      <router-link to="/home">Dev</router-link>
      <p>
        
        Don't have an account?
        <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log('Logged in user:', userCredential.user);
        this.$router.push('/home');
      } catch (error) {
        console.error('Error logging in:', error);
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.login-box {
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
</style>
