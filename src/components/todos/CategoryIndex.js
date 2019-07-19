import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../init-firebase';
import '../../stylesheets/todos/CategoryIndex.css';

class CategoryIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: [],
            taskCounts: [],
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
            //             collection: ['Tasks']
            //         }))
            // } else {

            docs.forEach(category => {
                that.setState({
                    collection: that.state.collection.concat([category.id]),
                }, () => {
                    const docId = that.state.collection[that.state.collection.length - 1];
                    fb.collection('demo').doc(docId).collection('tasks').get().then(tasks => {
                        let inc = 0;
                        let tot = 0;
                        tasks.forEach(task => {
                            // console.log(`Doc: ${docId}, Task: ${task.data().title} ${[inc, tot]}`)
                            tot++;
                            if (!task.data().completed) inc++;
                        })
                        const count = [inc, tot];
                        // console.log(`Doc: ${docId}, Count: ${count}`);
                        that.setState({
                            taskCounts: that.state.taskCounts.concat([count])
                        })  
                    })
                })
            })
            
            // }
        })
        // console.log('mounted');
        // console.log(this.state.taskCounts);
        // console.log(this.state.collection);
    }
        

    render() {
        // console.log(this.state.taskCounts);
        // console.log(this.state.collection);
        // const counts = this.state.taskCounts.map((_,i) => (
        //     <>
        //     <div class="incomplete">
        //         # of Incomplete Tasks: {this.state.taskCounts[i][0]}
        //     </div>
        //     <div class="total">
        //         # of Total Tasks: {this.state.taskCounts[i][1]}
        //     </div>
        //     </>
        // ))
        const tasks = (this.state.taskCounts.length) ? this.state.taskCounts.map((_, i) => (
            <div class="category" onClick={() => this.props.history.push(`/tasks/${this.state.collection[i]}`)}>
                <h1 class="category-name">
                    {this.state.collection[i]}
                </h1>
                <div class="remaining-tasks">
                    <div class="incomplete">
                        # of Incomplete Tasks: {this.state.taskCounts[i][0]}
                    </div>
                    <div class="total">
                        # of Total Tasks: {this.state.taskCounts[i][1]}
                    </div>
                </div>
            </div>
        )) : (<></>)
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

export default CategoryIndex;