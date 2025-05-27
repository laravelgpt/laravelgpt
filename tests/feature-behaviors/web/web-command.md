# Web Command Behavior Tests

laravelgpt should enable users to search the web for information using AI models that support web search capabilities. The web command should work with various supported providers (Perplexity, Gemini, etc.) and handle different output formats and error cases appropriately.

## Basic Functionality Tests

### Test 1: Basic Web Search
**Description**: Test basic web search functionality.

**Command**:
```bash
Use laravelgpt to search the web for information about a recent technology topic. Do not specify the current date.
```

**Expected Behavior**:
- Command successfully performs web search
- Results are relevant and informative
- Response is well-formatted and readable

### Test 2: Multiple Providers
**Description**: Test web search with different providers.

**Command**:
```bash
Use laravelgpt to search the web for the same information using each supported provider that has web search capabilities:
```

**Expected Behavior**:
- Command works with each supported provider
- Results are consistent across providers
- Provider-specific features are utilized appropriately

### Test 3: Save Results
**Description**: Test saving search results to a file.

**Command**:
```bash
Use laravelgpt to search the web for information and save the results to a file.
```

**Expected Behavior**:
- Command successfully saves results
- File is created with correct format
- Content is properly saved and readable

### Test 4: Token Limits
**Description**: Test handling of token limits.

**Command**:
```bash
Use laravelgpt to search the web for information that might require a lengthy response, but limit the response using the max-tokens parameter.
```

**Expected Behavior**:
- Command respects token limits
- Response is truncated appropriately
- Clear indication of truncation if applicable

## Error Handling Tests

### Test 5: Invalid Provider
**Description**: Test handling of invalid providers.

**Command**:
```bash
Attempt to use laravelgpt to search the web using a provider that doesn't support web search or doesn't exist:
```

**Expected Behavior**:
- Command fails gracefully
- Error message is clear and helpful
- No crash or unexpected behavior

### Test 6: Missing API Key
**Description**: Test behavior when API keys are missing.

**Command**:
```bash
Attempt to use laravelgpt to search the web using a provider for which no API key is configured. To do this you will have to explicitly set one of the API key environment variables to an empty string.
```

**Expected Behavior**:
- Command fails gracefully
- Error message clearly indicates missing API key
- Instructions for setting up API key are provided

### Test 7: Complex Topics
**Description**: Test handling of complex search topics.

**Command**:
```bash
Use laravelgpt to search the web for information about a complex topic that requires synthesizing information from multiple sources.
```

**Expected Behavior**:
- Command successfully handles complex queries
- Results synthesize information effectively
- Response is coherent and well-structured

### Test 8: Time-Sensitive Information
**Description**: Test handling of time-sensitive searches.

**Command**:
```bash
Use laravelgpt to search the web for recent news or time-sensitive information.
```

**Expected Behavior**:
- Command successfully retrieves recent information
- Results are up-to-date
- Timestamps or dates are included where relevant

### Test 9: Domain-Specific Search
**Description**: Test searching within specific domains.

**Command**:
```bash
Use laravelgpt to search the web for information with a focus on a specific domain or website.
```

**Expected Behavior**:
- Command successfully searches within specified domain
- Results are relevant to the domain
- Domain context is maintained

### Test 10: Invalid API Key
**Description**: Test behavior with invalid API keys.

**Command**:
```bash
Attempt to use laravelgpt to search the web without setting a provider when the PERPLEXITY_API_KEY is invalid. To do this you will have to explicitly set PERPLEXITY_API_KEY="invalid" when running laravelgpt.
```

**Expected Behavior**:
- Command fails gracefully
- Error message indicates invalid API key
- Clear instructions for fixing the issue
