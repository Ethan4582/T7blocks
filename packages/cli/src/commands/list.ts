import { Command } from 'commander';
import pc from 'picocolors';
import registry from '../registry.json';

export const listCommand = new Command('list')
  .description('List all available components')
  .action(() => {
    console.log(pc.bold('\nT7blocks components\n'));

    const free = Object.entries(registry).filter(([, v]) => !v.isPremium);
    const pro = Object.entries(registry).filter(([, v]) => v.isPremium);

    console.log(pc.green('Free'));
    for (const [name] of free) {
      console.log(`  ${name}`);
    }

    console.log(pc.yellow('\nPro'));
    for (const [name] of pro) {
      console.log(`  ${name}  ${pc.dim('→ pro.t7blocks.com')}`);
    }

    console.log('');
  });