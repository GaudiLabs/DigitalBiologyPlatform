WITH frame AS (
		SELECT 
			    f.id as frame_id
			   , f.duration
			   , f.rank
			   , f.protocol_id
			   , jsonb_agg(jsonb_build_object('electode_id', fe.electrode_id, 'value', fe.value)) as electrodes
		FROM protocols.frame f 
		LEFT JOIN protocols.frame_electrode fe ON f.id = fe.frame_id
		--WHERE frame_id = 4
		GROUP BY f.id, f.duration, f.rank, f.protocol_id
		ORDER BY rank
),protocol AS (

		SELECT 
		      p.id as protocol_id
			  , p.name
		      , p.frame_count
		      , p.total_duration
		      , jsonb_build_object('rank' ,frame.rank ,'duration', frame.duration, 'electrode', frame.electrodes) as frames
		      
		FROM protocols.protocol p 
		JOIN frame ON p.id = frame.protocol_id
		WHERE p.id = 1
)
SELECT 
	protocol_id
	, name
	, frame_count
	, total_duration
	,  jsonb_agg(jsonb_build_object('frames', frames)) as frames
FROM protocol
GROUP BY protocol_id, name, frame_count, total_duration