INSERT INTO protocols.frame_feature (frame_id, value, hardware_feature_id )
		VALUES(
            $1,
			$2,
			(
			SELECT id 
			FROM hardware.electrode_feature 
			WHERE name = $3
			)
            )
