import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xuaczwlwbsxoixosunzx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YWN6d2x3YnN4b2l4b3N1bnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODc1NjYsImV4cCI6MjA4MDg2MzU2Nn0.nfqRmFe0-1t_hDrPAc2oTO-y4UfbsEjen5sYbr1lYeE';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const TRAVEL_GUIDES = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    title: '3-Day Paris Trip',
    days: 3,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Iconic Paris', spots: [
        { name: 'Eiffel Tower', type: 'Landmark', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=100&h=100&fit=crop' },
        { name: 'Champ de Mars', type: 'Park', duration: '30 min', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=100&h=100&fit=crop' },
        { name: 'Arc de Triomphe', type: 'Landmark', duration: '1 hour', walkTime: '25 min • 2km', image: 'https://images.unsplash.com/photo-1518805208834-71ae392e0804?w=100&h=100&fit=crop' },
        { name: 'Champs-Élysées', type: 'Shopping', duration: '2 hours', walkTime: '2 min • 150m', image: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=100&h=100&fit=crop' },
        { name: 'Place de la Concorde', type: 'Square', duration: '30 min', walkTime: '15 min • 1.2km', image: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Art & Culture', spots: [
        { name: 'Louvre Museum', type: 'Museum', duration: '4 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1499426600726-7f1e2d5c39ce?w=100&h=100&fit=crop' },
        { name: 'Tuileries Garden', type: 'Park', duration: '1 hour', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=100&h=100&fit=crop' },
        { name: "Musée d'Orsay", type: 'Museum', duration: '2 hours', walkTime: '15 min • 1.1km', image: 'https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?w=100&h=100&fit=crop' },
        { name: 'Notre-Dame', type: 'Landmark', duration: '1 hour', walkTime: '12 min • 900m', image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=100&h=100&fit=crop' },
        { name: 'Latin Quarter', type: 'Neighborhood', duration: '2 hours', walkTime: '5 min • 350m', image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Montmartre & Le Marais', spots: [
        { name: 'Sacré-Cœur', type: 'Landmark', duration: '1 hour', walkTime: null, image: 'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?w=100&h=100&fit=crop' },
        { name: 'Montmartre', type: 'Neighborhood', duration: '2 hours', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&h=100&fit=crop' },
        { name: 'Moulin Rouge', type: 'Entertainment', duration: '30 min', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?w=100&h=100&fit=crop' },
        { name: 'Le Marais', type: 'Neighborhood', duration: '2 hours', walkTime: '20 min • Metro', image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=100&h=100&fit=crop' },
        { name: 'Seine River Cruise', type: 'Activity', duration: '1 hour', walkTime: '15 min • 1.2km', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'rome',
    city: 'Rome',
    country: 'Italy',
    flag: '🇮🇹',
    title: '3-Day Rome Trip',
    days: 3,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Ancient Rome', spots: [
        { name: 'Colosseum', type: 'Landmark', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=100&h=100&fit=crop' },
        { name: 'Roman Forum', type: 'History', duration: '2 hours', walkTime: '5 min • 350m', image: 'https://images.unsplash.com/photo-1555992828-017f4f3b9859?w=100&h=100&fit=crop' },
        { name: 'Palatine Hill', type: 'History', duration: '1.5 hours', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
        { name: 'Piazza Venezia', type: 'Square', duration: '30 min', walkTime: '10 min • 700m', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Vatican City', spots: [
        { name: 'Vatican Museums', type: 'Museum', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=100&h=100&fit=crop' },
        { name: 'Sistine Chapel', type: 'Art', duration: '1 hour', walkTime: '2 min • Inside', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop' },
        { name: "St. Peter's Basilica", type: 'Landmark', duration: '2 hours', walkTime: '5 min • 300m', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
        { name: 'Castel Sant Angelo', type: 'History', duration: '1.5 hours', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Fountains & Piazzas', spots: [
        { name: 'Trevi Fountain', type: 'Landmark', duration: '45 min', walkTime: null, image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=100&h=100&fit=crop' },
        { name: 'Spanish Steps', type: 'Landmark', duration: '30 min', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=100&h=100&fit=crop' },
        { name: 'Pantheon', type: 'Landmark', duration: '1 hour', walkTime: '10 min • 700m', image: 'https://images.unsplash.com/photo-1548585744-2b76a8c73426?w=100&h=100&fit=crop' },
        { name: 'Piazza Navona', type: 'Square', duration: '45 min', walkTime: '5 min • 350m', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=100&h=100&fit=crop' },
        { name: 'Trastevere', type: 'Neighborhood', duration: '2 hours', walkTime: '15 min • 1.1km', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    flag: '🇬🇧',
    title: '3-Day London Trip',
    days: 3,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Royal London', spots: [
        { name: 'Buckingham Palace', type: 'Landmark', duration: '1.5 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=100&h=100&fit=crop' },
        { name: 'Westminster Abbey', type: 'Landmark', duration: '1.5 hours', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=100&h=100&fit=crop' },
        { name: 'Big Ben', type: 'Landmark', duration: '30 min', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=100&fit=crop' },
        { name: 'London Eye', type: 'Attraction', duration: '1 hour', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Museums & Culture', spots: [
        { name: 'British Museum', type: 'Museum', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=100&h=100&fit=crop' },
        { name: 'Covent Garden', type: 'Shopping', duration: '1.5 hours', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1534695215921-52f8a19e7909?w=100&h=100&fit=crop' },
        { name: 'National Gallery', type: 'Museum', duration: '2 hours', walkTime: '8 min • 600m', image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=100&h=100&fit=crop' },
        { name: 'Trafalgar Square', type: 'Square', duration: '30 min', walkTime: '1 min • 50m', image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Tower & Markets', spots: [
        { name: 'Tower of London', type: 'History', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=100&fit=crop' },
        { name: 'Tower Bridge', type: 'Landmark', duration: '1 hour', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=100&h=100&fit=crop' },
        { name: 'Borough Market', type: 'Market', duration: '1.5 hours', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1534695215921-52f8a19e7909?w=100&h=100&fit=crop' },
        { name: 'Tate Modern', type: 'Museum', duration: '2 hours', walkTime: '8 min • 600m', image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    flag: '🇪🇸',
    title: '2-Day Barcelona Trip',
    days: 2,
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Gaudí Masterpieces', spots: [
        { name: 'Sagrada Família', type: 'Landmark', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
        { name: 'Park Güell', type: 'Park', duration: '2 hours', walkTime: '25 min • Bus', image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' },
        { name: 'Casa Batlló', type: 'Architecture', duration: '1.5 hours', walkTime: '20 min • Metro', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
        { name: 'La Pedrera', type: 'Architecture', duration: '1.5 hours', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Gothic & Beach', spots: [
        { name: 'Gothic Quarter', type: 'Neighborhood', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
        { name: 'La Rambla', type: 'Street', duration: '1.5 hours', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' },
        { name: 'La Boqueria Market', type: 'Market', duration: '1 hour', walkTime: '2 min • 100m', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop' },
        { name: 'Barceloneta Beach', type: 'Beach', duration: '2 hours', walkTime: '15 min • 1.2km', image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    title: '2-Day Amsterdam Trip',
    days: 2,
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Museums & Canals', spots: [
        { name: 'Rijksmuseum', type: 'Museum', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
        { name: 'Van Gogh Museum', type: 'Museum', duration: '2 hours', walkTime: '5 min • 350m', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
        { name: 'Vondelpark', type: 'Park', duration: '1 hour', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
        { name: 'Canal Cruise', type: 'Activity', duration: '1 hour', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Historic Center', spots: [
        { name: 'Anne Frank House', type: 'Museum', duration: '1.5 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
        { name: 'Dam Square', type: 'Square', duration: '30 min', walkTime: '8 min • 600m', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
        { name: 'Royal Palace', type: 'Landmark', duration: '1 hour', walkTime: '1 min • 50m', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' },
        { name: 'Jordaan', type: 'Neighborhood', duration: '2 hours', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    flag: '🇹🇷',
    title: '3-Day Istanbul Trip',
    days: 3,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Sultanahmet', spots: [
        { name: 'Hagia Sophia', type: 'Landmark', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Blue Mosque', type: 'Landmark', duration: '1 hour', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Topkapi Palace', type: 'Museum', duration: '3 hours', walkTime: '8 min • 600m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Basilica Cistern', type: 'History', duration: '1 hour', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Bazaars & Bosphorus', spots: [
        { name: 'Grand Bazaar', type: 'Market', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Spice Bazaar', type: 'Market', duration: '1 hour', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Galata Bridge', type: 'Landmark', duration: '30 min', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Bosphorus Cruise', type: 'Activity', duration: '2 hours', walkTime: '3 min • 200m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Modern Istanbul', spots: [
        { name: 'Galata Tower', type: 'Landmark', duration: '1 hour', walkTime: null, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'İstiklal Avenue', type: 'Shopping', duration: '2 hours', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Taksim Square', type: 'Square', duration: '30 min', walkTime: '10 min • 1.4km', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' },
        { name: 'Dolmabahçe Palace', type: 'Museum', duration: '2 hours', walkTime: '15 min • 1.8km', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'prague',
    city: 'Prague',
    country: 'Czech Republic',
    flag: '🇨🇿',
    title: '2-Day Prague Trip',
    days: 2,
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Old Town', spots: [
        { name: 'Old Town Square', type: 'Square', duration: '1 hour', walkTime: null, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
        { name: 'Astronomical Clock', type: 'Landmark', duration: '30 min', walkTime: '1 min • 50m', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
        { name: 'Charles Bridge', type: 'Landmark', duration: '1 hour', walkTime: '8 min • 600m', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
        { name: 'Jewish Quarter', type: 'Neighborhood', duration: '2 hours', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Castle District', spots: [
        { name: 'Prague Castle', type: 'Landmark', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
        { name: 'St. Vitus Cathedral', type: 'Landmark', duration: '1 hour', walkTime: '2 min • Inside', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
        { name: 'Golden Lane', type: 'History', duration: '45 min', walkTime: '5 min • 300m', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' },
        { name: 'Petřín Hill', type: 'Park', duration: '1.5 hours', walkTime: '15 min • 1km', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'newyork',
    city: 'New York',
    country: 'USA',
    flag: '🇺🇸',
    title: '4-Day NYC Trip',
    days: 4,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Downtown Manhattan', spots: [
        { name: 'Statue of Liberty', type: 'Landmark', duration: '4 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Ellis Island', type: 'Museum', duration: '2 hours', walkTime: 'Ferry', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: '9/11 Memorial', type: 'Memorial', duration: '1.5 hours', walkTime: '15 min • Ferry', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Wall Street', type: 'Landmark', duration: '30 min', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Midtown', spots: [
        { name: 'Empire State Building', type: 'Landmark', duration: '1.5 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Times Square', type: 'Square', duration: '1 hour', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Grand Central', type: 'Landmark', duration: '45 min', walkTime: '8 min • 600m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Rockefeller Center', type: 'Landmark', duration: '1 hour', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Broadway Show', type: 'Entertainment', duration: '3 hours', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Central Park & Museums', spots: [
        { name: 'Central Park', type: 'Park', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Met Museum', type: 'Museum', duration: '3 hours', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Natural History Museum', type: 'Museum', duration: '2 hours', walkTime: '20 min • 1.5km', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
      ]},
      { day: 4, title: 'Brooklyn', spots: [
        { name: 'Brooklyn Bridge', type: 'Landmark', duration: '1 hour', walkTime: null, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'DUMBO', type: 'Neighborhood', duration: '1.5 hours', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'Williamsburg', type: 'Neighborhood', duration: '2 hours', walkTime: '15 min • Metro', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { name: 'High Line', type: 'Park', duration: '1.5 hours', walkTime: '20 min • Metro', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'losangeles',
    city: 'Los Angeles',
    country: 'USA',
    flag: '🇺🇸',
    title: '3-Day LA Trip',
    days: 3,
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Hollywood', spots: [
        { name: 'Hollywood Sign', type: 'Landmark', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Walk of Fame', type: 'Landmark', duration: '1 hour', walkTime: '15 min • Drive', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'TCL Chinese Theatre', type: 'Landmark', duration: '30 min', walkTime: '2 min • 100m', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Griffith Observatory', type: 'Viewpoint', duration: '2 hours', walkTime: '15 min • Drive', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Beaches', spots: [
        { name: 'Santa Monica Pier', type: 'Landmark', duration: '2 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Venice Beach', type: 'Beach', duration: '2 hours', walkTime: '15 min • 1.2km', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Venice Canals', type: 'Neighborhood', duration: '1 hour', walkTime: '10 min • 800m', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Malibu', type: 'Beach', duration: '3 hours', walkTime: '30 min • Drive', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Culture & Shopping', spots: [
        { name: 'The Getty Center', type: 'Museum', duration: '3 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Beverly Hills', type: 'Neighborhood', duration: '1.5 hours', walkTime: '15 min • Drive', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'Rodeo Drive', type: 'Shopping', duration: '1 hour', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' },
        { name: 'The Grove', type: 'Shopping', duration: '1.5 hours', walkTime: '10 min • Drive', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=100&h=100&fit=crop' }
      ]}
    ]
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    title: '4-Day Tokyo Trip',
    days: 4,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    itinerary: [
      { day: 1, title: 'Traditional Tokyo', spots: [
        { name: 'Senso-ji Temple', type: 'Temple', duration: '1.5 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Nakamise Street', type: 'Shopping', duration: '1 hour', walkTime: '1 min • 50m', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Tokyo Skytree', type: 'Viewpoint', duration: '1.5 hours', walkTime: '15 min • 1.2km', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Meiji Shrine', type: 'Shrine', duration: '1 hour', walkTime: '30 min • Metro', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
      ]},
      { day: 2, title: 'Modern Tokyo', spots: [
        { name: 'Shibuya Crossing', type: 'Landmark', duration: '30 min', walkTime: null, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Harajuku', type: 'Neighborhood', duration: '2 hours', walkTime: '15 min • 1.2km', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Shinjuku', type: 'Neighborhood', duration: '2 hours', walkTime: '20 min • Metro', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Golden Gai', type: 'Nightlife', duration: '2 hours', walkTime: '5 min • 400m', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
      ]},
      { day: 3, title: 'Culture & Food', spots: [
        { name: 'Tsukiji Market', type: 'Market', duration: '1.5 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Imperial Palace', type: 'Landmark', duration: '1.5 hours', walkTime: '15 min • Metro', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Akihabara', type: 'Neighborhood', duration: '2 hours', walkTime: '10 min • Metro', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'TeamLab Planets', type: 'Museum', duration: '2.5 hours', walkTime: '25 min • Metro', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
      ]},
      { day: 4, title: 'Day Trip to Mt. Fuji', spots: [
        { name: 'Mt. Fuji View', type: 'Nature', duration: '4 hours', walkTime: null, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Lake Kawaguchi', type: 'Nature', duration: '2 hours', walkTime: '10 min • Bus', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
        { name: 'Onsen Experience', type: 'Spa', duration: '2 hours', walkTime: '15 min • Bus', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' }
      ]}
    ]
  }
];

const TRIP_CATEGORIES = [
  { id: 'popular', emoji: '📍', label: 'Popular' },
  { id: 'museum', emoji: '🏛️', label: 'Museum' },
  { id: 'nature', emoji: '🌿', label: 'Nature' },
  { id: 'foodie', emoji: '🍕', label: 'Foodie' },
  { id: 'history', emoji: '🏰', label: 'History' },
  { id: 'shopping', emoji: '🛍️', label: 'Shopping' }
];

function App() {
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

  const getTotalSpots = (guide) => guide.itinerary.reduce((sum, day) => sum + day.spots.length, 0);

  const openGoogleMaps = (placeName, city) => {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(placeName + ', ' + city), '_blank');
  };

  const togglePreference = (id) => {
    setNewTripPreferences(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // AUTH SCREEN
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
            <button onClick={authMode === 'login' ? handleLogin : handleSignup} disabled={authLoading} style={{ width: '100%', background: authLoading ? '#a5d6a7' : 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: '600', cursor: authLoading ? 'not-allowed' : 'pointer', marginTop: '20px', fontFamily: "'DM Sans', sans-serif" }}>{authLoading ? 'Please wait...' : (authMode === 'login' ? 'Log In' : 'Create Account')}</button>
          </div>
        </div>
      </div>
    );
  }

  // HOME SCREEN
  if (screen === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f1f8e9 0%, #ffffff 100%)', fontFamily: "'DM Sans', sans-serif", paddingBottom: '100px' }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '20px', borderRadius: '0 0 30px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>🧭</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>TOURISTA</h1>
            </div>
            <div onClick={handleLogout} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', cursor: 'pointer' }}>{currentUser?.email?.charAt(0).toUpperCase()}</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', margin: 0 }}>Welcome, <strong>{currentUser?.email?.split('@')[0]}</strong>! 👋</p>
        </div>
        <div style={{ padding: '24px 20px 16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', margin: '0 0 16px 0' }}>🌍 Explore Destinations</h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', marginRight: '-20px', paddingRight: '20px' }}>
            {TRAVEL_GUIDES.map((guide) => (
              <div key={guide.id} onClick={() => { setSelectedGuide(guide); setSelectedDay(1); setScreen('guideDetail'); }} style={{ minWidth: '140px', background: 'white', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(46,125,50,0.1)' }}>
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
        <div style={{ padding: '0 20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', margin: '0 0 16px 0' }}>🗂️ My Trips</h2>
          {myTrips.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px 20px', textAlign: 'center', border: '2px dashed #c8e6c9' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✈️</div>
              <h3 style={{ color: '#1b5e20', fontSize: '16px', margin: '0 0 8px' }}>No trips yet</h3>
              <p style={{ color: '#689f38', fontSize: '13px', margin: '0 0 20px' }}>Save a destination to start!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myTrips.map((trip, index) => (
                <div key={index} onClick={() => { setSelectedGuide(trip); setSelectedDay(1); setScreen('guideDetail'); }} style={{ background: 'white', borderRadius: '14px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden' }}><img src={trip.image} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1b5e20' }}>{trip.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#689f38' }}>{trip.days} days • {getTotalSpots(trip)} spots</p>
                  </div>
                  <span style={{ color: '#4caf50' }}>→</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', background: 'white', borderRadius: '20px', padding: '10px 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <button style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '8px' }}>🏠</button>
          <button onClick={() => setScreen('newTripCity')} style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer', color: 'white', marginTop: '-25px', boxShadow: '0 4px 15px rgba(46,125,50,0.4)' }}>+</button>
          <button style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '8px' }}>🗺️</button>
        </div>
      </div>
    );
  }

  // GUIDE DETAIL SCREEN
  if (screen === 'guideDetail' && selectedGuide) {
    const currentDay = selectedGuide.itinerary.find(d => d.day === selectedDay) || selectedGuide.itinerary[0];
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <div style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setScreen('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '16px' }}>←</button>
          <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>{selectedGuide.flag} {selectedGuide.city}</h1>
          <button onClick={() => { if (!myTrips.find(t => t.id === selectedGuide.id)) setMyTrips(prev => [...prev, selectedGuide]); }} style={{ background: myTrips.find(t => t.id === selectedGuide.id) ? 'rgba(255,255,255,0.3)' : 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', color: myTrips.find(t => t.id === selectedGuide.id) ? 'white' : '#2e7d32', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>{myTrips.find(t => t.id === selectedGuide.id) ? '✓ Saved' : '💾 Save'}</button>
        </div>
        <div style={{ background: 'white', margin: '16px', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#1b5e20', fontWeight: '700' }}>{selectedGuide.title}</h2>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#689f38' }}>
            <span>📅 {selectedGuide.days} days</span>
            <span>📍 {getTotalSpots(selectedGuide)} spots</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px', overflowX: 'auto' }}>
          {selectedGuide.itinerary.map((day) => (
            <button key={day.day} onClick={() => setSelectedDay(day.day)} style={{ background: selectedDay === day.day ? '#2e7d32' : 'white', color: selectedDay === day.day ? 'white' : '#2e7d32', border: selectedDay === day.day ? 'none' : '2px solid #c8e6c9', padding: '10px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>Day {day.day}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px 12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#1b5e20' }}>{currentDay.title}</h3>
        </div>
        <div style={{ padding: '0 16px 100px' }}>
          {currentDay.spots.map((spot, index) => (
            <div key={index}>
              <div style={{ background: 'white', borderRadius: '14px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2e7d32', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>{index + 1}</div>
                <div style={{ width: '55px', height: '55px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}><img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1b5e20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spot.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#689f38', background: '#f1f8e9', display: 'inline-block', padding: '2px 8px', borderRadius: '10px' }}>{spot.type}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9e9e9e' }}>⏱️ {spot.duration}</p>
                </div>
              </div>
              {index < currentDay.spots.length - 1 && currentDay.spots[index + 1].walkTime && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0 8px 14px', gap: '8px' }}>
                  <div style={{ width: '2px', height: '24px', background: '#c8e6c9', marginLeft: '13px' }} />
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

  // NEW TRIP - CITY
  if (screen === 'newTripCity') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <div style={{ padding: '20px' }}>
          <button onClick={() => setScreen('home')} style={{ background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer' }}>←</button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}><span style={{ fontSize: '50px' }}>🌍</span></div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1b5e20', margin: '0 0 8px 0', textAlign: 'center' }}>Where to next?</h1>
          <p style={{ fontSize: '14px', color: '#558b2f', margin: '0 0 24px 0', textAlign: 'center' }}>Enter your destination</p>
          <div style={{ background: 'white', borderRadius: '14px', padding: '4px', boxShadow: '0 4px 15px rgba(46,125,50,0.15)' }}>
            <input type="text" value={newTripCity} onChange={(e) => setNewTripCity(e.target.value)} placeholder="Search city..." style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '12px', color: '#689f38', marginBottom: '10px' }}>Popular:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Paris', 'Tokyo', 'Rome', 'Istanbul', 'London'].map((city) => (
                <button key={city} onClick={() => setNewTripCity(city)} style={{ background: newTripCity === city ? '#2e7d32' : 'white', color: newTripCity === city ? 'white' : '#2e7d32', border: 'none', padding: '8px 14px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer' }}>{city}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <button onClick={() => newTripCity.trim() && setScreen('newTripPreferences')} disabled={!newTripCity.trim()} style={{ width: '100%', background: newTripCity.trim() ? 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)' : '#c8e6c9', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: newTripCity.trim() ? 'pointer' : 'not-allowed' }}>Continue →</button>
        </div>
      </div>
    );
  }

  // NEW TRIP - PREFERENCES
  if (screen === 'newTripPreferences') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #f1f8e9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setScreen('newTripCity')} style={{ background: '#f1f8e9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer' }}>←</button>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#689f38' }}>Planning trip to</p>
            <h2 style={{ margin: 0, fontSize: '16px', color: '#1b5e20', fontWeight: '600' }}>📍 {newTripCity}</h2>
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1b5e20', margin: '0 0 8px 0' }}>What interests you?</h1>
          <p style={{ fontSize: '13px', color: '#689f38', margin: '0 0 20px 0' }}>Select all that apply</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {TRIP_CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => togglePreference(cat.id)} style={{ background: newTripPreferences.includes(cat.id) ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' : 'white', color: newTripPreferences.includes(cat.id) ? 'white' : '#1b5e20', border: newTripPreferences.includes(cat.id) ? 'none' : '2px solid #e8f5e9', padding: '18px 14px', borderRadius: '14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '24px' }}>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setScreen('newTripDuration')} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Continue →</button>
        </div>
      </div>
    );
  }

  // NEW TRIP - DURATION
  if (screen === 'newTripDuration') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #e8f5e9 100%)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <div style={{ padding: '20px' }}>
          <button onClick={() => setScreen('newTripPreferences')} style={{ background: '#f1f8e9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer' }}>←</button>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1b5e20', margin: '0 0 30px 0' }}>How many days?</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button key={day} onClick={() => setNewTripDays(day)} style={{ background: newTripDays === day ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' : 'transparent', border: 'none', padding: newTripDays === day ? '14px 45px' : '6px 25px', borderRadius: '14px', fontSize: newTripDays === day ? '38px' : '24px', fontWeight: '700', color: newTripDays === day ? 'white' : '#c8e6c9', cursor: 'pointer', transition: 'all 0.2s ease' }}>{day}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <button onClick={() => { const newTrip = { id: 'custom-' + Date.now(), city: newTripCity, country: 'Custom', flag: '📍', title: newTripDays + '-Day ' + newTripCity + ' Trip', days: newTripDays, image: 'https://source.unsplash.com/400x300/?' + encodeURIComponent(newTripCity) + ',city', itinerary: [{ day: 1, title: 'Day 1', spots: [{ name: 'Start exploring!', type: 'Activity', duration: 'All day', walkTime: null, image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop' }] }] }; setMyTrips(prev => [...prev, newTrip]); setNewTripCity(''); setNewTripPreferences([]); setNewTripDays(3); setScreen('home'); }} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>✓ Create Trip</button>
        </div>
      </div>
    );
  }

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