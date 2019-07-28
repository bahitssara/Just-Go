import React from 'react'
import './LoginForm.css'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component{
    render() {
        return(
            <section className='sign-in'>
                <form className='sign-in-page'>
                    <fieldset>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='text'
                        name='email'
                        id='email'
                        />
                    <label htmlFor='email'>Password</label>
                    <input 
                        type='text'
                        name='password'
                        id='password'
                        />
                    <Link to='/events'><button type='submit'>Sign In</button></Link>
                    </fieldset>
                </form>
            </section>
        )
    }
}

export default LoginForm