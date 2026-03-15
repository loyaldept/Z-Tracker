import {
  GraduationCap, BookOpen, Calendar, Award, CheckCircle2,
  Circle, Clock, MapPin, ArrowRight,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const degrees = [
  {
    id: 'hku',
    school: 'University of Hong Kong',
    degree: 'Bachelor of Engineering',
    field: 'Computer Engineering',
    location: 'Hong Kong',
    start: 'September 2022',
    end: 'January 2024',
    duration: '2-year program (completed in 1.5 years)',
    status: 'Completed',
    progress: 100,
    color: '#10b981',
    semesters: [
      { name: 'Fall 2022', credits: 18, gpa: '-' },
      { name: 'Spring 2023', credits: 18, gpa: '-' },
      { name: 'Fall 2023', credits: 18, gpa: '-' },
    ],
  },
  {
    id: 'bard',
    school: 'Bard College',
    degree: 'Bachelor of Science',
    field: 'Computer Science & Finance',
    location: 'New York, USA',
    start: 'January 2024',
    end: 'December 2026',
    duration: '3-year program',
    status: 'In Progress — Senior I',
    progress: 75,
    color: '#6366f1',
    currentYear: 'Senior I',
    seniorProject: true,
    semesters: [
      { name: 'Spring 2024', credits: 16, gpa: '-', status: 'done' },
      { name: 'Fall 2024', credits: 16, gpa: '-', status: 'done' },
      { name: 'Spring 2025', credits: 16, gpa: '-', status: 'done' },
      { name: 'Fall 2025', credits: 16, gpa: '-', status: 'done' },
      { name: 'Spring 2026', credits: 16, gpa: '-', status: 'current' },
      { name: 'Fall 2026', credits: 16, gpa: '-', status: 'upcoming' },
    ],
  },
]

const creditData = [
  { semester: 'F22', credits: 18, cumulative: 18 },
  { semester: 'S23', credits: 18, cumulative: 36 },
  { semester: 'F23', credits: 18, cumulative: 54 },
  { semester: 'S24', credits: 16, cumulative: 70 },
  { semester: 'F24', credits: 16, cumulative: 86 },
  { semester: 'S25', credits: 16, cumulative: 102 },
  { semester: 'F25', credits: 16, cumulative: 118 },
  { semester: 'S26', credits: 16, cumulative: 134 },
  { semester: 'F26', credits: 16, cumulative: 150 },
]

const timeline = [
  { date: 'Sep 2022', event: 'Started at HKU — Computer Engineering', icon: 'start', done: true },
  { date: 'Jan 2024', event: 'Graduated HKU (1.5 years!)', icon: 'grad', done: true },
  { date: 'Jan 2024', event: 'Started at Bard College — CS & Finance', icon: 'start', done: true },
  { date: 'Spring 2025', event: 'Completed Junior Year', icon: 'check', done: true },
  { date: 'Fall 2025', event: 'Senior I — Senior Project begins', icon: 'current', done: false },
  { date: 'Spring 2026', event: 'Senior I — Current Semester', icon: 'current', done: false },
  { date: 'Fall 2026', event: 'Senior II — Final Semester', icon: 'future', done: false },
  { date: 'Dec 2026', event: 'Graduation — BS in CS & Finance', icon: 'grad', done: false },
]

export default function University() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">University Progress</h1>
        <p className="text-sm text-white/40 mt-1">Academic journey tracker</p>
      </div>

      {/* Degree Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {degrees.map((deg) => (
          <div key={deg.id} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${deg.color}15` }}
                >
                  <GraduationCap size={20} style={{ color: deg.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{deg.school}</p>
                  <p className="text-xs text-white/30">{deg.location}</p>
                </div>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${deg.color}15`, color: deg.color }}
              >
                {deg.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {[
                ['Degree', deg.degree],
                ['Field', deg.field],
                ['Period', `${deg.start} — ${deg.end}`],
                ['Duration', deg.duration],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
                  <span className="text-white/30">{label}</span>
                  <span className="font-semibold text-white/80">{value}</span>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-white/30 font-medium">Completion</span>
                <span className="text-xs font-bold" style={{ color: deg.color }}>{deg.progress}%</span>
              </div>
              <div className="h-2.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${deg.progress}%`, backgroundColor: deg.color, boxShadow: `0 0 10px ${deg.color}40` }}
                ></div>
              </div>
            </div>

            {deg.seniorProject && (
              <div className="mt-4 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={14} className="text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-400 uppercase">Senior Project</span>
                </div>
                <p className="text-xs text-white/40">Currently working on Senior Project — Senior I semester</p>
              </div>
            )}

            <div className="mt-4">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Semesters</p>
              <div className="grid grid-cols-3 gap-2">
                {deg.semesters.map((sem, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg border text-center ${
                      sem.status === 'current'
                        ? 'bg-indigo-500/10 border-indigo-500/20'
                        : sem.status === 'upcoming'
                        ? 'bg-white/[0.02] border-white/[0.04] opacity-40'
                        : 'bg-white/[0.03] border-white/[0.04]'
                    }`}
                  >
                    <span className="text-[10px] text-white/30 font-medium block">{sem.name}</span>
                    <span className="text-xs font-bold text-white/80">{sem.credits} cr</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Credit Accumulation Chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white/90 mb-1">Credit Accumulation</h3>
        <p className="text-xs text-white/30 mb-4">Both degrees combined</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={creditData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="semester" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'rgba(20,20,35,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: 'white' }}
            />
            <Bar dataKey="credits" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white/90 mb-6">Academic Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]"></div>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  item.done ? 'bg-green-500/10' : item.icon === 'current' ? 'bg-blue-500/10' : 'bg-white/[0.04]'
                }`}>
                  {item.done ? (
                    <CheckCircle2 size={14} className="text-green-400" />
                  ) : item.icon === 'current' ? (
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                  ) : (
                    <Circle size={14} className="text-white/20" />
                  )}
                </div>
                <div className={`flex-1 pb-4 ${!item.done && item.icon !== 'current' ? 'opacity-40' : ''}`}>
                  <p className="text-xs text-white/30 font-medium mb-0.5">{item.date}</p>
                  <p className="text-sm font-medium text-white/80">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
