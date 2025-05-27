# YouTube Command Behavior Tests

laravelgpt should enable users to analyze YouTube videos using Gemini's video understanding capabilities. The youtube command should support various analysis types like summary, transcript, plan generation, and Q&A.

## Basic Functionality Tests

### Test 1: Generate Summary
**Description**: Test the basic functionality of generating a summary for a YouTube video.

**Command**:
```bash
Use laravelgpt to generate a summary of the YouTube video https://youtu.be/eh89VE3Mk5g?si=omgHsY9F-j0cMJdt.
```

**Expected Behavior**:
- Command successfully generates a summary of the video
- Summary includes key points and main topics
- Summary is well-formatted and readable

### Test 2: Generate Implementation Plan
**Description**: Test generating an implementation plan from a YouTube video.

**Command**:
```bash
Use laravelgpt to generate an implementation plan for publishing a npm package from the YouTube video https://youtu.be/eh89VE3Mk5g?si=omgHsY9F-j0cMJdt.
```

**Expected Behavior**:
- Command successfully generates an implementation plan
- Plan includes clear steps and instructions
- Plan is actionable and well-structured

### Test 3: Generate Transcript
**Description**: Test generating a transcript of a YouTube video.

**Command**:
```bash
Use laravelgpt to generate a transcript of a YouTube video https://www.youtube.com/watch?v=43c-Sm5GMbc
```

**Expected Behavior**:
- Command successfully generates a transcript
- Transcript is accurate and complete
- Transcript includes timestamps

### Test 4: Ask Questions
**Description**: Test asking specific questions about a YouTube video.

**Command**:
```bash
Use laravelgpt to ask a how Chris recommends to configure camera settings to reduce camera jitter when when moving your character small distances in his video https://www.youtube.com/watch?v=43c-Sm5GMbc
```

**Expected Behavior**:
- Command successfully answers the question
- Answer is relevant and accurate
- Answer includes specific details from the video

### Test 5: Different Output Formats
**Description**: Test generating output in different formats.

**Command**:
```bash
Use laravelgpt to analyze a YouTube video with different output formats (markdown, json, text).
```

**Expected Behavior**:
- Command successfully generates output in each format
- Output is properly formatted according to the specified format
- Content is consistent across formats

## Error Handling Tests

### Test 6: Invalid URL
**Description**: Test handling of invalid YouTube URLs.

**Command**:
```bash
Attempt to use laravelgpt to analyze an invalid YouTube URL.
```

**Expected Behavior**:
- Command fails gracefully
- Error message is clear and helpful
- No crash or unexpected behavior

### Test 7: Missing API Key
**Description**: Test behavior when GEMINI_API_KEY is not set.

**Command**:
```bash
Attempt to use laravelgpt with the youtube command to generate a transcript of https://www.youtube.com/watch?v=43c-Sm5GMbc without setting the GEMINI_API_KEY environment variable.
```

**Expected Behavior**:
- Command fails gracefully
- Error message clearly indicates missing API key
- Instructions for setting up API key are provided

### Test 8: Long Video
**Description**: Test handling of very long videos.

**Command**:
```bash
Attempt to use laravelgpt to analyze a very long YouTube video (1+ hour).
```

**Expected Behavior**:
- Command handles the long video appropriately
- Either processes the entire video or provides a reasonable limit
- Clear indication of any limitations or truncation

### Test 9: Age-Restricted Video
**Description**: Test handling of age-restricted videos.

**Command**:
```bash
Attempt to use laravelgpt to analyze this YouTube video: https://youtu.be/v_Kntns6Znc?si=JgyumCMp0KCdkBqa which is age restricted.
```

**Expected Behavior**:
- Command fails gracefully
- Error message indicates age restriction
- Clear explanation of limitations

### Test 10: Configuration Options
**Description**: Test respect for configuration options.

**Command**:
```bash
Verify that laravelgpt respects the model and max token configuration options in laravelgpt.config.json for the YouTube command. Try calling it with different combinations of model and max tokens. Note: Valid model options for youtube are gemini-2.5-flash-preview-05-20 and gemini-pro.
```

**Expected Behavior**:
- Command respects model configuration
- Command respects max token limits
- Clear error messages for invalid configurations
