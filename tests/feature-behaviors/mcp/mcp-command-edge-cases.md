# MCP Command Edge Cases

Tests edge cases and error handling scenarios for laravelgpt MCP command interactions, focusing on server configuration, database access issues, and tool-specific edge cases.

## Test Scenarios

### Test 1: Server Override
**Description**: Test using a server override parameter.

**Command**:
```bash
Use laravelgpt to execute the SQLite MCP server's `read_query` tool with a server override parameter to query the test database at {{path:test.db}}. Run a SELECT query to get all users from the users table.
```

**Expected Behavior**:
- Command successfully executes with server override
- Results are accurate and complete
- Response includes query results

### Test 2: Invalid Table Schema
**Description**: Test handling of invalid table schema.

**Command**:
```bash
Attempt to use laravelgpt to execute the SQLite MCP server's `create_table` tool with an invalid table schema (missing required fields). When running this command include instructions not to retry the table creation.
```

**Expected Behavior**:
- Command handles invalid schema gracefully
- Error message is clear and informative
- No table is created

### Test 3: Pagination
**Description**: Test basic pagination functionality.

**Command**:
```bash
Use laravelgpt to execute the SQLite MCP server's `read_query` tool to test basic pagination by:
1. Querying the users table
2. Limiting results to 5 per page
3. Requesting the second page of results
```

**Expected Behavior**:
- Command successfully implements pagination
- Results are limited to 5 items
- Second page of results is returned
- Response includes pagination metadata
