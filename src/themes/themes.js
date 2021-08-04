import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.2s ease-in, color 0.2s ease-in;
        margin: 0;
    }
`;

export const lightTheme = {
    body: 'rgb(250, 250, 250)',
    text: '#1f1f1f'
}

export const darkTheme = {
    body: 'rgb(14, 14, 14)',
    text: '#b1b1b1'
}
