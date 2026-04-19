export const CLINICS = [
  {
    id: 1,
    name: 'Kacyiru Health Centre',
    district: 'Gasabo',
    location: 'Kacyiru, Kigali',
    insurance: ['RSSB', 'MMI', 'RAMA'],
    careTypes: ['Mental Health', 'SRH', 'General'],
    phone: '+250 788 000 001',
    hours: 'Mon–Fri 7:30–17:00',
    distance: '1.2 km',
    rating: 4.6,
  },
  {
    id: 2,
    name: 'CHUK (KUTH)',
    district: 'Nyarugenge',
    location: 'Kigali City Centre',
    insurance: ['RSSB', 'MMI', 'RAMA', 'Equity'],
    careTypes: ['Mental Health', 'SRH', 'Emergency', 'General'],
    phone: '+250 788 000 002',
    hours: '24 hours',
    distance: '3.5 km',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Remera Health Post',
    district: 'Gasabo',
    location: 'Remera, Kigali',
    insurance: ['RSSB', 'Mutuelle de Santé'],
    careTypes: ['SRH', 'General', 'Maternal Health'],
    phone: '+250 788 000 003',
    hours: 'Mon–Sat 7:00–18:00',
    distance: '0.8 km',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'King Faisal Hospital',
    district: 'Gasabo',
    location: 'Kacyiru, Kigali',
    insurance: ['MMI', 'RAMA', 'Equity', 'UAP'],
    careTypes: ['Mental Health', 'SRH', 'Emergency', 'General', 'Specialist'],
    phone: '+250 788 000 004',
    hours: '24 hours',
    distance: '2.1 km',
    rating: 4.9,
  },
]

export const DRUGS = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    available: true,
    locations: ['Kacyiru Health Centre', 'Remera Health Post', 'CHUK'],
    price: '800 RWF',
    prescription: false,
  },
  {
    id: 2,
    name: 'Sertraline 50mg',
    category: 'Antidepressant',
    available: true,
    locations: ['CHUK (KUTH)', 'King Faisal Hospital'],
    price: '2,500 RWF',
    prescription: true,
  },
  {
    id: 3,
    name: 'Oral Contraceptive Pills',
    category: 'SRH',
    available: true,
    locations: ['Remera Health Post', 'Kacyiru Health Centre', 'CHUK'],
    price: '300 RWF',
    prescription: false,
  },
  {
    id: 4,
    name: 'Paracetamol 500mg',
    category: 'Analgesic',
    available: true,
    locations: ['Kacyiru Health Centre', 'Remera Health Post', 'CHUK', 'King Faisal'],
    price: '200 RWF',
    prescription: false,
  },
  {
    id: 5,
    name: 'Fluoxetine 20mg',
    category: 'Antidepressant',
    available: false,
    locations: [],
    price: '3,200 RWF',
    prescription: true,
  },
  {
    id: 6,
    name: 'Emergency Contraception',
    category: 'SRH',
    available: true,
    locations: ['Kacyiru Health Centre', 'CHUK'],
    price: '1,500 RWF',
    prescription: false,
  },
]

export const STORIES = [
  {
    id: 1,
    name: 'Amina K.',
    age: 22,
    title: 'From silence to speaking up',
    excerpt:
      'I thought no one would understand what I was going through. e-Urubohero gave me words for my pain and showed me I was not alone.',
    category: 'Mental Health',
    image: null,
  },
  {
    id: 2,
    name: 'Jean-Paul M.',
    age: 19,
    title: 'Finding courage through community',
    excerpt:
      'After losing my scholarship I felt like giving up. The mentors here helped me rebuild my path and apply for another opportunity.',
    category: 'Recovery',
    image: null,
  },
  {
    id: 3,
    name: 'Claudine U.',
    age: 24,
    title: 'Taking care of myself was not selfish',
    excerpt:
      'I used to ignore my health to focus on my family. Now I understand: you cannot pour from an empty cup.',
    category: 'Wellness',
    image: null,
  },
]

export const OPPORTUNITIES = [
  { id: 1, title: 'Mastercard Foundation Scholars', type: 'Scholarship', deadline: '2026-06-01' },
  { id: 2, title: 'ARED Youth Digital Skills', type: 'Training', deadline: '2026-05-15' },
  { id: 3, title: 'Imbuto Foundation Mentorship', type: 'Mentorship', deadline: 'Rolling' },
  { id: 4, title: 'UR Innovation Challenge', type: 'Competition', deadline: '2026-05-30' },
]

export const INSURANCE_OPTIONS = ['RSSB', 'MMI', 'RAMA', 'Mutuelle de Santé', 'Equity', 'UAP', 'None']

export const CARE_TYPES = ['Mental Health', 'SRH', 'General', 'Emergency', 'Maternal Health', 'Specialist']
