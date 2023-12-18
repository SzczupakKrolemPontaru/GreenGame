<template>
  <div class="centered-container" v-if="isSignUp()">
    <h1>Stwórz konto</h1>
    <button v-on:click="changeType('login')" class="btn btn-sm btn-outline-dark">
      Masz już konto?
    </button>
  </div>

  <div class="centered-container" v-if="isLogin()">
    <h1>Zaloguj się</h1>
    <button v-on:click="changeType('signup')" class="btn btn-sm btn-outline-dark">
      Nie masz jeszcze konta?
    </button>
  </div>
  <br>
  <div class="card w-50 mx-auto">
    <div class="card-body">
      <div>
        <h3 v-if="isLogin()" class="card-title">Wprowadź dane konta</h3> <!-- Przypominam tylko że cała aplikacja ma być po polsku i przeznaczona jest na małych dzieci poniżej 10 roku życia-->
        <h3 v-if="isSignUp()" class="card-title">Podaj dane nowego konta</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group mb-2">
            <label for="email">Email:</label>
            <input
                type="email"
                id="email"
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Tutaj wprowadź email"
                :class="{'is-invalid': isEmailInvalid() && this.emailTouched}"
                @blur="setEmailTouched"
            />
            <p class="invalid-feedback" v-if="isEmailInvalid()">Wpisz poprawny adres email.</p>
          </div>

          <div v-if="isSignUp()" class="form-group mb-2">
            <label for="name">Imię:</label>
            <input
                type="text"
                id="name"
                v-model="name"
                class="form-control form-control-lg"
                placeholder="Tutaj wprowadź imię"
                :class="{'is-invalid': isNameInvalid() && this.nameTouched}"
                @blur="setNameTouched"
            />
            <p class="invalid-feedback" v-if="isEmailInvalid()">Imię musi mieć przynajmniej 3 znaki.</p>
          </div>

          <div class="form-group mb-2">
            <label class="text-lg-start" for="password">Hasło:</label>
            <input
                type="password"
                id="password"
                v-model="password"
                class="form-control form-control-lg"
                placeholder="Tutaj podaj hasło"
                :class="{'is-invalid': isPasswordInvalid() && this.passwordTouched}"
                @blur="setPasswordTouched"
            />
            <p class="invalid-feedback" v-if="isPasswordInvalid()">Hasło musi mieć przynajmniej 8 znaków.</p>
          </div>
          <div  v-if="isSignUp()" class="form-group mb-2">
            <label for="password">Potwierdź hasło:</label>
            <input
                type="password"
                id="passwordConfirm"
                v-model="passwordConfirm"
                class="form-control form-control-lg"
                placeholder="Tutaj powtórz hasło"
                :class="{'is-invalid': isPasswordConfirmInvalid() && this.confirmTouched}"
                @blur="setConfirmTouched"
            />
            <p class="invalid-feedback" v-if="isPasswordConfirmInvalid()">Wpisane hasła różnią się.</p>

          </div>
          <button :disabled="!isFormValid()" type="submit" class="btn btn-primary" >Wyślij</button>
        </form>
        <div v-if="isLoading" class="mt-2 spinner-border" role="status">
          <span class="visually-hidden">Ładowanie...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 start-50 translate-middle-x">
    <div style="background-color: #C45D64" ref="toastEl" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Błąd serwera</strong>
        <small>Teraz</small>
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
          await this.$router.push('/mainmenu');
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
          this.serverMessage = 'To konto nie istnieje';
          break;
        case 'auth/wrong-password':
          this.serverMessage = 'Niepoprawne hasło';
          break;
        case 'auth/network-request-failed':
          this.serverMessage = 'Sprawdź połączenie sieciowe!';
          break;
        case 'auth/email-already-in-use':
          this.serverMessage = 'Ten adres email jest już w użyciu!';
          break;
        default:
          this.serverMessage= `Nieznany błąd ${e.message}`;
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