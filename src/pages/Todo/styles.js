import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 auto;

    .todo input[type='text'] {
        border: none;
        background-color: transparent;
        font: bold 12pt 'Roboto', sans-serif;
        width: 25%;
        outline: none;
        transition: all ease 0.7s;
        text-align: center;
        border-radius: 5px;
        padding: 4px;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .todo input[type='text']:hover,
    .todo input[type='text']:focus {
        width: 40%;
    }

    .todo hr {
        width: 50%;
        margin: 30px 0 20px 0;
        border-radius: 8px;
        border: 1px solid rgb(40, 40, 40); 
        background-color: rgb(40, 40, 40);
    }

    .empty-tasks {
        font: bold 14pt 'Roboto', sans-serif;
        cursor: pointer;
        transition: all ease 0.4s;
    }

    .empty-tasks:hover {
        transform: scale(1.1);
    }

    .task-list {
        padding: 1px 0 1px 0;
        width: 100%;
        border-radius: 5px;
    }

    .task-list h1 {
        font: bold 20pt 'Roboto', sans-serif;
    }

    .task-list table {
        width: 40%;
        border-collapse: collapse;
        font: normal 12pt 'Roboto', sans-serif;
        text-align: left;
        border-radius: 5px;
        transition: all ease 0.5s;
    }

    .task-list table tr td {
        padding: 12px;
        width: 100%;
    }

    .task-list table tr td p{
        width: 500px;
        white-space: pre-line;
        overflow: hidden;
        word-wrap: break-word;
    }

    .task-list svg {
        padding: 7px;
        border-radius: 50%;
        margin-left: -15px;
        cursor: pointer;
        transition: all ease 0.4s;
    }

    .task-list svg:hover {
        background-color: rgb(110, 110, 110);
        box-shadow: 0 0 4px 2px rgb(110, 110, 110);
    }

    @media (max-width: 800px) {
        .todo input[type='text'] {
            font-size: 10pt;
            width: 50%;
        }
        
        .todo input[type='text']:hover,
        .todo input[type='text']:focus {
            width: 80%;
        }

        .empty-tasks {
            font-size: 11.5pt;
        }

        .todo hr {
            width: 90%;
        }

        .task-list {
            width: 90%;
        }

        .task-list h1 {
            font-size: 18pt;
        }

        .task-list table {
            width: 60%;
        }

        .task-list table tr td p {
            font-size: 10pt;
            width: 32vh;
        }

        .task-list svg {
            width: 16px
        }
    }

    @media (max-width: 900px) and (orientation: landscape) {
        .todo hr {
            width: 100%;
        }

        .task-list table {
            width: 90%;
        }

        .task-list table tr td p {
            font-size: 10pt;
            width: 65vh;
        }
    }
`;