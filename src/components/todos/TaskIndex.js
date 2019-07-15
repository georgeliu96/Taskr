import React from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../init-firebase.js';

class TaskIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.match.params.category
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
        const dref = fb.collection('demo').doc(this.state.category).get()
        dref.data()
    }

}

export default TaskIndex;