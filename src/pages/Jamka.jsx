import { useState } from 'react'
import {
  Heart, Calendar, MapPin, Camera, Plus, CheckCircle2,
  Circle, Star, Clock, Gift, Sparkles, Plane,
} from 'lucide-react'

const proposalTimeline = [
  { id: 1, date: 'Dec 2026', title: 'Proposal Window Opens', description: 'Begin planning the perfect proposal moment', icon: 'heart', status: 'upcoming' },
  { id: 2, date: 'Jan 2027', title: 'Ring Selection', description: 'Choose the perfect engagement ring', icon: 'gift', status: 'upcoming' },
  { id: 3, date: 'Mar 2027', title: 'Location Scouting', description: 'Plan the proposal location and setup', icon: 'map', status: 'upcoming' },
  { id: 4, date: 'Jun 2027', title: 'The Proposal', description: 'The moment of a lifetime', icon: 'star', status: 'upcoming' },
  { id: 5, date: 'Jul 2027', title: 'Engagement Celebration', description: 'Celebrate with family and friends', icon: 'sparkle', status: 'upcoming' },
  { id: 6, date: 'Sep 2027', title: 'Wedding Planning Begins', description: 'Start planning the wedding together', icon: 'calendar', status: 'upcoming' },
  { id: 7, date: 'Dec 2027', title: 'Proposal Window Closes', description: 'Target timeline completion', icon: 'check', status: 'upcoming' },
]

const visaPlanning = [
  { title: 'Research spouse visa options (US)', status: 'pending' },
  { title: 'Gather required documentation', status: 'pending' },
  { title: 'Financial sponsorship preparation', status: 'pending' },
  { title: 'Medical examination scheduling', status: 'pending' },
  { title: 'Visa application filing', status: 'pending' },
]

const initialIdeas = [
  { id: 1, text: 'Sunset proposal overlooking the city', category: 'Location' },
  { id: 2, text: 'Custom photo book of our journey together', category: 'Gift' },
  { id: 3, text: 'Private dinner at a rooftop restaurant', category: 'Event' },
]

export default function Jamka() {
  const [ideas, setIdeas] = useState(initialIdeas)
  const [showAddIdea, setShowAddIdea] = useState(false)
  const [newIdea, setNewIdea] = useState({ text: '', category: 'Location' })
  const [plans, setPlans] = useState([])
  const [showAddPlan, setShowAddPlan] = useState(false)
  const [newPlan, setNewPlan] = useState('')

  const addIdea = () => {
    if (newIdea.text.trim()) {
      setIdeas([...ideas, { id: Date.now(), ...newIdea }])
      setNewIdea({ text: '', category: 'Location' })
      setShowAddIdea(false)
    }
  }

  const addPlan = () => {
    if (newPlan.trim()) {
      setPlans([...plans, { id: Date.now(), text: newPlan, done: false }])
      setNewPlan('')
      setShowAddPlan(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 shadow-sm">
        <div className="absolute -right-8 -top-8 text-rose-500/10">
          <Heart size={120} />
        </div>
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center">
              <Heart size={22} className="text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Jamka</h1>
              <p className="text-sm text-rose-500 font-medium">Love, Planning & Forever</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 max-w-lg mt-2">
            Planning the proposal journey. Timeline: December 2026 — December 2027.
            Every detail matters when it comes to the one you love.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100', value: 'Dec 2026', label: 'Window Opens' },
          { icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100', value: 'Dec 2027', label: 'Target End' },
          { icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', value: `${ideas.length}`, label: 'Ideas Saved' },
          { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', value: 'Planning', label: 'Current Phase' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className={`bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm`}>
              <Icon size={18} className={`${stat.color} mx-auto mb-2`} />
              <p className="text-lg font-bold text-slate-900">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase font-medium">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-6">Proposal Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-rose-200" />
          <div className="space-y-5">
            {proposalTimeline.map((item) => (
              <div key={item.id} className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  item.status === 'done' ? 'bg-green-50' : 'bg-rose-50'
                }`}>
                  {item.status === 'done' ? (
                    <CheckCircle2 size={14} className="text-green-600" />
                  ) : (
                    <Heart size={12} className="text-rose-400" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-rose-500 font-bold uppercase">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ideas Board */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Ideas & Inspiration</h3>
              <p className="text-xs text-slate-500 mt-0.5">Save proposal ideas, photos, and plans</p>
            </div>
            <button
              onClick={() => setShowAddIdea(!showAddIdea)}
              className="flex items-center gap-1 px-3 py-1.5 bg-rose-500 text-white text-xs font-medium rounded-lg hover:bg-rose-400"
            >
              <Plus size={12} />
              Add Idea
            </button>
          </div>

          {showAddIdea && (
            <div className="flex gap-2 mb-4 animate-fade-in">
              <input type="text" value={newIdea.text} onChange={(e) => setNewIdea({ ...newIdea, text: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && addIdea()} placeholder="Your idea..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:ring-2 ring-rose-500/20 placeholder:text-slate-400" />
              <select value={newIdea.category} onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value })}
                className="px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none">
                <option>Location</option><option>Gift</option><option>Event</option><option>Photo</option><option>Other</option>
              </select>
              <button onClick={addIdea} className="px-3 py-2 bg-slate-900 text-white text-xs rounded-lg">Save</button>
            </div>
          )}

          <div className="space-y-2">
            {ideas.map((idea) => (
              <div key={idea.id} className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100 hover:bg-rose-100/70 transition-colors">
                <Sparkles size={14} className="text-rose-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900 font-medium">{idea.text}</p>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-500 px-1.5 py-0.5 rounded font-medium border border-rose-200">
                  {idea.category}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-rose-300 transition-colors cursor-pointer">
            <Camera size={24} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">Drop photos here or click to upload</p>
            <p className="text-[10px] text-slate-300 mt-1">Save special moments and inspiration</p>
          </div>
        </div>

        {/* Visa + Plans */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Plane size={16} className="text-blue-500" />
              <h3 className="text-base font-bold text-slate-900">Visa Planning</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">Immigration planning for your partner</p>
            <div className="space-y-2">
              {visaPlanning.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Circle size={16} className="text-slate-300 shrink-0" />
                  <span className="text-sm text-slate-600 font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Action Plans</h3>
              <button onClick={() => setShowAddPlan(!showAddPlan)}
                className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200">
                <Plus size={12} />
                Add
              </button>
            </div>

            {showAddPlan && (
              <div className="flex gap-2 mb-3 animate-fade-in">
                <input type="text" value={newPlan} onChange={(e) => setNewPlan(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addPlan()} placeholder="New plan item..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none placeholder:text-slate-400" />
                <button onClick={addPlan} className="px-3 py-2 bg-slate-900 text-white text-xs rounded-lg">Add</button>
              </div>
            )}

            {plans.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                <Gift size={20} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs font-medium">No plans yet — start adding!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {plans.map((plan) => (
                  <div key={plan.id} onClick={() => setPlans(plans.map((p) => p.id === plan.id ? { ...p, done: !p.done } : p))}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    {plan.done ? (
                      <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                    ) : (
                      <Circle size={16} className="text-slate-300 shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${plan.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {plan.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
