import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '895284fb2d2c50a520ea537456963d9c';

    const fetchWeatherData = async (searchCity) => {
        if (!searchCity.trim()) return;

        setLoading(true);
        setError(null);
        setWeatherData(null);
        setForecastData(null);

        try {

            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
            );


            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
            );

            const weatherJson = await weatherRes.json();
            const forecastJson = await forecastRes.json();

            if (!weatherRes.ok) {
                if (weatherRes.status === 404) {
                    setError('City not found. Please check spelling.');
                } else if (weatherRes.status === 401) {
                    setError('Invalid API Key.');
                } else {
                    setError('Failed to fetch weather data.');
                }
                return;
            }

            setWeatherData(weatherJson);
            setForecastData(forecastJson);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = async (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    const handleQuickSelect = (locName) => {
        setCity(locName);
        fetchWeatherData(locName);
    };

    const getWeatherEmoji = (iconCode) => {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[iconCode] || '🌈';
    };

    const formatTime = (unixTimestamp, timezoneOffset) => {
        const d = new Date(unixTimestamp * 1000);
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const localDate = new Date(utc + (1000 * timezoneOffset));
        return localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getLocalTime = (timezoneOffset) => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const localDate = new Date(utc + (1000 * timezoneOffset));
        return localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short' });
    };

    const getBgGradient = (iconCode) => {
        if (!iconCode) return 'var(--panel-bg)';
        if (iconCode.includes('d')) {
            if (iconCode === '01d') return 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)';
            return 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)';
        } else {
            return 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)';
        }
    };


    const getDailyForecasts = () => {
        if (!forecastData) return [];
        return forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
    };

    return (
        <div className="fade-in">
            <h2 className="section-title">☁️ Live Weather Explorer</h2>

            <div style={{ maxWidth: '900px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
                <form onSubmit={fetchWeather} className="search-form d-flex w-100" style={{ margin: '0 auto 1.5rem auto' }}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter any global city (e.g. Paris, Tokyo)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" className="btn-glow ms-2" disabled={loading} style={{ padding: '0 2rem', whiteSpace: 'nowrap' }}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
                    {[{ name: 'London', label: 'London (GMT)' },
                    { name: 'New York', label: 'New York (EST)' },
                    { name: 'Tokyo', label: 'Tokyo (JST)' },
                    { name: 'Dubai', label: 'Dubai (GST)' },
                    { name: 'Delhi', label: 'Delhi (IST)' }].map(loc => (
                        <button
                            key={loc.name}
                            type="button"
                            className="badge btn-quick-select"
                            onClick={() => handleQuickSelect(loc.name)}
                            style={{
                                cursor: 'pointer',
                                border: '1px solid var(--border)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                padding: '0.4rem 0.8rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            {loc.label}
                        </button>
                    ))}
                </div>

                {error && <div className="error-message badge bg-danger text-wrap" style={{ fontSize: '1.2rem', padding: '1rem', color: '#fff!important' }}>{error}</div>}

                {loading && <div className="loading">Fetching satellite data...</div>}

                {weatherData && (
                    <div className="card weather-hero-card" style={{
                        background: getBgGradient(weatherData.weather[0].icon),
                        padding: '3rem 2rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        marginBottom: '3rem',
                        color: 'white'
                    }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ textAlign: 'left' }}>
                                <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '0rem', lineHeight: '1.1', textShadow: '0 5px 15px rgba(0,0,0,0.5)', color: 'white' }}>
                                    {weatherData.name}, {weatherData.sys.country}
                                </h3>
                                <div style={{ fontSize: '1.2rem', opacity: '0.9', marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
                                    <span>🕒</span> {getLocalTime(weatherData.timezone)} - Local Time
                                </div>
                            </div>
                            <div className="weather-icon-pop" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: '1' }}>
                                {getWeatherEmoji(weatherData.weather[0].icon)}
                            </div>
                        </div>


                        <div className="weather-temp-container" style={{ display: 'flex', alignItems: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: '900', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.6)', letterSpacing: '-3px', color: 'white' }}>
                                {Math.round(weatherData.main.temp)}°C
                            </h1>
                            <div style={{ marginLeft: '3rem', textAlign: 'left', borderLeft: '3px solid rgba(255,255,255,0.3)', paddingLeft: '3rem' }}>
                                <p style={{ textTransform: 'capitalize', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: '700', margin: 0, textShadow: '0 3px 10px rgba(0,0,0,0.5)' }}>
                                    {weatherData.weather[0].description}
                                </p>
                                <p style={{ fontSize: '1.2rem', opacity: '0.85', margin: 0, marginTop: '0.5rem' }}>
                                    Feels like {Math.round(weatherData.main.feels_like)}°C
                                </p>
                            </div>
                        </div>


                        <div className="weather-metric-box-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '1rem',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            paddingTop: '2.5rem',
                            textAlign: 'center'
                        }}>
                            <div className="weather-metric-box">
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💧</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{weatherData.main.humidity}%</div>
                                <div style={{ fontSize: '1rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>Humidity</div>
                            </div>
                            <div className="weather-metric-box">
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💨</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{weatherData.wind.speed} m/s</div>
                                <div style={{ fontSize: '1rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>Wind</div>
                            </div>
                            <div className="weather-metric-box">
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{(weatherData.visibility / 1000).toFixed(1)} km</div>
                                <div style={{ fontSize: '1rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>Visibility</div>
                            </div>
                            <div className="weather-metric-box">
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌡️</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{weatherData.main.pressure} hPa</div>
                                <div style={{ fontSize: '1rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>Pressure</div>
                            </div>
                        </div>


                        <div className="weather-sun-cycle" style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            marginTop: '2.5rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255,200,0,0.5))' }}>🌅</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '0.9rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>Sunrise</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatTime(weatherData.sys.sunrise, weatherData.timezone)}</div>
                                </div>
                            </div>
                            <div className="divider" style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.2)' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255,100,0,0.5))' }}>🌇</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '0.9rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>Sunset</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatTime(weatherData.sys.sunset, weatherData.timezone)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {forecastData && getDailyForecasts().length > 0 && (
                    <div style={{ marginTop: '4rem', padding: '0 1rem' }}>
                        <h3 className="mb-4 text-start fw-bold" style={{ color: 'var(--primary)', borderBottom: '2px dashed var(--border)', paddingBottom: '1rem', textShadow: '0 0 15px var(--glow)' }}>
                            <span style={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '10px' }}>📅</span> Extended 5-Day Forecast
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                            {getDailyForecasts().map((day, index) => {
                                const dateObj = new Date(day.dt * 1000);
                                const dayName = index === 0 ? 'Today' : dateObj.toLocaleDateString([], { weekday: 'long' });

                                return (
                                    <div key={index} className="premium-card text-center" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {dayName}
                                        </div>
                                        <div className="weather-icon-pop" style={{ animationDelay: `${index * 0.2}s`, fontSize: '3.5rem', margin: '1rem 0', filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.5))' }}>
                                            {getWeatherEmoji(day.weather[0].icon)}
                                        </div>
                                        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                                            {Math.round(day.main.temp)}°
                                        </div>
                                        <div style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'capitalize', marginTop: '0.5rem', fontWeight: '600' }}>
                                            {day.weather[0].description}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {!weatherData && !loading && !error && (
                    <div className="card" style={{ padding: '5rem 2rem', borderStyle: 'dashed', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(5px)' }}>
                        <div className="weather-icon-pop" style={{ fontSize: '6rem', opacity: '0.5', marginBottom: '2rem' }}>🌍</div>
                        <h4 style={{ color: 'var(--text-main)', fontWeight: '900', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Awaiting Target</h4>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto' }}>
                            Initialize a search query to establish uplink and pull live satellite telemetry & 5-day predictive forecasting.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
