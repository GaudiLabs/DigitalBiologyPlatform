INSERT INTO protocols.authors (protocol_id, user_id, rank)
		VALUES(
			$1,
			(
				SELECT id 
				FROM users.user
				WHERE login = $2
			),
			$3
            )
RETURNING id