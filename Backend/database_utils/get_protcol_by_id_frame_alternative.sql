WITH frame AS (
		SELECT 
			    f.id as frame_id
			   , f.duration
			   , f.protocol_id
			   , COALESCE(
				   jsonb_agg(jsonb_build_object('electrode_id', he.svg_denomination, 'value', fe.value)) 
				   FILTER (WHERE fe.electrode_id IS NOT NULL), '[]'
			   ) as electrodes
		FROM protocols.frame as f 
		LEFT JOIN protocols.frame_electrode as fe ON f.id = fe.frame_id
		LEFT JOIN hardware.electrode as he ON fe.electrode_id = he.id
		GROUP BY f.id, f.duration, f.protocol_id, he.svg_denomination
		ORDER BY rank
),protocol AS (

		SELECT 
		      p.id as protocol_id
		      , array_agg(DISTINCT u.login) as authors
			  , p.name
		      , p.frame_count
		      , p.total_duration
		      , array_agg(jsonb_build_object(
		       'duration', frame.duration,
		       'electrodes', frame.electrodes
		       )) as frames
		      
		FROM protocols.protocol as p 
		LEFT JOIN protocols.authors as pa ON p.id = pa.protocol_id
		LEFT JOIN users.user as u ON pa.user_id = u.id
		LEFT JOIN frame ON p.id = frame.protocol_id
		WHERE p.id = 2
		GROUP BY p.id
)
SELECT
	jsonb_build_object(
	'id', protocol_id,
	'name', name,
	'frame_count', frame_count,
	'total_duration', total_duration,
	'frames', frames,
	'authors',  authors
	) AS protocol
FROM protocol
GROUP BY protocol_id, name, frame_count, total_duration, authors, frames