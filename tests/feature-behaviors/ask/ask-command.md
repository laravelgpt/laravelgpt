# Ask Command Behavior Tests

laravelgpt should enable users to directly query any AI model from any provider. The ask command should handle various provider and model combinations, providing appropriate error messages when necessary.

## Basic Functionality Tests

### Test 1: Simple Question
**Description**: Test asking a simple factual question.

**Command**:
```bash
Use laravelgpt to ask a simple factual question using a specific provider and model.
```

**Expected Behavior**:
- Command successfully asks question
- Response is accurate and complete
- Output is well-formatted

### Test 2: Multiple Providers
**Description**: Test asking a question using each provider.

**Command**:
```bash
Use laravelgpt to ask a factual question using each provider:
1. OpenAI
2. Anthropic
3. OpenRouter
```

**Expected Behavior**:
- Command successfully uses each provider
- Responses are accurate and complete
- Output is well-formatted for each provider

### Test 3: Missing Provider
**Description**: Test handling missing provider.

**Command**:
```bash
Attempt to use laravelgpt to ask a question without specifying a provider.
```

**Expected Behavior**:
- Command handles missing provider gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 4: Invalid Model
**Description**: Test handling invalid model name.

**Command**:
```bash
Attempt to use laravelgpt to ask a question with a valid provider but an invalid model name.
```

**Expected Behavior**:
- Command handles invalid model gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 5: Missing API Key
**Description**: Test handling missing API key.

**Command**:
```bash
Attempt to use laravelgpt to ask a question using a provider for which no API key is configured.
```

**Expected Behavior**:
- Command handles missing API key gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 6: Long Response
**Description**: Test asking for a longer response.

**Command**:
```bash
Use laravelgpt to ask a question that requires a longer response, specifying a maximum token limit.
```

**Expected Behavior**:
- Command successfully handles long response
- Response is complete and within token limit
- Output is well-formatted

### Test 7: Debug Mode
**Description**: Test using debug option.

**Command**:
```bash
Use laravelgpt to ask a simple question with the debug option enabled.
```

**Expected Behavior**:
- Command successfully runs in debug mode
- Debug information is included in output
- Response is well-formatted

### Test 8: Save Output
**Description**: Test saving output to file.

**Command**:
```bash
Use laravelgpt to ask a question and save the output to a file.
```

**Expected Behavior**:
- Command successfully saves output
- File contains complete response
- Output is well-formatted

### Test 9: Long Question
**Description**: Test asking a very long question.

**Command**:
```bash
Use laravelgpt to ask a very long question (over 500 characters).
```

**Expected Behavior**:
- Command successfully handles long question
- Response is complete and accurate
- Output is well-formatted

### Test 10: Non-existent Model
**Description**: Test handling non-existent model.

**Command**:
```bash
Attempt to use laravelgpt to ask a question with an OpenAI provider but using a non-existent model name "o3-HUGE".
```

**Expected Behavior**:
- Command handles non-existent model gracefully
- Error message is clear and informative
- No partial or corrupted output
