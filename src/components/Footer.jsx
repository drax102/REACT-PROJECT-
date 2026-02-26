import React from 'react';

const Footer = () => {
    return (
        <footer style={{ marginTop: '3rem', padding: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>© {new Date().getFullYear()} API Fusion Project. Developed for educational purposes.</p>
        </footer>
    );
};

export default Footer;
