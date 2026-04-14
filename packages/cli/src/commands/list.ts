import { Command } from 'commander';
import pc from 'picocolors';
import registry from '../registry.json';

export const listCommand = new Command('list')
  .description('List all available components')
  .action(() => {
    const grouped: Record<string, string[]> = {};

    Object.keys(registry).forEach((key) => {
      const [category, name] = key.split('/');
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(name);
    });

    const { hero, ...rest } = grouped;

    console.log('');
    console.log(pc.bold(pc.white('  ┌─ T7Blocks ─────────────────────┐')));
    console.log('');

    Object.entries(rest).forEach(([category, names]) => {
      console.log(`  ${pc.bold(pc.cyan('  ' + category.toUpperCase()))}`);
      names.forEach((name, i) => {
        const isLast = i === names.length - 1;
        console.log(`    ${pc.dim(isLast ? '└──' : '├──')} ${pc.white(name)}`);
      });
      console.log('');
    });

    if (hero?.length) {
      console.log(`  ${pc.bold(pc.magenta('  HERO'))}`);
      hero.forEach((name, i) => {
        const isLast = i === hero.length - 1;
        console.log(`    ${pc.dim(isLast ? '└──' : '├──')} ${pc.white(name)}`);
      });
      console.log('');
    }

    console.log(pc.bold(pc.white('  └──────────────────────────────────┘')));
    console.log('');
    console.log(pc.dim(`  Run: npx @t7blocks/cli add <name>`));
    console.log('');
  });