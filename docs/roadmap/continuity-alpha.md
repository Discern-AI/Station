# Continuity Alpha

This bundle extends Studio Alpha with:

- memory CRUD scaffolding
- canon CRUD scaffolding
- file and import route scaffolding
- save-from-chat endpoints
- first continuity selection helper for prompt building
- updated Studio pages for memory, canon, and files

## Important notes

The API still uses an in-memory mock store for local development.
Your CTO should replace these arrays with real database repositories once Supabase persistence is wired in.

## New route groups

- `/memory`
- `/canon`
- `/imports`
- `/persona-files`
- save actions on `/conversations/:conversationId/save-memory`
- save actions on `/conversations/:conversationId/save-canon`
