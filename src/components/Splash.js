import React from 'react';

function Splash(props) {
    return <div id="splash">
        <div id="splash-main">
            <div id="splash-desc">
                Welcome to Taskr! Click the button to make a to do. 
            </div>
            <div id="splash-button" onClick={() => props.history.push("/new-task")}>
                CREATE A TO DO
            </div>
        </div>
    </div>
}

export default Splash;