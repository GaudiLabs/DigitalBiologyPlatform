WITH users AS (
			SELECT
				*
			FROM
				users.user as u
	), 
	tokens AS (
			SELECT 
				COALESCE(json_agg(jsonb_build_object(
			'token',ut.token,
			'expiration_date',TO_CHAR( ut.expiration_date AT TIME ZONE 'UTC', 'yyyy-mm-dd"T"hh24:mi:ss"Z"')
			)), '[]') AS tokens
			FROM users.token as ut
			JOIN users ON ut.user_id = users.id
			WHERE ut.expiration_date > NOW()
			AND users.login = $1
	)
	SELECT
		jsonb_build_object(
			'id', users.id,
			'username', users.login,
			'tokens', tokens.tokens,
			'password', users.password,
			'fullname', users.fullname,
			'bio', users.bio,
			'institution', users.institution,
			'website', users.website,
			'protocol_amount', (SELECT COUNT(*) FROM protocols.authors WHERE user_id = users.id),
			'public_protocol_amount', (
				SELECT COUNT(*) 
				FROM protocols.protocol 
				WHERE protocol.id IN (SELECT protocol_id FROM protocols.authors WHERE user_id = users.id)
				AND protocol."public" IS TRUE
			)
			)
	FROM users, tokens
	WHERE users.login = $1