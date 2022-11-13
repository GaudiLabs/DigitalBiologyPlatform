SELECT id, svg_denomination 
FROM hardware.electrode
WHERE svg_denomination IN $1
AND device_id = $2