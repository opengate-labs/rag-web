-- -- Enable the pgvector extension
create extension vector with schema extensions;

-- Enums for apartment attributes
create type apartment_type as enum ('studio', 'apartment', 'house', 'villa');

create type room_type as enum ('bedroom', 'living_room', 'kitchen', 'bathroom');

-- Features table for better filtering and vector matching
create table apartment_features (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null -- e.g., 'amenity', 'facility', 'nearby', etc.
);

-- Main apartments table
create table apartments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  apartment_type apartment_type not null,
  total_area decimal not null,
  price_per_month decimal not null,
  bedroom_count int not null,
  bathroom_count int not null,
  max_occupancy int not null,
  location_address text not null,
  location_city text not null,
  location_coordinates point not null,
  has_parking boolean default false,
  has_yard boolean default false,
  yard_area decimal,
  embedding vector(1024),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Room details
create table apartment_rooms (
  id uuid primary key default gen_random_uuid(),
  apartment_id uuid references apartments(id) on delete cascade,
  room_type room_type not null,
  area decimal not null,
  has_ac boolean default false,
  has_heating boolean default false,
  bed_count int,
  bed_type text -- 'single', 'double', 'king', etc.
);

-- Junction table for apartments and features
create table apartment_feature_links (
  apartment_id uuid references apartments(id) on delete cascade,
  feature_id uuid references apartment_features(id) on delete cascade,
  primary key (apartment_id, feature_id)
);

-- Create indexes
create index on apartments using ivfflat (embedding vector_cosine_ops);

create index on apartments (location_city);

create index on apartments (price_per_month);

create index on apartments (bedroom_count);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER update_apartments_updated_at 
    BEFORE UPDATE ON apartments
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();