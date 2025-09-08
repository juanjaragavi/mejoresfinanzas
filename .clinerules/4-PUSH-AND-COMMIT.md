# Push and Commit Guidelines

## Trigger

This procedure is initiated when the user issues the prompt "Push and commit our latest changes." following a successful development cycle.

### Steps

1. **Initialize Commit Message File**:
   Clear the contents of the @/lib/documents/commit-message.txt file.

2. **Verify Codebase Status**:
   Query the current status of the codebase using your `git_status` MCP server with the following request body:

   ```json
   {
     "repo_path": "/Users/macbookpro/GitHub/mejoresfinanzas"
   }
   ```

3. **Formulate Commit Message**:
   Populate the @/lib/documents/commit-message.txt file with a message that accurately describes the latest modifications.

4. **Execute Workflow Script**:
   Run the `pnpm workflow` command to execute the workflow automation script.
   - When prompted "Do you want to merge changes into main and backup branches? (y/n):", respond with "y" to proceed.
   - For non-interactive execution, use: `printf "y\n" | pnpm workflow`
