import React from 'react';
import '../stylesheets/Splash.css';

function Splash(props) {
    return <div id="splash">
        <div id="splash-main">
            <div id="splash-desc">
                Welcome to Taskr! Click the button to make a to do. 
            </div>
            <div id="splash-button" onClick={() => props.history.push("/new-task")}>
                CREATE A TO DO
            </div>
            <div id="splash-button" onClick={() => props.history.push("/tasks")}>
                SEE CURRENT TASKS
            </div>
        </div>
    </div>
}

export default Splash;