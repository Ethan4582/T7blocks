import { Command } from 'commander';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';

const program = new Command();

program
  .name('t7')
  .description('T7blocks — add components to your project')
  .version('0.0.1');

program.addCommand(addCommand);
program.addCommand(listCommand);

program.parse();
