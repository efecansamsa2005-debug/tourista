import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xuaczwlwbsxoixosunzx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YWN6d2x3YnN4b2l4b3N1bnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODc1NjYsImV4cCI6MjA4MDg2MzU2Nn0.nfqRmFe0-1t_hDrPAc2oTO-y4UfbsEjen5sYbr1lYeE';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DAY_COLORS = [
  '#e53935', 
  '#1e88e5', 
  '#43a047', 
  '#fb8c00', 
  '#8e24aa', 
  '#00acc1', 
  '#d81b60'
];

const TRIP_CATEGORIES = [
  { id: 'popular', emoji: '📍', label: 'Popular' },
  { id: 'museum', emoji: '🏛️', label: 'Museum' },
  { id: 'nature', emoji: '🌿', label: 'Nature' },
  { id: 'foodie', emoji: '🍕', label: 'Foodie' },
  { id: 'history', emoji: '🏰', label: 'History' },
  { id: 'shopping', emoji: '🛍️', label: 'Shopping' }
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
          { name: 'Musée d Orsay', type: 'Museum', duration: '2 hours', walkTime: '15 min', lat: 48.8600, lng: 2.3266, image: 'https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?w=100&h=100&fit=crop' },
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
          { name: 'St Peters Basilica', type: 'Landmark', duration: '2 hours', walkTime: '5 min', lat: 41.9022, lng: 12.4539, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
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
          { name: 'Park Guell', type: 'Park', duration: '2 hours', walkTime: 'Bus', lat: 41.4145, lng: 2.1527, image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' },
          { name: 'Casa Batllo', type: 'Architecture', duration: '1.5 hours', walkTime: 'Metro', lat: 41.3916, lng: 2.1649, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
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
          { name: 'St Vitus Cathedral', type: 'Landmark', duration: '1 hour', walkTime: '2 min', lat: 50.0908, lng: 14.4003, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
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
// MAP COMPONENTS
// ============================================

const TripMap = ({ guide, selectedDay, onSpotClick }) => {
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
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

      // Clear existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Create map
      const map = L.map(mapRef.current).setView(guide.center, 13);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      }).addTo(map);

      // Add markers and routes for each day
      guide.itinerary.forEach((day, dayIndex) => {
        const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length];
        const coords = day.spots.map(spot => [spot.lat, spot.lng]);

        // Draw route line
        if (coords.length > 1) {
          L.polyline(coords, {
            color: dayColor,
            weight: 4,
            opacity: selectedDay === null || selectedDay === day.day ? 0.8 : 0.2,
            dashArray: selectedDay === day.day ? null : '5, 10'
          }).addTo(map);
        }

        // Add markers
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

          // Popup content
          const popupContent = `
            <div style="text-align: center; min-width: 120px;">
              <strong style="color: ${dayColor};">${spot.name}</strong><br/>
              <span style="color: #666; font-size: 11px;">Day ${day.day} • ${spot.type}</span>
            </div>
          `;
          marker.bindPopup(popupContent);

          marker.on('click', () => {
            if (onSpotClick) {
              onSpotClick(day.day, spotIndex);
            }
          });
        });
      });

      // Fit bounds to show all markers
      const allCoords = guide.itinerary.flatMap(day => 
        day.spots.map(spot => [spot.lat, spot.lng])
      );
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
  }, [guide, selectedDay, onSpotClick]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        borderRadius: '16px' 
      }} 
    />
  );
};

const MiniMap = ({ guides }) => {
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);

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

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false
      }).setView([30, 0], 1);

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

      // Add city markers
      guides.forEach((guide) => {
        const markerHtml = `
          <div style="
            background: #2e7d32;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `;

        const markerIcon = L.divIcon({
          className: 'mini-marker',
          html: markerHtml,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        L.marker(guide.center, { icon: markerIcon }).addTo(map);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [guides]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        borderRadius: '12px' 
      }} 
    />
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  // State
  const [screen, setScreen] = useState('auth');
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [myTrips, setMyTrips] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [newTripCity, setNewTripCity] = useState('');
  const [newTripPreferences, setNewTripPreferences] = useState([]);
  const [newTripDays, setNewTripDays] = useState(3);
  const [showAllDaysOnMap, setShowAllDaysOnMap] = useState(false);

  // Auth effect
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
    setScreen('auth');
  };

  // Helper functions
  const getTotalSpots = (guide) => {
    return guide.itinerary.reduce((sum, day) => sum + day.spots.length, 0);
  };

  const openGoogleMaps = (placeName, city) => {
    const query = encodeURIComponent(`${placeName}, ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const togglePreference = (id) => {
    setNewTripPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  // ============================================
  // AUTH SCREEN
  // ============================================
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
                {authError}
              </div>
            )}

            {/* Form */}
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
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>🧭</span>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '22px',
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
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', margin: 0 }}>
            Welcome, <strong>{currentUser?.email?.split('@')[0]}</strong>! 👋
          </p>
        </div>

        {/* Mini World Map */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            height: '120px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <MiniMap guides={TRAVEL_GUIDES} />
          </div>
        </div>

        {/* Explore Destinations */}
        <div style={{ padding: '24px 20px 16px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 16px 0'
          }}>
            🌍 Explore Destinations
          </h2>
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
                  setSelectedDay(1);
                  setShowAllDaysOnMap(false);
                  setScreen('guideDetail');
                }}
                style={{
                  minWidth: '140px',
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(46,125,50,0.1)'
                }}
              >
                <div style={{ height: '90px', position: 'relative' }}>
                  <img
                    src={guide.image}
                    alt={guide.city}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    color: '#2e7d32'
                  }}>
                    {guide.flag} {guide.city}
                  </div>
                </div>
                <div style={{ padding: '10px' }}>
                  <p style={{
                    margin: 0,
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#1b5e20'
                  }}>
                    {guide.title}
                  </p>
                  <p style={{
                    margin: '2px 0 0',
                    fontSize: '10px',
                    color: '#689f38'
                  }}>
                    {getTotalSpots(guide)} spots
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Trips */}
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
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px 20px',
              textAlign: 'center',
              border: '2px dashed #c8e6c9'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✈️</div>
              <h3 style={{ color: '#1b5e20', fontSize: '16px', margin: '0 0 8px' }}>
                No trips yet
              </h3>
              <p style={{ color: '#689f38', fontSize: '13px', margin: 0 }}>
                Save a destination to start!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myTrips.map((trip, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedGuide(trip);
                    setSelectedDay(1);
                    setShowAllDaysOnMap(false);
                    setScreen('guideDetail');
                  }}
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '14px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1b5e20'
                    }}>
                      {trip.title}
                    </p>
                    <p style={{
                      margin: '2px 0 0',
                      fontSize: '12px',
                      color: '#689f38'
                    }}>
                      {trip.days} days • {getTotalSpots(trip)} spots
                    </p>
                  </div>
                  <span style={{ color: '#4caf50' }}>→</span>
                </div>
              ))}
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
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <button style={{
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            🏠
          </button>
          <button
            onClick={() => setScreen('newTripCity')}
            style={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'white',
              marginTop: '-25px',
              boxShadow: '0 4px 15px rgba(46,125,50,0.4)'
            }}
          >
            +
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            🗺️
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // GUIDE DETAIL SCREEN WITH MAP
  // ============================================
  if (screen === 'guideDetail' && selectedGuide) {
    const currentDay = selectedGuide.itinerary.find(d => d.day === selectedDay) || selectedGuide.itinerary[0];

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setScreen('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>←</button>
          <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>{selectedGuide.flag} {selectedGuide.city}</h1>
          <button onClick={() => { if (!myTrips.find(t => t.id === selectedGuide.id)) setMyTrips(prev => [...prev, selectedGuide]); }} style={{ background: myTrips.find(t => t.id === selectedGuide.id) ? 'rgba(255,255,255,0.3)' : 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', color: myTrips.find(t => t.id === selectedGuide.id) ? 'white' : '#2e7d32', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            {myTrips.find(t => t.id === selectedGuide.id) ? '✓ Saved' : '💾 Save'}
          </button>
        </div>

        {/* Interactive Map */}
        <div style={{ height: '250px', margin: '16px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <TripMap guide={selectedGuide} selectedDay={showAllDaysOnMap ? null : selectedDay} onSpotClick={(day) => { setSelectedDay(day); setShowAllDaysOnMap(false); }} />
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
          <button onClick={() => setShowAllDaysOnMap(!showAllDaysOnMap)} style={{ marginLeft: 'auto', background: showAllDaysOnMap ? '#2e7d32' : '#e8f5e9', color: showAllDaysOnMap ? 'white' : '#2e7d32', border: 'none', borderRadius: '12px', padding: '4px 10px', fontSize: '10px', cursor: 'pointer', fontWeight: '600' }}>
            {showAllDaysOnMap ? '✓ All Days' : 'Show All'}
          </button>
        </div>

        {/* Trip Info Card */}
        <div style={{ background: 'white', margin: '8px 16px', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#1b5e20', fontWeight: '700' }}>{selectedGuide.title}</h2>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#689f38' }}>
            <span>📅 {selectedGuide.days} days</span>
            <span>📍 {getTotalSpots(selectedGuide)} spots</span>
          </div>
        </div>

        {/* Day Tabs */}
        <div style={{ display: 'flex', gap: '8px', padding: '8px 16px 16px', overflowX: 'auto' }}>
          {selectedGuide.itinerary.map((day, index) => (
            <button key={day.day} onClick={() => { setSelectedDay(day.day); setShowAllDaysOnMap(false); }} style={{ background: selectedDay === day.day ? DAY_COLORS[index % DAY_COLORS.length] : 'white', color: selectedDay === day.day ? 'white' : '#333', border: selectedDay === day.day ? 'none' : '2px solid #e0e0e0', padding: '10px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Day {day.day}
            </button>
          ))}
        </div>

        {/* Day Title */}
        <div style={{ padding: '0 16px 12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#1b5e20' }}>{currentDay.title}</h3>
        </div>

        {/* Spots List */}
        <div style={{ padding: '0 16px 100px' }}>
          {currentDay.spots.map((spot, index) => (
            <div key={index}>
              <div style={{ background: 'white', borderRadius: '14px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>{index + 1}</div>
                <div style={{ width: '55px', height: '55px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1b5e20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spot.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#689f38', background: '#f1f8e9', display: 'inline-block', padding: '2px 8px', borderRadius: '10px' }}>{spot.type}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9e9e9e' }}>⏱️ {spot.duration}</p>
                </div>
              </div>
              {index < currentDay.spots.length - 1 && currentDay.spots[index + 1].walkTime && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0 8px 14px', gap: '8px' }}>
                  <div style={{ width: '2px', height: '24px', background: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length] + '40', marginLeft: '13px' }} />
                  <span style={{ fontSize: '11px', color: '#9e9e9e' }}>🚶 {currentDay.spots[index + 1].walkTime}</span>
                  <button onClick={() => openGoogleMaps(currentDay.spots[index + 1].name, selectedGuide.city)} style={{ background: '#e8f5e9', border: 'none', borderRadius: '12px', padding: '4px 10px', fontSize: '10px', color: '#2e7d32', cursor: 'pointer', fontWeight: '600' }}>📍 Directions</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // NEW TRIP - CITY SELECTION
  // ============================================
  if (screen === 'newTripCity') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

        {/* Back Button */}
        <div style={{ padding: '20px' }}>
          <button
            onClick={() => setScreen('home')}
            style={{
              background: 'white',
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
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '50px' }}>🌍</span>
          </div>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            Where to next?
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#558b2f',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            Enter your destination
          </p>

          {/* Search Input */}
          <div style={{
            background: 'white',
            borderRadius: '14px',
            padding: '4px',
            boxShadow: '0 4px 15px rgba(46,125,50,0.15)'
          }}>
            <input
              type="text"
              value={newTripCity}
              onChange={(e) => setNewTripCity(e.target.value)}
              placeholder="Search city..."
              style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Popular Cities */}
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '12px', color: '#689f38', marginBottom: '10px' }}>
              Popular:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Paris', 'Tokyo', 'Rome', 'Istanbul', 'London'].map((city) => (
                <button
                  key={city}
                  onClick={() => setNewTripCity(city)}
                  style={{
                    background: newTripCity === city ? '#2e7d32' : 'white',
                    color: newTripCity === city ? 'white' : '#2e7d32',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    cursor: 'pointer'
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
              padding: '16px',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: newTripCity.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Continue →
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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f8e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

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
            <p style={{ margin: 0, fontSize: '12px', color: '#689f38' }}>
              Planning trip to
            </p>
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              color: '#1b5e20',
              fontWeight: '600'
            }}>
              📍 {newTripCity}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 8px 0'
          }}>
            What interests you?
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#689f38',
            margin: '0 0 20px 0'
          }}>
            Select all that apply
          </p>

          {/* Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
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
                  border: newTripPreferences.includes(cat.id)
                    ? 'none'
                    : '2px solid #e8f5e9',
                  padding: '18px 14px',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '24px' }}>{cat.emoji}</span>
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
              padding: '16px',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
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
    const createNewTrip = () => {
      const newTrip = {
        id: 'custom-' + Date.now(),
        city: newTripCity,
        country: 'Custom',
        flag: '📍',
        title: `${newTripDays}-Day ${newTripCity} Trip`,
        days: newTripDays,
        center: [48.8566, 2.3522],
        image: `https://source.unsplash.com/400x300/?${encodeURIComponent(newTripCity)},city`,
        itinerary: [{
          day: 1,
          title: 'Day 1',
          spots: [{
            name: 'Start exploring!',
            type: 'Activity',
            duration: 'All day',
            walkTime: null,
            lat: 48.8566,
            lng: 2.3522,
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop'
          }]
        }]
      };

      setMyTrips(prev => [...prev, newTrip]);
      setNewTripCity('');
      setNewTripPreferences([]);
      setNewTripDays(3);
      setScreen('home');
    };

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #e8f5e9 100%)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

        {/* Back Button */}
        <div style={{ padding: '20px' }}>
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
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#1b5e20',
            margin: '0 0 30px 0'
          }}>
            How many days?
          </h1>

          {/* Day Picker */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => setNewTripDays(day)}
                style={{
                  background: newTripDays === day
                    ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)'
                    : 'transparent',
                  border: 'none',
                  padding: newTripDays === day ? '14px 45px' : '6px 25px',
                  borderRadius: '14px',
                  fontSize: newTripDays === day ? '38px' : '24px',
                  fontWeight: '700',
                  color: newTripDays === day ? 'white' : '#c8e6c9',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div style={{ padding: '20px' }}>
          <button
            onClick={createNewTrip}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ✓ Create Trip
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // LOADING / DEFAULT SCREEN
  // ============================================
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