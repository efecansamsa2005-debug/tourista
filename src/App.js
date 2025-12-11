import React, { useState, useEffect } from 'react';

// Demo mode - no Supabase needed for artifact preview
const DEMO_MODE = true;

const DAY_COLORS = ['#e53935', '#1e88e5', '#43a047', '#fb8c00', '#8e24aa', '#00acc1', '#d81b60'];

const CITY_DATABASE = [
  { city: 'Paris', country: 'France', flag: '🇫🇷', lat: 48.8566, lng: 2.3522 },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', lat: 51.5074, lng: -0.1278 },
  { city: 'Rome', country: 'Italy', flag: '🇮🇹', lat: 41.9028, lng: 12.4964 },
  { city: 'Barcelona', country: 'Spain', flag: '🇪🇸', lat: 41.3851, lng: 2.1734 },
  { city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', lat: 52.3676, lng: 4.9041 },
  { city: 'Prague', country: 'Czech Republic', flag: '🇨🇿', lat: 50.0755, lng: 14.4378 },
  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', lat: 41.0082, lng: 28.9784 },
  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.6762, lng: 139.6503 },
  { city: 'New York', country: 'USA', flag: '🇺🇸', lat: 40.7128, lng: -74.0060 },
  { city: 'Los Angeles', country: 'USA', flag: '🇺🇸', lat: 34.0522, lng: -118.2437 },
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', lat: 25.2048, lng: 55.2708 },
  { city: 'Singapore', country: 'Singapore', flag: '🇸🇬', lat: 1.3521, lng: 103.8198 },
  { city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', lat: 13.7563, lng: 100.5018 },
  { city: 'Berlin', country: 'Germany', flag: '🇩🇪', lat: 52.5200, lng: 13.4050 },
  { city: 'Vienna', country: 'Austria', flag: '🇦🇹', lat: 48.2082, lng: 16.3738 },
  { city: 'Madrid', country: 'Spain', flag: '🇪🇸', lat: 40.4168, lng: -3.7038 },
  { city: 'Lisbon', country: 'Portugal', flag: '🇵🇹', lat: 38.7223, lng: -9.1393 },
  { city: 'Athens', country: 'Greece', flag: '🇬🇷', lat: 37.9838, lng: 23.7275 },
  { city: 'Budapest', country: 'Hungary', flag: '🇭🇺', lat: 47.4979, lng: 19.0402 },
  { city: 'Seoul', country: 'South Korea', flag: '🇰🇷', lat: 37.5665, lng: 126.9780 },
  { city: 'Bali', country: 'Indonesia', flag: '🇮🇩', lat: -8.3405, lng: 115.0920 },
  { city: 'Cairo', country: 'Egypt', flag: '🇪🇬', lat: 30.0444, lng: 31.2357 },
  { city: 'Marrakech', country: 'Morocco', flag: '🇲🇦', lat: 31.6295, lng: -7.9811 },
  { city: 'Miami', country: 'USA', flag: '🇺🇸', lat: 25.7617, lng: -80.1918 },
  { city: 'Santorini', country: 'Greece', flag: '🇬🇷', lat: 36.3932, lng: 25.4615 },
  { city: 'Dubrovnik', country: 'Croatia', flag: '🇭🇷', lat: 42.6507, lng: 18.0944 },
  { city: 'Antalya', country: 'Turkey', flag: '🇹🇷', lat: 36.8969, lng: 30.7133 },
  { city: 'Bodrum', country: 'Turkey', flag: '🇹🇷', lat: 37.0343, lng: 27.4305 },
  { city: 'Cappadocia', country: 'Turkey', flag: '🇹🇷', lat: 38.6431, lng: 34.8289 },
  { city: 'Maldives', country: 'Maldives', flag: '🇲🇻', lat: 3.2028, lng: 73.2207 },
];

const TRIP_CATEGORIES = [
  { id: 'architecture', emoji: '🏛️', label: 'Architecture' },
  { id: 'nightlife', emoji: '🌙', label: 'Nightlife' },
  { id: 'art', emoji: '🎨', label: 'Art & Culture' },
  { id: 'cuisine', emoji: '🍽️', label: 'Local Cuisine' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure' },
  { id: 'instagram', emoji: '📸', label: 'Instagram Spots' }
];

const SPOT_DETAILS = {
  'default': { 
    rating: 4.5, 
    reviews: 10000, 
    description: 'A must-visit attraction with unique history.', 
    tips: ['Check opening hours', 'Book tickets online', 'Visit early morning'] 
  }
};

// Sample pre-built guides
const TRAVEL_GUIDES = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    title: '3-Day Paris Trip',
    days: 3,
    center: [48.8566, 2.3522],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Iconic Paris',
        spots: [
          { name: 'Eiffel Tower', type: 'Landmark', duration: '2 hours', walkTime: null, lat: 48.8584, lng: 2.2945, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=100&h=100&fit=crop' },
          { name: 'Arc de Triomphe', type: 'Landmark', duration: '1 hour', walkTime: '25 min', lat: 48.8738, lng: 2.2950, image: 'https://images.unsplash.com/photo-1518805208834-71ae392e0804?w=100&h=100&fit=crop' },
          { name: 'Champs-Élysées', type: 'Shopping', duration: '2 hours', walkTime: '5 min', lat: 48.8698, lng: 2.3076, image: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=100&h=100&fit=crop' },
        ]
      },
      {
        day: 2,
        title: 'Art & Culture',
        spots: [
          { name: 'Louvre Museum', type: 'Museum', duration: '4 hours', walkTime: null, lat: 48.8606, lng: 2.3376, image: 'https://images.unsplash.com/photo-1499426600726-7f1e2d5c39ce?w=100&h=100&fit=crop' },
          { name: 'Notre-Dame', type: 'Landmark', duration: '1 hour', walkTime: '15 min', lat: 48.8530, lng: 2.3499, image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=100&h=100&fit=crop' },
        ]
      },
      {
        day: 3,
        title: 'Montmartre',
        spots: [
          { name: 'Sacré-Cœur', type: 'Landmark', duration: '1 hour', walkTime: null, lat: 48.8867, lng: 2.3431, image: 'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?w=100&h=100&fit=crop' },
          { name: 'Moulin Rouge', type: 'Entertainment', duration: '30 min', walkTime: '10 min', lat: 48.8842, lng: 2.3322, image: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?w=100&h=100&fit=crop' },
        ]
      }
    ]
  },
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    flag: '🇹🇷',
    title: '3-Day Istanbul Trip',
    days: 3,
    center: [41.0082, 28.9784],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Sultanahmet',
        spots: [
          { name: 'Hagia Sophia', type: 'Landmark', duration: '2 hours', walkTime: null, lat: 41.0086, lng: 28.9802, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Blue Mosque', type: 'Landmark', duration: '1 hour', walkTime: '5 min', lat: 41.0054, lng: 28.9768, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Topkapi Palace', type: 'Museum', duration: '3 hours', walkTime: '10 min', lat: 41.0115, lng: 28.9833, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        ]
      },
      {
        day: 2,
        title: 'Bazaars',
        spots: [
          { name: 'Grand Bazaar', type: 'Market', duration: '2 hours', walkTime: null, lat: 41.0107, lng: 28.9680, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Spice Bazaar', type: 'Market', duration: '1 hour', walkTime: '10 min', lat: 41.0166, lng: 28.9706, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        ]
      },
      {
        day: 3,
        title: 'Modern Istanbul',
        spots: [
          { name: 'Galata Tower', type: 'Landmark', duration: '1 hour', walkTime: null, lat: 41.0256, lng: 28.9741, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Istiklal Avenue', type: 'Shopping', duration: '2 hours', walkTime: '5 min', lat: 41.0340, lng: 28.9770, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        ]
      }
    ]
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    title: '3-Day Tokyo Trip',
    days: 3,
    center: [35.6762, 139.6503],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Traditional',
        spots: [
          { name: 'Senso-ji Temple', type: 'Temple', duration: '2 hours', walkTime: null, lat: 35.7148, lng: 139.7967, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Tokyo Skytree', type: 'Viewpoint', duration: '1.5 hours', walkTime: '15 min', lat: 35.7101, lng: 139.8107, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        ]
      },
      {
        day: 2,
        title: 'Modern',
        spots: [
          { name: 'Shibuya Crossing', type: 'Landmark', duration: '30 min', walkTime: null, lat: 35.6595, lng: 139.7004, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Harajuku', type: 'Shopping', duration: '2 hours', walkTime: '15 min', lat: 35.6702, lng: 139.7027, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        ]
      },
      {
        day: 3,
        title: 'Culture',
        spots: [
          { name: 'Tsukiji Market', type: 'Market', duration: '2 hours', walkTime: null, lat: 35.6654, lng: 139.7707, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Imperial Palace', type: 'Landmark', duration: '1.5 hours', walkTime: 'Metro', lat: 35.6852, lng: 139.7528, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        ]
      }
    ]
  }
];

// Calendar Picker Component
function CalendarPicker({ selectedDates, onSelectDates }) {
  const [currentMonth] = useState(new Date());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    
    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      onSelectDates({ start: date, end: null });
    } else {
      if (date < selectedDates.start) {
        onSelectDates({ start: date, end: selectedDates.start });
      } else {
        onSelectDates({ ...selectedDates, end: date });
      }
    }
  };

  const isSelected = (date) => {
    if (!date) return false;
    if (selectedDates.start && date.toDateString() === selectedDates.start.toDateString()) return true;
    if (selectedDates.end && date.toDateString() === selectedDates.end.toDateString()) return true;
    return false;
  };

  const isInRange = (date) => {
    if (!date || !selectedDates.start || !selectedDates.end) return false;
    return date > selectedDates.start && date < selectedDates.end;
  };

  const isPast = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const renderMonth = (monthDate) => {
    const days = getDaysInMonth(monthDate);
    return (
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b5e20', margin: '0 0 12px', textAlign: 'center' }}>
          {months[monthDate.getMonth()]} {monthDate.getFullYear()}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {dayNames.map((day, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: '11px', color: '#999', padding: '6px', fontWeight: '600' }}>{day}</div>
          ))}
          {days.map((date, i) => (
            <div 
              key={i} 
              onClick={() => handleDateClick(date)} 
              style={{ 
                textAlign: 'center', 
                padding: '10px 6px', 
                borderRadius: '10px', 
                cursor: date && !isPast(date) ? 'pointer' : 'default', 
                background: isSelected(date) ? '#1b5e20' : isInRange(date) ? '#e8f5e9' : 'transparent', 
                color: !date ? 'transparent' : isPast(date) ? '#ccc' : isSelected(date) ? 'white' : '#333', 
                fontWeight: isSelected(date) ? '700' : '400', 
                fontSize: '13px'
              }}
            >
              {date ? date.getDate() : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
      {renderMonth(currentMonth)}
      {renderMonth(nextMonthDate)}
      {selectedDates.start && selectedDates.end && (
        <div style={{ background: '#e8f5e9', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#1b5e20', fontWeight: '600' }}>
            {Math.ceil(Math.abs(selectedDates.end - selectedDates.start) / (1000 * 60 * 60 * 24)) + 1} days selected
          </p>
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [screen, setScreen] = useState('home');
  const [currentUser] = useState({ email: 'demo@tourista.app' });
  const [myTrips, setMyTrips] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [tripToDelete, setTripToDelete] = useState(null);

  // NEW States for AI Trip Flow
  const [newTripCity, setNewTripCity] = useState('');
  const [newTripCityData, setNewTripCityData] = useState(null);
  const [newTripPreferences, setNewTripPreferences] = useState([]);
  const [newTripDays, setNewTripDays] = useState(3);
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [durationMode, setDurationMode] = useState('flexible');
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [showAiPlanOffer, setShowAiPlanOffer] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [aiLoadingMessage, setAiLoadingMessage] = useState('');

  // City search effect
  useEffect(() => {
    if (newTripCity.length > 0) {
      const results = CITY_DATABASE.filter(city => 
        city.city.toLowerCase().startsWith(newTripCity.toLowerCase()) ||
        city.country.toLowerCase().startsWith(newTripCity.toLowerCase())
      ).slice(0, 6);
      setCitySearchResults(results);
    } else {
      setCitySearchResults([]);
    }
  }, [newTripCity]);

  // Helper functions
  const getTotalSpots = (guide) => guide.itinerary.reduce((sum, day) => sum + day.spots.length, 0);
  
  const togglePreference = (id) => {
    setNewTripPreferences(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectCity = (cityData) => {
    setNewTripCity(cityData.city);
    setNewTripCityData(cityData);
    setCitySearchResults([]);
    setScreen('newTripConfirm');
  };

  const resetNewTrip = () => {
    setNewTripCity('');
    setNewTripCityData(null);
    setNewTripPreferences([]);
    setNewTripDays(3);
    setDurationMode('flexible');
    setSelectedDates({ start: null, end: null });
    setGeneratedTrip(null);
  };

  // AI Trip Generation
  const generateAiTrip = () => {
    setAiGenerating(true);
    setScreen('aiGenerating');
    
    const messages = ['Finding the best spots...', 'Optimizing your route...', 'Adding local favorites...', 'Planning your perfect trip...', 'Almost ready...'];
    let messageIndex = 0;
    setAiLoadingMessage(messages[0]);
    
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setAiLoadingMessage(messages[messageIndex]);
    }, 1200);

    setTimeout(() => {
      clearInterval(messageInterval);
      
      const cityData = newTripCityData || { city: newTripCity, country: 'Unknown', flag: '📍', lat: 48.8566, lng: 2.3522 };
      
      const spotTypes = {
        architecture: ['Historic Building', 'Cathedral', 'Palace', 'Bridge', 'Tower'],
        nightlife: ['Rooftop Bar', 'Jazz Club', 'Night Market', 'Lounge'],
        art: ['Art Museum', 'Gallery', 'Street Art', 'Cultural Center'],
        cuisine: ['Local Restaurant', 'Food Market', 'Café', 'Wine Bar'],
        adventure: ['Hiking Trail', 'Bike Tour', 'Water Sports', 'Park'],
        instagram: ['Scenic Viewpoint', 'Photo Spot', 'Colorful Street', 'Hidden Gem']
      };
      
      const itinerary = [];
      for (let day = 1; day <= newTripDays; day++) {
        const spots = [];
        const numSpots = Math.floor(Math.random() * 2) + 4;
        
        for (let i = 0; i < numSpots; i++) {
          let spotType = 'Attraction';
          if (newTripPreferences.length > 0) {
            const pref = newTripPreferences[i % newTripPreferences.length];
            const types = spotTypes[pref] || ['Attraction'];
            spotType = types[Math.floor(Math.random() * types.length)];
          }
          
          spots.push({
            name: `${cityData.city} ${spotType} ${(day - 1) * 5 + i + 1}`,
            type: spotType,
            duration: `${Math.floor(Math.random() * 2) + 1} hours`,
            walkTime: i === 0 ? null : `${Math.floor(Math.random() * 15) + 5} min`,
            lat: cityData.lat + (Math.random() - 0.5) * 0.05,
            lng: cityData.lng + (Math.random() - 0.5) * 0.05,
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&h=100&fit=crop'
          });
        }
        
        const dayTitles = ['Exploration', 'Discovery', 'Adventure', 'Culture', 'Highlights', 'Hidden Gems', 'Local Life'];
        itinerary.push({ day, title: `Day ${day} - ${dayTitles[(day - 1) % dayTitles.length]}`, spots });
      }
      
      setGeneratedTrip({
        id: 'ai-' + Date.now(),
        city: cityData.city,
        country: cityData.country,
        flag: cityData.flag,
        title: `${newTripDays}-Day ${cityData.city} Trip`,
        days: newTripDays,
        center: [cityData.lat, cityData.lng],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
        itinerary,
        isAiGenerated: true
      });
      
      setAiGenerating(false);
      setScreen('tripResult');
    }, 4000);
  };

  // ============================================
  // HOME SCREEN
  // ============================================
  if (screen === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f1f8e9 0%, #ffffff 100%)', fontFamily: "'DM Sans', sans-serif", paddingBottom: '100px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '20px', borderRadius: '0 0 30px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '26px' }}>🧭</span>
              <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: 0 }}>TOURISTA</h1>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '14px' }}>
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0 }}>
            Welcome, <strong>{currentUser?.email?.split('@')[0]}</strong>! 👋
          </p>
        </div>

        {/* Explore Destinations */}
        <div style={{ padding: '20px 16px 12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1b5e20', margin: '0 0 12px' }}>🌍 Explore Destinations</h2>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginRight: '-16px', paddingRight: '16px' }}>
            {TRAVEL_GUIDES.map((guide) => (
              <div
                key={guide.id}
                onClick={() => { setSelectedGuide(guide); setSelectedDay(1); setScreen('guideDetail'); }}
                style={{ minWidth: '130px', background: 'white', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, boxShadow: '0 3px 10px rgba(46,125,50,0.1)' }}
              >
                <div style={{ height: '80px', position: 'relative' }}>
                  <img src={guide.image} alt={guide.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '9px', fontWeight: '600', color: '#2e7d32' }}>
                    {guide.flag} {guide.city}
                  </div>
                </div>
                <div style={{ padding: '8px' }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#1b5e20' }}>{guide.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '9px', color: '#689f38' }}>{getTotalSpots(guide)} spots</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Trips */}
        <div style={{ padding: '0 16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1b5e20', margin: '0 0 12px' }}>🗂️ My Trips</h2>
          {myTrips.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px 16px', textAlign: 'center', border: '2px dashed #c8e6c9' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>✈️</div>
              <h3 style={{ color: '#1b5e20', fontSize: '15px', margin: '0 0 6px' }}>No trips yet</h3>
              <p style={{ color: '#689f38', fontSize: '12px', margin: 0 }}>Create your first AI-powered trip!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {myTrips.map((trip, index) => (
                <div
                  key={index}
                  onClick={() => { setSelectedGuide(trip); setSelectedDay(1); setScreen('guideDetail'); }}
                  style={{ background: 'white', borderRadius: '12px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
                >
                  <div style={{ width: '50px', height: '50px', borderRadius: '10px', overflow: 'hidden', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                    {trip.flag}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1b5e20' }}>{trip.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#689f38' }}>{trip.days} days • {getTotalSpots(trip)} spots</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setTripToDelete(index); }}
                    style={{ background: '#ffebee', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#e53935', cursor: 'pointer', fontSize: '12px' }}
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Trip FAB */}
        <div 
          onClick={() => { resetNewTrip(); setScreen('newTripSearch'); }}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', padding: '14px 28px', borderRadius: '28px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 6px 20px rgba(46,125,50,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '18px' }}>✨</span> Create Trip
        </div>

        {/* Delete Modal */}
        {tripToDelete !== null && (
          <div onClick={() => setTripToDelete(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '20px', padding: '24px', margin: '20px', maxWidth: '300px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗑️</div>
              <h3 style={{ margin: '0 0 8px', color: '#1b5e20', fontSize: '16px' }}>Delete Trip?</h3>
              <p style={{ margin: '0 0 16px', color: '#666', fontSize: '13px' }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => setTripToDelete(null)} style={{ background: '#f5f5f5', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#666' }}>Cancel</button>
                <button onClick={() => { setMyTrips(prev => prev.filter((_, i) => i !== tripToDelete)); setTripToDelete(null); }} style={{ background: '#e53935', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: 'white' }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // CITY SEARCH SCREEN
  // ============================================
  if (screen === 'newTripSearch') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #e8f5e9 50%, #c8e6c9 100%)', fontFamily: "'DM Sans', sans-serif" }}>
        {/* Search Header */}
        <div style={{ background: 'white', padding: '12px 16px', borderRadius: '0 0 20px 20px', boxShadow: '0 3px 15px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', borderRadius: '14px', padding: '4px 14px' }}>
            <span onClick={() => setScreen('home')} style={{ fontSize: '18px', cursor: 'pointer', color: '#666' }}>←</span>
            <input
              type="text"
              value={newTripCity}
              onChange={(e) => setNewTripCity(e.target.value)}
              placeholder="Search destination..."
              autoFocus
              style={{ flex: 1, padding: '12px 0', border: 'none', background: 'transparent', fontSize: '15px', outline: 'none' }}
            />
            {newTripCity && <span onClick={() => setNewTripCity('')} style={{ fontSize: '16px', cursor: 'pointer', color: '#999' }}>✕</span>}
          </div>
        </div>

        {/* Results */}
        <div style={{ padding: '16px' }}>
          {citySearchResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {citySearchResults.map((city, index) => (
                <div
                  key={index}
                  onClick={() => selectCity(city)}
                  style={{ padding: '14px 8px', cursor: 'pointer', borderBottom: index < citySearchResults.length - 1 ? '1px solid #e8e8e8' : 'none' }}
                >
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1b5e20' }}>{city.flag} {city.city}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#689f38' }}>{city.country}</p>
                </div>
              ))}
            </div>
          ) : newTripCity.length > 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ color: '#999', fontSize: '14px' }}>No cities found for "{newTripCity}"</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '12px', color: '#689f38', marginBottom: '10px' }}>Popular destinations</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Paris', 'Tokyo', 'Rome', 'Istanbul', 'London', 'Barcelona'].map((city) => {
                  const cityData = CITY_DATABASE.find(c => c.city === city);
                  return (
                    <button
                      key={city}
                      onClick={() => cityData && selectCity(cityData)}
                      style={{ background: 'white', border: '1px solid #e0e0e0', padding: '10px 14px', borderRadius: '18px', fontSize: '12px', cursor: 'pointer', color: '#1b5e20', fontWeight: '500' }}
                    >
                      {cityData?.flag} {city}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // CITY CONFIRM SCREEN
  // ============================================
  if (screen === 'newTripConfirm') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #e8f5e9 60%, #c8e6c9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setScreen('newTripSearch')} style={{ background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>←</button>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <span style={{ fontSize: '80px', marginBottom: '16px' }}>{newTripCityData?.flag || '📍'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1b5e20', margin: 0 }}>{newTripCityData?.city || newTripCity}</h1>
            <span onClick={() => setScreen('newTripSearch')} style={{ background: '#f0f0f0', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', color: '#666' }}>✎</span>
          </div>
          <p style={{ fontSize: '14px', color: '#689f38', marginTop: '8px' }}>{newTripCityData?.country}</p>
        </div>
        
        <div style={{ padding: '20px 20px 36px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1b5e20', margin: '0 0 16px', textAlign: 'center' }}>Let's go to {newTripCityData?.city || newTripCity}!</h2>
          <button onClick={() => setScreen('newTripPreferences')} style={{ width: '100%', background: 'white', color: '#1b5e20', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            Continue <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // PREFERENCES SCREEN
  // ============================================
  if (screen === 'newTripPreferences') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '30vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px' }}>
          <span style={{ fontSize: '60px' }}>👍</span>
        </div>
        
        <div style={{ flex: 1, background: 'white', borderRadius: '28px 28px 0 0', marginTop: '-20px', padding: '28px 20px 100px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1b5e20', margin: '0 0 6px' }}>Trip Preferences</h1>
          <p style={{ fontSize: '13px', color: '#689f38', margin: '0 0 20px' }}>What should your trip be about?</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
            {TRIP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => togglePreference(cat.id)}
                style={{
                  background: newTripPreferences.includes(cat.id) ? '#e8f5e9' : 'white',
                  border: newTripPreferences.includes(cat.id) ? '2px solid #4caf50' : '2px solid #e0e0e0',
                  padding: '11px 16px',
                  borderRadius: '22px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#333'
                }}
              >
                <span>{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>
          
          <div onClick={() => setScreen('newTripDuration')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', cursor: 'pointer', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '22px', opacity: 0.5 }}>📅</span>
            <span style={{ fontSize: '15px', color: '#999' }}>Trip Duration</span>
            <span style={{ marginLeft: 'auto', color: '#ccc' }}>→</span>
          </div>
        </div>
        
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '14px 20px 28px', background: 'white', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' }}>
          <button onClick={() => setScreen('newTripDuration')} style={{ width: '100%', background: '#1b5e20', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>✓</span> Continue
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // DURATION SCREEN
  // ============================================
  if (screen === 'newTripDuration') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setScreen('newTripPreferences')} style={{ background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer' }}>←</button>
        </div>
        
        <div style={{ flex: 1, padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', opacity: 0.5 }}>
            <span style={{ fontSize: '18px' }}>👍</span>
            <span style={{ fontSize: '13px', color: '#666' }}>Trip Preferences</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '22px', background: '#e8f5e9', padding: '6px', borderRadius: '10px' }}>📅</span>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1b5e20', margin: 0 }}>Trip Duration</h1>
          </div>
          
          {/* Mode Toggle */}
          <div style={{ display: 'flex', background: 'white', borderRadius: '22px', padding: '4px', marginBottom: '20px' }}>
            <button onClick={() => setDurationMode('flexible')} style={{ flex: 1, background: durationMode === 'flexible' ? '#1b5e20' : 'transparent', color: durationMode === 'flexible' ? 'white' : '#666', border: 'none', padding: '10px', borderRadius: '18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Flexible</button>
            <button onClick={() => setDurationMode('calendar')} style={{ flex: 1, background: durationMode === 'calendar' ? '#1b5e20' : 'transparent', color: durationMode === 'calendar' ? 'white' : '#666', border: 'none', padding: '10px', borderRadius: '18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Calendar</button>
          </div>
          
          {durationMode === 'flexible' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', paddingTop: '20px' }}>
              <p style={{ fontSize: '14px', color: '#689f38', marginBottom: '10px' }}>How many days?</p>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setNewTripDays(day)}
                  style={{
                    background: newTripDays === day ? '#e8f5e9' : 'transparent',
                    border: 'none',
                    padding: newTripDays === day ? '14px 45px' : '6px 25px',
                    borderRadius: '14px',
                    fontSize: newTripDays === day ? '42px' : '26px',
                    fontWeight: '700',
                    color: newTripDays === day ? '#1b5e20' : '#c8e6c9',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          ) : (
            <CalendarPicker selectedDates={selectedDates} onSelectDates={setSelectedDates} />
          )}
        </div>
        
        <div style={{ padding: '14px 20px 28px' }}>
          <button 
            onClick={() => {
              if (durationMode === 'calendar' && selectedDates.start && selectedDates.end) {
                const diffDays = Math.ceil(Math.abs(selectedDates.end - selectedDates.start) / (1000 * 60 * 60 * 24)) + 1;
                setNewTripDays(diffDays);
              }
              setShowAiPlanOffer(true);
            }} 
            style={{ width: '100%', background: '#1b5e20', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
          >
            Confirm
          </button>
        </div>
        
        {/* AI Plan Offer Modal */}
        {showAiPlanOffer && (
          <div onClick={() => setShowAiPlanOffer(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '24px', margin: '20px', maxWidth: '340px', width: '100%' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', margin: '0 0 14px', textAlign: 'center' }}>Want us to plan your trip with places we think you'll love?</h2>
              
              <div style={{ background: '#f8f8f8', borderRadius: '14px', padding: '14px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#999' }}>✨ AI Planning Preview</span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '14px', color: '#333' }}>Day 1</h3>
                <div style={{ background: 'white', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{newTripCityData?.flag || '📍'}</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>{newTripCityData?.city || newTripCity} Highlights</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#999' }}>🎯 Top Attractions</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => { setShowAiPlanOffer(false); setShowSubscriptionModal(true); }} style={{ width: '100%', background: '#1b5e20', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>✨</span> Yes, plan for me!
              </button>
              <button onClick={() => { setShowAiPlanOffer(false); setScreen('home'); }} style={{ width: '100%', background: 'transparent', color: '#666', border: 'none', padding: '10px', fontSize: '13px', cursor: 'pointer' }}>
                No, I'll plan myself
              </button>
            </div>
          </div>
        )}
        
        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div onClick={() => setShowSubscriptionModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '28px 22px', margin: '20px', maxWidth: '340px', width: '100%', textAlign: 'center' }}>
              <span style={{ fontSize: '44px' }}>✨</span>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1b5e20', margin: '14px 0 6px' }}>Unlock AI Trip Planning</h2>
              <p style={{ fontSize: '13px', color: '#666', margin: '0 0 20px' }}>Start your 7-day free trial</p>
              
              <div style={{ border: '2px solid #e0e0e0', borderRadius: '14px', padding: '14px', marginBottom: '10px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '14px' }}>Monthly</p>
                    <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#999' }}>Cancel anytime</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1b5e20' }}>$4.99<span style={{ fontSize: '12px', fontWeight: '400' }}>/mo</span></p>
                </div>
              </div>
              
              <div style={{ border: '2px solid #4caf50', borderRadius: '14px', padding: '14px', marginBottom: '20px', cursor: 'pointer', background: '#f1f8e9', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '14px', background: '#4caf50', color: 'white', padding: '3px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '600' }}>SAVE 25%</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '14px' }}>Annual</p>
                    <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#999' }}>Best value</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1b5e20' }}>$3.74<span style={{ fontSize: '12px', fontWeight: '400' }}>/mo</span></p>
                </div>
              </div>
              
              <button onClick={() => { setShowSubscriptionModal(false); setIsPremiumUser(true); generateAiTrip(); }} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                Start Free Trial
              </button>
              <p style={{ fontSize: '10px', color: '#999', margin: '10px 0 0' }}>Cancel anytime. No charge during trial.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // AI GENERATING SCREEN
  // ============================================
  if (screen === 'aiGenerating') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.7; } }`}</style>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', animation: 'pulse 1.5s infinite', boxShadow: '0 8px 30px rgba(46,125,50,0.2)' }}>
          <span style={{ fontSize: '40px' }}>✨</span>
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1b5e20', margin: '0 0 10px', textAlign: 'center' }}>Creating your perfect trip</h1>
        <p style={{ fontSize: '15px', color: '#689f38', margin: 0, textAlign: 'center' }}>{aiLoadingMessage}</p>
      </div>
    );
  }

  // ============================================
  // TRIP RESULT SCREEN (with paywall)
  // ============================================
  if (screen === 'tripResult' && generatedTrip) {
    const currentDay = generatedTrip.itinerary.find(d => d.day === selectedDay) || generatedTrip.itinerary[0];
    const isLocked = !isPremiumUser && selectedDay > 1;

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif", paddingBottom: '20px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => { setScreen('home'); resetNewTrip(); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '15px' }}>←</button>
          <h1 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>{generatedTrip.flag} {generatedTrip.city}</h1>
          <button onClick={() => { setMyTrips(prev => [...prev, generatedTrip]); setScreen('home'); resetNewTrip(); }} style={{ background: 'white', border: 'none', borderRadius: '10px', padding: '8px 12px', color: '#2e7d32', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>💾 Save</button>
        </div>

        {/* Trip Info */}
        <div style={{ background: 'white', margin: '14px', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '10px' }}>✨ AI Generated</span>
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: '18px', color: '#1b5e20', fontWeight: '700' }}>{generatedTrip.title}</h2>
          <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#689f38' }}>
            <span>📅 {generatedTrip.days} days</span>
            <span>📍 {getTotalSpots(generatedTrip)} spots</span>
          </div>
        </div>

        {/* Day Tabs */}
        <div style={{ display: 'flex', gap: '6px', padding: '0 14px 12px', overflowX: 'auto' }}>
          {generatedTrip.itinerary.map((day, index) => {
            const dayLocked = !isPremiumUser && day.day > 1;
            return (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                style={{
                  background: selectedDay === day.day ? DAY_COLORS[index % DAY_COLORS.length] : 'white',
                  color: selectedDay === day.day ? 'white' : dayLocked ? '#ccc' : '#333',
                  border: selectedDay === day.day ? 'none' : '2px solid #e0e0e0',
                  padding: '9px 18px',
                  borderRadius: '18px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                Day {day.day} {dayLocked && <span>🔒</span>}
              </button>
            );
          })}
        </div>

        {/* Spots List */}
        <div style={{ padding: '0 14px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '15px', color: '#1b5e20' }}>{currentDay?.title}</h3>
          
          {currentDay?.spots.map((spot, index) => (
            <div key={index} style={{ marginBottom: '6px' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '11px', display: 'flex', gap: '10px', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>{index + 1}</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#e8f5e9' }}>
                  <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1b5e20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', filter: isLocked ? 'blur(4px)' : 'none' }}>{spot.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#689f38', filter: isLocked ? 'blur(3px)' : 'none' }}>{spot.type}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '10px', color: '#9e9e9e' }}>⏱️ {spot.duration}</p>
                </div>
                {isLocked && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '22px' }}>🔒</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Paywall Card */}
          {isLocked && (
            <div style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', borderRadius: '18px', padding: '22px', marginTop: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '36px' }}>🔓</span>
              <h3 style={{ margin: '10px 0 6px', color: '#1b5e20', fontSize: '17px' }}>Unlock Full Plan</h3>
              <p style={{ margin: '0 0 14px', color: '#689f38', fontSize: '13px' }}>Get access to all {generatedTrip.days} days of your personalized trip</p>
              <div style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '14px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>✓ 7-day free trial</p>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#666' }}>✓ Then $4.99/mo or $3.74/mo (annual)</p>
              </div>
              <button onClick={() => setIsPremiumUser(true)} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                Start Free Trial
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // GUIDE DETAIL SCREEN
  // ============================================
  if (screen === 'guideDetail' && selectedGuide) {
    const currentDay = selectedGuide.itinerary.find(d => d.day === selectedDay) || selectedGuide.itinerary[0];

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif", paddingBottom: '20px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setScreen('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '15px' }}>←</button>
          <h1 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>{selectedGuide.flag} {selectedGuide.city}</h1>
          <button 
            onClick={() => { if (!myTrips.find(t => t.id === selectedGuide.id)) setMyTrips(prev => [...prev, selectedGuide]); }} 
            style={{ background: myTrips.find(t => t.id === selectedGuide.id) ? 'rgba(255,255,255,0.3)' : 'white', border: 'none', borderRadius: '10px', padding: '8px 12px', color: myTrips.find(t => t.id === selectedGuide.id) ? 'white' : '#2e7d32', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
          >
            {myTrips.find(t => t.id === selectedGuide.id) ? '✓ Saved' : '💾 Save'}
          </button>
        </div>

        {/* Trip Info */}
        <div style={{ background: 'white', margin: '14px', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '18px', color: '#1b5e20', fontWeight: '700' }}>{selectedGuide.title}</h2>
          <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#689f38' }}>
            <span>📅 {selectedGuide.days} days</span>
            <span>📍 {getTotalSpots(selectedGuide)} spots</span>
          </div>
        </div>

        {/* Day Tabs */}
        <div style={{ display: 'flex', gap: '6px', padding: '0 14px 12px', overflowX: 'auto' }}>
          {selectedGuide.itinerary.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              style={{
                background: selectedDay === day.day ? DAY_COLORS[index % DAY_COLORS.length] : 'white',
                color: selectedDay === day.day ? 'white' : '#333',
                border: selectedDay === day.day ? 'none' : '2px solid #e0e0e0',
                padding: '9px 18px',
                borderRadius: '18px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Day {day.day}
            </button>
          ))}
        </div>

        {/* Spots List */}
        <div style={{ padding: '0 14px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '15px', color: '#1b5e20' }}>{currentDay.title}</h3>
          
          {currentDay.spots.map((spot, index) => (
            <div key={index}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '11px', display: 'flex', gap: '10px', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>{index + 1}</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1b5e20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spot.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#689f38', background: '#f1f8e9', display: 'inline-block', padding: '2px 6px', borderRadius: '8px' }}>{spot.type}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '10px', color: '#9e9e9e' }}>⏱️ {spot.duration}</p>
                </div>
              </div>
              {index < currentDay.spots.length - 1 && spot.walkTime && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '6px 0 6px 12px', gap: '6px' }}>
                  <div style={{ width: '2px', height: '20px', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length] + '40', marginLeft: '12px' }} />
                  <span style={{ fontSize: '10px', color: '#9e9e9e' }}>🚶 {currentDay.spots[index + 1].walkTime}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default Loading
  return (
    <div style={{ minHeight: '100vh', background: '#f5faf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧭</div>
        <p style={{ color: '#689f38' }}>Loading...</p>
      </div>
    </div>
  );
}