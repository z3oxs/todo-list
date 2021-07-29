import React, { useState, useEffect } from 'react';
import './index.css';

export default ({ theme }) => {
    return (
        <footer className={'footer-' + theme}>
            Made with 💜 by <a href="https://github.com/z3ox1s" target="_blank">z3ox1s</a>
        </footer>
    );
}