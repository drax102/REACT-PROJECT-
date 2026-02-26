import React, { useState, useEffect } from 'react';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Error fetching');
                const data = await response.json();

                setProducts(data);

                const uniqueCategories = [...new Set(data.map(item => item.category))];
                setCategories(uniqueCategories);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        let match = true;
        if (searchTerm) {
            match = match && p.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (category) {
            match = match && p.category === category;
        }
        return match;
    });

    return (
        <div className="fade-in">
            <h2 className="section-title">🛒 Superstore Products</h2>
            <p className="text-secondary text-center mb-5" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                Discover premium items from electronics to clothing. Filter your preferences and browse our curated collection.
            </p>

            <div className="search-form" style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 2 }}
                />
                <select
                    className="search-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ textTransform: 'capitalize', flex: 1, cursor: 'pointer' }}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {loading && <div className="loading">Loading products...</div>}

            {error && <div className="error-message">{error}</div>}

            {!loading && !error && (
                <div className="grid">
                    {filteredProducts.length === 0 ? (
                        <div className="loading" style={{ gridColumn: '1 / -1' }}>No products found...</div>
                    ) : (
                        filteredProducts.map(product => (
                            <div key={product.id} className="premium-card">
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                                    <img src={product.image} alt={product.title} style={{ filter: 'none', maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }} />
                                </div>
                                <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '1rem', border: '1px solid var(--primary)', background: 'rgba(250, 204, 21, 0.1)!important' }}>
                                    {product.category}
                                </span>
                                <h3 className="card-title text-start" style={{ fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', color: 'white' }}>
                                    {product.title}
                                </h3>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                    <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary)' }}>${product.price.toFixed(2)}</span>
                                    <button className="btn-glow" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>BUY NOW</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;
