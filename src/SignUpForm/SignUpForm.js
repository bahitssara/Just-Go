import React from 'react'
import './SignUpForm.css'
import ThisWeekContext from '../ThisWeekContext'
import AuthApiService from '../services/auth-api-service'
import ValidationError from '../ValidationError/ValidationError'

class SignUpForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            error: null,
            first_nameValid: false,
            last_nameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false,
            validationMessages: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }
        }
    }

    handleAddUser = ev => {
        ev.preventDefault()
        const { first_name, last_name, email, password } = ev.target
        this.setState({ error: null })
        AuthApiService.postUser({
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            password: password.value,
        })
            .then(user => {
                first_name.value = ''
                last_name.value = ''
                email.value = ''
                password.value = ''

                window.location = '/events';
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }


    addFirstName(first_name) {
        this.setState({ first_name }, () => { this.validateFirstName(first_name) });
    }

    addLastName(last_name) {
        this.setState({ last_name }, () => { this.validateLastName(last_name) });
    }

    addEmail(email) {
        this.setState({ email }, () => { this.validateEmail(email) });
    }

    addPassword(password) {
        this.setState({ password }, () => { this.validatePassword(password) });
    }


    validateFirstName(fieldValue) {
        const fieldErrors = { ...this.state.validationMessage }
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.first_name = 'First name is required';
            hasError = true;
        } else {
            if (fieldValue.length < 2) {
                fieldErrors.first_name = 'First name must be at least 2 characters long';
                hasError = true;
            } else {
                fieldErrors.first_name = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            first_nameValid: !hasError
        }, this.formValid);
    }

    validateLastName(fieldValue) {
        const fieldErrors = { ...this.state.validationMessage }
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.last_name = 'Last name is required';
            hasError = true;
        } else {
            if (fieldValue.length < 2) {
                fieldErrors.last_name = 'Last name must be at least 2 characters long';
                hasError = true;
            } else {
                fieldErrors.last_name = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            last_nameValid: !hasError
        }, this.formValid);
    }

    validateEmail(fieldValue) {
        const fieldErrors = { ...this.state.validationMessage }
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.email = 'Email is required';
            hasError = true;
        } else {
            if (fieldValue.length < 3) {
                fieldErrors.email = 'Email must be at least 3 characters long';
                hasError = true;
            } else {
                fieldErrors.email = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            emailValid: !hasError
        }, this.formValid);
    }

    validatePassword(fieldValue) {
        const fieldErrors = { ...this.state.validationMessage }
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.password = 'Password is required';
            hasError = true;
        } else {
            if (fieldValue.length < 8) {
                fieldErrors.password = 'Password must be at least 8 characters long with 1 uppercase 1 number and 1 symbol';
                hasError = true;
            } else {
                fieldErrors.password = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            passwordValid: !hasError
        }, this.formValid);
    }

    static contextType = ThisWeekContext;
    render() {
        const { error } = this.state
        return(
            <section className='signup-page'>
                <h3>Sign Up To Start</h3>
                <form className='sign-up-main' onSubmit={this.handleAddUser}>
                    <fieldset className='sign-up-fieldset'>
                        <label>First Name</label>
                        <input
                            type='text'
                            name='first_name'
                            id='first-name-input'
                            onChange={e => this.addFirstName(e.target.value)}
                        />
                        <ValidationError hasError={!this.state.first_nameValid} message={this.state.validationMessages.first_name} />                       
                        <label>Last Name</label>
                        <input
                            type='text'
                            name='last_name'
                            id='last-name-input'
                            onChange={e => this.addLastName(e.target.value)}
                        />
                        <ValidationError hasError={!this.state.last_nameValid} message={this.state.validationMessages.last_name} />

                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email-input'
                            onChange={e => this.addEmail(e.target.value)}
                        />
                        <ValidationError hasError={!this.state.emailValid} message={this.state.validationMessages.email} />

                        <label>Password</label>
                        <input
                            type='text'
                            name='password'
                            id='password-input'
                            onChange={e => this.addPassword(e.target.value)}
                        />
                        <ValidationError hasError={!this.state.passwordValid} message={this.state.validationMessages.password} />
                        <div className="error" role="alert">
                            {error && <span className="signup-error">{error}</span>}
                        </div>
                        <button className='sign-up-submit'>Create Account</button>
                        <ul>
                            <li>*All fields are required</li>
                            <li>*Password must have 1 uppercase, one symbol, and at least 8 characters</li>
                        </ul>
                    </fieldset>
                </form>
            </section>
        )
    }
}

export default SignUpForm