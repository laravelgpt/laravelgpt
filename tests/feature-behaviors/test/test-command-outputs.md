# Test Command Outputs

This test demonstrates the various output options and formats of the test command.

## Test 1: Save Output with Quiet Flag
**Description**: Test saving output to a file with quiet mode enabled.

**Command**:
```bash
Use laravelgpt to execute the test tests/feature-behaviors/test/test-command-parallel-example.md. Save the output to a file in the current directory and set the quiet flag when running laravelgpt.
```

**Expected Behavior**:
- Command successfully executes the test
- Output is saved to specified file
- No output is displayed to console (quiet mode)
- File contains complete test results

## Test 2: Save Output Without Quiet Flag
**Description**: Test saving output to a file without quiet mode.

**Command**:
```bash
Use laravelgpt to execute the test tests/feature-behaviors/test/test-command-parallel-example.md. Save the output to a file in the current directory.
```

**Expected Behavior**:
- Command successfully executes the test
- Output is saved to specified file
- Output is also displayed to console
- File and console output match

## Test 3: Debug Mode
**Description**: Test running with debug mode enabled.

**Command**:
```bash
First use laravelgpt to execute the test in tests/feature-behaviors/test/test-command-parallel-example.md. Then run the same test with the debug flag set.
```

**Expected Behavior**:
- Command successfully executes the test
- Debug output provides additional information
- Debug information is helpful for troubleshooting
- No errors or unexpected behavior

## Test 4: Report File Contents
**Description**: Test the contents of the generated report file.

**Command**:
```bash
Use laravelgpt to execute the test tests/feature-behaviors/test/test-command-parallel-example.md and save the output to a file. After the test completes, examine the report file to verify it contains detailed test results.
```

**Expected Behavior**:
- Command successfully executes the test
- Report file is created
- Report contains detailed test results
- Report format is consistent and readable
