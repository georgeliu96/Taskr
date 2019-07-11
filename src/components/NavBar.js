import React from 'react';
import '../stylesheets/NavBar.css'

function NavBar (props) {
    return <div id="navbar">
        <div id="logo" onClick={() => props.history.push("/")}>
            <h1>Taskr</h1>
        </div>
    </div>
}

export default NavBar;