import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xuaczwlwbsxoixosunzx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YWN6d2x3YnN4b2l4b3N1bnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODc1NjYsImV4cCI6MjA4MDg2MzU2Nn0.nfqRmFe0-1t_hDrPAc2oTO-y4UfbsEjen5sYbr1lYeE';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DAY_COLORS = ['#e53935', '#1e88e5', '#43a047', '#fb8c00', '#8e24aa', '#00acc1', '#d81b60'];

const SPOT_DETAILS = {
  'Eiffel Tower': { rating: 4.7, reviews: 245890, description: 'Iconic iron lattice tower on the Champ de Mars, symbol of Paris since 1889.', tips: ['Book tickets online to skip the queue', 'Visit at sunset for stunning views', 'The summit offers 360° panoramic views', 'Cheaper to take stairs to 2nd floor', 'Light show every hour after dark'] },
  'Louvre Museum': { rating: 4.8, reviews: 312456, description: 'World\'s largest art museum and historic monument, home to the Mona Lisa.', tips: ['Enter through Carrousel entrance to avoid crowds', 'Wednesday and Friday open until 9:45 PM', 'Download museum app for self-guided tours', 'Mona Lisa is smaller than expected', 'Don\'t miss Winged Victory of Samothrace'] },
  'Colosseum': { rating: 4.7, reviews: 198234, description: 'Ancient amphitheater in Rome, largest ever built, iconic symbol of Imperial Rome.', tips: ['Book skip-the-line tickets in advance', 'Combined ticket includes Roman Forum', 'Best photos from upper levels', 'Underground tours available', 'Arrive early morning or late afternoon'] },
  'Sagrada Familia': { rating: 4.8, reviews: 167543, description: 'Gaudí\'s unfinished masterpiece, a basilica blending Gothic and Art Nouveau.', tips: ['Book tickets weeks in advance', 'Morning light through east facade is magical', 'Tower visit offers great city views', 'Audio guide highly recommended', 'Construction expected to complete by 2026'] },
  'Big Ben': { rating: 4.6, reviews: 89234, description: 'Iconic clock tower at the Palace of Westminster, symbol of London since 1859.', tips: ['Best photos from Westminster Bridge', 'UK residents can tour the interior', 'Listen for the famous chimes', 'Beautiful when lit at night', 'Combine with Houses of Parliament visit'] },
  'default': { rating: 4.5, reviews: 10000, description: 'A must-visit attraction with unique history and cultural significance.', tips: ['Check opening hours before visiting', 'Book tickets online when possible', 'Best to visit early morning', 'Wear comfortable walking shoes', 'Check for guided tour options'] }
};

const TRIP_CATEGORIES = [
  { id: 'architecture', emoji: '🏛️', label: 'Architecture' },
  { id: 'nightlife', emoji: '🌙', label: 'Nightlife' },
  { id: 'art', emoji: '🎨', label: 'Art & Culture' },
  { id: 'cuisine', emoji: '🍽️', label: 'Local Cuisine' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure' },
  { id: 'instagram', emoji: '📸', label: 'Instagram Spots' },
  { id: 'shopping', emoji: '🛍️', label: 'Shopping' },
  { id: 'nature', emoji: '🌳', label: 'Nature & Parks' },
  { id: 'beaches', emoji: '🏖️', label: 'Beaches' },
  { id: 'museums', emoji: '🖼️', label: 'Museums' },
  { id: 'history', emoji: '📜', label: 'History' },
  { id: 'romantic', emoji: '💕', label: 'Romantic' },
  { id: 'family', emoji: '👨‍👩‍👧‍👦', label: 'Family Friendly' },
  { id: 'budget', emoji: '💰', label: 'Budget Travel' },
  { id: 'luxury', emoji: '✨', label: 'Luxury' },
  { id: 'cafes', emoji: '☕', label: 'Cafes' },
  { id: 'bars', emoji: '🍺', label: 'Bars & Pubs' },
  { id: 'wellness', emoji: '💆', label: 'Wellness & Spa' },
  { id: 'sports', emoji: '⚽', label: 'Sports' },
  { id: 'religious', emoji: '🛕', label: 'Religious Sites' },
  { id: 'markets', emoji: '🏪', label: 'Local Markets' },
  { id: 'viewpoints', emoji: '🌄', label: 'Viewpoints' },
  { id: 'street_food', emoji: '🥡', label: 'Street Food' },
  { id: 'hidden_gems', emoji: '💎', label: 'Hidden Gems' },
];

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
          { name: 'Champ de Mars', type: 'Park', duration: '30 min', walkTime: '5 min', lat: 48.8556, lng: 2.2986, image: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=100&h=100&fit=crop' },
          { name: 'Arc de Triomphe', type: 'Landmark', duration: '1 hour', walkTime: '25 min', lat: 48.8738, lng: 2.2950, image: 'https://images.unsplash.com/photo-1518805208834-71ae392e0804?w=100&h=100&fit=crop' },
          { name: 'Champs-Élysées', type: 'Shopping', duration: '2 hours', walkTime: '2 min', lat: 48.8698, lng: 2.3076, image: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=100&h=100&fit=crop' },
          { name: 'Place de la Concorde', type: 'Square', duration: '30 min', walkTime: '15 min', lat: 48.8656, lng: 2.3212, image: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Art & Culture',
        spots: [
          { name: 'Louvre Museum', type: 'Museum', duration: '4 hours', walkTime: null, lat: 48.8606, lng: 2.3376, image: 'https://images.unsplash.com/photo-1499426600726-7f1e2d5c39ce?w=100&h=100&fit=crop' },
          { name: 'Tuileries Garden', type: 'Park', duration: '1 hour', walkTime: '3 min', lat: 48.8634, lng: 2.3275, image: 'https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=100&h=100&fit=crop' },
          { name: 'Musée d\'Orsay', type: 'Museum', duration: '2 hours', walkTime: '15 min', lat: 48.8600, lng: 2.3266, image: 'https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?w=100&h=100&fit=crop' },
          { name: 'Notre-Dame', type: 'Landmark', duration: '1 hour', walkTime: '12 min', lat: 48.8530, lng: 2.3499, image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=100&h=100&fit=crop' },
          { name: 'Latin Quarter', type: 'Neighborhood', duration: '2 hours', walkTime: '5 min', lat: 48.8510, lng: 2.3470, image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Montmartre & Le Marais',
        spots: [
          { name: 'Sacré-Cœur', type: 'Landmark', duration: '1 hour', walkTime: null, lat: 48.8867, lng: 2.3431, image: 'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?w=100&h=100&fit=crop' },
          { name: 'Montmartre', type: 'Neighborhood', duration: '2 hours', walkTime: '3 min', lat: 48.8862, lng: 2.3410, image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&h=100&fit=crop' },
          { name: 'Moulin Rouge', type: 'Entertainment', duration: '30 min', walkTime: '10 min', lat: 48.8842, lng: 2.3322, image: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?w=100&h=100&fit=crop' },
          { name: 'Le Marais', type: 'Neighborhood', duration: '2 hours', walkTime: 'Metro', lat: 48.8598, lng: 2.3623, image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=100&h=100&fit=crop' },
          { name: 'Seine River Cruise', type: 'Activity', duration: '1 hour', walkTime: '15 min', lat: 48.8584, lng: 2.3378, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'rome',
    city: 'Rome',
    country: 'Italy',
    flag: '🇮🇹',
    title: '3-Day Rome Trip',
    days: 3,
    center: [41.9028, 12.4964],
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Ancient Rome',
        spots: [
          { name: 'Colosseum', type: 'Landmark', duration: '2 hours', walkTime: null, lat: 41.8902, lng: 12.4922, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=100&h=100&fit=crop' },
          { name: 'Roman Forum', type: 'History', duration: '2 hours', walkTime: '5 min', lat: 41.8925, lng: 12.4853, image: 'https://images.unsplash.com/photo-1555992828-017f4f3b9859?w=100&h=100&fit=crop' },
          { name: 'Palatine Hill', type: 'History', duration: '1.5 hours', walkTime: '3 min', lat: 41.8892, lng: 12.4875, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
          { name: 'Piazza Venezia', type: 'Square', duration: '30 min', walkTime: '10 min', lat: 41.8964, lng: 12.4823, image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Vatican City',
        spots: [
          { name: 'Vatican Museums', type: 'Museum', duration: '3 hours', walkTime: null, lat: 41.9065, lng: 12.4536, image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=100&h=100&fit=crop' },
          { name: 'Sistine Chapel', type: 'Art', duration: '1 hour', walkTime: '2 min', lat: 41.9029, lng: 12.4545, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop' },
          { name: 'St. Peters Basilica', type: 'Landmark', duration: '2 hours', walkTime: '5 min', lat: 41.9022, lng: 12.4539, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
          { name: 'Castel Sant Angelo', type: 'History', duration: '1.5 hours', walkTime: '10 min', lat: 41.9031, lng: 12.4663, image: 'https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Fountains & Piazzas',
        spots: [
          { name: 'Trevi Fountain', type: 'Landmark', duration: '45 min', walkTime: null, lat: 41.9009, lng: 12.4833, image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=100&h=100&fit=crop' },
          { name: 'Spanish Steps', type: 'Landmark', duration: '30 min', walkTime: '5 min', lat: 41.9060, lng: 12.4828, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=100&h=100&fit=crop' },
          { name: 'Pantheon', type: 'Landmark', duration: '1 hour', walkTime: '10 min', lat: 41.8986, lng: 12.4769, image: 'https://images.unsplash.com/photo-1548585744-2b76a8c73426?w=100&h=100&fit=crop' },
          { name: 'Piazza Navona', type: 'Square', duration: '45 min', walkTime: '5 min', lat: 41.8992, lng: 12.4731, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
          { name: 'Trastevere', type: 'Neighborhood', duration: '2 hours', walkTime: '15 min', lat: 41.8869, lng: 12.4699, image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    flag: '🇬🇧',
    title: '3-Day London Trip',
    days: 3,
    center: [51.5074, -0.1278],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Royal London',
        spots: [
          { name: 'Buckingham Palace', type: 'Landmark', duration: '1.5 hours', walkTime: null, lat: 51.5014, lng: -0.1419, image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=100&h=100&fit=crop' },
          { name: 'Westminster Abbey', type: 'Landmark', duration: '1.5 hours', walkTime: '10 min', lat: 51.4994, lng: -0.1273, image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=100&h=100&fit=crop' },
          { name: 'Big Ben', type: 'Landmark', duration: '30 min', walkTime: '3 min', lat: 51.5007, lng: -0.1246, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=100&fit=crop' },
          { name: 'London Eye', type: 'Attraction', duration: '1 hour', walkTime: '5 min', lat: 51.5033, lng: -0.1195, image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Museums & Culture',
        spots: [
          { name: 'British Museum', type: 'Museum', duration: '3 hours', walkTime: null, lat: 51.5194, lng: -0.1270, image: 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=100&h=100&fit=crop' },
          { name: 'Covent Garden', type: 'Shopping', duration: '1.5 hours', walkTime: '10 min', lat: 51.5117, lng: -0.1240, image: 'https://images.unsplash.com/photo-1534695215921-52f8a19e7909?w=100&h=100&fit=crop' },
          { name: 'National Gallery', type: 'Museum', duration: '2 hours', walkTime: '8 min', lat: 51.5089, lng: -0.1283, image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=100&h=100&fit=crop' },
          { name: 'Trafalgar Square', type: 'Square', duration: '30 min', walkTime: '1 min', lat: 51.5080, lng: -0.1281, image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Tower & Markets',
        spots: [
          { name: 'Tower of London', type: 'History', duration: '3 hours', walkTime: null, lat: 51.5081, lng: -0.0759, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=100&fit=crop' },
          { name: 'Tower Bridge', type: 'Landmark', duration: '1 hour', walkTime: '5 min', lat: 51.5055, lng: -0.0754, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=100&fit=crop' },
          { name: 'Borough Market', type: 'Market', duration: '1.5 hours', walkTime: '10 min', lat: 51.5055, lng: -0.0910, image: 'https://images.unsplash.com/photo-1534695215921-52f8a19e7909?w=100&h=100&fit=crop' },
          { name: 'Tate Modern', type: 'Museum', duration: '2 hours', walkTime: '8 min', lat: 51.5076, lng: -0.0994, image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    flag: '🇪🇸',
    title: '2-Day Barcelona Trip',
    days: 2,
    center: [41.3851, 2.1734],
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Gaudi Masterpieces',
        spots: [
          { name: 'Sagrada Familia', type: 'Landmark', duration: '2 hours', walkTime: null, lat: 41.4036, lng: 2.1744, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
          { name: 'Park Güell', type: 'Park', duration: '2 hours', walkTime: 'Bus', lat: 41.4145, lng: 2.1527, image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' },
          { name: 'Casa Batlló', type: 'Architecture', duration: '1.5 hours', walkTime: 'Metro', lat: 41.3916, lng: 2.1649, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
          { name: 'La Pedrera', type: 'Architecture', duration: '1.5 hours', walkTime: '3 min', lat: 41.3953, lng: 2.1619, image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Gothic & Beach',
        spots: [
          { name: 'Gothic Quarter', type: 'Neighborhood', duration: '2 hours', walkTime: null, lat: 41.3833, lng: 2.1767, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
          { name: 'La Rambla', type: 'Street', duration: '1.5 hours', walkTime: '5 min', lat: 41.3809, lng: 2.1734, image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' },
          { name: 'La Boqueria Market', type: 'Market', duration: '1 hour', walkTime: '2 min', lat: 41.3816, lng: 2.1719, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
          { name: 'Barceloneta Beach', type: 'Beach', duration: '2 hours', walkTime: '15 min', lat: 41.3782, lng: 2.1925, image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    title: '2-Day Amsterdam Trip',
    days: 2,
    center: [52.3676, 4.9041],
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Museums & Canals',
        spots: [
          { name: 'Rijksmuseum', type: 'Museum', duration: '3 hours', walkTime: null, lat: 52.3600, lng: 4.8852, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
          { name: 'Van Gogh Museum', type: 'Museum', duration: '2 hours', walkTime: '5 min', lat: 52.3584, lng: 4.8811, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
          { name: 'Vondelpark', type: 'Park', duration: '1 hour', walkTime: '3 min', lat: 52.3579, lng: 4.8686, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
          { name: 'Canal Cruise', type: 'Activity', duration: '1 hour', walkTime: '10 min', lat: 52.3702, lng: 4.8952, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Historic Center',
        spots: [
          { name: 'Anne Frank House', type: 'Museum', duration: '1.5 hours', walkTime: null, lat: 52.3752, lng: 4.8840, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
          { name: 'Dam Square', type: 'Square', duration: '30 min', walkTime: '8 min', lat: 52.3731, lng: 4.8932, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
          { name: 'Royal Palace', type: 'Landmark', duration: '1 hour', walkTime: '1 min', lat: 52.3738, lng: 4.8910, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
          { name: 'Jordaan', type: 'Neighborhood', duration: '2 hours', walkTime: '10 min', lat: 52.3748, lng: 4.8788, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' }
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
          { name: 'Blue Mosque', type: 'Landmark', duration: '1 hour', walkTime: '3 min', lat: 41.0054, lng: 28.9768, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Topkapi Palace', type: 'Museum', duration: '3 hours', walkTime: '8 min', lat: 41.0115, lng: 28.9833, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Basilica Cistern', type: 'History', duration: '1 hour', walkTime: '5 min', lat: 41.0084, lng: 28.9779, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Bazaars & Bosphorus',
        spots: [
          { name: 'Grand Bazaar', type: 'Market', duration: '2 hours', walkTime: null, lat: 41.0107, lng: 28.9680, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Spice Bazaar', type: 'Market', duration: '1 hour', walkTime: '10 min', lat: 41.0166, lng: 28.9706, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Galata Bridge', type: 'Landmark', duration: '30 min', walkTime: '5 min', lat: 41.0202, lng: 28.9736, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Bosphorus Cruise', type: 'Activity', duration: '2 hours', walkTime: '3 min', lat: 41.0256, lng: 28.9744, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Modern Istanbul',
        spots: [
          { name: 'Galata Tower', type: 'Landmark', duration: '1 hour', walkTime: null, lat: 41.0256, lng: 28.9741, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Istiklal Avenue', type: 'Shopping', duration: '2 hours', walkTime: '5 min', lat: 41.0340, lng: 28.9770, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Taksim Square', type: 'Square', duration: '30 min', walkTime: '10 min', lat: 41.0370, lng: 28.9850, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
          { name: 'Dolmabahce Palace', type: 'Museum', duration: '2 hours', walkTime: '15 min', lat: 41.0391, lng: 29.0005, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'prague',
    city: 'Prague',
    country: 'Czech Republic',
    flag: '🇨🇿',
    title: '2-Day Prague Trip',
    days: 2,
    center: [50.0755, 14.4378],
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Old Town',
        spots: [
          { name: 'Old Town Square', type: 'Square', duration: '1 hour', walkTime: null, lat: 50.0873, lng: 14.4213, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
          { name: 'Astronomical Clock', type: 'Landmark', duration: '30 min', walkTime: '1 min', lat: 50.0870, lng: 14.4207, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
          { name: 'Charles Bridge', type: 'Landmark', duration: '1 hour', walkTime: '8 min', lat: 50.0865, lng: 14.4114, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
          { name: 'Jewish Quarter', type: 'Neighborhood', duration: '2 hours', walkTime: '10 min', lat: 50.0901, lng: 14.4178, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Castle District',
        spots: [
          { name: 'Prague Castle', type: 'Landmark', duration: '3 hours', walkTime: null, lat: 50.0909, lng: 14.4012, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
          { name: 'St. Vitus Cathedral', type: 'Landmark', duration: '1 hour', walkTime: '2 min', lat: 50.0908, lng: 14.4003, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
          { name: 'Golden Lane', type: 'History', duration: '45 min', walkTime: '5 min', lat: 50.0912, lng: 14.4044, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
          { name: 'Petrin Hill', type: 'Park', duration: '1.5 hours', walkTime: '15 min', lat: 50.0833, lng: 14.3953, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'newyork',
    city: 'New York',
    country: 'USA',
    flag: '🇺🇸',
    title: '4-Day NYC Trip',
    days: 4,
    center: [40.7128, -74.0060],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Downtown Manhattan',
        spots: [
          { name: 'Statue of Liberty', type: 'Landmark', duration: '4 hours', walkTime: null, lat: 40.6892, lng: -74.0445, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Ellis Island', type: 'Museum', duration: '2 hours', walkTime: 'Ferry', lat: 40.6995, lng: -74.0396, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: '9/11 Memorial', type: 'Memorial', duration: '1.5 hours', walkTime: 'Ferry', lat: 40.7115, lng: -74.0134, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Wall Street', type: 'Landmark', duration: '30 min', walkTime: '10 min', lat: 40.7074, lng: -74.0113, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Midtown',
        spots: [
          { name: 'Empire State Building', type: 'Landmark', duration: '1.5 hours', walkTime: null, lat: 40.7484, lng: -73.9857, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Times Square', type: 'Square', duration: '1 hour', walkTime: '10 min', lat: 40.7580, lng: -73.9855, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Grand Central', type: 'Landmark', duration: '45 min', walkTime: '8 min', lat: 40.7527, lng: -73.9772, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Rockefeller Center', type: 'Landmark', duration: '1 hour', walkTime: '5 min', lat: 40.7587, lng: -73.9787, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Broadway Show', type: 'Entertainment', duration: '3 hours', walkTime: '5 min', lat: 40.7590, lng: -73.9845, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Central Park & Museums',
        spots: [
          { name: 'Central Park', type: 'Park', duration: '3 hours', walkTime: null, lat: 40.7829, lng: -73.9654, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Met Museum', type: 'Museum', duration: '3 hours', walkTime: '5 min', lat: 40.7794, lng: -73.9632, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Natural History Museum', type: 'Museum', duration: '2 hours', walkTime: '20 min', lat: 40.7813, lng: -73.9740, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 4,
        title: 'Brooklyn',
        spots: [
          { name: 'Brooklyn Bridge', type: 'Landmark', duration: '1 hour', walkTime: null, lat: 40.7061, lng: -73.9969, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'DUMBO', type: 'Neighborhood', duration: '1.5 hours', walkTime: '5 min', lat: 40.7033, lng: -73.9890, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'Williamsburg', type: 'Neighborhood', duration: '2 hours', walkTime: 'Metro', lat: 40.7081, lng: -73.9571, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
          { name: 'High Line', type: 'Park', duration: '1.5 hours', walkTime: 'Metro', lat: 40.7480, lng: -74.0048, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'losangeles',
    city: 'Los Angeles',
    country: 'USA',
    flag: '🇺🇸',
    title: '3-Day LA Trip',
    days: 3,
    center: [34.0522, -118.2437],
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Hollywood',
        spots: [
          { name: 'Hollywood Sign', type: 'Landmark', duration: '2 hours', walkTime: null, lat: 34.1341, lng: -118.3215, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Walk of Fame', type: 'Landmark', duration: '1 hour', walkTime: 'Drive', lat: 34.1017, lng: -118.3270, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'TCL Chinese Theatre', type: 'Landmark', duration: '30 min', walkTime: '2 min', lat: 34.1022, lng: -118.3416, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Griffith Observatory', type: 'Viewpoint', duration: '2 hours', walkTime: 'Drive', lat: 34.1184, lng: -118.3004, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Beaches',
        spots: [
          { name: 'Santa Monica Pier', type: 'Landmark', duration: '2 hours', walkTime: null, lat: 34.0095, lng: -118.4970, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Venice Beach', type: 'Beach', duration: '2 hours', walkTime: '15 min', lat: 33.9850, lng: -118.4695, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Venice Canals', type: 'Neighborhood', duration: '1 hour', walkTime: '10 min', lat: 33.9803, lng: -118.4645, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Malibu', type: 'Beach', duration: '3 hours', walkTime: 'Drive', lat: 34.0259, lng: -118.7798, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Culture & Shopping',
        spots: [
          { name: 'The Getty Center', type: 'Museum', duration: '3 hours', walkTime: null, lat: 34.0780, lng: -118.4741, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Beverly Hills', type: 'Neighborhood', duration: '1.5 hours', walkTime: 'Drive', lat: 34.0736, lng: -118.4004, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'Rodeo Drive', type: 'Shopping', duration: '1 hour', walkTime: '5 min', lat: 34.0674, lng: -118.4003, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
          { name: 'The Grove', type: 'Shopping', duration: '1.5 hours', walkTime: 'Drive', lat: 34.0720, lng: -118.3577, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' }
        ]
      }
    ]
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    title: '4-Day Tokyo Trip',
    days: 4,
    center: [35.6762, 139.6503],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    itinerary: [
      {
        day: 1,
        title: 'Traditional Tokyo',
        spots: [
          { name: 'Senso-ji Temple', type: 'Temple', duration: '1.5 hours', walkTime: null, lat: 35.7148, lng: 139.7967, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Nakamise Street', type: 'Shopping', duration: '1 hour', walkTime: '1 min', lat: 35.7118, lng: 139.7963, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Tokyo Skytree', type: 'Viewpoint', duration: '1.5 hours', walkTime: '15 min', lat: 35.7101, lng: 139.8107, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Meiji Shrine', type: 'Shrine', duration: '1 hour', walkTime: 'Metro', lat: 35.6764, lng: 139.6993, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 2,
        title: 'Modern Tokyo',
        spots: [
          { name: 'Shibuya Crossing', type: 'Landmark', duration: '30 min', walkTime: null, lat: 35.6595, lng: 139.7004, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Harajuku', type: 'Neighborhood', duration: '2 hours', walkTime: '15 min', lat: 35.6702, lng: 139.7027, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Shinjuku', type: 'Neighborhood', duration: '2 hours', walkTime: 'Metro', lat: 35.6938, lng: 139.7034, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Golden Gai', type: 'Nightlife', duration: '2 hours', walkTime: '5 min', lat: 35.6944, lng: 139.7050, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 3,
        title: 'Culture & Food',
        spots: [
          { name: 'Tsukiji Market', type: 'Market', duration: '1.5 hours', walkTime: null, lat: 35.6654, lng: 139.7707, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Imperial Palace', type: 'Landmark', duration: '1.5 hours', walkTime: 'Metro', lat: 35.6852, lng: 139.7528, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Akihabara', type: 'Neighborhood', duration: '2 hours', walkTime: 'Metro', lat: 35.7023, lng: 139.7745, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'TeamLab Planets', type: 'Museum', duration: '2.5 hours', walkTime: 'Metro', lat: 35.6512, lng: 139.7867, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
        ]
      },
      {
        day: 4,
        title: 'Day Trip to Mt Fuji',
        spots: [
          { name: 'Mt Fuji View', type: 'Nature', duration: '4 hours', walkTime: null, lat: 35.3606, lng: 138.7274, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Lake Kawaguchi', type: 'Nature', duration: '2 hours', walkTime: 'Bus', lat: 35.5165, lng: 138.7519, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
          { name: 'Onsen Experience', type: 'Spa', duration: '2 hours', walkTime: 'Bus', lat: 35.4998, lng: 138.7533, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
        ]
      }
    ]
  }
];

// ============================================
// MAP COMPONENT
// ============================================
const TripMap = ({ guide, selectedDay, onSpotClick, expanded }) => {
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const loadLeaflet = () => {
      return new Promise((resolve) => {
        if (window.L) {
          resolve(window.L);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => resolve(window.L);
        document.head.appendChild(script);
      });
    };

    loadLeaflet().then((L) => {
      if (!mapRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current).setView(guide.center, 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      }).addTo(map);

      guide.itinerary.forEach((day, dayIndex) => {
        const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length];
        const coords = day.spots.map(spot => [spot.lat, spot.lng]);

        if (coords.length > 1) {
          L.polyline(coords, {
            color: dayColor,
            weight: 4,
            opacity: selectedDay === null || selectedDay === day.day ? 0.8 : 0.2,
            dashArray: selectedDay === day.day ? null : '5, 10'
          }).addTo(map);
        }

        day.spots.forEach((spot, spotIndex) => {
          const isActive = selectedDay === null || selectedDay === day.day;
          const markerHtml = `
            <div style="
              background: ${isActive ? dayColor : '#ccc'};
              color: white;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 12px;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">${spotIndex + 1}</div>
          `;

          const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: markerHtml,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
          });

          const marker = L.marker([spot.lat, spot.lng], { icon: markerIcon }).addTo(map);
          marker.bindPopup(`
            <div style="text-align: center; min-width: 120px;">
              <strong style="color: ${dayColor};">${spot.name}</strong><br/>
              <span style="color: #666; font-size: 11px;">Day ${day.day} • ${spot.type}</span>
            </div>
          `);

          marker.on('click', () => {
            if (onSpotClick) onSpotClick(day.day, spotIndex);
          });
        });
      });

      const allCoords = guide.itinerary.flatMap(day => day.spots.map(spot => [spot.lat, spot.lng]));
      if (allCoords.length > 0) {
        map.fitBounds(allCoords, { padding: [30, 30] });
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [guide, selectedDay, onSpotClick, expanded]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '16px' }} />;
};

// ============================================
// CALENDAR PICKER COMPONENT
// ============================================
const CalendarPicker = ({ selectedDates, onSelectDates }) => {
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
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  // Auth states
  const [screen, setScreen] = useState('auth');
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Trip states
  const [myTrips, setMyTrips] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAllDaysOnMap, setShowAllDaysOnMap] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);
  
  // New trip creation states
  const [newTripCity, setNewTripCity] = useState('');
  const [newTripCityData, setNewTripCityData] = useState(null);
  const [newTripPreferences, setNewTripPreferences] = useState([]);
  const [newTripDays, setNewTripDays] = useState(3);
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [citySearchLoading, setCitySearchLoading] = useState(false);
  const [durationMode, setDurationMode] = useState('flexible');
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  
  // AI generation states
  const [showAiPlanOffer, setShowAiPlanOffer] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);
  const [aiLoadingMessage, setAiLoadingMessage] = useState('');
  
  // Manual planner states
  const [manualSpots, setManualSpots] = useState([]);
  const [placeSearchQuery, setPlaceSearchQuery] = useState('');
  const [placeSearchResults, setPlaceSearchResults] = useState([]);
  const [placeSearchLoading, setPlaceSearchLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState(null);
  
  // Premium states
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  // Logout confirmation
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Country code to flag emoji
  const getCountryFlag = useCallback((countryCode) => {
    if (!countryCode) return '📍';
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }, []);

  // Save state to sessionStorage when it changes
  useEffect(() => {
    if (currentUser && screen !== 'auth') {
      sessionStorage.setItem('tourista_screen', screen);
      sessionStorage.setItem('tourista_user', JSON.stringify(currentUser));
    }
  }, [screen, currentUser]);

  // Save selected guide and trip data
  useEffect(() => {
    if (selectedGuide) {
      sessionStorage.setItem('tourista_selectedGuide', JSON.stringify(selectedGuide));
    }
    if (generatedTrip) {
      sessionStorage.setItem('tourista_generatedTrip', JSON.stringify(generatedTrip));
    }
  }, [selectedGuide, generatedTrip]);

  // Restore state on mount (tab switch protection)
  useEffect(() => {
    const savedScreen = sessionStorage.getItem('tourista_screen');
    const savedUser = sessionStorage.getItem('tourista_user');
    const savedGuide = sessionStorage.getItem('tourista_selectedGuide');
    const savedTrip = sessionStorage.getItem('tourista_generatedTrip');
    
    if (savedUser && savedScreen) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setScreen(savedScreen);
        if (savedGuide) setSelectedGuide(JSON.parse(savedGuide));
        if (savedTrip) setGeneratedTrip(JSON.parse(savedTrip));
      } catch (e) {
        console.error('Error restoring state:', e);
      }
    }
  }, []);

  // Auth effect - check session but don't auto-redirect
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // User logged out - clear everything
        setCurrentUser(null);
        setScreen('auth');
        sessionStorage.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // GeoDB Cities API search with user's API key
  const searchCities = useCallback(async (query) => {
    if (query.length < 2) {
      setCitySearchResults([]);
      return;
    }
    setCitySearchLoading(true);
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(query)}&limit=10&sort=-population`,
        {
          headers: {
            'X-RapidAPI-Key': '943c32f617mshfd3b5c97307001bp1be778jsn3816330dc864',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        }
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setCitySearchResults(data.data.map(city => ({
          city: city.city,
          country: city.country,
          countryCode: city.countryCode,
          flag: getCountryFlag(city.countryCode),
          lat: city.latitude,
          lng: city.longitude
        })));
      } else {
        setCitySearchResults([]);
      }
    } catch (error) {
      console.error('City search error:', error);
      setCitySearchResults([]);
    }
    setCitySearchLoading(false);
  }, [getCountryFlag]);

  // Debounced city search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (newTripCity.length >= 2 && screen === 'newTripSearch') {
        searchCities(newTripCity);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [newTripCity, screen, searchCities]);

  // Auth handlers
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
        setAuthSuccess('Check your email to confirm!');
        setAuthMode('login');
        setPassword('');
        setConfirmPassword('');
      } else if (data.session) {
        setCurrentUser(data.user);
        setScreen('home');
      }
    } catch (err) {
      setAuthError('Connection error');
    }

    setAuthLoading(false);
  };

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
      setAuthError('Connection error');
    }

    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setMyTrips([]);
    setSelectedGuide(null);
    setGeneratedTrip(null);
    sessionStorage.clear();
    setScreen('auth');
  };

  // Helper functions
  const getTotalSpots = (guide) => guide.itinerary.reduce((sum, day) => sum + day.spots.length, 0);

  const openGoogleMaps = (placeName, city) => {
    const query = encodeURIComponent(`${placeName}, ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

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
    setManualSpots([]);
    setPlaceSearchQuery('');
    setPlaceSearchResults([]);
    setSelectedCategory('all');
    setSelectedPlaceInfo(null);
  };

  // Google Places API key
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBy4tEpe49fgTAUd8P_A2PQ4swlvCDMlFw';

  // Search places for manual planner
  const searchPlacesForManual = async (query) => {
    if (!query || query.length < 2 || !newTripCityData) return;
    
    setPlaceSearchLoading(true);
    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places:searchText`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.primaryType'
          },
          body: JSON.stringify({
            textQuery: `${query} in ${newTripCityData.city}`,
            maxResultCount: 8,
            locationBias: {
              circle: {
                center: { latitude: newTripCityData.lat, longitude: newTripCityData.lng },
                radius: 20000.0
              }
            }
          })
        }
      );
      
      const data = await response.json();
      if (data.places) {
        setPlaceSearchResults(data.places.map(place => ({
          id: place.displayName?.text + '-' + Math.random(),
          name: place.displayName?.text || 'Unknown Place',
          type: place.primaryType?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Place',
          address: place.formattedAddress || '',
          lat: place.location?.latitude || newTripCityData.lat,
          lng: place.location?.longitude || newTripCityData.lng,
          rating: place.rating || 4.0,
          reviews: place.userRatingCount || 0,
          image: place.photos?.[0]?.name ? getPlacePhotoUrl(place.photos[0].name) : 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300'
        })));
      } else {
        setPlaceSearchResults([]);
      }
    } catch (error) {
      console.error('Place search error:', error);
      setPlaceSearchResults([]);
    }
    setPlaceSearchLoading(false);
  };

  // Add spot to manual trip
  const addSpotToTrip = (spot) => {
    if (!manualSpots.find(s => s.name === spot.name)) {
      setManualSpots(prev => [...prev, { ...spot, duration: '1 hour' }]);
    }
    setPlaceSearchQuery('');
    setPlaceSearchResults([]);
  };

  // Remove spot from manual trip
  const removeSpotFromTrip = (spotId) => {
    setManualSpots(prev => prev.filter(s => s.id !== spotId));
  };

  // Reorder spots
  const moveSpot = (index, direction) => {
    const newSpots = [...manualSpots];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newSpots.length) return;
    [newSpots[index], newSpots[newIndex]] = [newSpots[newIndex], newSpots[index]];
    setManualSpots(newSpots);
  };

  // Save manual trip
  const saveManualTrip = () => {
    if (manualSpots.length === 0) return;
    
    const newTrip = {
      id: 'manual-' + Date.now(),
      city: newTripCityData.city,
      country: newTripCityData.country,
      flag: newTripCityData.flag,
      title: `My ${newTripCityData.city} Trip`,
      days: 1,
      center: [newTripCityData.lat, newTripCityData.lng],
      image: manualSpots[0]?.image || 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300',
      itinerary: [{
        day: 1,
        title: 'My Itinerary',
        spots: manualSpots.map((spot, index) => ({
          ...spot,
          walkTime: index === 0 ? null : '~10 min'
        }))
      }],
      isManual: true
    };
    
    setMyTrips(prev => [...prev, newTrip]);
    setScreen('home');
    resetNewTrip();
  };

  // Search places using Google Places API (New)
  const searchPlacesInCity = async (cityData, preferences) => {
    const typeMapping = {
      'architecture': 'historical_landmark',
      'nightlife': 'night_club|bar',
      'art': 'art_gallery|museum',
      'cuisine': 'restaurant',
      'adventure': 'tourist_attraction|park',
      'instagram': 'tourist_attraction|point_of_interest'
    };
    
    // Determine search types based on preferences
    let searchTypes = ['tourist_attraction', 'museum', 'historical_landmark', 'restaurant'];
    if (preferences && preferences.length > 0) {
      searchTypes = preferences.map(p => typeMapping[p] || 'tourist_attraction');
    }
    
    const allPlaces = [];
    
    // Search for places using Text Search
    for (const searchType of searchTypes.slice(0, 3)) {
      try {
        const query = `top ${searchType.replace('_', ' ')} in ${cityData.city}`;
        const response = await fetch(
          `https://places.googleapis.com/v1/places:searchText`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
              'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.primaryType,places.editorialSummary'
            },
            body: JSON.stringify({
              textQuery: query,
              maxResultCount: 10,
              locationBias: {
                circle: {
                  center: { latitude: cityData.lat, longitude: cityData.lng },
                  radius: 15000.0
                }
              }
            })
          }
        );
        
        const data = await response.json();
        if (data.places) {
          allPlaces.push(...data.places);
        }
      } catch (err) {
        console.error('Places search error:', err);
      }
    }
    
    // Remove duplicates based on name
    const uniquePlaces = allPlaces.filter((place, index, self) =>
      index === self.findIndex(p => p.displayName?.text === place.displayName?.text)
    );
    
    return uniquePlaces;
  };

  // Get photo URL from Google Places
  const getPlacePhotoUrl = (photoName) => {
    if (!photoName) return 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300';
    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=300&maxWidthPx=300&key=${GOOGLE_PLACES_API_KEY}`;
  };

  // AI Trip Generation with Google Places API
  const generateAiTrip = async () => {
    setAiGenerating(true);
    setScreen('aiGenerating');

    const messages = ['Searching real places...', 'Finding top attractions...', 'Getting photos & ratings...', 'Creating your route...', 'Almost ready...'];
    let messageIndex = 0;
    setAiLoadingMessage(messages[0]);

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setAiLoadingMessage(messages[messageIndex]);
    }, 1500);

    try {
      const cityData = newTripCityData || { city: newTripCity, country: 'Unknown', flag: '📍', lat: 48.8566, lng: 2.3522 };
      
      // Fetch real places from Google Places API
      const places = await searchPlacesInCity(cityData, newTripPreferences);
      
      if (places.length === 0) {
        throw new Error('No places found');
      }
      
      // Convert Google Places data to our format
      const spots = places.slice(0, newTripDays * 5).map(place => ({
        name: place.displayName?.text || 'Unknown Place',
        type: place.primaryType?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Attraction',
        duration: place.primaryType?.includes('museum') ? '2 hours' : 
                  place.primaryType?.includes('restaurant') ? '1.5 hours' : '1 hour',
        lat: place.location?.latitude || cityData.lat,
        lng: place.location?.longitude || cityData.lng,
        image: place.photos?.[0]?.name ? getPlacePhotoUrl(place.photos[0].name) : 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300',
        rating: place.rating || 4.5,
        reviews: place.userRatingCount || 1000,
        description: place.editorialSummary?.text || `Popular ${place.primaryType?.replace(/_/g, ' ') || 'attraction'} in ${cityData.city}`
      }));
      
      // Distribute spots across days
      const spotsPerDay = Math.ceil(spots.length / newTripDays);
      const itinerary = Array.from({ length: newTripDays }, (_, dayIndex) => {
        const daySpots = spots.slice(dayIndex * spotsPerDay, (dayIndex + 1) * spotsPerDay);
        return {
          day: dayIndex + 1,
          title: ['City Highlights', 'Culture & History', 'Local Favorites', 'Hidden Gems', 'Final Discoveries'][dayIndex % 5],
          spots: daySpots.map((spot, spotIndex) => ({
            ...spot,
            walkTime: spotIndex === 0 ? null : `${8 + (spotIndex * 4)} min walk`
          }))
        };
      });
      
      const newTrip = {
        id: 'ai-' + Date.now(),
        city: cityData.city,
        country: cityData.country,
        flag: cityData.flag,
        title: `${newTripDays}-Day ${cityData.city} Trip`,
        days: newTripDays,
        center: [cityData.lat, cityData.lng],
        image: spots[0]?.image || 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300',
        itinerary: itinerary,
        isAiGenerated: true
      };
      
      clearInterval(messageInterval);
      setGeneratedTrip(newTrip);
      setAiGenerating(false);
      setScreen('tripResult');
      
    } catch (error) {
      console.error('AI generation error:', error);
      clearInterval(messageInterval);
      
      // Fallback: use real city itineraries
      const cityData = newTripCityData || { city: newTripCity, country: 'Unknown', flag: '📍', lat: 48.8566, lng: 2.3522 };
      
      // Real city spots database
      const REAL_CITY_SPOTS = {
        'Rome': [
          { name: 'Colosseum', type: 'Landmark', duration: '2 hours', lat: 41.8902, lng: 12.4922, image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Roman Forum', type: 'History', duration: '1.5 hours', lat: 41.8925, lng: 12.4853, image: 'https://images.pexels.com/photos/2225439/pexels-photo-2225439.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Trevi Fountain', type: 'Landmark', duration: '30 min', lat: 41.9009, lng: 12.4833, image: 'https://images.pexels.com/photos/2748019/pexels-photo-2748019.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Pantheon', type: 'Landmark', duration: '45 min', lat: 41.8986, lng: 12.4769, image: 'https://images.pexels.com/photos/2676589/pexels-photo-2676589.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Vatican Museums', type: 'Museum', duration: '3 hours', lat: 41.9065, lng: 12.4536, image: 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'St. Peters Basilica', type: 'Landmark', duration: '1.5 hours', lat: 41.9022, lng: 12.4539, image: 'https://images.pexels.com/photos/326709/pexels-photo-326709.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Spanish Steps', type: 'Landmark', duration: '30 min', lat: 41.9060, lng: 12.4828, image: 'https://images.pexels.com/photos/4819547/pexels-photo-4819547.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Piazza Navona', type: 'Square', duration: '45 min', lat: 41.8992, lng: 12.4731, image: 'https://images.pexels.com/photos/3278939/pexels-photo-3278939.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Trastevere', type: 'Neighborhood', duration: '2 hours', lat: 41.8869, lng: 12.4699, image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Castel Sant Angelo', type: 'History', duration: '1 hour', lat: 41.9031, lng: 12.4663, image: 'https://images.pexels.com/photos/2928058/pexels-photo-2928058.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'Paris': [
          { name: 'Eiffel Tower', type: 'Landmark', duration: '2 hours', lat: 48.8584, lng: 2.2945, image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Louvre Museum', type: 'Museum', duration: '3 hours', lat: 48.8606, lng: 2.3376, image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Arc de Triomphe', type: 'Landmark', duration: '1 hour', lat: 48.8738, lng: 2.2950, image: 'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Notre-Dame', type: 'Landmark', duration: '1 hour', lat: 48.8530, lng: 2.3499, image: 'https://images.pexels.com/photos/2344/cars-france-landmark-lights.jpg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Sacré-Cœur', type: 'Landmark', duration: '1 hour', lat: 48.8867, lng: 2.3431, image: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Montmartre', type: 'Neighborhood', duration: '2 hours', lat: 48.8862, lng: 2.3410, image: 'https://images.pexels.com/photos/2738173/pexels-photo-2738173.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Champs-Élysées', type: 'Shopping', duration: '2 hours', lat: 48.8698, lng: 2.3076, image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Musée d\'Orsay', type: 'Museum', duration: '2 hours', lat: 48.8600, lng: 2.3266, image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'Vienna': [
          { name: 'Schönbrunn Palace', type: 'Landmark', duration: '3 hours', lat: 48.1845, lng: 16.3122, image: 'https://images.pexels.com/photos/2351425/pexels-photo-2351425.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'St. Stephens Cathedral', type: 'Landmark', duration: '1 hour', lat: 48.2082, lng: 16.3738, image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Belvedere Palace', type: 'Museum', duration: '2 hours', lat: 48.1914, lng: 16.3805, image: 'https://images.pexels.com/photos/2351425/pexels-photo-2351425.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Vienna State Opera', type: 'Culture', duration: '1.5 hours', lat: 48.2035, lng: 16.3689, image: 'https://images.pexels.com/photos/2893177/pexels-photo-2893177.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Hofburg Palace', type: 'History', duration: '2 hours', lat: 48.2066, lng: 16.3656, image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Prater Park', type: 'Park', duration: '2 hours', lat: 48.2166, lng: 16.3999, image: 'https://images.pexels.com/photos/2893177/pexels-photo-2893177.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Naschmarkt', type: 'Market', duration: '1.5 hours', lat: 48.1986, lng: 16.3633, image: 'https://images.pexels.com/photos/2351425/pexels-photo-2351425.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Kunsthistorisches Museum', type: 'Museum', duration: '2 hours', lat: 48.2038, lng: 16.3616, image: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'Istanbul': [
          { name: 'Hagia Sophia', type: 'Landmark', duration: '1.5 hours', lat: 41.0086, lng: 28.9802, image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Blue Mosque', type: 'Landmark', duration: '1 hour', lat: 41.0054, lng: 28.9768, image: 'https://images.pexels.com/photos/3889704/pexels-photo-3889704.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Topkapi Palace', type: 'Museum', duration: '2.5 hours', lat: 41.0115, lng: 28.9833, image: 'https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Grand Bazaar', type: 'Market', duration: '2 hours', lat: 41.0107, lng: 28.9680, image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Galata Tower', type: 'Landmark', duration: '1 hour', lat: 41.0256, lng: 28.9741, image: 'https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Bosphorus Cruise', type: 'Activity', duration: '2 hours', lat: 41.0256, lng: 28.9744, image: 'https://images.pexels.com/photos/3889891/pexels-photo-3889891.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Spice Bazaar', type: 'Market', duration: '1 hour', lat: 41.0166, lng: 28.9706, image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Basilica Cistern', type: 'History', duration: '45 min', lat: 41.0084, lng: 28.9779, image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'Tokyo': [
          { name: 'Senso-ji Temple', type: 'Temple', duration: '1.5 hours', lat: 35.7148, lng: 139.7967, image: 'https://images.pexels.com/photos/5169479/pexels-photo-5169479.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Shibuya Crossing', type: 'Landmark', duration: '30 min', lat: 35.6595, lng: 139.7004, image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Meiji Shrine', type: 'Temple', duration: '1 hour', lat: 35.6764, lng: 139.6993, image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Tokyo Tower', type: 'Landmark', duration: '1.5 hours', lat: 35.6586, lng: 139.7454, image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Shinjuku Gyoen', type: 'Park', duration: '2 hours', lat: 35.6852, lng: 139.7100, image: 'https://images.pexels.com/photos/5169479/pexels-photo-5169479.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Akihabara', type: 'Neighborhood', duration: '2 hours', lat: 35.7023, lng: 139.7745, image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Harajuku', type: 'Neighborhood', duration: '2 hours', lat: 35.6702, lng: 139.7027, image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Tokyo Skytree', type: 'Landmark', duration: '1.5 hours', lat: 35.7101, lng: 139.8107, image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'Barcelona': [
          { name: 'Sagrada Familia', type: 'Landmark', duration: '2 hours', lat: 41.4036, lng: 2.1744, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Park Güell', type: 'Park', duration: '2 hours', lat: 41.4145, lng: 2.1527, image: 'https://images.pexels.com/photos/1655028/pexels-photo-1655028.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Casa Batlló', type: 'Architecture', duration: '1.5 hours', lat: 41.3916, lng: 2.1649, image: 'https://images.pexels.com/photos/1874675/pexels-photo-1874675.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'La Rambla', type: 'Street', duration: '1.5 hours', lat: 41.3809, lng: 2.1734, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Gothic Quarter', type: 'Neighborhood', duration: '2 hours', lat: 41.3833, lng: 2.1767, image: 'https://images.pexels.com/photos/1874675/pexels-photo-1874675.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'La Boqueria Market', type: 'Market', duration: '1 hour', lat: 41.3816, lng: 2.1719, image: 'https://images.pexels.com/photos/1655028/pexels-photo-1655028.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Barceloneta Beach', type: 'Beach', duration: '2 hours', lat: 41.3782, lng: 2.1925, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Camp Nou', type: 'Stadium', duration: '2 hours', lat: 41.3809, lng: 2.1228, image: 'https://images.pexels.com/photos/1874675/pexels-photo-1874675.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'London': [
          { name: 'Big Ben', type: 'Landmark', duration: '30 min', lat: 51.5007, lng: -0.1246, image: 'https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Tower Bridge', type: 'Landmark', duration: '1 hour', lat: 51.5055, lng: -0.0754, image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'British Museum', type: 'Museum', duration: '3 hours', lat: 51.5194, lng: -0.1270, image: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Buckingham Palace', type: 'Landmark', duration: '1 hour', lat: 51.5014, lng: -0.1419, image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'London Eye', type: 'Attraction', duration: '1 hour', lat: 51.5033, lng: -0.1195, image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Tower of London', type: 'History', duration: '2.5 hours', lat: 51.5081, lng: -0.0759, image: 'https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Westminster Abbey', type: 'Landmark', duration: '1.5 hours', lat: 51.4994, lng: -0.1273, image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Covent Garden', type: 'Shopping', duration: '1.5 hours', lat: 51.5117, lng: -0.1240, image: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'New York': [
          { name: 'Statue of Liberty', type: 'Landmark', duration: '3 hours', lat: 40.6892, lng: -74.0445, image: 'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-64271.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Empire State Building', type: 'Landmark', duration: '1.5 hours', lat: 40.7484, lng: -73.9857, image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Central Park', type: 'Park', duration: '3 hours', lat: 40.7829, lng: -73.9654, image: 'https://images.pexels.com/photos/76969/cold-front-warm-front-central-park-background-76969.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Times Square', type: 'Square', duration: '1 hour', lat: 40.7580, lng: -73.9855, image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Brooklyn Bridge', type: 'Landmark', duration: '1 hour', lat: 40.7061, lng: -73.9969, image: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Metropolitan Museum', type: 'Museum', duration: '3 hours', lat: 40.7794, lng: -73.9632, image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: '9/11 Memorial', type: 'Memorial', duration: '1.5 hours', lat: 40.7115, lng: -74.0134, image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'High Line', type: 'Park', duration: '1.5 hours', lat: 40.7480, lng: -74.0048, image: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ],
        'Valencia': [
          { name: 'City of Arts and Sciences', type: 'Landmark', duration: '3 hours', lat: 39.4541, lng: -0.3507, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'La Lonja de la Seda', type: 'History', duration: '1 hour', lat: 39.4743, lng: -0.3787, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Valencia Cathedral', type: 'Landmark', duration: '1 hour', lat: 39.4753, lng: -0.3754, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Central Market', type: 'Market', duration: '1.5 hours', lat: 39.4737, lng: -0.3791, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Turia Gardens', type: 'Park', duration: '2 hours', lat: 39.4800, lng: -0.3700, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Malvarrosa Beach', type: 'Beach', duration: '2 hours', lat: 39.4789, lng: -0.3225, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'Bioparc Valencia', type: 'Zoo', duration: '3 hours', lat: 39.4784, lng: -0.4074, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' },
          { name: 'El Carmen Neighborhood', type: 'Neighborhood', duration: '2 hours', lat: 39.4795, lng: -0.3815, image: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=300' }
        ]
      };
      
      // Get spots for this city or generate generic ones
      const cityName = cityData.city;
      let allSpots = REAL_CITY_SPOTS[cityName];
      
      if (!allSpots) {
        // Generate generic spots for unknown cities
        allSpots = Array.from({ length: 8 }, (_, j) => ({
          name: `${cityName} Top Attraction ${j + 1}`,
          type: ['Landmark', 'Museum', 'Restaurant', 'Park', 'Market', 'Neighborhood'][j % 6],
          duration: `${1 + (j % 3)} hours`,
          lat: cityData.lat + (Math.random() - 0.5) * 0.03,
          lng: cityData.lng + (Math.random() - 0.5) * 0.03,
          image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300'
        }));
      }
      
      // Distribute spots across days
      const spotsPerDay = Math.ceil(allSpots.length / newTripDays);
      const itinerary = Array.from({ length: newTripDays }, (_, dayIndex) => {
        const daySpots = allSpots.slice(dayIndex * spotsPerDay, (dayIndex + 1) * spotsPerDay);
        return {
          day: dayIndex + 1,
          title: ['Historic Center', 'Culture & Art', 'Local Life', 'Hidden Gems', 'Day Trip'][dayIndex % 5],
          spots: daySpots.map((spot, spotIndex) => ({
            ...spot,
            walkTime: spotIndex === 0 ? null : `${8 + (spotIndex * 3)} min walk`
          }))
        };
      });
      
      const realTrip = {
        id: 'ai-' + Date.now(),
        city: cityData.city,
        country: cityData.country,
        flag: cityData.flag,
        title: `${newTripDays}-Day ${cityData.city} Trip`,
        days: newTripDays,
        center: [cityData.lat, cityData.lng],
        image: allSpots[0]?.image || 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300',
        itinerary: itinerary,
        isAiGenerated: true
      };
      
      setGeneratedTrip(realTrip);
      setAiGenerating(false);
      setScreen('tripResult');
    }
  };

  // ============================================
  // AUTH SCREEN
  // ============================================
  if (screen === 'auth') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(165deg, #f0f9f4 0%, #ffffff 40%, #e8f5e9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', boxShadow: '0 16px 48px rgba(46,125,50,0.3)', marginBottom: '20px' }}>🧭</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: '700', color: '#1b5e20', margin: '0 0 8px 0' }}>TOURISTA</h1>
            <p style={{ fontSize: '15px', color: '#558b2f', margin: 0 }}>Your AI travel concierge</p>
          </div>

          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', background: '#f1f8e9', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
              <button onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: authMode === 'login' ? 'white' : 'transparent', color: authMode === 'login' ? '#2e7d32' : '#689f38', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Log In</button>
              <button onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthSuccess(''); }} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: authMode === 'signup' ? 'white' : 'transparent', color: authMode === 'signup' ? '#2e7d32' : '#689f38', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Sign Up</button>
            </div>

            {authSuccess && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '14px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px' }}>{authSuccess}</div>}
            {authError && <div style={{ background: '#ffebee', color: '#c62828', padding: '14px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px' }}>{authError}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }} />
              {authMode === 'signup' && <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e0e0e0', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }} />}
            </div>

            <button onClick={authMode === 'login' ? handleLogin : handleSignup} disabled={authLoading} style={{ width: '100%', background: authLoading ? '#a5d6a7' : 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: '600', cursor: authLoading ? 'not-allowed' : 'pointer', marginTop: '20px', fontFamily: "'DM Sans', sans-serif" }}>
              {authLoading ? 'Please wait...' : (authMode === 'login' ? 'Log In' : 'Create Account')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // HOME SCREEN
  // ============================================
  if (screen === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f1f8e9 0%, #ffffff 100%)', fontFamily: "'DM Sans', sans-serif", paddingBottom: '100px' }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '20px', borderRadius: '0 0 30px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>🧭</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>TOURISTA</h1>
            </div>
            <div onClick={() => setShowLogoutConfirm(true)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', margin: 0 }}>Welcome, <strong>{currentUser?.email?.split('@')[0]}</strong>! 👋</p>
        </div>

        {/* Explore Destinations */}
        <div style={{ padding: '24px 20px 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', margin: '0 0 16px 0' }}>🌍 Explore Destinations</h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', marginRight: '-20px', paddingRight: '20px' }}>
            {TRAVEL_GUIDES.map((guide) => (
              <div key={guide.id} onClick={() => { setSelectedGuide(guide); setSelectedDay(1); setShowAllDaysOnMap(false); setMapExpanded(false); setScreen('guideDetail'); }} style={{ minWidth: '140px', background: 'white', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(46,125,50,0.1)' }}>
                <div style={{ height: '90px', position: 'relative' }}>
                  <img src={guide.image} alt={guide.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '600', color: '#2e7d32' }}>{guide.flag} {guide.city}</div>
                </div>
                <div style={{ padding: '10px' }}>
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#1b5e20' }}>{guide.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#689f38' }}>{getTotalSpots(guide)} spots</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Trips */}
        <div style={{ padding: '0 20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', margin: '0 0 16px 0' }}>🗂️ My Trips</h2>
          {myTrips.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px 20px', textAlign: 'center', border: '2px dashed #c8e6c9' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✈️</div>
              <h3 style={{ color: '#1b5e20', fontSize: '16px', margin: '0 0 8px' }}>No trips yet</h3>
              <p style={{ color: '#689f38', fontSize: '13px', margin: '0 0 16px' }}>Create your first AI-powered trip!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myTrips.map((trip, index) => (
                <div key={index} style={{ background: 'white', borderRadius: '14px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div onClick={() => { setSelectedGuide(trip); setSelectedDay(1); setShowAllDaysOnMap(false); setMapExpanded(false); setScreen('guideDetail'); }} style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}>
                    <img src={trip.image} alt={trip.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div onClick={() => { setSelectedGuide(trip); setSelectedDay(1); setShowAllDaysOnMap(false); setMapExpanded(false); setScreen('guideDetail'); }} style={{ flex: 1, cursor: 'pointer' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1b5e20' }}>{trip.flag} {trip.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#689f38' }}>{trip.days} days • {getTotalSpots(trip)} spots</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setTripToDelete(trip); }} style={{ background: '#ffebee', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {tripToDelete && (
          <div onClick={() => setTripToDelete(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '20px', padding: '24px', margin: '20px', maxWidth: '320px', width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗑️</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1b5e20' }}>Delete Trip?</h3>
              <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#666' }}>Remove "{tripToDelete.title}" from your trips?</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setTripToDelete(null)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #e0e0e0', background: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', color: '#666' }}>Cancel</button>
                <button onClick={() => { setMyTrips(prev => prev.filter(t => t.id !== tripToDelete.id)); setTripToDelete(null); }} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#ef5350', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div onClick={() => setShowLogoutConfirm(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '20px', padding: '24px', margin: '20px', maxWidth: '320px', width: '100%', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px' }}>👋</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1b5e20' }}>Log Out?</h3>
              <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#666' }}>Are you sure you want to log out?</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #e0e0e0', background: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', color: '#666', fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                <button onClick={() => { setShowLogoutConfirm(false); handleLogout(); }} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#ef5350', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Log Out</button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button onClick={() => { resetNewTrip(); setScreen('newTripSearch'); }} style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', borderRadius: '28px', padding: '16px 28px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 8px 24px rgba(46,125,50,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>✨</span> Create AI Trip
        </button>
      </div>
    );
  }

  // ============================================
  // NEW TRIP - CITY SEARCH
  // ============================================
  if (screen === 'newTripSearch') {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ background: 'white', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', borderRadius: '14px', padding: '4px 14px' }}>
            <span onClick={() => setScreen('home')} style={{ fontSize: '18px', cursor: 'pointer', color: '#666' }}>←</span>
            <input 
              type="text" 
              value={newTripCity} 
              onChange={(e) => setNewTripCity(e.target.value)} 
              placeholder="Search any city..." 
              autoFocus 
              style={{ flex: 1, padding: '12px 0', border: 'none', background: 'transparent', fontSize: '15px', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} 
            />
            {newTripCity && (
              <span onClick={() => { setNewTripCity(''); setCitySearchResults([]); }} style={{ fontSize: '16px', cursor: 'pointer', color: '#999' }}>✕</span>
            )}
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {citySearchLoading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: '#689f38', fontSize: '14px' }}>Searching cities...</p>
            </div>
          )}

          {citySearchResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {citySearchResults.map((city, index) => (
                <div 
                  key={index} 
                  onClick={() => selectCity(city)} 
                  style={{ 
                    padding: '14px 8px', 
                    cursor: 'pointer', 
                    borderBottom: index < citySearchResults.length - 1 ? '1px solid #e8e8e8' : 'none', 
                    background: 'white', 
                    borderRadius: index === 0 ? '12px 12px 0 0' : index === citySearchResults.length - 1 ? '0 0 12px 12px' : '0' 
                  }}
                >
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1b5e20' }}>{city.flag} {city.city}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#689f38' }}>{city.country}</p>
                </div>
              ))}
            </div>
          ) : !citySearchLoading && newTripCity.length >= 2 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ color: '#999', fontSize: '14px' }}>No cities found for "{newTripCity}"</p>
            </div>
          ) : !citySearchLoading && (
            <div>
              <p style={{ fontSize: '12px', color: '#689f38', marginBottom: '10px' }}>Popular destinations</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { city: 'Paris', country: 'France', flag: '🇫🇷', lat: 48.8566, lng: 2.3522 },
                  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.6762, lng: 139.6503 },
                  { city: 'Rome', country: 'Italy', flag: '🇮🇹', lat: 41.9028, lng: 12.4964 },
                  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', lat: 41.0082, lng: 28.9784 },
                  { city: 'Vienna', country: 'Austria', flag: '🇦🇹', lat: 48.2082, lng: 16.3738 },
                  { city: 'Barcelona', country: 'Spain', flag: '🇪🇸', lat: 41.3851, lng: 2.1734 },
                  { city: 'London', country: 'UK', flag: '🇬🇧', lat: 51.5074, lng: -0.1278 },
                  { city: 'Valencia', country: 'Spain', flag: '🇪🇸', lat: 39.4699, lng: -0.3763 }
                ].map((city) => (
                  <button 
                    key={city.city} 
                    onClick={() => selectCity(city)} 
                    style={{ background: 'white', border: '1px solid #e0e0e0', padding: '10px 14px', borderRadius: '18px', fontSize: '12px', cursor: 'pointer', color: '#1b5e20', fontWeight: '500', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {city.flag} {city.city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // NEW TRIP - CITY CONFIRM
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
          <button onClick={() => setScreen('newTripPreferences')} style={{ width: '100%', background: 'white', color: '#1b5e20', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: "'DM Sans', sans-serif" }}>
            Continue <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // NEW TRIP - PREFERENCES
  // ============================================
  if (screen === 'newTripPreferences') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '25vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 100%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px' }}>
          <span style={{ fontSize: '60px' }}>👍</span>
        </div>

        <div style={{ flex: 1, background: 'white', borderRadius: '28px 28px 0 0', marginTop: '-20px', padding: '28px 20px 100px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1b5e20', margin: '0 0 6px' }}>Trip Preferences</h1>
          <p style={{ fontSize: '13px', color: '#689f38', margin: '0 0 20px' }}>What should your trip focus on?</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
            {TRIP_CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => togglePreference(cat.id)} 
                style={{ 
                  background: newTripPreferences.includes(cat.id) ? '#e8f5e9' : 'white', 
                  border: newTripPreferences.includes(cat.id) ? '2px solid #4caf50' : '2px solid #e0e0e0', 
                  padding: '12px 16px', 
                  borderRadius: '22px', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#333',
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                <span>{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '14px 20px 28px', background: 'white', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' }}>
          <button onClick={() => setScreen('newTripDuration')} style={{ width: '100%', background: '#1b5e20', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // NEW TRIP - DURATION
  // ============================================
  if (screen === 'newTripDuration') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setScreen('newTripPreferences')} style={{ background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer' }}>←</button>
        </div>

        <div style={{ flex: 1, padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '22px', background: '#e8f5e9', padding: '6px', borderRadius: '10px' }}>📅</span>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1b5e20', margin: 0 }}>Trip Duration</h1>
          </div>

          <div style={{ display: 'flex', background: 'white', borderRadius: '22px', padding: '4px', marginBottom: '20px' }}>
            <button onClick={() => setDurationMode('flexible')} style={{ flex: 1, background: durationMode === 'flexible' ? '#1b5e20' : 'transparent', color: durationMode === 'flexible' ? 'white' : '#666', border: 'none', padding: '10px', borderRadius: '18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Flexible</button>
            <button onClick={() => setDurationMode('calendar')} style={{ flex: 1, background: durationMode === 'calendar' ? '#1b5e20' : 'transparent', color: durationMode === 'calendar' ? 'white' : '#666', border: 'none', padding: '10px', borderRadius: '18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Calendar</button>
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
                setNewTripDays(Math.min(diffDays, 7));
              }
              setShowAiPlanOffer(true);
            }} 
            style={{ width: '100%', background: '#1b5e20', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >
            Continue →
          </button>
        </div>

        {/* AI Plan Offer Modal */}
        {showAiPlanOffer && (
          <div onClick={() => setShowAiPlanOffer(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '24px', margin: '20px', maxWidth: '340px', width: '100%' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', margin: '0 0 14px', textAlign: 'center' }}>Want us to plan your trip?</h2>
              <p style={{ fontSize: '13px', color: '#666', textAlign: 'center', margin: '0 0 20px' }}>Our AI will find the best places based on your preferences</p>

              <div style={{ background: '#f8f8f8', borderRadius: '14px', padding: '14px', marginBottom: '18px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#999' }}>✨ Preview</p>
                <div style={{ background: 'white', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{newTripCityData?.flag || '📍'}</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>Day 1 - {newTripCityData?.city} Highlights</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#999' }}>4-5 curated spots</p>
                  </div>
                </div>
              </div>

              <button onClick={() => { setShowAiPlanOffer(false); generateAiTrip(); }} style={{ width: '100%', background: '#1b5e20', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif" }}>
                <span>✨</span> Yes, plan for me!
              </button>
              <button onClick={() => { setShowAiPlanOffer(false); setScreen('manualPlanner'); }} style={{ width: '100%', background: 'transparent', color: '#666', border: 'none', padding: '10px', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                No thanks, I'll plan myself
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // MANUAL PLANNER SCREEN
  // ============================================
  if (screen === 'manualPlanner' && newTripCityData) {
    const categories = [
      { id: 'all', label: 'All', icon: '🌟', query: 'tourist attractions' },
      { id: 'restaurants', label: 'Restaurants', icon: '🍽️', query: 'restaurants' },
      { id: 'cafes', label: 'Cafes', icon: '☕', query: 'cafes coffee shops' },
      { id: 'bars', label: 'Bars', icon: '🍺', query: 'bars pubs' },
      { id: 'clubs', label: 'Nightclubs', icon: '🎉', query: 'nightclubs dance clubs' },
      { id: 'museums', label: 'Museums', icon: '🏛️', query: 'museums' },
      { id: 'galleries', label: 'Art Galleries', icon: '🎨', query: 'art galleries' },
      { id: 'landmarks', label: 'Landmarks', icon: '🏰', query: 'historical landmarks monuments' },
      { id: 'parks', label: 'Parks', icon: '🌳', query: 'parks gardens' },
      { id: 'beaches', label: 'Beaches', icon: '🏖️', query: 'beaches' },
      { id: 'malls', label: 'Shopping Malls', icon: '🛍️', query: 'shopping malls' },
      { id: 'markets', label: 'Markets', icon: '🏪', query: 'local markets bazaars' },
      { id: 'boutiques', label: 'Boutiques', icon: '👗', query: 'boutique shops fashion' },
      { id: 'theaters', label: 'Theaters', icon: '🎭', query: 'theaters opera houses' },
      { id: 'concerts', label: 'Concert Halls', icon: '🎵', query: 'concert halls music venues' },
      { id: 'cinemas', label: 'Cinemas', icon: '🎬', query: 'cinemas movie theaters' },
      { id: 'spas', label: 'Spas', icon: '💆', query: 'spas wellness centers' },
      { id: 'gyms', label: 'Gyms', icon: '🏋️', query: 'gyms fitness centers' },
      { id: 'hotels', label: 'Hotels', icon: '🏨', query: 'hotels resorts' },
      { id: 'temples', label: 'Temples', icon: '🛕', query: 'temples shrines mosques churches' },
      { id: 'viewpoints', label: 'Viewpoints', icon: '🌄', query: 'viewpoints observation decks' },
      { id: 'zoos', label: 'Zoos', icon: '🦁', query: 'zoos aquariums' },
      { id: 'amusement', label: 'Theme Parks', icon: '🎢', query: 'amusement parks theme parks' },
      { id: 'sports', label: 'Sports', icon: '⚽', query: 'stadiums sports venues' },
      { id: 'libraries', label: 'Libraries', icon: '📚', query: 'libraries bookstores' },
      { id: 'universities', label: 'Universities', icon: '🎓', query: 'universities campuses' },
      { id: 'hospitals', label: 'Hospitals', icon: '🏥', query: 'hospitals clinics' },
      { id: 'pharmacies', label: 'Pharmacies', icon: '💊', query: 'pharmacies' },
      { id: 'banks', label: 'Banks', icon: '🏦', query: 'banks ATMs' },
      { id: 'gas', label: 'Gas Stations', icon: '⛽', query: 'gas stations' },
    ];

    const searchByCategory = async (category) => {
      setSelectedCategory(category.id);
      setPlaceSearchQuery('');
      setPlaceSearchLoading(true);
      
      try {
        const response = await fetch(
          `https://places.googleapis.com/v1/places:searchText`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
              'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.primaryType,places.editorialSummary,places.currentOpeningHours,places.priceLevel'
            },
            body: JSON.stringify({
              textQuery: `best ${category.query} in ${newTripCityData.city}`,
              maxResultCount: 15,
              locationBias: {
                circle: {
                  center: { latitude: newTripCityData.lat, longitude: newTripCityData.lng },
                  radius: 20000.0
                }
              }
            })
          }
        );
        
        const data = await response.json();
        if (data.places) {
          setPlaceSearchResults(data.places.map(place => ({
            id: place.displayName?.text + '-' + Math.random(),
            name: place.displayName?.text || 'Unknown Place',
            type: place.primaryType?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Place',
            address: place.formattedAddress || '',
            lat: place.location?.latitude || newTripCityData.lat,
            lng: place.location?.longitude || newTripCityData.lng,
            rating: place.rating || 0,
            reviews: place.userRatingCount || 0,
            image: place.photos?.[0]?.name ? getPlacePhotoUrl(place.photos[0].name) : 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: place.editorialSummary?.text || `Popular ${category.label.toLowerCase()} in ${newTripCityData.city}`,
            isOpen: place.currentOpeningHours?.openNow,
            priceLevel: place.priceLevel
          })));
        } else {
          setPlaceSearchResults([]);
        }
      } catch (error) {
        console.error('Category search error:', error);
        setPlaceSearchResults([]);
      }
      setPlaceSearchLoading(false);
    };

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif", paddingBottom: '100px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button onClick={() => { setScreen('newTripConfirm'); setManualSpots([]); setPlaceSearchQuery(''); setPlaceSearchResults([]); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>←</button>
            <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>{newTripCityData.flag} {newTripCityData.city}</h1>
            <div style={{ width: '40px' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0, textAlign: 'center' }}>Build your perfect itinerary</p>
        </div>

        {/* Category Filters */}
        <div style={{ background: 'white', padding: '12px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => searchByCategory(cat)}
                style={{
                  background: selectedCategory === cat.id ? '#1b5e20' : '#f5f5f5',
                  color: selectedCategory === cat.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'DM Sans', sans-serif",
                  flexShrink: 0
                }}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', borderRadius: '14px', padding: '4px 14px' }}>
            <span style={{ fontSize: '18px', color: '#999' }}>🔍</span>
            <input 
              type="text" 
              value={placeSearchQuery} 
              onChange={(e) => {
                setPlaceSearchQuery(e.target.value);
                setSelectedCategory('all');
                if (e.target.value.length >= 2) {
                  searchPlacesForManual(e.target.value);
                } else {
                  setPlaceSearchResults([]);
                }
              }} 
              placeholder={`Search places in ${newTripCityData.city}...`}
              style={{ flex: 1, padding: '10px 0', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} 
            />
            {placeSearchQuery && (
              <span onClick={() => { setPlaceSearchQuery(''); setPlaceSearchResults([]); }} style={{ fontSize: '16px', cursor: 'pointer', color: '#999' }}>✕</span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* Loading */}
          {placeSearchLoading && (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <p style={{ color: '#689f38', fontSize: '14px', margin: 0 }}>Finding places...</p>
            </div>
          )}

          {/* Results Grid */}
          {!placeSearchLoading && placeSearchResults.length > 0 && (
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 12px' }}>{placeSearchResults.length} places found</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {placeSearchResults.map((place, index) => {
                  const isAdded = manualSpots.find(s => s.name === place.name);
                  return (
                    <div 
                      key={index}
                      onClick={() => setSelectedPlaceInfo(place)}
                      style={{ 
                        background: 'white', 
                        borderRadius: '16px', 
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        border: selectedPlaceInfo?.name === place.name ? '2px solid #2e7d32' : '2px solid transparent',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ paddingTop: '75%', position: 'relative' }}>
                        <img src={place.image} alt={place.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        {place.isOpen !== undefined && (
                          <div style={{ 
                            position: 'absolute', 
                            top: '8px', 
                            left: '8px', 
                            background: place.isOpen ? '#4caf50' : '#ef5350', 
                            color: 'white', 
                            padding: '2px 8px', 
                            borderRadius: '10px', 
                            fontSize: '10px', 
                            fontWeight: '600' 
                          }}>
                            {place.isOpen ? 'Open' : 'Closed'}
                          </div>
                        )}
                        {isAdded && (
                          <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#2e7d32', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✓</div>
                        )}
                      </div>
                      <div style={{ padding: '10px' }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1b5e20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{place.name}</p>
                        <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#999' }}>{place.type}</p>
                        {place.rating > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                            <span style={{ color: '#ffc107', fontSize: '12px' }}>★</span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{place.rating.toFixed(1)}</span>
                            <span style={{ fontSize: '10px', color: '#999' }}>({place.reviews})</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!placeSearchLoading && placeSearchResults.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
              <p style={{ color: '#1b5e20', fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>Explore {newTripCityData.city}</p>
              <p style={{ color: '#999', fontSize: '13px', margin: 0 }}>Select a category above or search for places</p>
            </div>
          )}
        </div>

        {/* Place Info Panel (Bottom Sheet) */}
        {selectedPlaceInfo && (
          <div 
            onClick={() => setSelectedPlaceInfo(null)}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: 'rgba(0,0,0,0.5)', 
              zIndex: 1000,
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{ 
                background: 'white', 
                borderRadius: '24px 24px 0 0', 
                width: '100%',
                maxHeight: '70vh',
                overflow: 'auto'
              }}
            >
              {/* Image Header */}
              <div style={{ height: '180px', position: 'relative' }}>
                <img src={selectedPlaceInfo.image} alt={selectedPlaceInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => setSelectedPlaceInfo(null)}
                  style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                >✕</button>
                {selectedPlaceInfo.isOpen !== undefined && (
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '12px', 
                    left: '12px', 
                    background: selectedPlaceInfo.isOpen ? '#4caf50' : '#ef5350', 
                    color: 'white', 
                    padding: '6px 14px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600' 
                  }}>
                    {selectedPlaceInfo.isOpen ? '🟢 Open Now' : '🔴 Closed'}
                  </div>
                )}
              </div>

              {/* Info Content */}
              <div style={{ padding: '20px' }}>
                <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '700', color: '#1b5e20' }}>{selectedPlaceInfo.name}</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ background: '#f1f8e9', color: '#2e7d32', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>{selectedPlaceInfo.type}</span>
                  {selectedPlaceInfo.priceLevel && (
                    <span style={{ color: '#666', fontSize: '13px' }}>{'💵'.repeat(selectedPlaceInfo.priceLevel)}</span>
                  )}
                </div>

                {selectedPlaceInfo.rating > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ color: '#ffc107', fontSize: '18px' }}>★</span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#333' }}>{selectedPlaceInfo.rating.toFixed(1)}</span>
                    <span style={{ fontSize: '14px', color: '#999' }}>({selectedPlaceInfo.reviews.toLocaleString()} reviews)</span>
                  </div>
                )}

                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: '0 0 16px' }}>
                  {selectedPlaceInfo.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f5f5f5', borderRadius: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '16px' }}>📍</span>
                  <p style={{ margin: 0, fontSize: '13px', color: '#666', flex: 1 }}>{selectedPlaceInfo.address}</p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => openGoogleMaps(selectedPlaceInfo.name, newTripCityData.city)}
                    style={{ flex: 1, background: 'white', border: '2px solid #e0e0e0', borderRadius: '14px', padding: '14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    🗺️ Directions
                  </button>
                  <button 
                    onClick={() => {
                      addSpotToTrip(selectedPlaceInfo);
                      setSelectedPlaceInfo(null);
                    }}
                    disabled={manualSpots.find(s => s.name === selectedPlaceInfo.name)}
                    style={{ 
                      flex: 1, 
                      background: manualSpots.find(s => s.name === selectedPlaceInfo.name) ? '#c8e6c9' : 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', 
                      border: 'none', 
                      borderRadius: '14px', 
                      padding: '14px', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: 'white', 
                      cursor: manualSpots.find(s => s.name === selectedPlaceInfo.name) ? 'default' : 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px', 
                      fontFamily: "'DM Sans', sans-serif" 
                    }}
                  >
                    {manualSpots.find(s => s.name === selectedPlaceInfo.name) ? '✓ Added' : '+ Add to Trip'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Itinerary Footer */}
        {manualSpots.length > 0 && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)', padding: '16px 20px', zIndex: 999 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', marginLeft: '-8px' }}>
                {manualSpots.slice(0, 4).map((spot, i) => (
                  <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid white', marginLeft: '-8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <img src={spot.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                {manualSpots.length > 4 && (
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e8f5e9', border: '2px solid white', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: '#2e7d32' }}>+{manualSpots.length - 4}</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1b5e20' }}>{manualSpots.length} places added</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#999' }}>Tap to review your itinerary</p>
              </div>
            </div>
            <button onClick={saveManualTrip} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              💾 Save Trip
            </button>
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
  // TRIP RESULT SCREEN (with paywall for Day 2+)
  // ============================================
  if (screen === 'tripResult' && generatedTrip) {
    const currentDay = generatedTrip.itinerary.find(d => d.day === selectedDay) || generatedTrip.itinerary[0];
    const isLocked = !isPremiumUser && generatedTrip.days > 1 && selectedDay > 1;
    const showOneDayPaywall = !isPremiumUser && generatedTrip.days === 1;

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif", paddingBottom: '20px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => { setScreen('home'); resetNewTrip(); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '15px' }}>←</button>
          <h1 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>{generatedTrip.flag} {generatedTrip.city}</h1>
          <button onClick={() => { setMyTrips(prev => [...prev, generatedTrip]); setScreen('home'); resetNewTrip(); }} style={{ background: 'white', border: 'none', borderRadius: '10px', padding: '8px 12px', color: '#2e7d32', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>💾 Save</button>
        </div>

        {/* Map */}
        <div style={{ height: mapExpanded ? '50vh' : '200px', margin: '14px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'height 0.3s ease', position: 'relative' }}>
          <TripMap 
            guide={generatedTrip} 
            selectedDay={showAllDaysOnMap ? null : selectedDay} 
            onSpotClick={(day) => { 
              if (!isPremiumUser && day > 1 && generatedTrip.days > 1) { 
                setShowSubscriptionModal(true); 
              } else { 
                setSelectedDay(day); 
                setShowAllDaysOnMap(false); 
              } 
            }} 
            expanded={mapExpanded} 
          />
          {/* Map expand/shrink button */}
          <button 
            onClick={() => { setMapExpanded(!mapExpanded); setTimeout(() => window.dispatchEvent(new Event('resize')), 350); }} 
            style={{ 
              position: 'absolute', 
              bottom: '12px', 
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              padding: '10px 32px', 
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)', 
              cursor: 'pointer', 
              fontSize: '13px', 
              fontWeight: '600', 
              color: '#1b5e20',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              minWidth: '140px'
            }}
          >
            {mapExpanded ? '↓ Shrink Map' : '↑ Expand Map'}
          </button>
        </div>

        {/* Trip Info */}
        <div style={{ background: 'white', margin: '0 14px 14px', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
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
            const dayLocked = !isPremiumUser && day.day > 1 && generatedTrip.days > 1;
            return (
              <button 
                key={day.day} 
                onClick={() => { 
                  if (dayLocked) { 
                    setShowSubscriptionModal(true); 
                  } else { 
                    setSelectedDay(day.day); 
                    setShowAllDaysOnMap(false); 
                  } 
                }} 
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
                  gap: '5px',
                  fontFamily: "'DM Sans', sans-serif"
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
                  <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isLocked ? 'blur(3px)' : 'none' }} />
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
              {index < currentDay.spots.length - 1 && spot.walkTime && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '6px 0 6px 12px', gap: '6px' }}>
                  <div style={{ width: '2px', height: '20px', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length] + '40', marginLeft: '12px' }} />
                  <span style={{ fontSize: '10px', color: '#9e9e9e', filter: isLocked ? 'blur(3px)' : 'none' }}>🚶 {currentDay.spots[index + 1]?.walkTime}</span>
                </div>
              )}
            </div>
          ))}

          {/* Paywall Card */}
          {(isLocked || showOneDayPaywall) && (
            <div style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', borderRadius: '18px', padding: '22px', marginTop: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '36px' }}>🔓</span>
              <h3 style={{ margin: '10px 0 6px', color: '#1b5e20', fontSize: '17px' }}>Unlock Full Plan</h3>
              <p style={{ margin: '0 0 14px', color: '#689f38', fontSize: '13px' }}>Get access to all {generatedTrip.days} days</p>
              <div style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '14px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>✓ 7-day free trial</p>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#666' }}>✓ $4.99/mo or $3.74/mo annual</p>
              </div>
              <button onClick={() => setShowSubscriptionModal(true)} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Start Free Trial
              </button>
            </div>
          )}
        </div>

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div onClick={() => setShowSubscriptionModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '28px 22px', margin: '20px', maxWidth: '340px', width: '100%', textAlign: 'center' }}>
              <span style={{ fontSize: '44px' }}>✨</span>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1b5e20', margin: '14px 0 6px' }}>Unlock Premium</h2>
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

              <button onClick={() => { setShowSubscriptionModal(false); setIsPremiumUser(true); }} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
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
  // GUIDE DETAIL SCREEN (for pre-built trips)
  // ============================================
  if (screen === 'guideDetail' && selectedGuide) {
    const currentDay = selectedGuide.itinerary.find(d => d.day === selectedDay) || selectedGuide.itinerary[0];
    // Paywall for AI generated trips (Day 2+ locked)
    const isAiTrip = selectedGuide.isAiGenerated === true;
    const isLockedDay = isAiTrip && !isPremiumUser && selectedGuide.days > 1 && selectedDay > 1;

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif" }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setScreen('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>←</button>
          <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>{selectedGuide.flag} {selectedGuide.city}</h1>
          <button onClick={() => { if (!myTrips.find(t => t.id === selectedGuide.id)) setMyTrips(prev => [...prev, selectedGuide]); }} style={{ background: myTrips.find(t => t.id === selectedGuide.id) ? 'rgba(255,255,255,0.3)' : 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', color: myTrips.find(t => t.id === selectedGuide.id) ? 'white' : '#2e7d32', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            {myTrips.find(t => t.id === selectedGuide.id) ? '✓ Saved' : '💾 Save'}
          </button>
        </div>

        {/* Map */}
        <div style={{ height: mapExpanded ? '50vh' : '250px', margin: '16px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'height 0.3s ease', position: 'relative' }}>
          <TripMap guide={selectedGuide} selectedDay={showAllDaysOnMap ? null : selectedDay} onSpotClick={(day) => { setSelectedDay(day); setShowAllDaysOnMap(false); }} expanded={mapExpanded} />
          {/* Map expand/shrink button */}
          <button 
            onClick={() => { setMapExpanded(!mapExpanded); setTimeout(() => window.dispatchEvent(new Event('resize')), 350); }} 
            style={{ 
              position: 'absolute', 
              bottom: '12px', 
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              padding: '10px 32px', 
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)', 
              cursor: 'pointer', 
              fontSize: '13px', 
              fontWeight: '600', 
              color: '#1b5e20',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              minWidth: '140px'
            }}
          >
            {mapExpanded ? '↓ Shrink Map' : '↑ Expand Map'}
          </button>
        </div>

        {/* Day Legend */}
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#666' }}>Routes:</span>
          {selectedGuide.itinerary.map((day, index) => (
            <div key={day.day} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '16px', height: '3px', background: DAY_COLORS[index % DAY_COLORS.length], borderRadius: '2px' }} />
              <span style={{ fontSize: '10px', color: '#666' }}>Day {day.day}</span>
            </div>
          ))}
          <button onClick={() => setShowAllDaysOnMap(!showAllDaysOnMap)} style={{ marginLeft: 'auto', background: showAllDaysOnMap ? '#2e7d32' : '#e8f5e9', color: showAllDaysOnMap ? 'white' : '#2e7d32', border: 'none', borderRadius: '12px', padding: '4px 10px', fontSize: '10px', cursor: 'pointer', fontWeight: '600', fontFamily: "'DM Sans', sans-serif" }}>
            {showAllDaysOnMap ? '✓ All Days' : 'Show All'}
          </button>
        </div>

        {/* Trip Info */}
        <div style={{ background: 'white', margin: '8px 16px', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#1b5e20', fontWeight: '700' }}>{selectedGuide.title}</h2>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#689f38' }}>
            <span>📅 {selectedGuide.days} days</span>
            <span>📍 {getTotalSpots(selectedGuide)} spots</span>
          </div>
        </div>

        {/* Day Tabs */}
        <div style={{ display: 'flex', gap: '8px', padding: '8px 16px 16px', overflowX: 'auto' }}>
          {selectedGuide.itinerary.map((day, index) => {
            const dayLocked = isAiTrip && !isPremiumUser && selectedGuide.days > 1 && day.day > 1;
            return (
              <button 
                key={day.day} 
                onClick={() => { 
                  if (dayLocked) {
                    setShowSubscriptionModal(true);
                  } else {
                    setSelectedDay(day.day); 
                    setShowAllDaysOnMap(false); 
                  }
                }} 
                style={{ 
                  background: selectedDay === day.day ? DAY_COLORS[index % DAY_COLORS.length] : 'white', 
                  color: selectedDay === day.day ? 'white' : '#333', 
                  border: selectedDay === day.day ? 'none' : '2px solid #e0e0e0', 
                  padding: '10px 20px', 
                  borderRadius: '20px', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  cursor: 'pointer', 
                  whiteSpace: 'nowrap', 
                  fontFamily: "'DM Sans', sans-serif",
                  opacity: dayLocked ? 0.7 : 1
                }}
              >
                Day {day.day} {dayLocked && '🔒'}
              </button>
            );
          })}
        </div>

        {/* Day Title */}
        <div style={{ padding: '0 16px 12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#1b5e20' }}>{currentDay.title}</h3>
        </div>

        {/* Spots List */}
        <div style={{ padding: '0 16px 100px' }}>
          {currentDay.spots.map((spot, index) => (
            <div key={index}>
              <div onClick={() => !isLockedDay && setSelectedSpot({ ...spot, city: selectedGuide.city })} style={{ background: 'white', borderRadius: '14px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: isLockedDay ? 'default' : 'pointer', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>{index + 1}</div>
                <div style={{ width: '55px', height: '55px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isLockedDay ? 'blur(4px)' : 'none' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1b5e20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', filter: isLockedDay ? 'blur(4px)' : 'none' }}>{spot.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#689f38', background: '#f1f8e9', display: 'inline-block', padding: '2px 8px', borderRadius: '10px', filter: isLockedDay ? 'blur(4px)' : 'none' }}>{spot.type}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9e9e9e' }}>⏱️ {spot.duration}</p>
                </div>
                {isLockedDay && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px' }}>🔒</span>
                  </div>
                )}
              </div>
              {index < currentDay.spots.length - 1 && currentDay.spots[index + 1].walkTime && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0 8px 14px', gap: '8px' }}>
                  <div style={{ width: '2px', height: '24px', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length] + '40', marginLeft: '13px' }} />
                  <span style={{ fontSize: '11px', color: '#9e9e9e', filter: isLockedDay ? 'blur(3px)' : 'none' }}>🚶 {currentDay.spots[index + 1].walkTime}</span>
                  {!isLockedDay && <button onClick={() => openGoogleMaps(currentDay.spots[index + 1].name, selectedGuide.city)} style={{ background: '#e8f5e9', border: 'none', borderRadius: '12px', padding: '4px 10px', fontSize: '10px', color: '#2e7d32', cursor: 'pointer', fontWeight: '600', fontFamily: "'DM Sans', sans-serif" }}>📍 Directions</button>}
                </div>
              )}
            </div>
          ))}
          
          {/* Paywall Card for AI trips */}
          {isLockedDay && (
            <div style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', borderRadius: '18px', padding: '22px', marginTop: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '36px' }}>🔓</span>
              <h3 style={{ margin: '10px 0 6px', color: '#1b5e20', fontSize: '17px' }}>Unlock Full Plan</h3>
              <p style={{ margin: '0 0 14px', color: '#689f38', fontSize: '13px' }}>Get access to all {selectedGuide.days} days</p>
              <div style={{ background: 'white', borderRadius: '10px', padding: '10px', marginBottom: '14px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>✓ 7-day free trial</p>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#666' }}>✓ $4.99/mo or $3.74/mo annual</p>
              </div>
              <button onClick={() => setShowSubscriptionModal(true)} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Start Free Trial
              </button>
            </div>
          )}
        </div>

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div onClick={() => setShowSubscriptionModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '28px 22px', margin: '20px', maxWidth: '340px', width: '100%', textAlign: 'center' }}>
              <span style={{ fontSize: '44px' }}>✨</span>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1b5e20', margin: '14px 0 6px' }}>Unlock Premium</h2>
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
              <button style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Start 7-Day Free Trial
              </button>
              <p style={{ margin: '12px 0 0', fontSize: '11px', color: '#999' }}>Cancel anytime. No commitment.</p>
            </div>
          </div>
        )}

        {/* Spot Detail Modal */}
        {selectedSpot && (
          <div onClick={() => setSelectedSpot(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px 24px 0 0', width: '100%', maxHeight: '85vh', overflow: 'auto' }}>
              <button onClick={() => setSelectedSpot(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '18px', cursor: 'pointer', zIndex: 10 }}>✕</button>

              <div style={{ padding: '24px 20px 16px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1b5e20' }}>{selectedSpot.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <span style={{ color: '#ffc107', fontSize: '16px' }}>★★★★★</span>
                  <span style={{ fontWeight: '600', color: '#333' }}>{(SPOT_DETAILS[selectedSpot.name] || SPOT_DETAILS['default']).rating}</span>
                  <span style={{ color: '#999', fontSize: '13px' }}>({(SPOT_DETAILS[selectedSpot.name] || SPOT_DETAILS['default']).reviews.toLocaleString()})</span>
                </div>
                <span style={{ display: 'inline-block', marginTop: '8px', background: '#f1f8e9', color: '#2e7d32', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>🎯 {selectedSpot.type}</span>
              </div>

              <div style={{ margin: '0 20px', borderRadius: '16px', overflow: 'hidden', height: '160px', width: '160px' }}>
                <img src={selectedSpot.image?.replace('w=100', 'w=300').replace('h=100', 'h=300')} alt={selectedSpot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '600', color: '#333' }}>About this place</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{(SPOT_DETAILS[selectedSpot.name] || SPOT_DETAILS['default']).description}</p>
              </div>

              <div style={{ margin: '0 20px', background: '#fffde7', borderRadius: '16px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>💡 Community Notes</h3>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {(SPOT_DETAILS[selectedSpot.name] || SPOT_DETAILS['default']).tips.map((tip, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '8px', lineHeight: '1.4' }}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                  <span>📍</span>
                  <span style={{ fontSize: '14px', color: '#333' }}>{selectedSpot.city}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
                  <span>⏱️</span>
                  <span style={{ fontSize: '14px', color: '#333' }}>Recommended: {selectedSpot.duration}</span>
                </div>
              </div>

              <div style={{ padding: '16px 20px 32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button style={{ background: 'white', border: '2px solid #e0e0e0', borderRadius: '25px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'DM Sans', sans-serif" }}>🔖 Save</button>
                <button onClick={() => openGoogleMaps(selectedSpot.name, selectedSpot.city)} style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', border: 'none', borderRadius: '25px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'DM Sans', sans-serif" }}>🧭 Direction</button>
              </div>
            </div>
          </div>
        )}
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

export default App;