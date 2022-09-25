SELECT
	json_agg("frames"."electrodes") AS frames,
	"protocols"."protocol".*
FROM
	"protocols"."protocol"
	LEFT JOIN LATERAL (
		SELECT
			/*json_agg(json_build_object('id', "protocols"."frame"."id", 'electrodes', COALESCE("electrode"."electrodes", '[]'))) AS ee */
			/*
			 "protocols"."frame"."id",
			 "protocols"."frame"."duration",
			 COALESCE("electrode"."electrodes", '[]') AS electrodes
			 */
			/* json_agg("electrode"."electrodes") */
			json_build_object(
			'duration', "protocols"."frame"."duration", 
			'electrodes', json_agg(COALESCE("electrode"."electrodes", '[]')),
			'frame_id', "protocols"."frame"."id"
			) AS electrodes
		FROM
			"protocols"."frame"
			LEFT JOIN LATERAL (
				SELECT
					json_agg(json_build_object(
					'electrode_id', "protocols"."frame_electrode"."electrode_id",
					'v', "protocols"."frame_electrode"."value"
					)) AS electrodes,
					"protocols"."frame"."id",
					"protocols"."frame"."duration"
				FROM
					"protocols"."frame_electrode"
				WHERE
					"protocols"."frame_electrode"."frame_id" = "protocols"."frame"."id") electrode ON TRUE
			WHERE
				"protocols"."frame"."protocol_id" = "protocols"."protocol"."id"
			GROUP BY
				"protocols"."frame"."id"
			ORDER BY
				"protocols"."frame"."rank") frames ON TRUE
WHERE
	"protocols"."protocol"."id" = 1
GROUP BY
	"protocols"."protocol"."id"