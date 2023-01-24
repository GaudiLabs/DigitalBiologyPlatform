DELETE FROM protocols.frame_feature AS ff
WHERE ff.frame_id IN
(
SELECT id
FROM protocols.frame
WHERE protocol_id = $1
)