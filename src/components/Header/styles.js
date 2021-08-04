import styled from 'styled-components';

export const Container = styled.div`
    .header {
        margin: 15px 0 50px 0;
    }

    .header svg {
        cursor: pointer;
        border-radius: 50%;
        padding: 7px;
        transition: all ease 0.4s;
    }

    .header svg:hover {
        background-color: rgb(110, 110, 110);
        box-shadow: 0 0 4px 2px rgb(110, 110, 110);
    }
`;