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
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    color: '#E8D5B7'
  },
  {
    id: 'rome-1day',
    city: 'Rome',
    country: 'Italy',
    title: '1-Day Rome Trip',
    days: 1,
    spots: 7,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    color: '#D4E5F7'
  },
  {
    id: 'london-3day',
    city: 'London',
    country: 'UK',
    title: '3-Day London Trip',
    days: 3,
    spots: 19,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    color: '#1E3A5F'
  },
  {
    id: 'tokyo-2day',
    city: 'Tokyo',
    country: 'Japan',
    title: '2-Day Tokyo Trip',
    days: 2,
    spots: 12,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    color: '#FFB7C5'
  },
  {
    id: 'istanbul-2day',
    city: 'Istanbul',
    country: 'Turkey',
    title: '2-Day Istanbul Trip',
    days: 2,
    spots: 14,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
    color: '#F5DEB3'
  }
];

// Interest Categories (Simplified for Trip Planning)
const TRIP_CATEGORIES = [
  { id: 'popular', emoji: '📍', label: 'Popular' },
  { id: 'museum', emoji: '🏛️', label: 'Museum' },
  { id: 'nature', emoji: '🌿', label: 'Nature' },
  { id: 'foodie', emoji: '🍕', label: 'Foodie' },
  { id: 'history', emoji: '🏰', label: 'History' },
  { id: 'shopping', emoji: '🛍️', label: 'Shopping' },
];

// Helper function to get Google Places photo URL
const getPhotoUrl = (photo, size = 400) => {
  if (!photo || !photo.name) return null;
  return `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=${size}&key=${GOOGLE_API_KEY}`;
};

// Star Rating Component
const StarRating = ({ rating, onRate, size = 24, interactive = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          style={{
            fontSize: `${size}px`,
            cursor: interactive ? 'pointer' : 'default',
            color: star <= (hoverRating || rating) ? '#FFD700' : '#E0E0E0',
            transition: 'all 0.2s ease',
            transform: interactive && star <= hoverRating ? 'scale(1.2)' : 'scale(1)'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

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
  const [tripDurationType, setTripDurationType] = useState('flexible'); // 'flexible' or 'dates'
  const [tripStartDate, setTripStartDate] = useState(null);
  const [tripEndDate, setTripEndDate] = useState(null);

  // Bottom Navigation
  const [activeTab, setActiveTab] = useState('trips'); // 'trips', 'add', 'map'

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
        background: '#ffffff',
        fontFamily: "'DM Sans', sans-serif",
        paddingBottom: '80px'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          padding: '20px 20px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '28px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: 0
          }}>
            Tourista
          </h1>
          <div
            onClick={handleLogout}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {currentUser?.email?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Travel Guides Section */}
        <div style={{ padding: '20px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#9e9e9e',
            margin: '0 0 16px 0'
          }}>
            Travel Guides
          </h2>
          
          {/* Horizontal Scroll */}
          <div style={{
            display: 'flex',
            gap: '12px',
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
                  minWidth: '160px',
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={guide.image}
                  alt={guide.city}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
                }} />
                {/* City Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(255,255,255,0.95)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ color: '#e53935' }}>📍</span>
                  {guide.city}
                </div>
                {/* Info */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  color: 'white'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: '600'
                  }}>
                    {guide.title}
                  </p>
                  <p style={{
                    margin: '4px 0 0',
                    fontSize: '12px',
                    opacity: 0.9
                  }}>
                    {guide.spots} Spots
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Trips Section */}
        <div style={{ padding: '20px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#9e9e9e',
            margin: '0 0 16px 0'
          }}>
            My Trips
          </h2>

          {myTrips.length === 0 ? (
            /* Empty State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px'
            }}>
              {/* Mascot */}
              <div style={{
                fontSize: '80px',
                marginBottom: '16px'
              }}>
                🧭
              </div>
              {/* Speech Bubble */}
              <div style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                padding: '12px 20px',
                marginBottom: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <p style={{
                  margin: 0,
                  color: '#333',
                  fontSize: '15px',
                  fontWeight: '500'
                }}>
                  Where we going?
                </p>
              </div>
              {/* Start New Trip Button */}
              <button
                onClick={() => setScreen('newTripCity')}
                style={{
                  background: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Start new trip
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
                    background: '#f5f8ff',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1a237e'
                    }}>
                      {trip.title}
                    </h3>
                    <p style={{
                      margin: '4px 0 0',
                      fontSize: '13px',
                      color: '#5c6bc0'
                    }}>
                      {trip.days} Days {trip.days - 1} Nights
                    </p>
                    <p style={{
                      margin: '2px 0 0',
                      fontSize: '13px',
                      color: '#5c6bc0'
                    }}>
                      {trip.spots} Spots
                    </p>
                  </div>
                  <div style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transform: 'rotate(5deg)'
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
                </div>
              ))}
              
              {/* Add New Trip Button */}
              <button
                onClick={() => setScreen('newTripCity')}
                style={{
                  background: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: '16px',
                  alignSelf: 'center'
                }}
              >
                Start new trip
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          borderRadius: '40px',
          padding: '12px 32px',
          display: 'flex',
          gap: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <button
            onClick={() => setActiveTab('trips')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              opacity: activeTab === 'trips' ? 1 : 0.4,
              padding: '8px'
            }}
          >
            🧳
          </button>
          <button
            onClick={() => setScreen('newTripCity')}
            style={{
              background: '#1a1a1a',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
          <button
            onClick={() => setActiveTab('map')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              opacity: activeTab === 'map' ? 1 : 0.4,
              padding: '8px'
            }}
          >
            🗺️
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
        background: 'linear-gradient(180deg, #e0f7fa 0%, #80deea 50%, #00bcd4 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Back Button */}
        <button
          onClick={() => setScreen('home')}
          style={{
            background: 'none',
            border: 'none',
            color: '#00695c',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '20px',
            alignSelf: 'flex-start'
          }}
        >
          ←
        </button>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            Where are we going?
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 24px 0'
          }}>
            Search for your destination
          </p>

          {/* Search Input */}
          <div style={{
            background: 'white',
            borderRadius: '30px',
            padding: '4px',
            marginBottom: '40px'
          }}>
            <input
              type="text"
              value={newTripCity}
              onChange={(e) => setNewTripCity(e.target.value)}
              placeholder="🔍  Search city..."
              style={{
                width: '100%',
                padding: '16px 20px',
                border: 'none',
                borderRadius: '26px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'DM Sans', sans-serif"
              }}
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={() => newTripCity.trim() && setScreen('newTripPreferences')}
            disabled={!newTripCity.trim()}
            style={{
              background: newTripCity.trim() ? '#1a1a1a' : 'rgba(0,0,0,0.3)',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: newTripCity.trim() ? 'pointer' : 'not-allowed',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '20px'
            }}
          >
            Continue
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
        background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Back Button */}
        <button
          onClick={() => setScreen('newTripCity')}
          style={{
            background: 'none',
            border: 'none',
            color: '#1565c0',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '20px',
            alignSelf: 'flex-start'
          }}
        >
          ←
        </button>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px'
        }}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>👍</span>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#0d47a1',
            margin: '0 0 8px 0'
          }}>
            Trip Preferences
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#5c6bc0',
            margin: '0 0 24px 0'
          }}>
            What should your trip be about?
          </p>

          {/* Categories */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '32px'
          }}>
            {TRIP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => togglePreference(cat.id)}
                style={{
                  background: newTripPreferences.includes(cat.id) ? '#1a1a1a' : 'white',
                  color: newTripPreferences.includes(cat.id) ? 'white' : '#333',
                  border: '2px solid',
                  borderColor: newTripPreferences.includes(cat.id) ? '#1a1a1a' : '#e0e0e0',
                  padding: '10px 18px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Trip Duration Link */}
          <div
            onClick={() => setScreen('newTripDuration')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 0',
              borderTop: '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '20px' }}>📅</span>
            <span style={{ fontSize: '16px', color: '#5c6bc0' }}>
              Trip Duration
            </span>
            <span style={{ marginLeft: 'auto', color: '#9e9e9e' }}>→</span>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => setScreen('newTripDuration')}
            style={{
              background: '#1a1a1a',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              marginTop: '16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            ✓ Continue
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
        background: 'linear-gradient(180deg, #e0f2f1 0%, #b2dfdb 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px'
        }}>
          <button
            onClick={() => setScreen('newTripPreferences')}
            style={{
              background: 'none',
              border: 'none',
              color: '#00695c',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          
          {/* Toggle */}
          <div style={{
            background: 'white',
            borderRadius: '25px',
            padding: '4px',
            display: 'flex'
          }}>
            <button
              onClick={() => setTripDurationType('dates')}
              style={{
                background: tripDurationType === 'dates' ? '#1a1a1a' : 'transparent',
                color: tripDurationType === 'dates' ? 'white' : '#666',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Dates
            </button>
            <button
              onClick={() => setTripDurationType('flexible')}
              style={{
                background: tripDurationType === 'flexible' ? '#1a1a1a' : 'transparent',
                color: tripDurationType === 'flexible' ? 'white' : '#666',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Flexible
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
            fontSize: '28px',
            fontWeight: '700',
            color: '#004d40',
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
              gap: '16px'
            }}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setNewTripDays(day)}
                  style={{
                    background: newTripDays === day ? 'rgba(255,255,255,0.9)' : 'transparent',
                    border: 'none',
                    padding: newTripDays === day ? '16px 60px' : '8px 40px',
                    borderRadius: '16px',
                    fontSize: newTripDays === day ? '48px' : '32px',
                    fontWeight: '700',
                    color: newTripDays === day ? '#004d40' : 'rgba(0,77,64,0.3)',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'all 0.2s ease'
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          ) : (
            /* Calendar (Placeholder) */
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <p style={{ color: '#00695c', fontSize: '16px' }}>
                📅 Calendar coming soon...
              </p>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div style={{ padding: '20px' }}>
          <button
            onClick={() => {
              // For now, just show a loading state and go back home
              // AI trip generation will be added later
              const newTrip = {
                id: Date.now(),
                city: newTripCity,
                title: `${newTripDays}-Day ${newTripCity} Trip`,
                days: newTripDays,
                spots: newTripDays * 6,
                preferences: newTripPreferences,
                image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop'
              };
              setMyTrips(prev => [...prev, newTrip]);
              setNewTripCity('');
              setNewTripPreferences([]);
              setNewTripDays(3);
              setScreen('home');
            }}
            style={{
              width: '100%',
              background: '#1a1a1a',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Confirm
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