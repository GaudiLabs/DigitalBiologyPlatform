SELECT
	"protocols"."frame"."id",
	"protocols"."frame"."duration",
	COALESCE("frames"."electrodes", '[]') AS electrodes
FROM
	"protocols"."frame"
	LEFT JOIN LATERAL (
		SELECT
			json_agg(json_build_object('id', "protocols"."frame_electrode"."electrode_id", 'v', "protocols"."frame_electrode"."value")) AS electrodes
		FROM
			"protocols"."frame_electrode"
		WHERE
			"protocols"."frame_electrode"."frame_id" = "protocols"."frame"."id") frames ON TRUE
WHERE
	"protocols"."frame"."protocol_id" = 1
ORDER BY
	"protocols"."frame"."rank"