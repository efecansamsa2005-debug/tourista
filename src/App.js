import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = 'https://xuaczwlwbsxoixosunzx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YWN6d2x3YnN4b2l4b3N1bnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODc1NjYsImV4cCI6MjA4MDg2MzU2Nn0.nfqRmFe0-1t_hDrPAc2oTO-y4UfbsEjen5sYbr1lYeE';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Google Places API Key
const GOOGLE_API_KEY = 'AIzaSyBy4tEpe49fgTAUd8P_A2PQ4swlvCDMlFw';

// Pre-built Travel Guides (Static Data)
const TRAVEL_GUIDES = [
  {
    id: 'paris-1day',
    city: 'Paris',
    country: 'France',
    title: '1-Day Paris Trip',
    days: 1,
    spots: 9,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop'
  },
  {
    id: 'rome-1day',
    city: 'Rome',
    country: 'Italy',
    title: '1-Day Rome Trip',
    days: 1,
    spots: 7,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop'
  },
  {
    id: 'london-3day',
    city: 'London',
    country: 'UK',
    title: '3-Day London Trip',
    days: 3,
    spots: 19,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop'
  },
  {
    id: 'tokyo-2day',
    city: 'Tokyo',
    country: 'Japan',
    title: '2-Day Tokyo Trip',
    days: 2,
    spots: 12,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop'
  },
  {
    id: 'istanbul-2day',
    city: 'Istanbul',
    country: 'Turkey',
    title: '2-Day Istanbul Trip',
    days: 2,
    spots: 14,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop'
  }
];

// Trip Categories (Simplified)
const TRIP_CATEGORIES = [
  { id: 'popular', emoji: '📍', label: 'Popular' },
  { id: 'museum', emoji: '🏛️', label: 'Museum' },
  { id: 'nature', emoji: '🌿', label: 'Nature' },
  { id: 'foodie', emoji: '🍕', label: 'Foodie' },
  { id: 'history', emoji: '🏰', label: 'History' },
  { id: 'shopping', emoji: '🛍️', label: 'Shopping' },
];

// Main App Component
function App() {
  // State declarations
  const [screen, setScreen] = useState('auth');
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // My Trips (saved trips)
  const [myTrips, setMyTrips] = useState([]);
  
  // Trip Planning States
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [newTripCity, setNewTripCity] = useState('');
  const [newTripPreferences, setNewTripPreferences] = useState([]);
  const [newTripDays, setNewTripDays] = useState(3);
  const [tripDurationType, setTripDurationType] = useState('flexible');

  // Check authentication on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setScreen('home');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setScreen('home');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle signup
  const handleSignup = async () => {
    setAuthError('');
    setAuthSuccess('');
    setAuthLoading(true);

    if (!email.trim() || !password.trim()) {
      setAuthError('Please fill in all fields');
      setAuthLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      setAuthLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match');
      setAuthLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        setAuthError(error.message);
      } else if (data.user && !data.session) {
        setAuthSuccess('✉️ Check your email to confirm your account!');
        setAuthMode('login');
        setPassword('');
        setConfirmPassword('');
      } else if (data.session) {
        setCurrentUser(data.user);
        setScreen('home');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    }
    
    setAuthLoading(false);
  };

  // Handle login
  const handleLogin = async () => {
    setAuthError('');
    setAuthLoading(true);

    if (!email.trim() || !password.trim()) {
      setAuthError('Please fill in all fields');
      setAuthLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setAuthError(error.message);
      } else if (data.user) {
        setCurrentUser(data.user);
        setScreen('home');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    }
    
    setAuthLoading(false);
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    setAuthError('');
    setAuthSuccess('');
    setAuthLoading(true);

    if (!email.trim()) {
      setAuthError('Please enter your email');
      setAuthLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthSuccess('✉️ Check your email for the reset link!');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    }
    
    setAuthLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMyTrips([]);
    setAuthMode('login');
    setScreen('auth');
  };

  // Toggle trip preference
  const togglePreference = (id) => {
    setNewTripPreferences(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // ==================== AUTH SCREEN ====================
  if (screen === 'auth') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(165deg, #f0f9f4 0%, #ffffff 40%, #e8f5e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        <div style={{ maxWidth: '400px', width: '100%' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: '0 16px 48px rgba(46,125,50,0.3)',
              marginBottom: '20px'
            }}>
              🧭
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '36px',
              fontWeight: '700',
              color: '#1b5e20',
              margin: '0 0 8px 0'
            }}>
              TOURISTA
            </h1>
            <p style={{ fontSize: '15px', color: '#558b2f', margin: 0 }}>
              Your AI travel concierge
            </p>
          </div>

          {/* Auth Card */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
          }}>
            {(authMode === 'login' || authMode === 'signup') && (
              <>
                {/* Tab Switcher */}
                <div style={{
                  display: 'flex',
                  background: '#f1f8e9',
                  borderRadius: '12px',
                  padding: '4px',
                  marginBottom: '24px'
                }}>
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: authMode === 'login' ? 'white' : 'transparent',
                      color: authMode === 'login' ? '#2e7d32' : '#689f38',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthSuccess(''); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: authMode === 'signup' ? 'white' : 'transparent',
                      color: authMode === 'signup' ? '#2e7d32' : '#689f38',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Messages */}
                {authSuccess && (
                  <div style={{
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    marginBottom: '20px'
                  }}>
                    {authSuccess}
                  </div>
                )}
                
                {authError && (
                  <div style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    marginBottom: '20px'
                  }}>
                    ⚠️ {authError}
                  </div>
                )}

                {/* Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  />
                  {authMode === 'signup' && (
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: '2px solid #e0e0e0',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: "'DM Sans', sans-serif"
                      }}
                    />
                  )}
                </div>

                {/* Forgot Password Link */}
                {authMode === 'login' && (
                  <button
                    onClick={() => setAuthMode('forgot')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#558b2f',
                      fontSize: '14px',
                      cursor: 'pointer',
                      marginTop: '12px',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    Forgot password?
                  </button>
                )}

                {/* Submit Button */}
                <button
                  onClick={authMode === 'login' ? handleLogin : handleSignup}
                  disabled={authLoading}
                  style={{
                    width: '100%',
                    background: authLoading
                      ? '#a5d6a7'
                      : 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: authLoading ? 'not-allowed' : 'pointer',
                    marginTop: '20px',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {authLoading ? '⏳ Please wait...' : (authMode === 'login' ? 'Log In' : 'Create Account')}
                </button>
              </>
            )}

            {/* Forgot Password Mode */}
            {authMode === 'forgot' && (
              <>
                <button
                  onClick={() => setAuthMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#558b2f',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  ← Back to login
                </button>
                
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '24px',
                  color: '#1b5e20',
                  margin: '0 0 20px 0'
                }}>
                  Reset Password
                </h2>
                
                {authError && (
                  <div style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '14px',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}>
                    ⚠️ {authError}
                  </div>
                )}
                
                {authSuccess && (
                  <div style={{
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '14px',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}>
                    {authSuccess}
                  </div>
                )}
                
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                />
                
                <button
                  onClick={handleForgotPassword}
                  disabled={authLoading}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '20px',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {authLoading ? '⏳ Sending...' : 'Send Reset Link'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==================== HOME SCREEN ====================
  if (screen === 'home') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f1f8e9 0%, #ffffff 100%)',
        fontFamily: "'DM Sans', sans-serif",
        paddingBottom: '100px'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
          padding: '20px',
          borderRadius: '0 0 30px 30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>🧭</span>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                margin: 0
              }}>
                TOURISTA
              </h1>
            </div>
            <div
              onClick={handleLogout}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '18px',
                cursor: 'pointer',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {/* Welcome Message */}
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '16px',
            margin: 0
          }}>
            Welcome back, <strong>{currentUser?.email?.split('@')[0]}</strong>! 👋
          </p>
        </div>

        {/* Explore Destinations Section */}
        <div style={{ padding: '24px 20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1b5e20',
              margin: 0
            }}>
              🌍 Explore Destinations
            </h2>
            <span style={{
              fontSize: '14px',
              color: '#4caf50',
              cursor: 'pointer'
            }}>
              See all →
            </span>
          </div>
          
          {/* Horizontal Cards */}
          <div style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            paddingBottom: '10px',
            marginRight: '-20px',
            paddingRight: '20px'
          }}>
            {TRAVEL_GUIDES.map((guide) => (
              <div
                key={guide.id}
                onClick={() => {
                  setSelectedGuide(guide);
                  setScreen('guideDetail');
                }}
                style={{
                  minWidth: '150px',
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(46,125,50,0.1)',
                  border: '1px solid #e8f5e9'
                }}
              >
                <div style={{
                  height: '100px',
                  position: 'relative'
                }}>
                  <img
                    src={guide.image}
                    alt={guide.city}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* City Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#2e7d32',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    📍 {guide.city}
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#1b5e20'
                  }}>
                    {guide.title}
                  </p>
                  <p style={{
                    margin: '4px 0 0',
                    fontSize: '11px',
                    color: '#689f38'
                  }}>
                    {guide.spots} spots • {guide.days} day{guide.days > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Trips Section */}
        <div style={{ padding: '0 20px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 16px 0'
          }}>
            🗂️ My Trips
          </h2>

          {myTrips.length === 0 ? (
            /* Empty State */
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(46,125,50,0.08)',
              border: '2px dashed #c8e6c9'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '36px'
              }}>
                ✈️
              </div>
              <h3 style={{
                color: '#1b5e20',
                fontSize: '18px',
                margin: '0 0 8px 0'
              }}>
                No trips planned yet
              </h3>
              <p style={{
                color: '#689f38',
                fontSize: '14px',
                margin: '0 0 24px 0'
              }}>
                Start planning your next adventure!
              </p>
              <button
                onClick={() => setScreen('newTripCity')}
                style={{
                  background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '50px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: '0 4px 15px rgba(46,125,50,0.3)'
                }}
              >
                + Create New Trip
              </button>
            </div>
          ) : (
            /* Saved Trips */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {myTrips.map((trip, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedGuide(trip);
                    setScreen('tripDetail');
                  }}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(46,125,50,0.08)',
                    border: '1px solid #e8f5e9'
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1b5e20'
                    }}>
                      {trip.title}
                    </h3>
                    <p style={{
                      margin: '4px 0 0',
                      fontSize: '13px',
                      color: '#689f38'
                    }}>
                      {trip.days} days • {trip.spots} spots
                    </p>
                  </div>
                  <span style={{ color: '#4caf50', fontSize: '20px' }}>→</span>
                </div>
              ))}
              
              {/* Add New Trip Button */}
              <button
                onClick={() => setScreen('newTripCity')}
                style={{
                  background: 'white',
                  color: '#2e7d32',
                  border: '2px dashed #4caf50',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '20px' }}>+</span> Add New Trip
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          background: 'white',
          borderRadius: '20px',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <span style={{ fontSize: '22px' }}>🏠</span>
            <span style={{ fontSize: '11px', color: '#2e7d32', fontWeight: '600' }}>Home</span>
          </button>
          
          <button
            onClick={() => setScreen('newTripCity')}
            style={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              border: 'none',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              fontSize: '28px',
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '-30px',
              boxShadow: '0 4px 15px rgba(46,125,50,0.4)'
            }}
          >
            +
          </button>
          
          <button
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <span style={{ fontSize: '22px' }}>🗺️</span>
            <span style={{ fontSize: '11px', color: '#9e9e9e', fontWeight: '500' }}>Explore</span>
          </button>
        </div>
      </div>
    );
  }

  // ==================== NEW TRIP - CITY SELECTION ====================
  if (screen === 'newTripCity') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setScreen('home')}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            ←
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <span style={{ fontSize: '60px' }}>🌍</span>
          </div>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            Where to next?
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#558b2f',
            margin: '0 0 32px 0',
            textAlign: 'center'
          }}>
            Enter your dream destination
          </p>

          {/* Search Input */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4px',
            boxShadow: '0 4px 20px rgba(46,125,50,0.15)'
          }}>
            <input
              type="text"
              value={newTripCity}
              onChange={(e) => setNewTripCity(e.target.value)}
              placeholder="Search city (e.g., Paris, Tokyo...)"
              style={{
                width: '100%',
                padding: '18px 20px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'DM Sans', sans-serif"
              }}
            />
          </div>

          {/* Popular Cities */}
          <div style={{ marginTop: '24px' }}>
            <p style={{
              fontSize: '13px',
              color: '#689f38',
              marginBottom: '12px'
            }}>
              Popular destinations:
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {['Paris', 'Tokyo', 'Rome', 'Istanbul', 'London'].map((city) => (
                <button
                  key={city}
                  onClick={() => setNewTripCity(city)}
                  style={{
                    background: newTripCity === city ? '#2e7d32' : 'white',
                    color: newTripCity === city ? 'white' : '#2e7d32',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div style={{ padding: '20px' }}>
          <button
            onClick={() => newTripCity.trim() && setScreen('newTripPreferences')}
            disabled={!newTripCity.trim()}
            style={{
              width: '100%',
              background: newTripCity.trim() 
                ? 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)' 
                : '#c8e6c9',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: newTripCity.trim() ? 'pointer' : 'not-allowed',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: newTripCity.trim() ? '0 4px 15px rgba(46,125,50,0.3)' : 'none'
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ==================== NEW TRIP - PREFERENCES ====================
  if (screen === 'newTripPreferences') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f8e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={() => setScreen('newTripCity')}
            style={{
              background: '#f1f8e9',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          <div>
            <p style={{ margin: 0, fontSize: '13px', color: '#689f38' }}>Planning trip to</p>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1b5e20', fontWeight: '600' }}>
              📍 {newTripCity}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 8px 0'
          }}>
            What interests you?
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#689f38',
            margin: '0 0 24px 0'
          }}>
            Select all that apply
          </p>

          {/* Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {TRIP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => togglePreference(cat.id)}
                style={{
                  background: newTripPreferences.includes(cat.id) 
                    ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' 
                    : 'white',
                  color: newTripPreferences.includes(cat.id) ? 'white' : '#1b5e20',
                  border: newTripPreferences.includes(cat.id) ? 'none' : '2px solid #e8f5e9',
                  padding: '20px 16px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: newTripPreferences.includes(cat.id) 
                    ? '0 4px 15px rgba(46,125,50,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <span style={{ fontSize: '28px' }}>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div style={{ padding: '20px' }}>
          <button
            onClick={() => setScreen('newTripDuration')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 15px rgba(46,125,50,0.3)'
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ==================== NEW TRIP - DURATION ====================
  if (screen === 'newTripDuration') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #e8f5e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setScreen('newTripPreferences')}
            style={{
              background: '#f1f8e9',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          
          {/* Toggle */}
          <div style={{
            background: '#e8f5e9',
            borderRadius: '25px',
            padding: '4px',
            display: 'flex'
          }}>
            <button
              onClick={() => setTripDurationType('dates')}
              style={{
                background: tripDurationType === 'dates' ? 'white' : 'transparent',
                color: tripDurationType === 'dates' ? '#2e7d32' : '#689f38',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              📅 Dates
            </button>
            <button
              onClick={() => setTripDurationType('flexible')}
              style={{
                background: tripDurationType === 'flexible' ? 'white' : 'transparent',
                color: tripDurationType === 'flexible' ? '#2e7d32' : '#689f38',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              🔄 Flexible
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 40px 0'
          }}>
            How many days?
          </h1>

          {tripDurationType === 'flexible' ? (
            /* Day Picker */
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setNewTripDays(day)}
                  style={{
                    background: newTripDays === day ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' : 'transparent',
                    border: 'none',
                    padding: newTripDays === day ? '16px 50px' : '8px 30px',
                    borderRadius: '16px',
                    fontSize: newTripDays === day ? '42px' : '28px',
                    fontWeight: '700',
                    color: newTripDays === day ? 'white' : '#c8e6c9',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'all 0.2s ease',
                    boxShadow: newTripDays === day ? '0 4px 20px rgba(46,125,50,0.3)' : 'none'
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          ) : (
            /* Calendar Placeholder */
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <span style={{ fontSize: '60px' }}>📅</span>
              <p style={{ color: '#689f38', fontSize: '16px' }}>
                Calendar coming soon...
              </p>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div style={{ padding: '20px' }}>
          <button
            onClick={() => {
              const newTrip = {
                id: Date.now(),
                city: newTripCity,
                title: `${newTripDays}-Day ${newTripCity} Trip`,
                days: newTripDays,
                spots: newTripDays * 6,
                preferences: newTripPreferences,
                image: `https://source.unsplash.com/400x300/?${newTripCity},city`
              };
              setMyTrips(prev => [...prev, newTrip]);
              setNewTripCity('');
              setNewTripPreferences([]);
              setNewTripDays(3);
              setScreen('home');
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 15px rgba(46,125,50,0.3)'
            }}
          >
            ✓ Create My Trip
          </button>
        </div>
      </div>
    );
  }

  // ==================== DEFAULT - LOADING ====================
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5faf6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧭</div>
        <p style={{ color: '#689f38' }}>Loading...</p>
      </div>
    </div>
  );
}

export default App;