import React from 'react'
import { Link } from 'react-router-dom'


export default function HomePage() {
    return(
        <section className='home-page'>
            <h2>Welcome</h2>
                <p>What's up? You're visitng <b>This Week</b>. Do you ever plan out concerts you don't end up going to? Or maybe you plan them but forget to actually purchase tickets? Let's fix that. Plan out your week and get your concert/social life flourishing!</p>
            <Link to='/signup'>Sign Up</Link>
        </section>
    )
}