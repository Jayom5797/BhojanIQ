import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ContextPanel from '../components/ui/ContextPanel'
import { useUser } from '../context/UserContext'
import { analyzeFood } from '../services/api'

export default function Analyze() {
  const { profile, setLastResult } = useUser()
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('Immediate (Now)')
  const [orderingOnline, setOrderingOnline] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFile = (file) => {
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async () => {
    if (!image && !description.trim()) {
      setError('Please upload a food photo or describe your meal.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const result = await analyzeFood({ image, description, timeOfDay, orderingOnline, profile })
      setLastResult(result)
      navigate('/result')
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">

          {/* Left: Input */}
          <div className="flex-1 space-y-8">
            <header>
              <h1 className="font-headline text-3xl font-bold tracking-tighter">Intelligence Intake</h1>
              <p className="text-on-surface-variant text-sm mt-1 tracking-wide uppercase font-bold">
                Submit meal data for real-time diagnostic analysis
              </p>
            </header>

            {/* Drop Zone */}
            <div
              className="group relative aspect-video md:aspect-auto md:h-64 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary transition-all bg-surface-container flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {imagePreview ? (
                <img src={imagePreview} alt="Food preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-5xl text-outline mb-3 group-hover:text-primary group-hover:scale-110 transition-transform">
                    add_a_photo
                  </span>
                  <p className="font-headline font-semibold text-lg">Drop food photo or click to upload</p>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-1">Supports HEIC, JPG, PNG up to 20MB</p>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            </div>

            {/* Text + Context */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-outline uppercase tracking-widest mb-2">
                  Detailed Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="E.g. Homemade chicken salad with balsamic vinaigrette..."
                  className="w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-xl p-4 min-h-[120px] text-on-surface transition-all placeholder:text-outline resize-none outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-outline uppercase tracking-widest mb-2">
                    Time of Consumption
                  </label>
                  <div className="relative">
                    <select
                      value={timeOfDay}
                      onChange={e => setTimeOfDay(e.target.value)}
                      className="w-full appearance-none bg-surface-container-highest border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-xl p-4 text-on-surface cursor-pointer outline-none"
                    >
                      <option>Immediate (Now)</option>
                      <option>30 Minutes Ago</option>
                      <option>1 Hour Ago</option>
                      <option>Earlier Today</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">schedule</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-surface-container-high rounded-xl p-4 px-6 border border-outline-variant/10">
                  <div>
                    <span className="text-xs font-black text-outline uppercase tracking-widest block">Ordering Online</span>
                    <span className="text-sm font-medium">Enable restaurant matching</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={orderingOnline} onChange={e => setOrderingOnline(e.target.checked)} />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-error text-sm font-medium">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-5 rounded-xl font-headline font-bold text-xl tracking-tighter flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_-5px_rgba(47,243,173,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              {loading ? 'Analyzing...' : 'Analyze My Meal'}
            </button>
          </div>

          {/* Right: Context Panel (desktop only) */}
          <aside className="hidden lg:block w-[380px] shrink-0">
            <ContextPanel />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
