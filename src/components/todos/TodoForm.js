import React from 'react';
// import firebaseConfig from '../../init-firebase';
import firebase from 'firebase';
import '../../stylesheets/todos/TodoForm.css';
import firebaseConfig from '../../init-firebase.js';

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: "",
            category: null,
            completed: false,
            categories: []
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
            //             categories: ['Tasks']
            //         }))
            // } else {

            docs.forEach(doc => {
                that.setState({
                    categories: that.state.categories.concat([doc.id])
                })
            })
            
            // }

        })
    }

    handleSubmit(e) {
        e.preventDefault();

        var fb = firebase.firestore();
        const that = this;

        const key = new Date().toString();

        fb.collection('demo').doc(this.state["category"]).collection('tasks').doc(key).set({title: this.state.title, completed: this.state.completed}).then(() => (
            that.props.history.push('/tasks')
        ));
    }

    handleInput(field) {
        return e => (
            this.setState({
                [field]: e.target.value
            })
        )
    }

    render() {
        const categories = this.state.categories.length ? (
            this.state.categories.map(cat => (
                <option value={`${cat}`}>{cat}</option>
            ))
        ) : (<> </>)
        return <> 
            <div id="todo-form-container">
                <h1 id="todo-form-header">
                    Create a Task
                </h1>
                <form id="todo-form" onSubmit={this.handleSubmit}>
                    <label class="todo-form-label">
                        Task
                    </label>
                    <input class="todo-form-input" type="text" onChange={this.handleInput("title")} placeholder="What's your task?"/>
                    <label class="todo-form-label">
                        Category
                    </label>
                    <select id="todo-form-dropdown" onChange={this.handleInput("category")}>
                        <option value="" selected disabled>Select a Category</option> 
                        {categories}
                    </select>
                    <input id="todo-form-submit" type="submit" value="Create Task"/>
                </form>
            </div>
        </>
    }

}

export default TodoForm;