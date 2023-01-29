WITH frame AS (
		SELECT 
			    f.id as frame_id
			   , f.duration
			   , f.rank
			   , f.protocol_id
			   , COALESCE(
				   jsonb_agg(jsonb_build_object('electrode_id', he.svg_denomination, 'value', fe.value)) 
				   FILTER (WHERE fe.electrode_id IS NOT NULL), '[]'
			   ) as electrodes
		FROM protocols.frame as f 
		LEFT JOIN protocols.frame_electrode as fe ON f.id = fe.frame_id
		LEFT JOIN hardware.electrode as he ON fe.electrode_id = he.id
		GROUP BY f.id, f.duration, f.rank, f.protocol_id
		ORDER BY rank
), authors AS (
		SELECT
			u.login as login,
			pa.protocol_id,
			pa.rank
		FROM
			protocols.authors as pa
		LEFT JOIN users.user as u ON pa.user_id = u.id
		GROUP BY pa.protocol_id, u.login, pa.rank
), authors_list AS (
		SELECT
			array_agg(jsonb_build_object(
			'author', u.login
			,'rank', pa.rank) ORDER BY pa.rank) AS list,
			pa.protocol_id
		FROM
			protocols.authors as pa
		LEFT JOIN users.user as u ON pa.user_id = u.id
		GROUP BY pa.protocol_id
),protocol AS (

		SELECT 
		      p.id as protocol_id
              , p.public
			  , p.name
		      , p.frame_count
		      , p.total_duration
			  , p.description
			  , p.device_id
		      , authors.login as author
		      , authors_list.list as authors_list
		      , authors.rank as author_rank
		      , array_agg(jsonb_build_object(
		       'duration', frame.duration,
		       'electrodes', frame.electrodes
		       )) as mask_frame
		FROM protocols.protocol as p 
		JOIN frame ON p.mask_frame_id = frame_id
		JOIN authors ON authors.protocol_id = p.id
		JOIN authors_list ON authors_list.protocol_id = p.id
		--WHERE authors.login = 'testuser'
		WHERE p."public" IS TRUE
		GROUP BY p.id, authors_list.list, p.device_id, authors.login, authors.rank, p.description, p.public
        ORDER BY p.id
		LIMIT $1
		OFFSET $2
)
SELECT
	jsonb_build_object(
	'id', protocol.protocol_id,
	'name', name,
	'frame_count', frame_count,
	'total_duration', total_duration,
	'mask_frame', mask_frame,
	'author_list', protocol.authors_list,
	'author_rank', protocol.author_rank,
	'description', protocol.description,
	'device_id', protocol.device_id,
    'public', protocol.public
	) AS protocols
FROM protocol
GROUP BY protocol.protocol_id, name, frame_count, total_duration, mask_frame, protocol.authors_list, protocol.author_rank, protocol.description, protocol.device_id, protocol.public