import { useState } from 'react'
import { Search, Pill, MapPin, AlertTriangle, CheckCircle2, FileText } from 'lucide-react'
import { DRUGS } from '../data/mockData'

const CATEGORIES = ['Antibiotic', 'SRH', 'Antidepressant', 'Analgesic']

function DrugCard({ drug }) {
  const ok = drug.available
  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: '16px',
      border: `1.5px solid ${ok ? '#e0f0e8' : '#fde8e8'}`,
      marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    }}>
      {/* Top */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ flex: 1, paddingRight: 12 }}>
          <div style={{ color: '#264653', fontWeight: 700, fontSize: 14 }}>{drug.name}</div>
          <span style={{
            display: 'inline-block', marginTop: 4,
            background: '#F8F8F8', color: '#6b7280',
            fontSize: 11, borderRadius: 20, padding: '2px 10px',
          }}>{drug.category}</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 12px', borderRadius: 20,
          background: ok ? '#D8F3DC' : '#fee2e2', flexShrink: 0,
        }}>
          {ok
            ? <CheckCircle2 size={13} color="#2D6A4F" />
            : <AlertTriangle size={13} color="#dc2626" />}
          <span style={{ fontSize: 12, fontWeight: 700, color: ok ? '#2D6A4F' : '#dc2626' }}>
            {ok ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Price + Prescription */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ color: '#8B5E3C', fontWeight: 800, fontSize: 15 }}>{drug.price}</span>
        {drug.prescription && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: '#FEF3E2', borderRadius: 20, padding: '3px 10px',
          }}>
            <FileText size={11} color="#8B5E3C" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#8B5E3C' }}>Rx required</span>
          </div>
        )}
      </div>

      {/* Locations / Unavailable message */}
      {ok && drug.locations.length > 0 ? (
        <div style={{ background: '#F8F4EF', borderRadius: 10, padding: '10px 12px' }}>
          <p style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 6 }}>
            AVAILABLE AT
          </p>
          {drug.locations.map((loc) => (
            <div key={loc} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <MapPin size={11} color="#52B788" />
              <span style={{ color: '#264653', fontSize: 12, fontWeight: 500 }}>{loc}</span>
            </div>
          ))}
        </div>
      ) : !ok ? (
        <div style={{ background: '#fff5f5', borderRadius: 10, padding: '10px 12px' }}>
          <p style={{ color: '#dc2626', fontSize: 12, lineHeight: 1.5 }}>
            Not available nearby. Call <strong>114</strong> or ask your pharmacist for an alternative.
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default function DrugAvailabilityScreen() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  const results = DRUGS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  )

  function doSearch(q) {
    const term = q ?? query
    setQuery(term)
    setSearched(!!term.trim())
  }

  return (
    <div style={{ background: '#F8F4EF' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #5C3010, #8B5E3C)',
        padding: '52px 22px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle, #E9C46A 0%, transparent 70%)',
          opacity: 0.1, top: -40, right: -40, pointerEvents: 'none',
        }} />
        <p style={{ color: '#D4A574', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
          DRUG AVAILABILITY
        </p>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Check Medicine</h1>
        <p style={{ color: '#D4A574', fontSize: 13 }}>See if your medicine is available nearby</p>
      </div>

      <div style={{ padding: '0 16px 32px', marginTop: -18 }}>

        {/* Search card */}
        <div style={{
          background: 'white', borderRadius: 18, padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 20,
        }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (!e.target.value) setSearched(false) }}
              onKeyDown={(e) => e.key === 'Enter' && doSearch()}
              placeholder="Search medicine name or category…"
              style={{
                width: '100%', padding: '11px 13px 11px 40px',
                background: '#F8F4EF', border: '1.5px solid #f0e4d8',
                borderRadius: 12, fontSize: 13, color: '#264653',
                outline: 'none', fontFamily: 'inherit',
              }}
            />
            <Pill size={14} color="#8B5E3C" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button
            onClick={() => doSearch()}
            disabled={!query.trim()}
            style={{
              width: '100%', height: 44, borderRadius: 12, border: 'none',
              cursor: query.trim() ? 'pointer' : 'default',
              background: query.trim() ? 'linear-gradient(135deg, #8B5E3C, #A0714F)' : '#e5e7eb',
              color: 'white', fontWeight: 700, fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: query.trim() ? '0 4px 14px rgba(139,94,60,0.28)' : 'none',
            }}
          >
            <Search size={15} /> Check Availability
          </button>
        </div>

        {/* Quick categories */}
        {!searched && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 10 }}>
              COMMON SEARCHES
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => doSearch(cat)}
                  style={{
                    padding: '11px 14px', background: 'white',
                    border: '1.5px solid #f0e4d8', borderRadius: 12,
                    fontSize: 13, fontWeight: 600, color: '#264653',
                    cursor: 'pointer', textAlign: 'left',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searched && (
          <>
            <p style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Pill size={36} color="#d1d5db" style={{ margin: '0 auto 10px', display: 'block' }} />
                <p style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600 }}>Medicine not found</p>
                <p style={{ color: '#d1d5db', fontSize: 12, marginTop: 4 }}>Try a different name or call your clinic</p>
              </div>
            ) : (
              results.map((d) => <DrugCard key={d.id} drug={d} />)
            )}
          </>
        )}
      </div>
    </div>
  )
}
