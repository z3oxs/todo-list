import React, { useEffect, useState } from 'react';
import './index.css';
import Footer from '../Footer';
import { v4 as uuid } from 'uuid';


export default function Todo() {
    const [task, setTask] = useState([]);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('TodoApp'));
        const savedTheme = JSON.parse(localStorage.getItem('TodoTheme'));

        if (savedTasks) {
            setTask(savedTasks.length !== 0 ? savedTasks : task);
        }

        if (savedTheme) {
            setTheme(savedTheme.theme === 'dark' ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('TodoTheme', JSON.stringify({theme}));
    
        theme === 'dark'
        ? document.body.style.background = 'rgb(14, 14, 14)'
        : document.body.style.background = 'rgb(250, 250, 250';
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('TodoApp', JSON.stringify(task));
        
        document.title = `(${task.filter(i => !i.checked).length}/${task.filter(i => i.checked).length}) Todo`;
    }, [task]);

    function handleAddTask() {
        const taskToAdd = document.querySelector('#task');
        event.preventDefault();

        if (taskToAdd.value !== '') {
            setTask([...task, {
                id: uuid(),
                value: taskToAdd.value,
                checked: false
            }]);
            
            taskToAdd.value = '';
        }
    }

    function handleCheckTask(id) {
        const newTasks = task.map(i => i.id === id ? { ...i, checked: !i.checked } : i);

        setTask(newTasks);
    }

    function handleRemoveTask(id) {
        const newTasks = task.filter(i => i.id !== id);

        setTask(newTasks);
    }

    return (
        <>
            {/* Outside a component until i learn how to do that :) */}
            <header className={'header-' + theme}>
                {
                    theme === 'light' &&
                    <>
                        <svg onClick={() => setTheme('dark')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                        </svg>
                    </>
                    ||
                    <>
                        <svg onClick={() => setTheme('light')} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
                        </svg>
                    </>
                }
            </header>

            <div className={'todo-' + theme}>
                <form id="task-form" action="#">
                    <input type="text" id="task" placeholder="Add a Task" autoComplete="off" title="Press enter to add a task"/>
                    <button type="submit" hidden onClick={() => handleAddTask()} />
                </form>
                <hr />
            </div>
            { task.length === 0 &&
                <div className={'empty-tasks-' + theme} onClick={() => document.querySelector('#task').focus()}>
                    Looks like you don't have any tasks, try to create one clicking on me!
                </div>
            ||
                <>
                    <div className={'task-list-' + theme}>
                        <h1>Todo</h1>
                        {
                            task.filter(i => !i.checked).length === 0
                            ? <> 
                                <div className={'empty-tasks-' + theme} onClick={() => document.querySelector('#task').focus()}>
                                    Looks like you don't have any active tasks, try to create one clicking on me!
                                </div>
                            </>
                            : <table>
                                <tbody>
                                    {
                                        task.map(i => (
                                            !i.checked &&
                                                <tr key={i.id}>
                                                    <td>
                                                        <p>{i.value}</p>
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <svg onClick={() => handleCheckTask(i.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                                                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                                                        </svg>
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <svg onClick={() => handleRemoveTask(i.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                                            <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                                                        </svg>
                                                    </td>
                                                </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    {   
                        task.filter(i => i.checked).length !== 0 &&
                            <div className={'task-list-' + theme}>
                                <h1 style={{ marginTop: '60px' }}>Done</h1>
                                <table>
                                    <tbody>
                                        {
                                            task.map(i => (
                                                i.checked &&
                                                    <tr key={i.id}>
                                                        <td>
                                                            <p style={{ color: '#808080' }}><strike>{i.value}</strike></p>
                                                        </td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            <svg onClick={() => handleCheckTask(i.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                                                            </svg>
                                                        </td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            <svg onClick={() => handleRemoveTask(i.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                                                <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                                                            </svg>
                                                        </td>
                                                    </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </>
            }

            <Footer theme={theme} />
        </>
    );
}