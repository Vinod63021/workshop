-- BuildSprint AI - Schema & Row Level Security Migration
-- Target: 500 final-year engineering student registrations within 7 days on ₹2,000 budget

-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2),
    email TEXT NOT NULL UNIQUE,
    college TEXT NOT NULL CHECK (char_length(trim(college)) >= 2),
    branch TEXT NOT NULL,
    graduation_year INTEGER NOT NULL CHECK (graduation_year BETWEEN 2024 AND 2030),
    referral_code TEXT NOT NULL UNIQUE,
    referred_by_code TEXT,
    source TEXT NOT NULL DEFAULT 'other',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure lowercase normalized email with index
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_email_lower ON public.registrations (lower(email));
CREATE INDEX IF NOT EXISTS idx_registrations_referral_code ON public.registrations (referral_code);
CREATE INDEX IF NOT EXISTS idx_registrations_referred_by ON public.registrations (referred_by_code);
CREATE INDEX IF NOT EXISTS idx_registrations_source ON public.registrations (source);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- 2. Create campaign_budget table for ₹2,000 budget tracking
CREATE TABLE IF NOT EXISTS public.campaign_budget (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_name TEXT NOT NULL,
    category TEXT NOT NULL,
    planned_spend NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    actual_spend NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    notes TEXT DEFAULT '',
    is_assumption BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create app_admins table for explicit role-based access control
CREATE TABLE IF NOT EXISTS public.app_admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_budget ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;

-- 5. Helper function to check if current authenticated user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.app_admins
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. RLS Policies for registrations:
-- Public/Anon users CAN insert their own registration
DROP POLICY IF EXISTS "Public users can register" ON public.registrations;
CREATE POLICY "Public users can register"
    ON public.registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(full_name)) >= 2 AND
        char_length(trim(email)) >= 5 AND
        char_length(trim(college)) >= 2
    );

-- Only authenticated admins can SELECT/READ student registrations
-- (Student list is STRICTLY NEVER exposed to public anon users)
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
CREATE POLICY "Admins can view all registrations"
    ON public.registrations
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Only authenticated admins can DELETE or UPDATE registrations if needed
DROP POLICY IF EXISTS "Admins can modify registrations" ON public.registrations;
CREATE POLICY "Admins can modify registrations"
    ON public.registrations
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 7. RLS Policies for campaign_budget:
DROP POLICY IF EXISTS "Admins can manage budget" ON public.campaign_budget;
CREATE POLICY "Admins can manage budget"
    ON public.campaign_budget
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 8. Seed initial budget channels
INSERT INTO public.campaign_budget (channel_name, category, planned_spend, actual_spend, notes, is_assumption)
VALUES
    ('WhatsApp Campus Ambassadors & College Outreach', 'college club', 600.00, 450.00, 'Micro-incentives for campus tech club presidents & CRs across 18 colleges', false),
    ('Student Referral Loop (Peer-to-Peer)', 'student referral', 400.00, 250.00, 'Access perks & priority code review for top student ambassadors', false),
    ('Targeted Meta / Instagram Story Micro-Ads', 'paid promotion', 600.00, 450.00, 'Geo-targeted around tier-1 & tier-2 engineering campuses (Age 20-23)', false),
    ('College Tech Club Discord & Telegram Broadcasts', 'WhatsApp/community', 200.00, 0.00, 'Organic partner broadcasts; zero actual spend incurred', false),
    ('Direct Email & Alumni Network Outreach', 'email', 100.00, 0.00, 'Organized through departmental placement & coding club listservs', true),
    ('Direct & Unattributed Word-of-Mouth', 'other', 100.00, 0.00, 'Organic campus direct traffic; no spend assigned', true)
ON CONFLICT DO NOTHING;
