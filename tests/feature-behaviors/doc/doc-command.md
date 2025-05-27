# Documentation Command Behavior Tests

laravelgpt should enable users to generate comprehensive documentation for repositories. The doc command should analyze the repository structure, code patterns, and functionality to create detailed documentation.

## Basic Functionality Tests

### Test 1: Basic Documentation
**Description**: Test generating documentation for the current repository.

**Command**:
```bash
Use laravelgpt to generate documentation for the current repository.
```

**Expected Behavior**:
- Command successfully generates documentation
- Documentation is comprehensive and well-structured
- Response includes relevant sections and details

### Test 2: Save to File
**Description**: Test saving documentation to a specified output file.

**Command**:
```bash
Use laravelgpt to generate documentation for the current repository and save it to a specified output file.
```

**Expected Behavior**:
- Command successfully generates documentation
- Documentation is saved to the specified file
- File contains well-formatted content

### Test 3: Remote Repository
**Description**: Test generating documentation for a remote GitHub repository.

**Command**:
```bash
Use laravelgpt to generate documentation for a remote GitHub repository.
```

**Expected Behavior**:
- Command successfully generates documentation
- Documentation includes remote repository details
- Response is well-formatted and informative

### Test 4: Focused Documentation
**Description**: Test generating documentation with specific focus.

**Command**:
```bash
Use laravelgpt to generate documentation with a hint to focus on specific parts of the repository.
```

**Expected Behavior**:
- Command successfully generates focused documentation
- Documentation emphasizes specified areas
- Response is well-structured and relevant

### Test 5: Invalid URL
**Description**: Test handling of invalid repository URL.

**Command**:
```bash
Use laravelgpt to generate documentation for an invalid repository URL.
```

**Expected Behavior**:
- Command fails gracefully with a clear error message
- Error message explains the issue and suggests solutions

### Test 6: Empty Repository
**Description**: Test handling of empty or minimal repositories.

**Command**:
```bash
Use laravelgpt to generate documentation for an empty repository.
```

**Expected Behavior**:
- Command detects empty repository
- Provides basic structure documentation
- Includes helpful recommendation to add more code

### Test 7: Format Options
**Description**: Test different output format options.

**Command**:
```bash
# Test markdown format (default)
Use laravelgpt to generate documentation in markdown format.

# Test JSON format
Use laravelgpt to generate documentation in JSON format.

# Test HTML format
Use laravelgpt to generate documentation in HTML format.
```

**Expected Behavior**:
- Command successfully generates documentation in each format
- Markdown format is well-structured with headers and sections
- JSON format contains valid JSON with documentation content
- HTML format includes proper HTML structure and styling

### Test 8: Large Repository
**Description**: Test handling of large repositories.

**Command**:
```bash
Use laravelgpt to generate documentation for a large repository.
```

**Expected Behavior**:
- Command detects large repository size
- Shows progress indicator
- Successfully generates documentation
- Handles token limits appropriately

### Test 9: Multiple Parameters
**Description**: Test combining multiple command parameters.

**Command**:
```bash
Use laravelgpt to generate documentation with multiple parameters (format, output, provider, etc.).
```

**Expected Behavior**:
- Command successfully handles multiple parameters
- Parameters work together without conflicts
- Documentation is generated according to all specified parameters

### Test 10: Document Context
**Description**: Test including additional document context.

**Command**:
```bash
Use laravelgpt to generate documentation with additional context from external documents.
```

**Expected Behavior**:
- Command successfully fetches and includes external document content
- Documentation incorporates context from external documents
- Handles invalid document URLs gracefully

### Test 11: Missing API Keys
**Description**: Test handling of missing API keys.

**Command**:
```bash
Attempt to use laravelgpt to generate documentation when required API keys are missing.
```

**Expected Behavior**:
- Command handles missing API keys gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 12: Output Format
**Description**: Test generating documentation with specific output format.

**Command**:
```bash
Use laravelgpt to generate documentation with a specified output format.
```

**Expected Behavior**:
- Command successfully generates documentation
- Output matches specified format
- Response is well-formatted and readable

### Test 13: Custom Configuration
**Description**: Test generating documentation with custom configuration.

**Command**:
```bash
Use laravelgpt to generate documentation with a custom repomix.config.json file that modifies which files are included/excluded in the documentation.
```

**Expected Behavior**:
- Command successfully uses custom configuration
- Documentation reflects configuration settings
- Response is well-formatted and complete

### Test 14: Enhanced Documentation
**Description**: Test generating enhanced documentation with external context.

**Command**:
```bash
Generate documentation for the current repository using `laravelgpt doc`, but enhance it with context from the document at `https://www.notion.so/1d0939cee1fa8058b002ef08412bc907?pvs=4`. Use a hint like "Document the repository, explaining how the document fetching utility (src/utils/fetch-doc.ts) relates to the overall architecture."
```

**Expected Behavior**:
- Command successfully generates enhanced documentation
- Documentation includes external context
- Response is well-structured and informative

### Test 15: Configured Provider
**Description**: Test using a configured provider.

**Command**:
```bash
First, create a laravelgpt.config.json file using the content from {{path:doc-laravelgpt.config1.json}} in the repository root. Then, generate documentation. Verify that the first instance of "Trying provider: (provider)" in the command output references the configured provider.
```

**Expected Behavior**:
- Command detects and uses custom configuration
- Documentation is generated using configured provider
- Response is well-formatted and complete

### Test 16: Alternative Configuration
**Description**: Test using an alternative configuration.

**Command**:
```bash
First, create a laravelgpt.config.json file using the content from {{path:doc-laravelgpt.config2.json}} in the repository root. Then, generate documentation. Verify that the first instance of "Trying provider: (provider)" in the command output references the configured provider.
```

**Expected Behavior**:
- Command detects and uses alternative configuration
- Documentation is generated using configured provider
- Response is well-formatted and complete
