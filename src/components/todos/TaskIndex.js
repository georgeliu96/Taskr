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
                    tasks: that.state.tasks.concat([doc.data()])
                })    
            ))
        )
    }

    render() {
        const tasks = this.state["tasks"].map(task => (
            <div class="task">
                {task.title}
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