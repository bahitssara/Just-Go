import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'


class Header extends React.Component{
    render() {
        return(
            <header className='header'>
            <Link to='/'className='home-link'>
              <h1>This Week
              <i className='fas fa-calendar-alt'></i></h1>
            </Link>
              <form className='sign-in-form'>
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
                  <button type='submit'>Sign In</button>
              </form>
            </header>
        )
    }
}

export default Header;