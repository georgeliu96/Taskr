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
        const that = this;
        fb.collection('demo').get().then(docs => 
            docs.forEach(doc => {
                that.setState({
                    collection: that.state.collection.concat([doc.data()])
                })
            })
        )
    }
        

    render() {

        const tasks = this.state["collection"].map(task => (
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