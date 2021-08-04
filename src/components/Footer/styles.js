import styled from "styled-components";

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
    
    .footer {
        margin-top: 30px;
        font: normal 12pt 'Roboto', sans-serif;
        transition: all ease 0.4s;
    }

    .footer a {
        text-decoration: none;
        color: rgb(100, 100, 100);
        font-weight: bold;
        transition: all ease 0.4s;
    }

    .footer a:hover {
        color: rgb(80, 80, 80);
    }

    @media (max-width: 760px) {
        .footer {
            font-size: 11pt;
        }
    }
`;