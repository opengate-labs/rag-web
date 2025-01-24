-- Seed data for apartment features
INSERT INTO apartment_features (id, name, category) VALUES
  ('f1c12a6d-1333-4a68-a6c3-857487188453', 'lake_view', 'view'),
  ('f2b23b7e-2444-5b79-b7d4-968598299564', 'family_friendly', 'characteristic'),
  ('f3c34c8f-3555-6c8a-c8e5-079609300675', 'furnished', 'characteristic'),
  ('f4d45d9g-4666-7d9b-d9f6-180710411786', 'internet', 'amenity'),
  ('f5e56e0h-5777-8e0c-e0g7-291821522897', 'balcony', 'outdoor'),
  ('f6f67f1i-6888-9f1d-f1h8-302932633908', 'city_view', 'view'),
  ('f7g78g2j-7999-0g2e-g2i9-413043744019', 'smart_home', 'amenity'),
  ('f8h89h3k-8000-1h3f-h3j0-524154855120', 'modern_appliances', 'amenity'),
  ('f9i90i4l-9111-2i4g-i4k1-635265966231', 'elevator', 'amenity'),
  ('f0j01j5m-0222-3j5h-j5l2-746376077342', 'security', 'amenity'),
  ('a1k12k6n-1333-4k6i-k6m3-857487188453', 'mountain_view', 'view'),
  ('a2l23l7o-2444-5l7j-l7n4-968598299564', 'pool', 'amenity'),
  ('a3m34m8p-3555-6m8k-m8o5-079609300675', 'luxury_finishes', 'style'),
  ('a4n45n9q-4666-7n9l-n9p6-180710411786', 'garden', 'outdoor'),
  ('a5o56o0r-5777-8o0m-o0q7-291821522897', 'parking', 'amenity'),
  ('a6p67p1s-6888-9p1n-p1r8-302932633908', 'gym', 'amenity'),
  ('a7q78q2t-7999-0q2o-q2s9-413043744019', 'traditional_architecture', 'style'),
  ('a8r89r3u-8000-1r3p-r3t0-524154855120', 'fireplace', 'amenity'),
  ('a9s90s4v-9111-2s4q-s4u1-635265966231', 'fruit_trees', 'outdoor');

-- Seed data for apartments
INSERT INTO apartments (id, title, description, apartment_type, total_area, price_per_month, bedroom_count, bathroom_count, max_occupancy, location_address, location_city, location_coordinates, has_parking, has_yard, yard_area) VALUES
  ('b1c12a6d-1333-4a68-a6c3-857487188453', 'Family-Friendly Lake View Apartment', 'Spacious 2-bedroom apartment near Sevan Lake. Perfect for families. Features AC in master bedroom, three single beds in second bedroom, and a cozy yard.', 'apartment', 120, 800, 2, 1, 5, '123 Lakeview Street', 'Sevan', '(40.5473,44.9319)', true, true, 30),
  ('b2b23b7e-2444-5b79-b7d4-968598299564', 'Modern Studio in City Center', 'Newly renovated studio apartment in the heart of Yerevan. Perfect for young professionals. Features smart home system, modern appliances, and stunning city views.', 'studio', 45, 600, 0, 1, 2, '45 Abovyan Street', 'Yerevan', '(40.1872,44.5152)', false, false, null),
  ('b3c34c8f-3555-6c8a-c8e5-079609300675', 'Luxurious Villa with Pool', 'Elegant 4-bedroom villa in Dilijan with private pool and mountain views. Features high-end finishes, smart home system, and professional landscaping.', 'villa', 300, 2500, 4, 3, 8, '78 Mountain View Road', 'Dilijan', '(40.7417,44.8651)', true, true, 500),
  ('b4d45d9g-4666-7d9b-d9f6-180710411786', 'Cozy Traditional House', 'Charming 3-bedroom house in Gyumri with traditional architecture. Features wood-burning fireplace, garden with fruit trees, and authentic details throughout.', 'house', 150, 700, 3, 2, 6, '92 Heritage Street', 'Gyumri', '(40.7942,43.8453)', true, true, 200);

-- Seed data for apartment rooms
INSERT INTO apartment_rooms (id, apartment_id, room_type, area, has_ac, has_heating, bed_count, bed_type) VALUES
  -- Family Apartment rooms
  ('c1c12a6d-1333-4a68-a6c3-857487188453', 'b1c12a6d-1333-4a68-a6c3-857487188453', 'bedroom', 25, true, true, 1, 'double'),
  ('c2c12a6d-1333-4a68-a6c3-857487188453', 'b1c12a6d-1333-4a68-a6c3-857487188453', 'bedroom', 20, false, true, 3, 'single'),
  ('c3c12a6d-1333-4a68-a6c3-857487188453', 'b1c12a6d-1333-4a68-a6c3-857487188453', 'living_room', 35, true, true, null, null),
  ('c4c12a6d-1333-4a68-a6c3-857487188453', 'b1c12a6d-1333-4a68-a6c3-857487188453', 'kitchen', 25, false, true, null, null),
  ('c5c12a6d-1333-4a68-a6c3-857487188453', 'b1c12a6d-1333-4a68-a6c3-857487188453', 'bathroom', 15, false, true, null, null),
  
  -- Studio rooms
  ('d1b23b7e-2444-5b79-b7d4-968598299564', 'b2b23b7e-2444-5b79-b7d4-968598299564', 'living_room', 30, true, true, 1, 'murphy'),
  ('d2b23b7e-2444-5b79-b7d4-968598299564', 'b2b23b7e-2444-5b79-b7d4-968598299564', 'kitchen', 10, false, true, null, null),
  ('d3b23b7e-2444-5b79-b7d4-968598299564', 'b2b23b7e-2444-5b79-b7d4-968598299564', 'bathroom', 5, false, true, null, null),
  
  -- Villa rooms
  ('e1c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bedroom', 40, true, true, 1, 'king'),
  ('e2c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bedroom', 35, true, true, 1, 'queen'),
  ('e3c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bedroom', 30, true, true, 2, 'single'),
  ('e4c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bedroom', 30, true, true, 2, 'single'),
  ('e5c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'living_room', 80, true, true, null, null),
  ('e6c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'kitchen', 40, true, true, null, null),
  ('e7c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bathroom', 15, true, true, null, null),
  ('e8c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bathroom', 12, true, true, null, null),
  ('e9c34c8f-3555-6c8a-c8e5-079609300675', 'b3c34c8f-3555-6c8a-c8e5-079609300675', 'bathroom', 12, true, true, null, null),

  -- Traditional House rooms
  ('f1d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'bedroom', 20, false, true, 1, 'double'),
  ('f2d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'bedroom', 18, false, true, 2, 'single'),
  ('f3d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'bedroom', 18, false, true, 2, 'single'),
  ('f4d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'living_room', 45, false, true, null, null),
  ('f5d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'kitchen', 30, false, true, null, null),
  ('f6d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'bathroom', 10, false, true, null, null),
  ('f7d45d9g-4666-7d9b-d9f6-180710411786', 'b4d45d9g-4666-7d9b-d9f6-180710411786', 'bathroom', 9, false, true, null, null);

-- Seed data for apartment feature links
INSERT INTO apartment_feature_links (apartment_id, feature_id) VALUES
  -- Family Apartment features
  ('b1c12a6d-1333-4a68-a6c3-857487188453', 'f1c12a6d-1333-4a68-a6c3-857487188453'), -- lake_view
  ('b1c12a6d-1333-4a68-a6c3-857487188453', 'f2b23b7e-2444-5b79-b7d4-968598299564'), -- family_friendly
  ('b1c12a6d-1333-4a68-a6c3-857487188453', 'f3c34c8f-3555-6c8a-c8e5-079609300675'), -- furnished
  ('b1c12a6d-1333-4a68-a6c3-857487188453', 'f4d45d9g-4666-7d9b-d9f6-180710411786'), -- internet
  ('b1c12a6d-1333-4a68-a6c3-857487188453', 'f5e56e0h-5777-8e0c-e0g7-291821522897'), -- balcony

  -- Studio features
  ('b2b23b7e-2444-5b79-b7d4-968598299564', 'f6f67f1i-6888-9f1d-f1h8-302932633908'), -- city_view
  ('b2b23b7e-2444-5b79-b7d4-968598299564', 'f7g78g2j-7999-0g2e-g2i9-413043744019'), -- smart_home
  ('b2b23b7e-2444-5b79-b7d4-968598299564', 'f8h89h3k-8000-1h3f-h3j0-524154855120'), -- modern_appliances
  ('b2b23b7e-2444-5b79-b7d4-968598299564', 'f9i90i4l-9111-2i4g-i4k1-635265966231'), -- elevator
  ('b2b23b7e-2444-5b79-b7d4-968598299564', 'f0j01j5m-0222-3j5h-j5l2-746376077342'), -- security

  -- Villa features
  ('b3c34c8f-3555-6c8a-c8e5-079609300675', 'a1k12k6n-1333-4k6i-k6m3-857487188453'), -- mountain_view
  ('b3c34c8f-3555-6c8a-c8e5-079609300675', 'a2l23l7o-2444-5l7j-l7n4-968598299564'), -- pool
  ('b3c34c8f-3555-6c8a-c8e5-079609300