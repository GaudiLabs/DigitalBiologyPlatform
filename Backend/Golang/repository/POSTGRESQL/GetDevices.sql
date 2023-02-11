WITH devices AS (
			SELECT 
			json_agg(svg_denomination) as svg_denoms,
			hardware.device.id,
			hardware.device.name,
			hardware.device.svg
			FROM hardware.electrode as he
			JOIN hardware.device ON he.device_id = hardware.device.id
			WHERE hardware.device.id = he.device_id
			GROUP BY he.device_id, hardware.device.id
	)
	SELECT
	jsonb_build_object(
			'id', devices.id,
			'electrodes', devices.svg_denoms,
			'svg', devices.svg,
			'name', devices.name
			)
		
	FROM devices