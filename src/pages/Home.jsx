import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart, Cloud, Utensils, MonitorPlay } from 'lucide-react';

const Home = () => {
    return (
        <div className="fade-in py-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3 display-4 text-gradient">Welcome to DRAX API JUNCTION</h1>
                <p className="lead text-secondary w-75 mx-auto">
                    A dynamic Single Page Application (SPA) demonstrating the power of modern React, React Router,
                    and multiple live API integrations seamlessly wrapped in a premium dark UI.
                </p>
            </div>

            <h3 className="mb-4 d-flex align-items-center justify-content-center">
                <span className="text-gradient">Explore Our Integrations</span>
            </h3>

            <Row className="g-5 mt-2">
                <Col md={6} lg={4}>
                    <Link to="/services/products" style={{ textDecoration: 'none' }}>
                        <Card className="weather-hero-card h-100 border-0 cursor-pointer" style={{ background: 'var(--surface)', borderRadius: '24px' }}>
                            <Card.Body className="text-center d-flex flex-column p-4">
                                <div className="weather-icon-pop mb-4 mt-2">
                                    <ShoppingCart size={64} style={{ color: 'var(--primary)' }} />
                                </div>
                                <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.4rem', color: 'white' }}>Superstore Products</Card.Title>
                                <Card.Text className="text-secondary flex-grow-1" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                                    Integrated with the Fake Store API. Browse through a variety of premium products with full search and filtering.
                                </Card.Text>
                                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px' }}>EXPLORE →</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

                <Col md={6} lg={4}>
                    <Link to="/services/weather" style={{ textDecoration: 'none' }}>
                        <Card className="weather-hero-card h-100 border-0 cursor-pointer" style={{ background: 'var(--surface)', borderRadius: '24px' }}>
                            <Card.Body className="text-center d-flex flex-column p-4">
                                <div className="weather-icon-pop mb-4 mt-2">
                                    <Cloud size={64} style={{ color: '#38bdf8' }} />
                                </div>
                                <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.4rem', color: 'white' }}>Live Weather</Card.Title>
                                <Card.Text className="text-secondary flex-grow-1" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                                    Integrated with the OpenWeather API. Search any global city to fetch real-time atmospheric data and forecasts.
                                </Card.Text>
                                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#38bdf8', fontWeight: 'bold', letterSpacing: '2px' }}>EXPLORE →</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

                <Col md={6} lg={4}>
                    <Link to="/services/recipes" style={{ textDecoration: 'none' }}>
                        <Card className="weather-hero-card h-100 border-0 cursor-pointer" style={{ background: 'var(--surface)', borderRadius: '24px' }}>
                            <Card.Body className="text-center d-flex flex-column p-4">
                                <div className="weather-icon-pop mb-4 mt-2">
                                    <Utensils size={64} style={{ color: '#fb923c' }} />
                                </div>
                                <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.4rem', color: 'white' }}>Food Recipes</Card.Title>
                                <Card.Text className="text-secondary flex-grow-1" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                                    Integrated with TheMealDB API. Discover global meals, ingredients, and step-by-step cooking instructions.
                                </Card.Text>
                                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#fb923c', fontWeight: 'bold', letterSpacing: '2px' }}>EXPLORE →</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
