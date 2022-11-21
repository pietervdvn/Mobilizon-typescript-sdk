# Mobilizon-bot

Usage:

Create a `config.json`-file containing:

```Json

{
  "email": "<emailaddress for the bot>",
  "password": "<password for the bot>",
  "server": "<server>"
}
```

Run `ts-node index.ts <path/cofing.json>`. 

If the bot account did not exist yet, you'll receive a email confirming the signup. Create one identity for the bot.

Next, add the bot as moderator or administrator to the group you want to import an ics-feed for. Run the command again.
The bot will now accept the invitation. (Note: Mobilizon might forget the assigned role, promote the bot to admin if needed)
Add the link into the description, together with a frequency (optional). E.g., add `The feed from https://example.org/calendar.ics will be automatically imported`.
Run the script again and the import will start.