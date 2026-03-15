-- Z-Tracker Database Schema
-- All tables for ventures, transactions, deadlines, visa progress, etc.

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ventures table (9 revenue channels)
CREATE TABLE IF NOT EXISTS ventures (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  icon TEXT,
  color TEXT,
  bg_color TEXT,
  description TEXT,
  revenue DECIMAL(12, 2) DEFAULT 0,
  mrr DECIMAL(12, 2) DEFAULT 0,
  growth DECIMAL(5, 2) DEFAULT 0,
  customers INTEGER DEFAULT 0,
  paying_customers INTEGER DEFAULT 0,
  clients INTEGER DEFAULT 0,
  active_projects INTEGER DEFAULT 0,
  units_sold INTEGER DEFAULT 0,
  active_listings INTEGER DEFAULT 0,
  installs INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  templates_sold INTEGER DEFAULT 0,
  active_templates INTEGER DEFAULT 0,
  total_trades INTEGER DEFAULT 0,
  win_rate DECIMAL(5, 2) DEFAULT 0,
  orders INTEGER DEFAULT 0,
  followers INTEGER DEFAULT 0,
  users INTEGER DEFAULT 0,
  transactions_count INTEGER DEFAULT 0,
  subscribers INTEGER DEFAULT 0,
  open_rate DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venture monthly chart data
CREATE TABLE IF NOT EXISTS venture_chart_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id TEXT REFERENCES ventures(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  revenue DECIMAL(12, 2) DEFAULT 0,
  year INTEGER DEFAULT 2026,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial transactions (savings page)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expense categories
CREATE TABLE IF NOT EXISTS expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT,
  amount DECIMAL(12, 2) DEFAULT 0,
  percent DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monthly savings data
CREATE TABLE IF NOT EXISTS monthly_savings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER DEFAULT 2026,
  savings DECIMAL(12, 2) DEFAULT 0,
  expenses DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(month, year)
);

-- Deadlines table
CREATE TABLE IF NOT EXISTS deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Tax', 'Visa', 'University', 'Corporate')),
  date DATE NOT NULL,
  icon TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  description TEXT,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visa O1 criteria progress
CREATE TABLE IF NOT EXISTS o1_criteria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done')),
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- O1 progress steps
CREATE TABLE IF NOT EXISTS o1_progress_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements log for O1 visa
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backup visa options
CREATE TABLE IF NOT EXISTS backup_visas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  flag TEXT,
  visa_type TEXT NOT NULL,
  status TEXT DEFAULT 'Researching',
  color TEXT,
  bg_color TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jamka proposal ideas
CREATE TABLE IF NOT EXISTS jamka_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  category TEXT DEFAULT 'Location',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jamka action plans
CREATE TABLE IF NOT EXISTS jamka_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proposal timeline
CREATE TABLE IF NOT EXISTS proposal_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('done', 'current', 'upcoming')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- University degrees
CREATE TABLE IF NOT EXISTS degrees (
  id TEXT PRIMARY KEY,
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  duration TEXT,
  status TEXT,
  progress INTEGER DEFAULT 0,
  color TEXT,
  bg_color TEXT,
  current_year TEXT,
  senior_project BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Degree semesters
CREATE TABLE IF NOT EXISTS degree_semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree_id TEXT REFERENCES degrees(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  credits INTEGER DEFAULT 16,
  gpa TEXT DEFAULT '-',
  status TEXT DEFAULT 'done' CHECK (status IN ('done', 'current', 'upcoming')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Academic timeline events
CREATE TABLE IF NOT EXISTS academic_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  event TEXT NOT NULL,
  icon TEXT,
  done BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Revenue overview data (dashboard)
CREATE TABLE IF NOT EXISTS revenue_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER DEFAULT 2026,
  total DECIMAL(12, 2) DEFAULT 0,
  siml DECIMAL(12, 2) DEFAULT 0,
  corvus DECIMAL(12, 2) DEFAULT 0,
  ecom DECIMAL(12, 2) DEFAULT 0,
  other DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(month, year)
);
