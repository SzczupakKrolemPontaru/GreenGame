<template>
  <div class="centered-container" v-if="isSignUp()">
    <h1>Create an account</h1>
    <button v-on:click="changeType('login')" class="btn btn-sm btn-outline-dark">
      Returning user?
    </button>
  </div>

  <div class="centered-container" v-if="isLogin()">
    <h1>Sign In</h1>
    <button v-on:click="changeType('signup')" class="btn btn-sm btn-outline-dark">
      New User?
    </button>
  </div>
<br>
  <div class="card w-50 mx-auto">
    <div class="card-body">
      <div>
        <h3 v-if="isLogin()" class="card-title">Enter your credentials</h3>
        <h3 v-if="isSignUp()" class="card-title">Enter your new account info</h3>
        <form @submit.prevent="submitForm">
          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
          </div>
          <div class="form-group mb-2">
            <label for="email">Email:</label>
            <input
                type="email"
                id="email"
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Enter your email"
                :class="{'is-invalid': isEmailInvalid() && this.emailTouched}"
                @blur="setEmailTouched"
            />
            <p class="invalid-feedback" v-if="isEmailInvalid()">Provide a valid email address!</p>
          </div>

          <div class="form-group mb-2">
            <label class="text-lg-start" for="password">Password:</label>
            <input
                type="password"
                id="password"
                v-model="password"
                class="form-control form-control-lg"
                placeholder="Enter your password"
                :class="{'is-invalid': isPasswordInvalid() && this.passwordTouched}"
                @blur="setPasswordTouched"
            />
            <p class="invalid-feedback" v-if="isPasswordInvalid()">Password has to be at least 8 characters long!</p>
          </div>
          <div  v-if="isSignUp()" class="form-group mb-2">
            <label for="password">Confirm password:</label>
            <input
                type="password"
                id="passwordConfirm"
                v-model="passwordConfirm"
                class="form-control form-control-lg"
                placeholder="Confirm your password"
                :class="{'is-invalid': isPasswordConfirmInvalid() && this.confirmTouched}"
                @blur="setConfirmTouched"
            />
            <p class="invalid-feedback" v-if="isPasswordConfirmInvalid()">Password and password confirm don't match!</p>
          </div>

          <button :disabled="!isFormValid()" type="submit" class="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  </div>


</template>

<script>
import {store} from '@/store';

export default {
  name: "LoginView",
  data() {
    return {
      type: 'login',
      email: '',
      password: '',
      passwordConfirm: '',
      emailTouched: false,
      passwordTouched: false,
      confirmTouched: false,
      errors: [],
      emailRegex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    };
  },
  methods: {
    changeType(newType) {
      this.type = newType;
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      this.emailTouched = false;
      this.passwordTouched = false;
      this.confirmTouched = false;
    },
    isLogin() {
      return this.type === 'login';
    },
    isSignUp() {
      return this.type === 'signup';
    },
    setEmailTouched() {
      this.emailTouched = true;
    },
    setPasswordTouched() {
      this.passwordTouched = true;
    },
    setConfirmTouched() {
      this.confirmTouched = true;
    },
    isEmailInvalid() {
      return !this.emailRegex.test(this.email)
    },
    isPasswordInvalid() {

      return this.password.length < 8

    },
    isPasswordConfirmInvalid() {
      if (this.type === 'login') {
        return false;
      }
      return (this.passwordConfirm !== this.password)
    },
    isFormValid() {

      return !(this.isEmailInvalid() || this.isPasswordInvalid() || this.isPasswordConfirmInvalid())

    },
    submitForm() {
      {
        if (this.type === 'login') {
          //todo get data from Firebase Login

        } else {
          //todo register Firebase user
        }
        console.log(this.email)
        console.log(this.password)
        store.user = {
          email: this.email,
          name: 'testName'
        };
        this.$router.push('/');


      }
    },
  }
}
</script>

<style scoped>

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>