import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../init-firebase.js';
import '../../stylesheets/todos/TaskIndex.css';

class TaskIndex extends React.Component {

    constructor(props) {
        super(props);
        this.category = this.props.match.params.category;
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        try {
            firebase.initializeApp(firebaseConfig);
        } catch(err) {
            // don't do anything if firebase is already init
        }

        var fb = firebase.firestore();
        const that = this; 
        fb.collection('demo').doc(this.category).collection('tasks').get().then(docs => 
            docs.forEach(doc => (                
                that.setState({
                    tasks: that.state.tasks.concat([
                        { ...doc.data(), date: doc.id }
                    ])
                })    
            ))
        )
    }

    render() {
        const tasks = this.state["tasks"].map(task => (
            <div class="task" style={task.completed ? ({background: '#21ce99'}) : ({background: 'lightgray'})}>
                <div class="task-div">
                    <b>Title:</b> {task.title}
                </div>
                <div class="task-date">
                    <b>Created:</b> {task.date}
                </div >
                <div class="task-urgency" style={task.urgency === "high" ? ({color: "red"}) : (task.urgency === "medium ") ? ({color: "yellow"}) : ({color: "green"})}>
                    Urgency: {task.urgency}
                </div>
            </div>
        ))
        return <div id="task-index-container">
            <h1 id="task-index-category">
                {this.category}
            </h1>
            <div id="tasks-list">
                {tasks}
            </div>
        </div>
    }

}

export default TaskIndex;