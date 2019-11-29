import React from 'react';
import * as yup from 'yup';

import withForm from '../../components/hocs/withForm';
import './register.css';
import userService from '../../services/user-services';

class Register extends React.Component {

    usernameOnChangeHandler = this.props.controlChangeHeaderFactory('username');
    emailOnChangeHandler = this.props.controlChangeHeaderFactory('email');
    passwordOnChangeHandler = this.props.controlChangeHeaderFactory('password');
    repeatPasswordOnChangeHandler = this.props.controlChangeHeaderFactory('repeatPassword');

    submitHandler = () => {
        // this.props.runValidations()
        //     .then(formData => console.log(formData));
        const errors = this.props.getFormErrorsState();
        if (!!errors) { return; }
        const data = this.props.getFormState();
        userService.register(data).then(() => {
            alert('SUCCESS!');
        })

    }

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorsState();
        return errorState && errorState[name] && errorState[name][0];
    }

    render() {
        const usernameError = this.getFirstControlError('username');
        const emailError = this.getFirstControlError('email');
        const passwordError = this.getFirstControlError('password');
        const repeatPasswordError = this.getFirstControlError('repeatPassword');

        return (
            <form>
                <div className="register-container">
                    <h1>Register</h1>
                    <p>Please fill this form to create your Account.</p>

                    <div className="input-div">
                        <label for="username"><b>Username</b></label>
                        <input type="text" placeholder="Enter your Username" name="username" onChange={this.usernameOnChangeHandler} />
                        {usernameError && <div>{usernameError}</div>}
                    </div>

                    <div className="input-div">
                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter your Email" name="email" onChange={this.emailOnChangeHandler} />
                        {emailError && <div>{emailError}</div>}
                    </div >

                    <div className="input-div">
                        <label for="password"><b>Password</b></label>
                        <input type="text" placeholder="Enter your Password" name="password" onChange={this.passwordOnChangeHandler} />
                        {passwordError && <div>{passwordError}</div>}
                    </div>

                    <div className="input-div">
                        <label for="repeat-password"><b>Repeat-Password</b></label>
                        <input type="text" placeholder="Repeat your Password" name="repeat-password" onChange={this.repeatPasswordOnChangeHandler} />
                        {repeatPasswordError && <div>{repeatPasswordError}</div>}
                    </div>

                    <div className="input-div">
                        <p>By creating an account, you agree to our <a href="/terms-and-privacy">Terms & Conditions</a>.</p>
                        <button type="button" className="register-btn" onClick={this.submitHandler}>Register</button>
                    </div>

                    <div className="info-container">
                        <p>Already have account? <a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        );
    }
}

const initialFormState = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
}

const schema = yup.object({
    username: yup.string('Username should be String')
        .required('Username is required')
        .min(4, 'Username should be at lest 4 symbols'),

    email: yup.string('Email should be String')
        .required('Email is required')
        .min(5, 'Email should be at least 5 character'),

    password: yup.string('Password should be String')
        .required('Password is required')
        .min(5, 'Password should be at least 5 character'),

    repeatPassword: yup.string('Repeated password should be String')
        // .oneOf([yup.ref('password'), null], 'Repeated password doesn\'t match the password')
        // .required('Repeated password is required')
        // .min(5, 'Repeated password should be at least 5 character'),
});

export default withForm(Register, initialFormState, schema);