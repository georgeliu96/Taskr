import React from 'react';
// import firebaseConfig from '../../init-firebase';
import firebase from 'firebase';

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: "",
            category: null
        }
        // firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    handleInput(field) {
        return e => (
            this.setState({
                [field]: e.target.value
            })
        )
    }

    render() {
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
                        <option value="" selected disabled>Select a Tree</option> 
                        <option value="test1">test1</option>
                        <option value="test2">test2</option>
                        <option value="test3">test3</option>
                    </select>
                    <input id="todo-form-submit" type="submit" value="Create Task"/>
                </form>
            </div>
        </>
    }

}

export default TodoForm;