DELETE FROM protocols.frame_electrode AS fe
WHERE fe.frame_id IN
(
SELECT id
FROM protocols.frame
WHERE protocol_id = $1
)