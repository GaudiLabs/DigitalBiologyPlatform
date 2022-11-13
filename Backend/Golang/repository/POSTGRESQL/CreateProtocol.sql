INSERT INTO protocols.protocol (
  name 
  ,description 
  ,frame_count 
  ,total_duration 
  ,mask_frame_id 
  ,date_created 
  ,version 
  ,fork_of 
  ,device_id 
  ,public
)
VALUES(
$1
,$2
,$3
,$4
,$5
,$6
,$7
,$8
,$9
,$10
)
RETURNING id