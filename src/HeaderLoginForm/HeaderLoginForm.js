import React from 'react'
import './HeaderLoginForm.css'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import ThisWeekContext from '../ThisWeekContext'

class HeaderLoginForm extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    };

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            user: '',
            isLoading: false,
            error: null
        }
    }

    addEmail(email) {
        this.setState({ email });
    }

    addPassword(password) {
        this.setState({ password });
    }

    // Handle user login and create auth token
    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({ error: null, isLoading: true });
        const { email, password } = ev.target
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveUserId(res.userid)
                this.setState({ isLoading: false })
                window.location = '/events';
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    static contextType = ThisWeekContext;

    render() {
        const { error, isLoading } = this.state;
        return (
            <section className='sign-in'>
                <form className='sign-in-form' onSubmit={this.handleSubmitJwtAuth}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        value={this.state.email}
                        onChange={e => this.addEmail(e.target.value)}
                    />
                    <label htmlFor='email'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={this.state.password}
                        onChange={e => this.addPassword(e.target.value)}
                    />
                    <button type='submit'>Sign In</button>
                    <div className="error" role="alert">
                        {isLoading && <span className='login-loading'>Logging in...</span>}
                        {error && <span className="login-error">{error}</span>}
                    </div>
                </form>
            </section>
        )
    }
}

export default HeaderLoginForm


