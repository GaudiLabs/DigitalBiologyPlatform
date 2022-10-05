INSERT INTO users.token (user_id, token, expiration_date)
		VALUES(
			(
			SELECT
				id FROM users.user
			WHERE
				login = $1
			),
			$2,
			$3)
