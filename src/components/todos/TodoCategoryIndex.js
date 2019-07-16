import React from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../init-firebase';
import '../../stylesheets/todos/TodoCategoryIndex.css';

class TodoCategoryIndex extends React.Component {
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

        // const key = new Date().toString();

        fb.collection('demo').get().then(docs => {

            // This creates duplicates of demo task because docs.size still alerts 0 even after the .then ?????

            // if (!docs.size) {
            //     fb.collection('demo').doc('Tasks').collection('tasks').doc(key).set({title: "This is a demo task", completed: false})
            //         .then(that.setState({
            //             collection: ['Tasks']
            //         }))
            // } else {

            docs.forEach(doc => {
                that.setState({
                    collection: that.state.collection.concat([doc.id])
                })
            })
            
            // }
        })
    }
        

    render() {

        const tasks = this.state["collection"].map(category => (
            <div class="category" onClick={() => this.props.history.push(`/tasks/${category}`)}>
                <h1 class="category-name">
                    {category}
                </h1>
                <div class="remaining-tasks">

                </div>
            </div>
        ))
        return <div id="index-container">
            {tasks}
            <div id="create-category-border">    
                <div id="create-category" onClick={() => this.props.history.push('/new-category')}>
                    CREATE A CATEGORY
                </div>
            </div>
        </div>

    }
}

export default TodoCategoryIndex;