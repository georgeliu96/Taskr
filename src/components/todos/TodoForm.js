import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
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
            categories: [],
            urgency: null
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

            // This creates duplicates of demo task because docs.size still is 0 even after the .then, regardless of number of docs ?????

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

        fb.collection('demo').doc(this.state["category"]).set({lastEditted: key});

        fb.collection('demo').doc(this.state["category"]).collection('tasks').doc(key).set({title: this.state.title, completed: this.state.completed, urgency: this.state.urgency}).then(() => (
            that.props.history.push(`/tasks/${that.state.category}`)
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
                        Urgency
                    </label>
                    <select id="todo-form-dropdown" onChange={this.handleInput("urgency")}>
                        <option value="high" selected>High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <label class="todo-form-label">
                        Completed?
                    </label>
                    <select id="todo-form-dropdown" onChange={this.handleInput("completed")}>
                        <option value="false" selected>No</option>
                        <option value="true">Yes</option>
                    </select>
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