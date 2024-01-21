import {signInUser} from "@/firebase/auth";

export class UserLoginForm {

    _email;
    _password;
    emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    validateEmail() {
        return this.emailRegex.test(this.email);
    }

    validatePassword() {
        return this.password.length >= 8;
    }

    validateForm() {
        if (!this.validateEmail()) {
            throw new Error('Niepoprawny adres email!');
        }
        if (!this.validatePassword()) {
            throw new Error('Niepoprawna długość hasła. Minimum 8 znaków!');
        }
    }

    async submit() {
        await signInUser(this.email, this.password);
    }

    async redirectToMainMenu() {
        await this.$router.push('/mainmenu');
    }

    constructor(email, password, router) {
        this.email = email;
        this.password = password;
        this.$router = router;
    }

}