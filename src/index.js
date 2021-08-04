import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './pages/Todo';

ReactDOM.render(
    <>
        <div className="App">
            <center>
                <Todo />
            </center>
        </div>
    </>,
    document.querySelector('#root')
);