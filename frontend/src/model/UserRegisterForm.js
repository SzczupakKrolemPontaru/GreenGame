import {UserLoginForm} from "@/model/UserLoginForm";
import {createUser} from "@/firebase/auth";
import {UserDAO} from "@/firebase/userDAO";

export class UserRegisterForm extends UserLoginForm {

    _passwordConfirm;
    _name;

    constructor(email, password, router, passwordConfirm, name) {
        super(email, password, router);
        this.passwordConfirm = passwordConfirm;
        this.name = name;

    }

    get passwordConfirm() {
        return this._passwordConfirm;
    }

    set passwordConfirm(value) {
        this._passwordConfirm = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    validatePasswordConfirm() {
        return this.passwordConfirm === this.password;
    }

    validateName() {
        return this.name.length >= 3;
    }

    validateForm() {
        super.validateForm();
        if (!this.validatePasswordConfirm()) {
            throw new Error('Podane hasła różnią się!');
        }
        if (!this.validateName()) {
            throw new Error('Imię musi mieć minimum 3 znaki');
        }
    }

    async submit() {
        const user = await createUser(
            this.email,
            this.password
        );
        const userDAO = new UserDAO();
        await userDAO.createUserDocument(user, {name: this.name});
    }


}