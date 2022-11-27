UPDATE protocols.protocol AS p
SET
  name  = $2
  ,description  = $3
  ,frame_count  = $4
  ,total_duration  = $5
  ,mask_frame_id  = $6
  ,date_created  = $7
  ,version  = $8
  ,fork_of  = $9
  ,device_id  = $10
  ,public = $11
WHERE p.id = $1