import React from 'react';
import '../stylesheets/Splash.css';

function Splash(props) {
    return <div id="splash">
        <div id="splash-main">
            <div id="splash-desc">
                Welcome to Taskr! Create a new task or check your current tasks. 
            </div>
            <div id="splash-button" onClick={() => props.history.push("/new-task")}>
                CREATE A TASK
            </div>
            <div id="splash-button" onClick={() => props.history.push("/tasks")}>
                SEE CURRENT TASKS
            </div>
        </div>
    </div>
}

export default Splash;