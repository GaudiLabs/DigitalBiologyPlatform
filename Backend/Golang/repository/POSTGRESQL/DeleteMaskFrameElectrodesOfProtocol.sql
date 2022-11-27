DELETE FROM protocols.frame_electrode AS fe
WHERE fe.frame_id =
(
SELECT mask_frame_id
FROM protocols.protocol AS p
WHERE  p.id = $1
)