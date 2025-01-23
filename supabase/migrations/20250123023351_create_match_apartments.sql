create or replace function match_apartments(
  query_embedding vector(1024),
  match_threshold float,
  match_count int
) returns table (
  id uuid,
  title text,
  description text,
  apartment_type apartment_type,
  price_per_month decimal,
  bedroom_count int,
  location_city text,
  has_yard boolean,
  yard_area decimal,
  room_details jsonb,
  similarity float
) language plpgsql as $$
begin
  return query
  with room_info as (
    select
      apartment_id,
      jsonb_agg(
        jsonb_build_object(
          'room_type', room_type,
          'has_ac', has_ac,
          'bed_count', bed_count,
          'bed_type', bed_type
        )
      ) as rooms
    from apartment_rooms
    group by apartment_id
  )
  select
    a.id,
    a.title,
    a.description,
    a.apartment_type,
    a.price_per_month,
    a.bedroom_count,
    a.location_city,
    a.has_yard,
    a.yard_area,
    coalesce(ri.rooms, '[]'::jsonb) as room_details,
    1 - (a.embedding <=> query_embedding) as similarity
  from apartments a
  left join room_info ri on a.id = ri.apartment_id
  where 1 - (a.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;