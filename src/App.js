import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import TodoForm from './components/todos/TodoForm';
import TodoIndex from './components/todos/TodoIndex';
import './App.css';

function App() {
  return (
    <HashRouter>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route path="/new-task" component={TodoForm} />
          <Route path="/tasks" component={TodoIndex} />
          <Route path="/" component={Splash} />
        </Switch>
    </HashRouter>
  );
}

export default App;
