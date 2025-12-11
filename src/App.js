import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = 'https://xuaczwlwbsxoixosunzx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YWN6d2x3YnN4b2l4b3N1bnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODc1NjYsImV4cCI6MjA4MDg2MzU2Nn0.nfqRmFe0-1t_hDrPAc2oTO-y4UfbsEjen5sYbr1lYeE';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Google Places API Key
const GOOGLE_API_KEY = 'AIzaSyBy4tEpe49fgTAUd8P_A2PQ4swlvCDMlFw';

// Interest Categories
const INTERESTS = [
  { id: 'local-cuisine', emoji: '🍽️', label: 'Local Cuisine', searchTerm: 'best local restaurant' },
  { id: 'street-food', emoji: '🥙', label: 'Street Food', searchTerm: 'street food' },
  { id: 'coffee', emoji: '☕', label: 'Coffee Shops', searchTerm: 'coffee shop cafe' },
  { id: 'desserts', emoji: '🍰', label: 'Desserts', searchTerm: 'dessert bakery pastry' },
  { id: 'museums', emoji: '🏛️', label: 'Museums', searchTerm: 'museum' },
  { id: 'architecture', emoji: '🏰', label: 'Architecture', searchTerm: 'historic landmark architecture' },
  { id: 'festivals', emoji: '🎭', label: 'Festivals', searchTerm: 'cultural event festival' },
  { id: 'bars', emoji: '🍸', label: 'Bars & Pubs', searchTerm: 'bar pub' },
  { id: 'clubs', emoji: '🪩', label: 'Clubs', searchTerm: 'nightclub club' },
  { id: 'rooftops', emoji: '🌃', label: 'Rooftops', searchTerm: 'rooftop bar restaurant' },
  { id: 'markets', emoji: '🛍️', label: 'Local Markets', searchTerm: 'local market bazaar' },
  { id: 'vintage', emoji: '👗', label: 'Vintage Shops', searchTerm: 'vintage shop antique' },
  { id: 'viewpoints', emoji: '📸', label: 'Viewpoints', searchTerm: 'viewpoint scenic view' },
  { id: 'sunsets', emoji: '🌅', label: 'Sunset Spots', searchTerm: 'sunset view spot' },
  { id: 'hidden-gems', emoji: '💎', label: 'Hidden Gems', searchTerm: 'hidden gem local favorite' },
  { id: 'parks', emoji: '🌳', label: 'Parks & Nature', searchTerm: 'park garden nature' },
  { id: 'hiking', emoji: '🥾', label: 'Hiking Trails', searchTerm: 'hiking trail nature walk' },
  { id: 'wellness', emoji: '🧘', label: 'Wellness & Spas', searchTerm: 'spa wellness massage' },
];

// Vibe Options
const VIBES = [
  { id: 'calm', emoji: '🌿', label: 'Calm & Peaceful', modifier: 'quiet peaceful relaxing' },
  { id: 'romantic', emoji: '❤️', label: 'Romantic', modifier: 'romantic date night' },
  { id: 'trendy', emoji: '✨', label: 'Trendy & Modern', modifier: 'trendy popular instagram' },
  { id: 'local', emoji: '🏘️', label: 'Local-Only', modifier: 'local authentic traditional' },
  { id: 'luxury', emoji: '👑', label: 'Luxury', modifier: 'luxury upscale fine dining' },
  { id: 'artsy', emoji: '🎨', label: 'Artsy & Bohemian', modifier: 'artistic bohemian creative' },
];

// Helper function to get Google Places photo URL
const getPhotoUrl = (photo) => {
  if (!photo || !photo.name) return null;
  return `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=400&key=${GOOGLE_API_KEY}`;
};

// Helper function to convert price level to symbol
const getPriceSymbol = (priceLevel) => {
  const prices = {
    'PRICE_LEVEL_FREE': 'Free',
    'PRICE_LEVEL_INEXPENSIVE': '€',
    'PRICE_LEVEL_MODERATE': '€€',
    'PRICE_LEVEL_EXPENSIVE': '€€€',
    'PRICE_LEVEL_VERY_EXPENSIVE': '€€€€'
  };
  return prices[priceLevel] || '€€';
};

// Search places using Netlify Function
const searchPlaces = async (query, city) => {
  try {
    const response = await fetch('https://spontaneous-raindrop-cd0056.netlify.app/.netlify/functions/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, city })
    });
    
    const data = await response.json();
    
    if (data.places && data.places.length > 0) {
      return data.places.map(place => ({
        id: place.id,
        name: place.displayName?.text || 'Unknown Place',
        address: place.formattedAddress || '',
        rating: place.rating || 4.0,
        totalRatings: place.userRatingCount || 0,
        priceLevel: place.priceLevel,
        photos: place.photos || [],
        hours: place.regularOpeningHours?.weekdayDescriptions || [],
        description: place.editorialSummary?.text || ''
      }));
    }
    return [];
  } catch (error) {
    console.error('Places API error:', error);
    return [];
  }
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
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeReviews, setPlaceReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check authentication on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setScreen('welcome');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setScreen('welcome');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch reviews when place is selected
  useEffect(() => {
    if (selectedPlace) {
      fetchReviews(selectedPlace.name);
    }
  }, [selectedPlace]);

  // Load initial recommendations when entering chat
  useEffect(() => {
    if (screen === 'chat' && !initialLoadDone && selectedInterests.length > 0 && city) {
      loadInitialRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, initialLoadDone, selectedInterests, city]);

  // Load initial recommendations based on interests
  const loadInitialRecommendations = async () => {
    setIsLoading(true);
    setInitialLoadDone(true);

    try {
      const selectedInterestDetails = INTERESTS.filter(i => selectedInterests.includes(i.id));
      const selectedVibeDetail = VIBES.find(v => v.id === selectedVibe);
      const interestLabels = selectedInterestDetails.map(i => i.label).join(', ');
      const vibeLabel = selectedVibeDetail ? selectedVibeDetail.label : '';

      const introMessage = `Based on your interests (${interestLabels})${vibeLabel ? ` and ${vibeLabel} vibe` : ''}, here are my top picks in ${city}! 🎯`;

      const categoriesToShow = selectedInterestDetails.slice(0, 3);
      const allRecommendations = [];

      for (const interest of categoriesToShow) {
        const vibeModifier = selectedVibeDetail ? selectedVibeDetail.modifier : '';
        const searchQuery = `${vibeModifier} ${interest.searchTerm}`.trim();
        const places = await searchPlaces(searchQuery, city);

        if (places && places.length > 0) {
          const topPlaces = places.slice(0, 2);

          for (const place of topPlaces) {
            const photoUrl = place.photos.length > 0 ? getPhotoUrl(place.photos[0]) : null;
            const allPhotoUrls = place.photos.slice(0, 5).map(p => getPhotoUrl(p)).filter(Boolean);

            allRecommendations.push({
              id: place.id,
              name: place.name,
              type: interest.label,
              category: interest.id,
              emoji: interest.emoji,
              description: place.description || `A highly rated ${interest.label.toLowerCase()} spot in ${city}.`,
              price: getPriceSymbol(place.priceLevel),
              rating: place.rating,
              totalRatings: place.totalRatings,
              neighborhood: place.address.split(',')[0] || city,
              image: photoUrl,
              images: allPhotoUrls.length > 0 ? allPhotoUrls : [photoUrl].filter(Boolean),
              hours: place.hours.length > 0 ? place.hours[0] : 'Hours not available',
              address: place.address,
              bestTime: 'Check Google for busy times'
            });
          }
        }
      }

      setChatHistory([{
        role: 'assistant',
        content: {
          summary: allRecommendations.length > 0 ? introMessage : `Welcome to ${city}! Search for places below.`,
          recommendations: allRecommendations,
          tips: allRecommendations.length > 0 ? ['Real places & photos from Google!', 'Book popular spots in advance'] : []
        }
      }]);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setChatHistory([{
        role: 'assistant',
        content: {
          summary: `Welcome to ${city}! Search for places below.`,
          recommendations: [],
          tips: []
        }
      }]);
    }

    setIsLoading(false);
  };

  // Handle search query
  const handleGetRecommendations = async () => {
    if (!query.trim() || !city.trim() || isLoading) return;

    const currentQuery = query;
    setIsLoading(true);
    setQuery('');
    setChatHistory(prev => [...prev, { role: 'user', content: currentQuery }]);

    try {
      const places = await searchPlaces(currentQuery, city);
      const recommendations = [];

      if (places && places.length > 0) {
        for (const place of places.slice(0, 5)) {
          const photoUrl = place.photos.length > 0 ? getPhotoUrl(place.photos[0]) : null;
          const allPhotoUrls = place.photos.slice(0, 5).map(p => getPhotoUrl(p)).filter(Boolean);

          recommendations.push({
            id: place.id,
            name: place.name,
            type: currentQuery,
            category: 'search',
            emoji: '📍',
            description: place.description || `A great spot for ${currentQuery} in ${city}.`,
            price: getPriceSymbol(place.priceLevel),
            rating: place.rating,
            totalRatings: place.totalRatings,
            neighborhood: place.address.split(',')[0] || city,
            image: photoUrl,
            images: allPhotoUrls.length > 0 ? allPhotoUrls : [photoUrl].filter(Boolean),
            hours: place.hours.length > 0 ? place.hours[0] : 'Hours not available',
            address: place.address,
            bestTime: 'Check Google for busy times'
          });
        }
      }

      const response = {
        summary: recommendations.length > 0
          ? `Here are the best "${currentQuery}" spots in ${city}! 🎯`
          : `I couldn't find "${currentQuery}" in ${city}. Try different keywords!`,
        recommendations,
        tips: recommendations.length > 0 ? ['Real photos from Google!'] : []
      };

      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Search error:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: {
          summary: 'Something went wrong. Please try again.',
          recommendations: [],
          tips: []
        }
      }]);
    }

    setIsLoading(false);
  };

  // Fetch reviews from Supabase
  const fetchReviews = async (placeName) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('place_name', placeName)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setPlaceReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  // Submit review to Supabase
  const submitReview = async () => {
    if (!userRating || !currentUser) return;
    
    setSubmittingReview(true);
    
    try {
      const { error } = await supabase.from('reviews').insert({
        place_name: selectedPlace.name,
        city: city,
        user_email: currentUser.email,
        rating: userRating,
        comment: userComment
      });
      
      if (!error) {
        setUserRating(0);
        setUserComment('');
        fetchReviews(selectedPlace.name);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
    
    setSubmittingReview(false);
  };

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
        setScreen('welcome');
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
        setScreen('welcome');
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
    setSelectedInterests([]);
    setSelectedVibe(null);
    setCity('');
    setChatHistory([]);
    setInitialLoadDone(false);
    setAuthMode('login');
    setScreen('auth');
  };

  // Toggle interest selection
  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Open place detail page
  const openPlaceDetail = (place) => {
    setSelectedPlace(place);
    setCurrentImageIndex(0);
    setUserRating(0);
    setUserComment('');
    setPlaceReviews([]);
    setScreen('detail');
  };

  // Fallback image
  const fallbackImage = 'https://via.placeholder.com/400x300?text=No+Image';

  // ==================== DETAIL SCREEN ====================
  if (screen === 'detail' && selectedPlace) {
    const images = selectedPlace.images?.filter(img => img) || [];

    return (
      <div style={{ minHeight: '100vh', background: '#f5faf6', fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
          padding: '16px 20px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <button
            onClick={() => { setScreen('chat'); setSelectedPlace(null); }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 12px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif"
            }}>
              {selectedPlace.name}
            </h1>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
              📍 {selectedPlace.neighborhood}
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#e0e0e0' }}>
          <img
            src={images[currentImageIndex] || fallbackImage}
            alt={selectedPlace.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => { e.target.src = fallbackImage; }}
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ›
              </button>
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
              }}>
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: idx === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </>
          )}
          
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px'
          }}>
            {currentImageIndex + 1} / {images.length || 1}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Rating & Price Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '36px', fontWeight: '700', color: '#1b5e20' }}>
                  {selectedPlace.rating?.toFixed(1) || 'N/A'}
                </span>
                <div>
                  <StarRating rating={Math.round(selectedPlace.rating || 0)} size={20} />
                  <p style={{ margin: '4px 0 0', color: '#689f38', fontSize: '12px' }}>
                    {selectedPlace.totalRatings?.toLocaleString() || 0} Google reviews
                  </p>
                </div>
              </div>
            </div>
            <div style={{
              background: '#e8f5e9',
              color: '#2e7d32',
              padding: '10px 20px',
              borderRadius: '25px',
              fontWeight: '700',
              fontSize: '18px'
            }}>
              {selectedPlace.price}
            </div>
          </div>

          {/* About Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{
              margin: '0 0 16px',
              color: '#1b5e20',
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px'
            }}>
              About
            </h3>
            <p style={{ margin: '0 0 20px', color: '#558b2f', lineHeight: '1.7' }}>
              {selectedPlace.description}
            </p>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px',
                background: '#f9fdf9',
                borderRadius: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>📍</span>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#1b5e20' }}>Address</p>
                  <p style={{ margin: '2px 0 0', color: '#689f38', fontSize: '14px' }}>
                    {selectedPlace.address}
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px',
                background: '#f9fdf9',
                borderRadius: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>⏰</span>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#1b5e20' }}>Hours</p>
                  <p style={{ margin: '2px 0 0', color: '#689f38', fontSize: '14px' }}>
                    {selectedPlace.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Write Review Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{
              margin: '0 0 20px',
              color: '#1b5e20',
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px'
            }}>
              ✍️ Write a Review
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 10px', color: '#558b2f', fontSize: '14px' }}>
                Rate this place
              </p>
              <StarRating
                rating={userRating}
                onRate={setUserRating}
                size={36}
                interactive={true}
              />
            </div>
            
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Share your experience..."
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '2px solid #c8e6c9',
                fontSize: '15px',
                fontFamily: "'DM Sans', sans-serif",
                minHeight: '100px',
                resize: 'vertical',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            
            <button
              onClick={submitReview}
              disabled={!userRating || submittingReview}
              style={{
                width: '100%',
                background: userRating
                  ? 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)'
                  : '#e0e0e0',
                color: userRating ? 'white' : '#9e9e9e',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: userRating ? 'pointer' : 'not-allowed',
                marginTop: '16px',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              {submittingReview ? '⏳ Submitting...' : '📤 Submit Review'}
            </button>
          </div>

          {/* Reviews Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{
              margin: '0 0 20px',
              color: '#1b5e20',
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px'
            }}>
              💬 Tourista Reviews ({placeReviews.length})
            </h3>
            
            {placeReviews.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: '#f9fdf9',
                borderRadius: '12px'
              }}>
                <span style={{ fontSize: '48px' }}>📝</span>
                <p style={{ color: '#689f38', margin: '16px 0 0' }}>
                  No reviews yet. Be the first!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {placeReviews.map((review, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: '#f9fdf9',
                      borderRadius: '12px',
                      borderLeft: '4px solid #4caf50'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontWeight: '600', color: '#1b5e20' }}>
                        👤 {review.user_email?.split('@')[0]}
                      </span>
                      <StarRating rating={review.rating} size={16} />
                    </div>
                    {review.comment && (
                      <p style={{ margin: '0 0 8px', color: '#558b2f', fontSize: '14px' }}>
                        "{review.comment}"
                      </p>
                    )}
                    <p style={{ margin: 0, color: '#9e9e9e', fontSize: '12px' }}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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

  // ==================== WELCOME SCREEN ====================
  if (screen === 'welcome') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(165deg, #f0f9f4 0%, #ffffff 40%, #e8f5e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'white',
            border: '2px solid #c8e6c9',
            borderRadius: '10px',
            padding: '8px 16px',
            color: '#2e7d32',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Logout
        </button>

        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            boxShadow: '0 20px 60px rgba(46,125,50,0.3)',
            marginBottom: '32px'
          }}>
            🧭
          </div>
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '42px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 12px 0'
          }}>
            TOURISTA
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#558b2f',
            margin: '0 0 48px 0'
          }}>
            Welcome back, {currentUser?.email?.split('@')[0]}! 🎉
          </p>
          
          <button
            onClick={() => setScreen('interests')}
            style={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
              color: 'white',
              border: 'none',
              padding: '18px 48px',
              borderRadius: '50px',
              fontSize: '17px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(46,125,50,0.35)',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Start Exploring →
          </button>
        </div>
      </div>
    );
  }

  // ==================== INTERESTS SCREEN ====================
  if (screen === 'interests') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f8e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        padding: '20px'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Back Button */}
          <button
            onClick={() => setScreen('welcome')}
            style={{
              background: 'white',
              border: '2px solid #c8e6c9',
              borderRadius: '12px',
              padding: '10px 16px',
              color: '#2e7d32',
              cursor: 'pointer',
              marginBottom: '24px',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            ← Back
          </button>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '28px',
            color: '#1b5e20',
            margin: '0 0 8px 0'
          }}>
            What excites you?
          </h2>
          <p style={{ color: '#689f38', margin: '0 0 24px 0' }}>
            Select your interests (choose as many as you like)
          </p>

          {/* Interests Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '32px'
          }}>
            {INTERESTS.map(interest => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                style={{
                  background: selectedInterests.includes(interest.id)
                    ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)'
                    : '#ffffff',
                  color: selectedInterests.includes(interest.id) ? 'white' : '#2e7d32',
                  border: selectedInterests.includes(interest.id) ? 'none' : '2px solid #c8e6c9',
                  padding: '14px 10px',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '24px' }}>{interest.emoji}</span>
                <span style={{ fontSize: '11px', fontWeight: '500' }}>{interest.label}</span>
              </button>
            ))}
          </div>

          {/* Vibes Section */}
          <h3 style={{ fontSize: '16px', color: '#1b5e20', margin: '0 0 12px 0' }}>
            Choose your vibe ✨
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px'
          }}>
            {VIBES.map(vibe => (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id === selectedVibe ? null : vibe.id)}
                style={{
                  background: selectedVibe === vibe.id
                    ? 'linear-gradient(135deg, #558b2f 0%, #7cb342 100%)'
                    : '#ffffff',
                  color: selectedVibe === vibe.id ? 'white' : '#558b2f',
                  border: selectedVibe === vibe.id ? 'none' : '2px solid #dcedc8',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s ease'
                }}
              >
                {vibe.emoji} {vibe.label}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={() => setScreen('city')}
            disabled={selectedInterests.length === 0}
            style={{
              width: '100%',
              background: selectedInterests.length > 0
                ? 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)'
                : '#e0e0e0',
              color: selectedInterests.length > 0 ? 'white' : '#9e9e9e',
              border: 'none',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: selectedInterests.length > 0 ? 'pointer' : 'not-allowed',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Continue ({selectedInterests.length} selected)
          </button>
        </div>
      </div>
    );
  }

  // ==================== CITY SCREEN ====================
  if (screen === 'city') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #e8f5e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          {/* Back Button */}
          <button
            onClick={() => setScreen('interests')}
            style={{
              background: 'white',
              border: '2px solid #c8e6c9',
              borderRadius: '12px',
              padding: '10px 16px',
              color: '#2e7d32',
              cursor: 'pointer',
              marginBottom: '24px',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            ← Back
          </button>

          <div style={{ fontSize: '64px', marginBottom: '24px' }}>📍</div>
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '28px',
            color: '#1b5e20',
            margin: '0 0 8px 0'
          }}>
            Where are you exploring?
          </h2>
          <p style={{ color: '#689f38', margin: '0 0 32px 0' }}>
            Enter your destination city
          </p>

          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="e.g., Paris, Istanbul, Tokyo..."
            style={{
              width: '100%',
              padding: '18px 20px',
              borderRadius: '14px',
              border: '2px solid #c8e6c9',
              fontSize: '16px',
              outline: 'none',
              marginBottom: '20px',
              boxSizing: 'border-box',
              fontFamily: "'DM Sans', sans-serif"
            }}
          />

          <button
            onClick={() => {
              setInitialLoadDone(false);
              setChatHistory([]);
              setScreen('chat');
            }}
            disabled={!city.trim()}
            style={{
              width: '100%',
              background: city.trim()
                ? 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)'
                : '#e0e0e0',
              color: city.trim() ? 'white' : '#9e9e9e',
              border: 'none',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: city.trim() ? 'pointer' : 'not-allowed',
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Let's Go! 🚀
          </button>
        </div>
      </div>
    );
  }

  // ==================== CHAT SCREEN ====================
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5faf6',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
        padding: '16px 20px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {
              setScreen('city');
              setChatHistory([]);
              setInitialLoadDone(false);
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 12px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          <span style={{ fontSize: '24px' }}>🧭</span>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif"
            }}>
              TOURISTA
            </h1>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>📍 {city}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Logout
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {chatHistory.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' ? (
              <div style={{
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '16px 16px 4px 16px',
                maxWidth: '80%',
                marginLeft: 'auto'
              }}>
                {msg.content}
              </div>
            ) : (
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                {msg.content.summary && (
                  <p style={{
                    margin: '0 0 16px 0',
                    color: '#1b5e20',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}>
                    {msg.content.summary}
                  </p>
                )}

                {/* COMPACT CARD DESIGN - Small image left, info right */}
                {msg.content.recommendations?.map((rec, j) => (
                  <div
                    key={j}
                    style={{
                      background: '#f9fdf9',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                      borderLeft: '4px solid #4caf50',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    {/* Place Image - Small on Left */}
                    <div style={{
                      width: '120px',
                      minWidth: '120px',
                      height: '140px',
                      position: 'relative',
                      flexShrink: 0
                    }}>
                      <img
                        src={rec.image || fallbackImage}
                        alt={rec.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => { e.target.src = fallbackImage; }}
                      />
                      {rec.rating && (
                        <div style={{
                          position: 'absolute',
                          bottom: '6px',
                          left: '6px',
                          background: 'rgba(0,0,0,0.75)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          ⭐ {rec.rating?.toFixed(1)}
                        </div>
                      )}
                    </div>

                    {/* Place Info - Right Side */}
                    <div style={{ 
                      padding: '12px 14px', 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minWidth: 0
                    }}>
                      {/* Header: Name, Type & Price */}
                      <div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '4px',
                          gap: '8px'
                        }}>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <strong style={{ 
                              color: '#1b5e20', 
                              fontSize: '14px',
                              display: 'block',
                              lineHeight: '1.2',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {rec.name}
                            </strong>
                            <span style={{
                              fontSize: '11px',
                              color: '#689f38',
                              fontWeight: '500'
                            }}>
                              {rec.emoji} {rec.type}
                            </span>
                          </div>
                          <span style={{
                            background: '#e8f5e9',
                            color: '#2e7d32',
                            padding: '3px 10px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}>
                            {rec.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p style={{
                          margin: '6px 0',
                          color: '#558b2f',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {rec.description}
                        </p>

                        {/* Location & Reviews */}
                        <div style={{
                          fontSize: '11px',
                          color: '#7cb342'
                        }}>
                          <span>📍 {rec.neighborhood}</span>
                          {rec.totalRatings > 0 && (
                            <span style={{ marginLeft: '10px' }}>
                              👥 {rec.totalRatings?.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => openPlaceDetail(rec)}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          marginTop: '8px'
                        }}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}

                {msg.content.tips?.length > 0 && (
                  <div style={{
                    background: '#fff8e1',
                    borderRadius: '12px',
                    padding: '16px',
                    marginTop: '12px'
                  }}>
                    <strong style={{ color: '#f57f17', fontSize: '14px' }}>💡 Tips</strong>
                    {msg.content.tips.map((tip, j) => (
                      <p key={j} style={{
                        margin: '8px 0 0',
                        color: '#6d4c41',
                        fontSize: '13px'
                      }}>
                        • {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#4caf50',
              animation: 'pulse 1s infinite'
            }} />
            <span style={{ color: '#689f38' }}>
              🔍 Finding real places in {city}...
            </span>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div style={{
        background: 'white',
        padding: '16px 20px',
        borderTop: '1px solid #e8f5e9'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGetRecommendations()}
            placeholder="Search for restaurants, cafes, museums..."
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: '14px',
              border: '2px solid #c8e6c9',
              fontSize: '15px',
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif"
            }}
          />
          <button
            onClick={handleGetRecommendations}
            disabled={!query.trim() || isLoading}
            style={{
              background: query.trim() && !isLoading
                ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)'
                : '#e0e0e0',
              color: 'white',
              border: 'none',
              padding: '14px 20px',
              borderRadius: '14px',
              fontSize: '18px',
              cursor: query.trim() && !isLoading ? 'pointer' : 'not-allowed'
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Pulse Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default App;