import { useState } from 'react'
import { MapPin, Phone, Clock, Star, ChevronDown, Search, Navigation } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { CLINICS, INSURANCE_OPTIONS, CARE_TYPES } from '../data/mockData'

function ClinicCard({ clinic, rank }) {
  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: '16px',
      border: '1px solid #eef0f2', marginBottom: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      {/* Row 1: rank + name + distance */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: rank === 1 ? '#2D6A4F' : '#F0F4F1',
          color: rank === 1 ? 'white' : '#264653',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 14,
        }}>{rank}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#264653', fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{clinic.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
            <MapPin size={11} color="#9ca3af" />
            <span style={{ color: '#9ca3af', fontSize: 12 }}>{clinic.location}</span>
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            background: '#D8F3DC', color: '#2D6A4F', fontSize: 11, fontWeight: 700,
            borderRadius: 20, padding: '3px 10px',
          }}>{clinic.distance}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 4 }}>
            <Star size={10} color="#E9C46A" fill="#E9C46A" />
            <span style={{ color: '#264653', fontSize: 11, fontWeight: 600 }}>{clinic.rating}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Hours + Phone */}
      <div style={{
        display: 'flex', gap: 16, padding: '10px 12px',
        background: '#F8F8F8', borderRadius: 10, marginBottom: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={12} color="#9ca3af" />
          <span style={{ color: '#6b7280', fontSize: 12 }}>{clinic.hours}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Phone size={12} color="#9ca3af" />
          <span style={{ color: '#6b7280', fontSize: 12 }}>{clinic.phone}</span>
        </div>
      </div>

      {/* Row 3: Care types */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {clinic.careTypes.map((ct) => (
          <span key={ct} style={{
            background: '#FEF3E2', color: '#8B5E3C',
            fontSize: 11, fontWeight: 500, borderRadius: 20, padding: '3px 10px',
          }}>{ct}</span>
        ))}
      </div>

      {/* Row 4: Insurance */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {clinic.insurance.map((ins) => (
          <span key={ins} style={{
            background: '#D8F3DC', color: '#2D6A4F',
            fontSize: 11, fontWeight: 600, borderRadius: 20, padding: '3px 10px',
          }}>{ins}</span>
        ))}
      </div>

      <button style={{
        width: '100%', height: 42, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
        color: 'white', fontWeight: 700, fontSize: 13,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: '0 3px 10px rgba(45,106,79,0.22)',
      }}>
        <Navigation size={14} /> Get Directions
      </button>
    </div>
  )
}

function Field({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label style={{ display: 'block', color: '#264653', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', appearance: 'none',
            padding: '11px 34px 11px 13px',
            background: '#F8F4EF', border: '1.5px solid #ddeee5',
            borderRadius: 12, fontSize: 13, color: value ? '#264653' : '#9ca3af',
            outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} color="#9ca3af" style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}

export default function CareNavigatorScreen() {
  const { userLocation, selectedInsurance, selectedCareType, setLocation, setInsurance, setCareType } = useAppStore()
  const [results, setResults] = useState(null)

  function search() {
    let r = CLINICS
    if (selectedInsurance) r = r.filter((c) => c.insurance.includes(selectedInsurance))
    if (selectedCareType) r = r.filter((c) => c.careTypes.includes(selectedCareType))
    setResults(r)
  }

  return (
    <div style={{ background: '#F8F4EF' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1B4332, #2D6A4F)',
        padding: '52px 22px 32px',
      }}>
        <p style={{ color: '#52B788', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
          SMART CARE NAVIGATOR
        </p>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Find Your Clinic</h1>
        <p style={{ color: '#95C4A1', fontSize: 13 }}>Matched to your insurance and needs</p>
      </div>

      <div style={{ padding: '0 16px 32px', marginTop: -18 }}>

        {/* Filter card */}
        <div style={{
          background: 'white', borderRadius: 18, padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 20,
        }}>
          {/* Location */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', color: '#264653', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              Your Location
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kacyiru, Gasabo, Kigali…"
                style={{
                  width: '100%', padding: '11px 13px 11px 38px',
                  background: '#F8F4EF', border: '1.5px solid #ddeee5',
                  borderRadius: 12, fontSize: 13, color: '#264653',
                  outline: 'none', fontFamily: 'inherit',
                }}
              />
              <MapPin size={14} color="#52B788" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <Field label="Insurance" value={selectedInsurance} onChange={setInsurance} options={INSURANCE_OPTIONS} placeholder="Any" />
            <Field label="Care Type" value={selectedCareType} onChange={setCareType} options={CARE_TYPES} placeholder="Any" />
          </div>

          <button
            onClick={search}
            style={{
              width: '100%', height: 46, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
              color: 'white', fontWeight: 700, fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(45,106,79,0.28)',
            }}
          >
            <Search size={16} /> Find Clinics
          </button>
        </div>

        {/* Results */}
        {results === null ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#d1d5db' }}>
            <MapPin size={36} style={{ margin: '0 auto 10px', display: 'block' }} />
            <p style={{ color: '#9ca3af', fontSize: 13 }}>Fill in your details and tap Find Clinics</p>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <MapPin size={36} color="#d1d5db" style={{ margin: '0 auto 10px', display: 'block' }} />
            <p style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600 }}>No clinics match your filters</p>
            <p style={{ color: '#d1d5db', fontSize: 12, marginTop: 4 }}>Try adjusting your insurance or care type</p>
          </div>
        ) : (
          <>
            <p style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              {results.length} clinic{results.length !== 1 ? 's' : ''} found
            </p>
            {results.map((c, i) => <ClinicCard key={c.id} clinic={c} rank={i + 1} />)}
          </>
        )}
      </div>
    </div>
  )
}
