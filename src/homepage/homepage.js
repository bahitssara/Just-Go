import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'


export default function HomePage() {
    return (
        <section className='home-page'>
            <h2>Welcome</h2>
            <i className='fas fa-calendar' />
            <i className='fas fa-music' />
            <p>What's up? You're visitng <b>Just Go</b>! Do you ever plan out concerts or events you don't end up going to? Or maybe you plan them but forget to actually purchase tickets? Let's fix that. Save all the events you're dying to attend in one place! </p>
            <Link to='/signup'><button className='sign-up-button'>Sign Up</button></Link>
            <section className='demo-login-info-home'>
                <h4>Demo login info:
                            <p>Email: testuser@email.com</p>
                    <p>Password: TestUser101!</p>
                </h4>
            </section>
        </section>
    )
}