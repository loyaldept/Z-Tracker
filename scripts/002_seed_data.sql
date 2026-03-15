-- Seed data for Z-Tracker

-- Insert quotes
INSERT INTO quotes (text) VALUES
  ('Good things take time.'),
  ('I failed so many times, but I am blessed to fail and try again.'),
  ('The only way to do great work is to love what you do.'),
  ('Success is not final, failure is not fatal: it is the courage to continue that counts.'),
  ('Dream big. Start small. Act now.'),
  ('Every expert was once a beginner.'),
  ('Your limitation — it''s only your imagination.'),
  ('Push yourself, because no one else is going to do it for you.'),
  ('The harder you work for something, the greater you''ll feel when you achieve it.'),
  ('Don''t stop when you''re tired. Stop when you''re done.')
ON CONFLICT DO NOTHING;

-- Insert ventures (9 revenue channels)
INSERT INTO ventures (id, name, category, location, icon, color, bg_color, description) VALUES
  ('siml', 'Siml Inc', 'SaaS', 'New York, NY', 'building', '#3b82f6', '#eff6ff', 'AI-Powered SaaS Platform'),
  ('corvus', 'Corvus AI Agency', 'AI Agency', 'Albany, NY & Sydney, AU', 'bot', '#8b5cf6', '#f5f3ff', 'AI Agency — 50/50 Partnership with Erkebai'),
  ('amazon', 'Amazon Seller', 'E-Commerce', 'Online', 'package', '#f59e0b', '#fffbeb', 'Book Sales on Amazon'),
  ('chrome', 'Chrome Extensions', 'Software', 'letswind.com & more', 'chrome', '#10b981', '#ecfdf5', 'Browser Extensions — LetsWind & Others'),
  ('notion', 'Notion Templates', 'Digital Products', 'Online', 'fileText', '#6366f1', '#eef2ff', 'Premium Notion Templates'),
  ('trading', 'Trading Bot', 'FinTech', 'Automated', 'trendingUp', '#14b8a6', '#f0fdfa', 'Algorithmic Trading System'),
  ('tiktok', 'TikTok Shop', 'E-Commerce', 'Online', 'shoppingBag', '#ec4899', '#fdf2f8', 'TikTok Shop Storefront'),
  ('openclaw', 'OpenClaw', 'Platform', 'Online', 'zap', '#f97316', '#fff7ed', 'OpenClaw Platform'),
  ('newsletter', 'Newsletter Sales', 'Media', 'Online', 'mail', '#06b6d4', '#ecfeff', 'Newsletter Monetization')
ON CONFLICT (id) DO NOTHING;

-- Insert venture chart data (6 months for each venture)
INSERT INTO venture_chart_data (venture_id, month, revenue, year) VALUES
  ('siml', 'Jan', 0, 2026), ('siml', 'Feb', 0, 2026), ('siml', 'Mar', 0, 2026),
  ('siml', 'Apr', 0, 2026), ('siml', 'May', 0, 2026), ('siml', 'Jun', 0, 2026),
  ('corvus', 'Jan', 0, 2026), ('corvus', 'Feb', 0, 2026), ('corvus', 'Mar', 0, 2026),
  ('corvus', 'Apr', 0, 2026), ('corvus', 'May', 0, 2026), ('corvus', 'Jun', 0, 2026),
  ('amazon', 'Jan', 0, 2026), ('amazon', 'Feb', 0, 2026), ('amazon', 'Mar', 0, 2026),
  ('amazon', 'Apr', 0, 2026), ('amazon', 'May', 0, 2026), ('amazon', 'Jun', 0, 2026)
ON CONFLICT DO NOTHING;

-- Insert expense categories
INSERT INTO expense_categories (name, color, amount, percent) VALUES
  ('Housing', '#3b82f6', 0, 0),
  ('Food', '#10b981', 0, 0),
  ('Transport', '#f59e0b', 0, 0),
  ('Business', '#8b5cf6', 0, 0),
  ('Personal', '#ec4899', 0, 0),
  ('Other', '#6b7280', 0, 0)
ON CONFLICT (name) DO NOTHING;

-- Insert monthly savings data
INSERT INTO monthly_savings (month, year, savings, expenses) VALUES
  ('Jan', 2026, 0, 0), ('Feb', 2026, 0, 0), ('Mar', 2026, 0, 0),
  ('Apr', 2026, 0, 0), ('May', 2026, 0, 0), ('Jun', 2026, 0, 0),
  ('Jul', 2026, 0, 0), ('Aug', 2026, 0, 0), ('Sep', 2026, 0, 0),
  ('Oct', 2026, 0, 0), ('Nov', 2026, 0, 0), ('Dec', 2026, 0, 0)
ON CONFLICT (month, year) DO NOTHING;

-- Insert deadlines
INSERT INTO deadlines (title, category, date, icon, priority, description, done) VALUES
  ('Federal Tax Filing — Personal', 'Tax', '2026-04-15', 'tax', 'high', 'File personal federal income tax return (Form 1040)', false),
  ('Siml Inc — Corporate Tax Filing', 'Tax', '2026-04-15', 'tax', 'high', 'File Siml Inc corporate tax return', false),
  ('OPT Application', 'Visa', '2026-07-01', 'visa', 'high', 'Apply for Optional Practical Training (OPT)', false),
  ('Senior Project — Mid-Review', 'University', '2026-04-30', 'university', 'medium', 'Submit mid-semester senior project review at Bard College', false),
  ('Senior Project — Final Submission', 'University', '2026-12-15', 'university', 'high', 'Final senior project / diploma work submission', false),
  ('F1 Visa Expiration', 'Visa', '2026-12-22', 'visa', 'high', 'F1 student visa expires — must transition to OPT', false),
  ('Bard College Graduation', 'University', '2026-12-20', 'university', 'medium', 'Graduation ceremony — BS in Computer Science & Finance', false),
  ('O1 Visa Application', 'Visa', '2027-01-10', 'visa', 'high', 'File O1 extraordinary ability visa petition through Siml Inc', false),
  ('Quarterly Estimated Tax — Q1', 'Tax', '2026-04-15', 'tax', 'medium', 'Q1 estimated tax payment', false),
  ('Quarterly Estimated Tax — Q2', 'Tax', '2026-06-15', 'tax', 'medium', 'Q2 estimated tax payment', false),
  ('Corvus AI — Annual Filing', 'Corporate', '2026-03-31', 'corporate', 'medium', 'Annual report filing for Corvus AI Agency', false),
  ('Siml Inc — Annual Report', 'Corporate', '2026-03-31', 'corporate', 'medium', 'File annual report for Siml Inc with NY State', false)
ON CONFLICT DO NOTHING;

-- Insert O1 criteria
INSERT INTO o1_criteria (title, status, description, sort_order) VALUES
  ('Awards / Prizes for Excellence', 'in_progress', 'Documentation of nationally or internationally recognized prizes or awards for excellence', 1),
  ('Membership in Associations', 'pending', 'Membership in associations requiring outstanding achievements as judged by recognized experts', 2),
  ('Published Material in Professional Publications', 'in_progress', 'Published material about the applicant in professional or major trade publications or other major media', 3),
  ('Judging the Work of Others', 'pending', 'Participation as a judge of the work of others in the same or allied field', 4),
  ('Original Contributions of Major Significance', 'in_progress', 'Original scientific, scholarly, artistic, or business-related contributions of major significance in the field', 5),
  ('Authorship of Scholarly Articles', 'pending', 'Authorship of scholarly articles in professional or major trade publications or other major media', 6),
  ('High Salary or Remuneration', 'pending', 'Evidence of commanding a high salary or significantly high remuneration', 7),
  ('Critical Role in Distinguished Organizations', 'in_progress', 'Performance in a critical or essential capacity for organizations with distinguished reputation — Siml Inc', 8)
ON CONFLICT DO NOTHING;

-- Insert O1 progress steps
INSERT INTO o1_progress_steps (label, done, sort_order) VALUES
  ('Startup Founded (Siml Inc)', true, 1),
  ('App/Product Launched', false, 2),
  ('Media Coverage', false, 3),
  ('Revenue Generated', false, 4),
  ('Awards / Recognition', false, 5),
  ('Advisory Letter Secured', false, 6),
  ('Attorney Consultation', false, 7),
  ('Petition Filed', false, 8)
ON CONFLICT DO NOTHING;

-- Insert backup visas
INSERT INTO backup_visas (country, flag, visa_type, status, color, bg_color, notes) VALUES
  ('Australia', '🇦🇺', 'Global Talent Visa (subclass 858)', 'Researching', '#f59e0b', '#fffbeb', 'Target sector: DigiTech. Requires nominator & EOI.'),
  ('United Kingdom', '🇬🇧', 'Start-Up Visa', 'Planned', '#3b82f6', '#eff6ff', 'Requires endorsement from approved body. Innovation-focused.'),
  ('Canada', '🇨🇦', 'Visa', 'Obtained', '#10b981', '#ecfdf5', 'Canadian visa obtained and secured.')
ON CONFLICT DO NOTHING;

-- Insert Jamka ideas
INSERT INTO jamka_ideas (text, category) VALUES
  ('Sunset proposal overlooking the city', 'Location'),
  ('Custom photo book of our journey together', 'Gift'),
  ('Private dinner at a rooftop restaurant', 'Event')
ON CONFLICT DO NOTHING;

-- Insert proposal timeline
INSERT INTO proposal_timeline (date, title, description, icon, status, sort_order) VALUES
  ('Dec 2026', 'Proposal Window Opens', 'Begin planning the perfect proposal moment', 'heart', 'upcoming', 1),
  ('Jan 2027', 'Ring Selection', 'Choose the perfect engagement ring', 'gift', 'upcoming', 2),
  ('Mar 2027', 'Location Scouting', 'Plan the proposal location and setup', 'map', 'upcoming', 3),
  ('Jun 2027', 'The Proposal', 'The moment of a lifetime', 'star', 'upcoming', 4),
  ('Jul 2027', 'Engagement Celebration', 'Celebrate with family and friends', 'sparkle', 'upcoming', 5),
  ('Sep 2027', 'Wedding Planning Begins', 'Start planning the wedding together', 'calendar', 'upcoming', 6),
  ('Dec 2027', 'Proposal Window Closes', 'Target timeline completion', 'check', 'upcoming', 7)
ON CONFLICT DO NOTHING;

-- Insert degrees
INSERT INTO degrees (id, school, degree, field, location, start_date, end_date, duration, status, progress, color, bg_color, current_year, senior_project) VALUES
  ('hku', 'University of Hong Kong', 'Bachelor of Engineering', 'Computer Engineering', 'Hong Kong', 'September 2022', 'January 2024', '2-year program (completed in 1.5 years)', 'Completed', 100, '#10b981', '#ecfdf5', NULL, false),
  ('bard', 'Bard College', 'Bachelor of Science', 'Computer Science & Finance', 'New York, USA', 'January 2024', 'December 2026', '3-year program', 'In Progress — Senior I', 75, '#6366f1', '#eef2ff', 'Senior I', true)
ON CONFLICT (id) DO NOTHING;

-- Insert degree semesters (HKU)
INSERT INTO degree_semesters (degree_id, name, credits, gpa, status, sort_order) VALUES
  ('hku', 'Fall 2022', 18, '-', 'done', 1),
  ('hku', 'Spring 2023', 18, '-', 'done', 2),
  ('hku', 'Fall 2023', 18, '-', 'done', 3)
ON CONFLICT DO NOTHING;

-- Insert degree semesters (Bard)
INSERT INTO degree_semesters (degree_id, name, credits, gpa, status, sort_order) VALUES
  ('bard', 'Spring 2024', 16, '-', 'done', 1),
  ('bard', 'Fall 2024', 16, '-', 'done', 2),
  ('bard', 'Spring 2025', 16, '-', 'done', 3),
  ('bard', 'Fall 2025', 16, '-', 'done', 4),
  ('bard', 'Spring 2026', 16, '-', 'current', 5),
  ('bard', 'Fall 2026', 16, '-', 'upcoming', 6)
ON CONFLICT DO NOTHING;

-- Insert academic timeline
INSERT INTO academic_timeline (date, event, icon, done, sort_order) VALUES
  ('Sep 2022', 'Started at HKU — Computer Engineering', 'start', true, 1),
  ('Jan 2024', 'Graduated HKU (1.5 years!)', 'grad', true, 2),
  ('Jan 2024', 'Started at Bard College — CS & Finance', 'start', true, 3),
  ('Spring 2025', 'Completed Junior Year', 'check', true, 4),
  ('Fall 2025', 'Senior I — Senior Project begins', 'current', false, 5),
  ('Spring 2026', 'Senior I — Current Semester', 'current', false, 6),
  ('Fall 2026', 'Senior II — Final Semester', 'future', false, 7),
  ('Dec 2026', 'Graduation — BS in CS & Finance', 'grad', false, 8)
ON CONFLICT DO NOTHING;

-- Insert revenue data
INSERT INTO revenue_data (month, year, total, siml, corvus, ecom, other) VALUES
  ('Jan', 2026, 0, 0, 0, 0, 0),
  ('Feb', 2026, 0, 0, 0, 0, 0),
  ('Mar', 2026, 0, 0, 0, 0, 0),
  ('Apr', 2026, 0, 0, 0, 0, 0),
  ('May', 2026, 0, 0, 0, 0, 0),
  ('Jun', 2026, 0, 0, 0, 0, 0),
  ('Jul', 2026, 0, 0, 0, 0, 0),
  ('Aug', 2026, 0, 0, 0, 0, 0),
  ('Sep', 2026, 0, 0, 0, 0, 0),
  ('Oct', 2026, 0, 0, 0, 0, 0),
  ('Nov', 2026, 0, 0, 0, 0, 0),
  ('Dec', 2026, 0, 0, 0, 0, 0)
ON CONFLICT (month, year) DO NOTHING;
