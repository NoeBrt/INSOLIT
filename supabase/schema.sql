-- =============================================
-- INSOLIT - Database Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Merchants table
CREATE TABLE IF NOT EXISTS merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Merchants are publicly readable"
  ON merchants FOR SELECT
  USING (true);

-- Promos table
CREATE TABLE IF NOT EXISTS promos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  promo_code TEXT,
  discount_value INTEGER,
  image_url TEXT,
  is_exclusive BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  valid_until DATE,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  merchant_id UUID REFERENCES merchants(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE promos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Promos are publicly readable"
  ON promos FOR SELECT
  USING (true);

-- Redemptions table
CREATE TABLE IF NOT EXISTS redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  promo_id UUID REFERENCES promos(id) ON DELETE CASCADE,
  claimed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, promo_id)
);

ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own redemptions"
  ON redemptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own redemptions"
  ON redemptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
