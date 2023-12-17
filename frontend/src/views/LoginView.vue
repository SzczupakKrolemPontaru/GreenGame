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
        <h3 v-if="isLogin()" class="card-title">Enter your credentials</h3> <!-- Przypominam tylko że cała aplikacja ma być po polsku i przeznaczona jest na małych dzieci poniżej 10 roku życia-->
        <h3 v-if="isSignUp()" class="card-title">Enter your new account info</h3>
        <form @submit.prevent="submitForm">
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

          <div v-if="isSignUp()" class="form-group mb-2">
            <label for="name">Name:</label>
            <input
                type="text"
                id="name"
                v-model="name"
                class="form-control form-control-lg"
                placeholder="Enter your name"
                :class="{'is-invalid': isNameInvalid() && this.nameTouched}"
                @blur="setNameTouched"
            />
            <p class="invalid-feedback" v-if="isEmailInvalid()">Name has to be at least 3 characters long!</p>
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
        <div v-if="isLoading" class="mt-2 spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 start-50 translate-middle-x">
    <div style="background-color: #C45D64" ref="toastEl" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Server error</strong>
        <small>Just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div style="font-weight: bold" class="toast-body">
        {{serverMessage}}
      </div>
    </div>
  </div>

</template>

<script>
import {createUser, signInUser} from "@/firebase/auth.js";
import {Toast} from "bootstrap";
import {createUserDocument} from "@/firebase/userDAO";

export default {
  name: "LoginView",
  data() {
    return {
      type: 'login',
      email: '',
      password: '',
      passwordConfirm: '',
      name:'',
      emailTouched: false,
      passwordTouched: false,
      confirmTouched: false,
      nameTouched: false,
      emailRegex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      serverMessage: '',
      isLoading: false

    };
  },
  methods: {
    changeType(newType) {
      this.type = newType;
      this.email = '';
      this.name = '';
      this.password = '';
      this.passwordConfirm = '';
      this.emailTouched = false;
      this.passwordTouched = false;
      this.confirmTouched = false;
      this.serverMessage = '';
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
    setNameTouched() {
      this.nameTouched = true;
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
    isNameInvalid() {
      if (this.type === 'login') {
        return false;
      }
      return this.name.length < 3
    },
    isFormValid() {
      return !(this.isEmailInvalid() || this.isPasswordInvalid()
          || this.isPasswordConfirmInvalid() || this.isNameInvalid());
    },
    login() {
      this.$router.push({
          name: 'mainmenu',
          params: {
            email: this.email
            // do zmiany, mail moze byc, ale przekazywany paramsami musi byc username w celu pobrani danych z bazy
          }
        })
    },
    async submitForm() {
      {
        this.isLoading = true;
        try {
          if (this.type === 'login') {

            await signInUser(this.email, this.password);

          } else {
            const user = await createUser(
                this.email,
                this.password
            );
            await createUserDocument(user, {name: this.name});

          }
          this.isLoading = false;
          await this.$router.push('/');
        } catch (e) {
          const toastEl = this.$refs.toastEl;
          const toast = new Toast(toastEl);
          console.log(e.code);
          this.isLoading = false;
          this.errorHandling(e);
          toast.show();
          setTimeout(() => {
            if (toast.isShown()) {
              toast.hide();
            }
          }, 4000);
        }




      }
    },
    errorHandling(e) {
      console.log(e)
      switch (e.code) {
        case 'auth/invalid-credential':
          this.serverMessage = 'This account does not exist';
          break;
        case 'auth/wrong-password':
          this.serverMessage = 'Wrong password';
          break;
        case 'auth/network-request-failed':
          this.serverMessage = 'Check your network connection!';
          break;

        default:
          this.serverMessage= 'Case ${e.message} is not yet implemented';
      }

    }
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