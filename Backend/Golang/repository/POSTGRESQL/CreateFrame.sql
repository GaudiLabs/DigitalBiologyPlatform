INSERT INTO protocols.frame (protocol_id, duration, rank)
		VALUES(
			$1,
			$2,
			$3
            )
RETURNING id