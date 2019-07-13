import React from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../init-firebase';

class TodoIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: []
        }
    }

    componentDidMount() {

        try {
            firebase.initializeApp(firebaseConfig);
        } catch(err) {
            // don't do anything if firebase is already init
        }

        var fb = firebase.firestore();
        fb.collection('tasks').doc('demo').get().then(doc => 
            this.setState({
                collection: doc.data()
            })    
        )
    }
        

    render() {
        // console.log(this.state);

        const tasks = Object.values(this.state).map(task => (
            <div class="task">
                {task.title}
                {task.category}
            </div>
        ))
        return <div id="index-container">
            {tasks}
        </div>
    }
}

export default TodoIndex;