# Commands
Each folder contains a command that has a Trigger and a command that will execute when the trigger is true.

## Execution
When a message is received from discord it loops through *ALL* the commands.  Each command with the trigger returning TRUE will execute.  A message may have none or many commands being executed.

## To Make a New Command
1. Create a folder under *commands*
1. Impliment ICommand. Add trigger and command
1. Add new command to *commandlist.ts*