import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../init-firebase';
import '../../stylesheets/todos/TodoForm.css';

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            category: ""
        }
    }

    componentDidMount() {
        try {
            firebase.initializeApp(firebaseConfig);
        } catch(err) {
            // don't do anything if firebase is already init
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        var fb = firebase.firestore();
        const that = this;

        const key = new Date().toString();

        fb.collection('demo').doc(this.state["category"]).set({created: key}).then(() => {
            that.props.history.push('/categories')
        })
    }

    handleInput() {
        return e => (
            this.setState({
                category: e.target.value
            })
        )
    }

    render() {
        return <div id="todo-form-container">
            <h1 id="todo-form-header">
                Create a Category
            </h1>
            <form id="todo-form" onSubmit={this.handleSubmit}>
                <label class="todo-form-label">
                    Category
                </label>
                <input class="todo-form-input" type="text" onChange={this.handleInput()} placeholder="Name your Category"/>
                <input id="todo-form-submit" type="submit" value="Create Category"/>
            </form>
        </div>
    }
}

export default CategoryForm;