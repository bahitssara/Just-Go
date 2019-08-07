import React from 'react'
import { Link } from 'react-router-dom'
import demoMovie from './JustGoDemo.mp4'
import './HomePage.css'


export default function HomePage() {
    return (
        <section className='home-page'>
            <h2>Stop saying maybe...</h2>
            <i className='fas fa-calendar' />
            <i className='fas fa-music' />
            <video className='demo-video' autoPlay muted controls>
                    <source src={demoMovie} type='video/mp4' />
            </video>
            <h3>Find the right event and Just Go!</h3>
            <Link to='/signup'><button className='sign-up-button'>Sign Up Here</button></Link>
            <section className='demo-login-info-home'>
                <h4>Demo login info:
                            <p>Email: testuser@email.com</p>
                    <p>Password: TestUser101!</p>
                </h4>
            </section>
        </section>
    )
}