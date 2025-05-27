# Browser Command Behavior Tests

laravelgpt should enable users to interact with web pages through browser automation capabilities, including opening pages, performing actions, observing elements, and extracting content.

## Basic Functionality Tests

### Test 1: Basic Page Content
**Description**: Test opening a page and verifying its content.

**Command**:
```bash
Use laravelgpt to open a test page running on localhost:3000/test.html and verify its basic content.
```

**Expected Behavior**:
- Command successfully opens the page
- Content is correctly identified
- Response is well-formatted and informative

### Test 2: HTML Content
**Description**: Test capturing HTML content.

**Command**:
```bash
Use laravelgpt to open a test page running on localhost:3000/test.html and capture its HTML content.
```

**Expected Behavior**:
- Command successfully captures HTML
- Content is complete and accurate
- Response includes HTML structure

### Test 3: Console Logs
**Description**: Test capturing console logs.

**Command**:
```bash
Use laravelgpt to open a test page (console-log-test.html) that outputs console logs and capture those logs.
```

**Expected Behavior**:
- Command successfully captures console logs
- Logs are complete and accurate
- Response includes all log entries

### Test 4: Button Interaction
**Description**: Test clicking a button.

**Command**:
```bash
Use laravelgpt to interact with a page containing a button (button.html) and click that button.
```

**Expected Behavior**:
- Command successfully clicks button
- Button click is registered
- Response confirms action

### Test 5: Text Extraction
**Description**: Test extracting text content.

**Command**:
```bash
Use laravelgpt to extract text content from paragraphs on a test page.
```

**Expected Behavior**:
- Command successfully extracts text
- Content is complete and accurate
- Response is well-formatted

### Test 6: Interactive Elements
**Description**: Test identifying interactive elements.

**Command**:
```bash
Use laravelgpt to identify and describe interactive elements on a test page (interactive-test.html).
```

**Expected Behavior**:
- Command successfully identifies elements
- Elements are correctly described
- Response is well-formatted

### Test 7: Session Management
**Description**: Test connecting to existing session.

**Command**:
```bash
Use laravelgpt to connect to an existing browser session, perform multiple operations while preserving state.
```

**Expected Behavior**:
- Command successfully connects to session
- State is preserved between operations
- Response confirms actions

### Test 8: Missing Playwright
**Description**: Test handling missing Playwright.

**Command**:
```bash
Attempt to use laravelgpt browser functionality when Playwright is not installed.
```

**Expected Behavior**:
- Command handles missing dependency gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 9: Invalid URL
**Description**: Test handling invalid URL.

**Command**:
```bash
Attempt to use laravelgpt to open a non-existent or invalid URL.
```

**Expected Behavior**:
- Command handles invalid URL gracefully
- Error message is clear and informative
- No partial or corrupted output

### Test 10: Action Sequence
**Description**: Test performing multiple actions.

**Command**:
```bash
Use laravelgpt to perform a sequence of actions on a page (click a button, enter text in a field, submit a form).
```

**Expected Behavior**:
- Command successfully performs all actions
- Actions are executed in sequence
- Response confirms completion 