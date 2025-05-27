# Repository Command Behavior Tests

laravelgpt should enable users to analyze repository context and answer questions about the codebase. The repo command should leverage AI models to understand the repository structure, code patterns, and provide meaningful insights.

## Basic Functionality Tests

### Test 1: Basic Repository Analysis
**Description**: Test basic repository analysis functionality.

**Command**:
```bash
Use laravelgpt to ask a simple question about the current repository's structure or functionality.
```

**Expected Behavior**:
- Command successfully analyzes repository
- Response is relevant and accurate
- Response includes specific code references

### Test 2: Multiple Providers
**Description**: Test repository analysis with different providers.

**Command**:
```bash
Use laravelgpt to ask the same question about the repository using different providers and models. Test both the `--provider` parameter and the `--model` parameter in separate commands.
```

**Expected Behavior**:
- Command works with each supported provider
- Results are consistent across providers
- Provider-specific features are utilized appropriately

### Test 3: Complex Analysis
**Description**: Test analyzing complex repository features.

**Command**:
```bash
Use laravelgpt to ask a complex question about the repository that requires understanding multiple parts of the codebase.
```

**Expected Behavior**:
- Command successfully analyzes complex relationships
- Response synthesizes information effectively
- Response includes relevant code examples

### Test 4: Save Results
**Description**: Test saving analysis results to a file.

**Command**:
```bash
Use laravelgpt to analyze the repository and save the results to a file.
```

**Expected Behavior**:
- Command successfully saves results
- File is created with correct format
- Content is properly saved and readable

## Error Handling Tests

### Test 5: Invalid Provider/Model
**Description**: Test handling of invalid providers and models.

**Command**:
```bash
Attempt to use laravelgpt to analyze the repository using both an invalid provider and an invalid model in separate commands.
```

**Expected Behavior**:
- Command fails gracefully
- Error message is clear and helpful
- No crash or unexpected behavior

### Test 6: Missing API Key
**Description**: Test behavior when API keys are missing.

**Command**:
```bash
Attempt to use laravelgpt to analyze the repository using the gemini provider when no API key is configured. To simulate this, set CURSOR_TOOLS_ENV_UNSET=GEMINI_API_KEY when running the command and specify the gemini provider.
```

**Expected Behavior**:
- Command fails gracefully
- Error message clearly indicates missing API key
- Instructions for setting up API key are provided

### Test 7: Token Limits
**Description**: Test handling of token limits.

**Command**:
```bash
Use laravelgpt to analyze the repository with a specified token limit for the response.
```

**Expected Behavior**:
- Command respects token limits
- Response is truncated appropriately
- Clear indication of truncation if applicable

### Test 8: Specific Feature Analysis
**Description**: Test analyzing specific features.

**Command**:
```bash
Use laravelgpt to ask about how a specific feature or function works in the repository.
```

**Expected Behavior**:
- Command successfully analyzes specific feature
- Response includes relevant code examples
- Response explains feature functionality clearly

### Test 9: Architecture Overview
**Description**: Test getting repository architecture overview.

**Command**:
```bash
Use laravelgpt to ask for an overview of the repository's architecture and design patterns.
```

**Expected Behavior**:
- Command successfully analyzes architecture
- Response provides clear overview
- Response includes key design patterns

### Test 10: Invalid API Key
**Description**: Test behavior with invalid API keys.

**Command**:
```bash
Attempt to use laravelgpt to analyze the repository without setting explicit provider and model when an invalid GEMINI_API_KEY is present. To simulate this, set GEMINI_API_KEY=invalid and do not specify a provider.
```

**Expected Behavior**:
- Command fails gracefully
- Error message indicates invalid API key
- Clear instructions for fixing the issue

### Test 11: Repository Ignore
**Description**: Test repository ignore functionality.

**Command**:
```bash
We're going to verify that laravelgpt repo respects the .repomixignore file. First check that the .repomixignore file is either empty or not present. Use laravelgpt to analyze the repository, note how many tokens are used.
```

**Expected Behavior**:
- Command respects .repomixignore file
- Ignored files are not analyzed
- Token usage is reduced appropriately

### Test 12: Subdirectory Analysis
**Description**: Test analyzing specific subdirectories.

**Command**:
```bash
Use laravelgpt to analyze a specific subdirectory of the repository instead of the entire repository by using the `--subdir` parameter.
```

**Expected Behavior**:
- Command successfully analyzes subdirectory
- Response focuses on subdirectory content
- No analysis of other directories

### Test 13: Invalid Subdirectory
**Description**: Test handling of invalid subdirectories.

**Command**:
```bash
Attempt to use laravelgpt to analyze a non-existent subdirectory using the `--subdir` parameter.
```

**Expected Behavior**:
- Command fails gracefully
- Error message indicates invalid subdirectory
- Clear instructions for fixing the issue

### Test 14: Custom Config
**Description**: Test using custom configuration.

**Command**:
```bash
Use laravelgpt to analyze the repository with a custom repomix.config.json file that modifies which files are included/excluded.
```

**Expected Behavior**:
- Command respects custom configuration
- Files are included/excluded as specified
- Response reflects configuration changes

### Test 15: External Repository
**Description**: Test analyzing external repository.

**Command**:
```bash
Use laravelgpt to analyze the kaito-http/kaito GitHub repository and ask "How kaito UWS gets the remote address for a request".
```

**Expected Behavior**:
- Command successfully analyzes external repository
- Response includes relevant code examples
- Response explains the specific functionality

### Test 16: Large Repository
**Description**: Test analyzing a large repository.

**Command**:
```bash
Use laravelgpt to analyze the facebook/react GitHub repository, which is a very large codebase likely to exceed size limits.
```

**Expected Behavior**:
- Command handles large repository appropriately
- Response indicates any size limitations
- Clear explanation of analysis scope

### Test 17: With Documentation
**Description**: Test analyzing repository with documentation.

**Command**:
```bash
Use laravelgpt to analyze the repository with documentation. Using `laravelgpt repo --with-doc "https://www.notion.so/1d0939cee1fa8058b002ef08412bc907?pvs=4" "Explain how the retry mechanism in src/utils/fetch-doc.ts helps achieve the goals mentioned in the RAG document".
```

**Expected Behavior**:
- Command successfully analyzes repository with docs
- Response integrates documentation context
- Response explains retry mechanism clearly

### Test 18: Custom Provider Config
**Description**: Test using custom provider configuration.

**Command**:
```bash
First, create a laravelgpt.config.json file using the content from {{path:repo-laravelgpt.config1.json}} in the repository root. Then, use laravelgpt to analyze the repository. Verify that the first instance of "Trying provider: (provider)" in the command output references the configured provider. The test passes ONLY if the very FIRST instance of "Trying provider:" references the configured provider.

After completing the test, please clean up by deleting the laravelgpt.config.json file that you created.
```

**Expected Behavior**:
- Command uses configured provider
- Provider is correctly referenced in output
- Configuration is properly applied

### Test 19: Alternative Provider Config
**Description**: Test using alternative provider configuration.

**Command**:
```bash
First, create a laravelgpt.config.json file using the content from {{path:repo-laravelgpt.config2.json}} in the repository root. Then, use laravelgpt to analyze the repository. Verify that the first instance of "Trying provider: (provider)" in the command output references the configured provider. The test passes ONLY if the very FIRST instance of "Trying provider:" references the configured provider.

After completing the test, please clean up by deleting the laravelgpt.config.json file that you created.
```

**Expected Behavior**:
- Command uses configured provider
- Provider is correctly referenced in output
- Configuration is properly applied