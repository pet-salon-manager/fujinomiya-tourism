-- 富士宮たびナビ v44
-- 施設の位置をSupabaseに一度保存し、以後はAPI検索なしで地図表示するための列を追加します。

alter table public.spots
  add column if not exists latitude double precision,
  add column if not exists longitude double precision;

create index if not exists spots_latitude_longitude_idx
  on public.spots (latitude, longitude);

-- 確認
select
  count(*) as total_spots,
  count(*) filter (where latitude is not null and longitude is not null) as spots_with_coordinates
from public.spots;
