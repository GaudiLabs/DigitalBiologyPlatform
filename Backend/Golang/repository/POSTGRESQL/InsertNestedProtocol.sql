INSERT INTO protocols.nested_protocols(parent_protocol_id, child_protocol_id, depth)
SELECT np.parent_protocol_id, nc.child_protocol_id, np.depth+nc.depth+1
FROM protocols.nested_protocols np, protocols.nested_protocols nc
WHERE np.child_protocol_id = 2 AND nc.parent_protocol_id = 4