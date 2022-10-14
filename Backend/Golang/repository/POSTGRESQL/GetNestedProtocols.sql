SELECT np.parent_protocol_id, p.name
FROM protocols.nested_protocols as np JOIN protocols.protocol as p
ON(np.parent_protocol_id = p.id)
WHERE np.child_protocol_id = 4 AND depth!=0 ORDER BY depth DESC