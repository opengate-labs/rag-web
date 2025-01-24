create
or replace function hybrid_apartment_search(
  query_embedding vector(1024),
  search_text text,
  min_price decimal default null,
  max_price decimal default null,
  min_bedrooms int default null,
  city text default null,
  match_count int default 10
) returns table (
  id uuid,
  title text,
  description text,
  apartment_type apartment_type,
  price_per_month decimal,
  bedroom_count int,
  location_city text,
  has_yard boolean,
  room_details jsonb,
  semantic_similarity float,
  text_similarity float,
  combined_score float
) language plpgsql as $ $ begin return query with room_info as (
  select
    apartment_id,
    jsonb_agg(
      jsonb_build_object(
        'room_type',
        room_type,
        'has_ac',
        has_ac,
        'bed_count',
        bed_count,
        'bed_type',
        bed_type
      )
    ) as rooms
  from
    apartment_rooms
  group by
    apartment_id
),
semantic_results as (
  select
    a.*,
    1 - (a.embedding <= > query_embedding) as semantic_similarity,
    similarity(a.description, search_text) as text_similarity,
    coalesce(ri.rooms, '[]' :: jsonb) as room_details
  from
    apartments a
    left join room_info ri on a.id = ri.apartment_id
  where
    (
      min_price is null
      or price_per_month >= min_price
    )
    and (
      max_price is null
      or price_per_month <= max_price
    )
    and (
      min_bedrooms is null
      or bedroom_count >= min_bedrooms
    )
    and (
      city is null
      or location_city ilike city
    )
)
select
  id,
  title,
  description,
  apartment_type,
  price_per_month,
  bedroom_count,
  location_city,
  has_yard,
  room_details,
  semantic_similarity,
  text_similarity,
  (
    semantic_similarity * 0.7 + text_similarity * 0.3
  ) as combined_score
from
  semantic_results
where
  semantic_similarity > 0.3
  or text_similarity > 0.1
order by
  combined_score desc
limit
  match_count;

end;

$ $;