import { Command } from 'commander';
import ora from 'ora';
import pc from 'picocolors';
import { fetchComponent } from '../utils/fetch-component';
import { writeComponentFile } from '../utils/write-file';
import registry from '../registry.json';

type RegistryKey = keyof typeof registry;

export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component name (e.g. magnetic-button)')
  .action(async (componentName: string) => {
    const entry = registry[componentName as RegistryKey];

    if (!entry) {
      console.log(pc.red(`\nComponent "${componentName}" not found.`));
      console.log(pc.dim('Run: t7 list\n'));
      process.exit(1);
    }

    if (entry.isPremium) {
      console.log(pc.yellow('\n⭐  This is a Pro component.'));
      console.log(pc.dim('Visit https://pro.t7blocks.com to get access.\n'));
      process.exit(0);
    }

    const spinner = ora(`Adding ${componentName}...`).start();

    try {
      for (const file of entry.files) {
        const code = await fetchComponent(file.url);
        await writeComponentFile(file.name, code);
      }
      spinner.succeed(pc.green(`Added ${componentName}`));

      if (entry.dependencies.length > 0) {
        console.log(pc.dim(`\nInstall dependencies:`));
        console.log(pc.cyan(`  pnpm add ${entry.dependencies.join(' ')}\n`));
      }
    } catch (err) {
      spinner.fail(pc.red('Failed to add component'));
      console.error(err);
      process.exit(1);
    }
  });