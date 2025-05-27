# Test Command Parallel Example

This test demonstrates the parallel execution capabilities of the test command.

## Test 1: Simple Question
**Description**: Test asking a simple question.

**Command**:
```bash
Use laravelgpt to ask a simple question: "What is 2+2?"
```

**Expected Behavior**:
- Command successfully answers the question
- Response is correct and immediate
- No errors or delays

## Test 2: Longer Processing Question
**Description**: Test asking a question that requires more processing time.

**Command**:
```bash
Use laravelgpt to ask a question that will take longer to process: "Write a 10-step outline for creating a web application using React, including details on state management, routing, and API integration."
```

**Expected Behavior**:
- Command successfully processes the longer question
- Response is comprehensive and well-structured
- No timeout or performance issues

## Test 3: Another Simple Question
**Description**: Test asking another simple question to verify parallel execution.

**Command**:
```bash
Use laravelgpt to ask another simple question: "What is the capital of France?"
```

**Expected Behavior**:
- Command successfully answers the question
- Response is correct and immediate
- No interference from other running commands 