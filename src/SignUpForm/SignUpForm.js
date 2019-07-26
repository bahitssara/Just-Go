import React from 'react'


class SignUpForm extends React.Component{
    render() {
        return(
            <section className='signup-page'>
                <h3>Sign Up To Start</h3>
                <form className='sign-up-main'>
                    <fieldset className='sign-up-fieldset'>
                        <label>First Name</label>
                        <input
                            type='text'
                            name='first_name'
                            id='first-name-input'
                        />
                        <label>Last Name</label>
                        <input
                            type='text'
                            name='last_name'
                            id='last-name-input'
                        />
                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email-input'
                        />
                        <label>Password</label>
                        <input
                            type='text'
                            name='password'
                            id='password-input'
                        />
                        <button className='sign-up-button'>Create Account</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}

export default SignUpForm