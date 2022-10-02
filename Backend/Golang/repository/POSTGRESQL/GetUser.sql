WITH users AS (
			SELECT
				*
			FROM
				users.user as u
	), tokens AS (
			SELECT 
				COALESCE(json_agg(jsonb_build_object(
			'token',ut.token,
			'expiration_date',TO_CHAR( ut.expiration_date AT TIME ZONE 'UTC', 'yyyy-mm-dd"T"hh24:mi:ss"Z"')
			)), '[]') AS tokens
			FROM users.token as ut
			JOIN users ON ut.user_id = users.id
			WHERE ut.expiration_date > NOW()
	)
	SELECT
		jsonb_build_object(
			'id', users.id,
			'login', users.login,
			'tokens', tokens.tokens,
			'password', users.password
			)
	FROM users, tokens
	WHERE users.login = $1