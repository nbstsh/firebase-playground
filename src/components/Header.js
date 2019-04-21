import React from 'react'
import './Header.css'

const Header = ({ setActiveContainer, activeContainer}) => {
    return (
        <header className='Header' data-active-container={activeContainer}>
            <nav>
                <ul>
                    <li 
                        className={activeContainer==='auth' ? 'active': ''}
                        onClick={() => setActiveContainer('auth')}
                    >
                        Auth
                    </li>

                    <li 
                        className={activeContainer==='storage' ? 'active': ''}
                        onClick={() => setActiveContainer('storage')}
                    >
                        Storage
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header