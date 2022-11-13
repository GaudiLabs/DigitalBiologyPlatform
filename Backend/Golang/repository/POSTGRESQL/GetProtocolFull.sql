WITH frame AS (
		SELECT 
			    f.id as frame_id
			   , f.duration
			   , f.protocol_id
			   , f.rank
			   , COALESCE(
				   jsonb_agg(jsonb_build_object('electrode_id', he.svg_denomination, 'value', fe.value)) 
				   FILTER (WHERE fe.electrode_id IS NOT NULL), '[]'
			   ) as electrodes
		FROM protocols.frame as f 
		LEFT JOIN protocols.frame_electrode as fe ON f.id = fe.frame_id
		LEFT JOIN hardware.electrode as he ON fe.electrode_id = he.id
		GROUP BY f.id, f.duration, f.protocol_id
		ORDER BY rank
),
authors_list AS (
		SELECT
			array_agg(jsonb_build_object(
			'author', u.login
			,'rank', pa.rank) ORDER BY pa.rank) AS list,
			pa.protocol_id
		FROM
			protocols.authors as pa
		LEFT JOIN users.user as u ON pa.user_id = u.id
		GROUP BY pa.protocol_id
		),
protocol AS (

		SELECT 
		      p.id as protocol_id
		      --, array_agg(DISTINCT u.login ORDER BY pa.rank) as authors
			  , p.name
		      , p.frame_count
		      , p.device_id
		      , p.description
		      , p.total_duration
		      , authors_list.list as authors_list
		      , array_agg(jsonb_build_object(
		       'duration', frame.duration,
		       'rank', frame.rank,
		       'electrodes', frame.electrodes
		       )) as frames
		FROM protocols.protocol as p 
		JOIN frame ON p.id = frame.protocol_id
		JOIN authors_list ON authors_list.protocol_id = p.id
		WHERE p.id = $1
		GROUP BY p.id, authors_list.list, p.device_id

)
SELECT
	jsonb_build_object(
	'id', p.protocol_id,
	'device_id', p.device_id,
	'name', name,
	'description', description,
	'frame_count', frame_count,
	'total_duration', total_duration,
	'frames', frames,
	'author_list', p.authors_list
	) AS protocol
FROM protocol AS p
GROUP BY p.protocol_id, name, frame_count, total_duration, frames, description, p.authors_list, p.device_id