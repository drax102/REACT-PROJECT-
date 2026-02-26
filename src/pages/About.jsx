import React from 'react';

const About = () => {
    return (
        <div className="fade-in py-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3 display-4 text-gradient">About This Project</h1>
                <p className="lead text-secondary w-75 mx-auto">
                    A comprehensive overview of our API Integration React Application.
                </p>
            </div>

            <div className="card mx-auto text-start" style={{ maxWidth: '800px', padding: '2rem' }}>
                <h3 className="card-title text-center">Project Details</h3>
                <p className="card-text mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    This application was developed to demonstrate modern web development practices using React. It serves as a Single Page Application (SPA) that seamlessly integrates multiple live APIs without requiring page reloads, providing a smooth and responsive user experience.
                </p>

                <h3 className="card-title text-center mt-4 mb-4">Technologies Used</h3>
                <ul style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '2' }}>
                    <li><strong style={{ color: 'var(--primary)' }}>React:</strong> The core library used for building the user interface component tree.</li>
                    <li><strong style={{ color: 'var(--primary)' }}>React Router DOM:</strong> Enables client-side routing, making the application an SPA.</li>
                    <li><strong style={{ color: 'var(--primary)' }}>Live APIs:</strong> Utilizes Fake Store API, OpenWeather API, and TheMealDB API to fetch dynamic multi-category data.</li>
                    <li><strong style={{ color: 'var(--primary)' }}>React Hooks:</strong> Extensive use of <code>useState</code> and <code>useEffect</code> for state management and handling API side-effects.</li>
                    <li><strong style={{ color: 'var(--primary)' }}>Bootstrap & Custom CSS:</strong> Used for responsive layouting, premium dark mode aesthetic, and glassmorphism styling.</li>
                </ul>
            </div>
        </div>
    );
};

export default About;
