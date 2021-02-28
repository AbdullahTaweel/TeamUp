import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

import AddProject from './AddProject';
import EditProject from './EditProject';
import ShowProjects from './ShowProjects';
import ShowTasks from './ShowTasks';
import AddTask from './AddTask';
import EditTask from './EditTask';

import CommentTask from './CommentTask';

import AddComment from './AddComment';
import EditComment from './EditComment';
import Report from './Report';

function App(){

    return(

    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register} />
            <Route exact path='/projects/:id/report' component={Report} />
            {/* <Route exact path='/projects' component={Projects} /> */}
            <Route exact path='/project/add' component={AddProject} />
            <Route exact path='/project/edit/:id' component={EditProject} />
            <Route exact path='/projects' component={ShowProjects} />

            <Route exact path='/projects/:id/tasks' component={ShowTasks} />
            <Route exact path='/projects/:id/tasks/add' component={AddTask} />
            <Route exact path='/tasks/edit/:id' component={EditTask} />

            <Route exact path='/tasks/:id/comments' component={CommentTask} />

            <Route exact path='/tasks/:id/comments/add' component={AddComment} />
            <Route exact path='/comments/edit/:id' component={EditComment} />

        </Switch>
    </BrowserRouter>

    )

}

ReactDOM.render(<App />,document.getElementById('root'));
