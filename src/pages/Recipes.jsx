import React, { useState, useEffect } from 'react';


const Recipes = () => {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchInitialMeals = async () => {
            setLoading(true);
            try {
                const res1 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=c`);
                const res2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=b`);
                const data1 = await res1.json();
                const data2 = await res2.json();

                let combined = [...(data1.meals || []), ...(data2.meals || [])];
                const uniqueMeals = Array.from(new Map(combined.map(m => [m.idMeal, m])).values());

                setMeals(uniqueMeals.slice(0, 36));
            } catch (e) {
                console.error(e);
                setError('Failed to load initial recipes.');
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };
        fetchInitialMeals();
    }, []);

    const searchRecipes = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setSelectedMeal(null);

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            if (data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
                setError('No recipes found matching your search.');
            }
        } catch (e) {
            console.error(e);
            setError('Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getIngredients = (meal) => {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            } else {
                break;
            }
        }
        return ingredients;
    };

    return (
        <div className="fade-in">
            <h2 className="section-title">🍽️ Culinary Classics</h2>
            <p className="text-secondary text-center mb-5" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                Search thousands of global recipes. Uncover hidden flavors, detailed instructions, and complete ingredient lists.
            </p>

            <form onSubmit={searchRecipes} className="search-form d-flex" style={{ maxWidth: '700px', margin: '0 auto 4rem auto' }}>
                <input
                    type="text"
                    className="search-input flex-grow-1"
                    placeholder="Search by dish name (e.g. Pasta, Chicken, Dal)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="btn-glow ms-2" disabled={loading} style={{ padding: '0 2rem' }}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {selectedMeal ? (
                <div className="premium-card text-start" style={{ overflow: 'hidden', marginBottom: '4rem', padding: '0', background: 'var(--surface)' }}>
                    <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)', zIndex: 1 }}></div>
                        <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9) contrast(1.1)' }} />
                    </div>

                    <div style={{ position: 'relative', zIndex: 2, padding: '0 3rem 3rem 3rem', marginTop: '-4rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', color: 'white', textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>
                            {selectedMeal.strMeal}
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                            <span className="badge" style={{ background: 'rgba(250, 204, 21, 0.15)!important' }}>{selectedMeal.strCategory}</span>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)!important', border: '1px solid rgba(255,255,255,0.3)!important', color: 'white!important' }}>{selectedMeal.strArea} Origin</span>
                        </div>

                        <div className="row g-5">
                            <div className="col-md-5">
                                <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Ingredients Needed</h4>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <ul style={{ listStyleType: 'none', color: 'white', padding: 0, margin: 0 }}>
                                        {getIngredients(selectedMeal).map((item, index) => (
                                            <li key={index} style={{ marginBottom: '0.8rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '1.1rem' }}>
                                                <span style={{ color: 'var(--primary)', marginRight: '10px' }}>✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Preparation Instructions</h4>
                                <div style={{ whiteSpace: 'pre-line', color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', lineHeight: '1.8' }}>
                                    {selectedMeal.strInstructions}
                                </div>
                                <button className="btn-glow mt-5" onClick={() => setSelectedMeal(null)} style={{ padding: '1rem 2.5rem' }}>
                                    ← BACK TO EXPLORER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid">
                    {!loading && meals.map(meal => (
                        <div key={meal.idMeal} className="premium-card" onClick={() => setSelectedMeal(meal)} style={{ cursor: 'pointer', padding: 0 }}>
                            <div style={{ height: '250px', overflow: 'hidden', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
                                <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '2rem', textAlign: 'left' }}>
                                <span className="badge" style={{ marginBottom: '1rem' }}>{meal.strCategory || 'Recipe'}</span>
                                <h3 className="card-title m-0" style={{ fontSize: '1.4rem', color: 'white' }}>{meal.strMeal}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!meals.length && !loading && !error && !selectedMeal && !initialLoad && (
                <div className="loading">
                    <p style={{ fontSize: '1.25rem' }}>Enter a recipe name above to start exploring.</p>
                </div>
            )}
        </div>
    );
};

export default Recipes;
