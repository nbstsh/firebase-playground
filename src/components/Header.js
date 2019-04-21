import React from 'react'
import './Header.css'

const Header = ({ setActiveContainer, activeContainer}) => {

    const NavItem = ({ statusName, text }) => {
        return (
            <li 
                className={activeContainer=== statusName ? 'active': ''}
                onClick={() => setActiveContainer(statusName)}
            >
                {text}
            </li>
        )
    }
    return (
        <header className='Header' data-active-container={activeContainer}>
            <nav>
                <ul>
                    <NavItem statusName='auth' text='Auth' />
                    <NavItem statusName='storage' text='Storage' />
                    <NavItem statusName='realtimeDatabase' text='RealtimeDB' />
                </ul>
            </nav>
        </header>
    )
}


export default Header