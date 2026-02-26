import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
            }, 3000);
        }
    };

    return (
        <div className="fade-in py-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3 display-4 text-gradient">Contact Us</h1>
                <p className="lead text-secondary w-75 mx-auto">
                    Have any questions or feedback? We'd love to hear from you.
                </p>
            </div>

            <div className="card mx-auto" style={{ maxWidth: '600px', padding: '2.5rem' }}>
                {submitted ? (
                    <div className="text-center py-4 fade-in">
                        <h3 className="card-title" style={{ color: '#22c55e' }}>Message Sent Successfully!</h3>
                        <p className="text-secondary mt-3" style={{ fontSize: '1.1rem' }}>Thank you for reaching out. We will get back to you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="text-start">
                        <div className="mb-4">
                            <label className="form-label" style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Name</label>
                            <input
                                type="text"
                                className={`search-input form-control border-secondary ${errors.name ? 'is-invalid border-danger' : ''}`}
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', marginBottom: '0.25rem', backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
                            />
                            {errors.name && <div className="text-danger mt-1" style={{ fontSize: '0.9rem' }}>{errors.name}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label" style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Email Address</label>
                            <input
                                type="email"
                                className={`search-input form-control border-secondary ${errors.email ? 'is-invalid border-danger' : ''}`}
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', marginBottom: '0.25rem', backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
                            />
                            {errors.email && <div className="text-danger mt-1" style={{ fontSize: '0.9rem' }}>{errors.email}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label" style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Message</label>
                            <textarea
                                className={`search-input form-control border-secondary ${errors.message ? 'is-invalid border-danger' : ''}`}
                                rows="5"
                                placeholder="Write your message here..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: '100%', marginBottom: '0.25rem', borderRadius: '12px', resize: 'vertical', backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
                            ></textarea>
                            {errors.message && <div className="text-danger mt-1" style={{ fontSize: '0.9rem' }}>{errors.message}</div>}
                        </div>

                        <div className="text-center mt-5">
                            <button type="submit" className="btn btn-glow w-100 py-3" style={{ fontSize: '1.1rem' }}>Send Message</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
