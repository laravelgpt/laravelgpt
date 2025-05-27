# GitHub Command Behavior Tests

laravelgpt should enable users to interact with GitHub repositories, including retrieving information about pull requests and issues. The github command and its subcommands (pr, issue) should provide a seamless interface for GitHub interactions.

## Basic Functionality Tests

### Test 1: List Pull Requests
**Description**: Test retrieving a list of recent pull requests.

**Command**:
```bash
Use laravelgpt to retrieve a list of recent pull requests from a GitHub repository.
```

**Expected Behavior**:
- Command successfully retrieves pull requests
- Results include PR numbers, titles, and status
- Response is well-formatted and informative

### Test 2: Get Pull Request Details
**Description**: Test retrieving details for a specific pull request.

**Command**:
```bash
Use laravelgpt to retrieve detailed information about a specific pull request by its number.
```

**Expected Behavior**:
- Command successfully retrieves PR details
- Results include full PR information
- Response includes relevant metadata

### Test 3: List Issues
**Description**: Test retrieving a list of recent issues.

**Command**:
```bash
Use laravelgpt to retrieve a list of recent issues from a GitHub repository.
```

**Expected Behavior**:
- Command successfully retrieves issues
- Results include issue numbers and titles
- Response is well-formatted and informative

### Test 4: Get Issue Details
**Description**: Test retrieving details for a specific issue.

**Command**:
```bash
Use laravelgpt to retrieve detailed information about a specific issue by its number.
```

**Expected Behavior**:
- Command successfully retrieves issue details
- Results include full issue information
- Response includes relevant metadata

### Test 5: Authentication Methods
**Description**: Test different authentication methods.

**Command**:
```bash
Use laravelgpt to verify that different authentication methods (environment variable, GitHub CLI, git credentials) work correctly.
```

**Expected Behavior**:
- Command successfully authenticates
- All authentication methods work
- Response indicates successful authentication

### Test 6: Authentication Failure
**Description**: Test handling of authentication failures.

**Command**:
```bash
Attempt to use laravelgpt to access GitHub resources when authentication fails.
```

**Expected Behavior**:
- Command handles authentication failure gracefully
- Error message is clear and informative
- No sensitive information is exposed

### Test 7: Private Repository Access
**Description**: Test accessing private repository resources.

**Command**:
```bash
Use laravelgpt to access resources from a private GitHub repository.
```

**Expected Behavior**:
- Command successfully accesses private resources
- Authentication is properly handled
- Results are complete and accurate

### Test 8: Non-existent Resource
**Description**: Test handling of non-existent resources.

**Command**:
```bash
Attempt to use laravelgpt to retrieve information about a non-existent pull request or issue.
```

**Expected Behavior**:
- Command handles non-existent resource gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 9: Non-existent Repository
**Description**: Test handling of non-existent repository.

**Command**:
```bash
Attempt to use laravelgpt to access resources from a non-existent GitHub repository.
```

**Expected Behavior**:
- Command handles non-existent repository gracefully
- Error message is clear and informative
- No partial or corrupted output
