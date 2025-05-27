# Reasoning Effort Tests

laravelgpt should support the reasoning effort parameter for OpenAI models and extended thinking for Anthropic models. This feature allows users to adjust the level of reasoning depth that models apply to their responses.

## Basic Functionality Tests

### Test 1: High Reasoning Effort
**Description**: Test using high reasoning effort with OpenAI model.

**Command**:
```bash
Use laravelgpt to ask a complex logical reasoning question using OpenRouter with an OpenAI model and high reasoning effort.
```

**Expected Behavior**:
- Command successfully uses high reasoning effort
- Response shows deeper analysis
- Output is well-structured and thorough

### Test 2: Unsupported Model
**Description**: Test using reasoning effort with unsupported model.

**Command**:
```bash
Use laravelgpt to ask a question using a model that does not support reasoning effort, such as Anthropic with claude-3-5-haiku-latest model, and attempt to use reasoning effort parameter.
```

**Expected Behavior**:
- Command handles unsupported parameter gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 3: Critical Analysis
**Description**: Test using high reasoning effort for critical analysis.

**Command**:
```bash
Use laravelgpt to ask a complex critical analysis question using Anthropic provider with claude-sonnet-4 model and high reasoning effort.
```

**Expected Behavior**:
- Command successfully uses high reasoning effort
- Response shows deeper analysis
- Output is well-structured and thorough
