import React from 'react';
import Todo from '../Todo';
import Footer from '../Footer';
import './index.css';

export default function App() {
    return (
        <center>
            <div className="App">
                <Todo />
                <Footer />
            </div>
        </center>
    );
}