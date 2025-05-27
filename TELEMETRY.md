# Telemetry Documentation

The telemetry infrastructure for `laravelgpt` is designed to collect anonymous usage data to help improve the tool. It involves:

1. Client-side data collection within the `laravelgpt` CLI
2. Server-side data processing and storage
3. Data analysis and reporting

## Data Collection

The following data is collected:

- **command**: The `laravelgpt` command executed (e.g., `repo`, `web`, `plan`)
- **timestamp**: When the command was executed
- **duration**: How long the command took to complete
- **success**: Whether the command completed successfully
- **error**: Any error messages (if applicable)
- **provider**: The AI provider used (if applicable)
- **model**: The AI model used (if applicable)
- **tokens**: Number of tokens used (if applicable)

## User Identification

- A `userId` is generated (UUID) and stored in `~/.laravelgpt/diagnostics.json`
- The `userId` is used to track usage patterns while maintaining anonymity
- No personal information is collected or stored

## Data Storage

- Data is stored in a secure cloud storage system
- Data is encrypted at rest
- Data is retained for 30 days
- Data is used only for improving the tool

## Opting Out

Users can opt out of telemetry by:

1. Setting the `LARAVELGPT_TELEMETRY_DISABLED` environment variable to `true`
2. Running `laravelgpt config set telemetry.disabled true`
3. Deleting the `~/.laravelgpt/diagnostics.json` file

## Data Usage

The collected data is used to:

1. Identify common usage patterns
2. Detect and fix bugs
3. Improve performance
4. Guide feature development
5. Monitor system health

## Privacy

- No personal information is collected
- Data is anonymized before storage
- Data is not shared with third parties
- Data is used only for improving the tool 