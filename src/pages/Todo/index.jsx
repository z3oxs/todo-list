import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { v4 as uuid } from 'uuid';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Container } from './styles';
import { GlobalStyles, lightTheme, darkTheme } from '../../themes/themes';

export default () => {
    const [task, setTask] = useState([]);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('TodoTasks'));
        const savedTheme = JSON.parse(localStorage.getItem('TodoTheme'));
        const themeSwitch = document.querySelector('#theme-switch');

        if (savedTasks) setTask(savedTasks.length !== 0 ? savedTasks : task);

        if (savedTheme) setTheme(savedTheme.theme === 'dark' ? 'dark' : 'light');

        const handleThemeSwitch = () => {
            const themeSwitched = JSON.parse(localStorage.getItem('TodoTheme'));
            
            setTheme(themeSwitched.theme === 'dark' ? 'light' : 'dark');
        }

        themeSwitch.addEventListener('click', handleThemeSwitch);

        return () => themeSwitch.removeEventListener('click', handleThemeSwitch);
    }, []);

    useEffect(() => {
        localStorage.setItem('TodoTasks', JSON.stringify(task));
        
        document.title = `(${task.filter(i => !i.checked).length}/${task.filter(i => i.checked).length}) Todo`;
    }, [task]);

    const handleAddTask = () => {
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

    const handleCheckTask = id =>
        setTask(task.map(i => i.id === id ? { ...i, checked: !i.checked } : i));

    const handleRemoveTask = id =>
        setTask(task.filter(i => i.id !== id));
 
    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyles />
                <Header />
                    <Container>
                        <div className="todo">
                            <form id="task-form" action="#">
                                <input
                                    type="text"
                                    id="task"
                                    placeholder="Add a Task"
                                    autoComplete="off"
                                    title="Press enter to add a task"
                                    style={
                                        theme === 'dark' ?
                                            { color: '#b1b1b1', backgroundColor: 'rgb(49, 49, 49)' }
                                            : { color: '#1f1f1f', backgroundColor: 'rgb(218, 218, 218)' }
                                    }
                                />
                                <button type="submit" hidden onClick={() => handleAddTask()} />
                            </form>
                            <hr />
                        </div>
                        { task.length === 0 &&
                            <div className="empty-tasks" onClick={() => document.querySelector('#task').focus()}>
                                Looks like you don't have any tasks, try to create one clicking on me!
                            </div>
                            ||
                            <>
                                <div className="task-list">
                                    <h1>Todo</h1>
                                    {
                                        task.filter(i => !i.checked).length === 0
                                        ? <> 
                                            <div className="empty-tasks" onClick={() => document.querySelector('#task').focus()}>
                                                Looks like you don't have any active tasks, try to create one clicking on me!
                                            </div>
                                        </>
                                        : <table style={
                                                theme === 'dark'
                                                ? { backgroundColor: 'rgb(27, 27, 27)' }
                                                : { backgroundColor: 'rgb(228, 228, 228)' } 
                                            }>
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
                                        <div className="task-list">
                                            <h1 style={{ marginTop: '60px' }}>Done</h1>
                                            <table style={
                                                    theme === 'dark'
                                                    ? { backgroundColor: 'rgb(27, 27, 27)' }
                                                    : { backgroundColor: 'rgb(228, 228, 228)' } 
                                                }>
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
                    </Container>
            <Footer />
        </ThemeProvider>
    );
}