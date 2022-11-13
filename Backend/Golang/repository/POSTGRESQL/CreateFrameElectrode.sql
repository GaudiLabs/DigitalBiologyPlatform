INSERT INTO protocols.frame_electrode (frame_id, value, electrode_id )
		VALUES(
            $1,
			$2,
			(
			SELECT id 
			FROM hardware.electrode 
			WHERE svg_denomination = $3 AND device_id = $4
			)
            )
