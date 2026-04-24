import { Command } from 'commander';
import ora from 'ora';
import pc from 'picocolors';
import fs from 'fs';
import path from 'path';
import { fetchComponent } from '../utils/fetch-component';
import { writeComponentFile } from '../utils/write-file';
import registry from '../registry.json';

type RegistryEntry = typeof registry[keyof typeof registry];

function getTargetDir(): string {
  const cwd = process.cwd();
  const candidates = ['components', 'src/components', 'app/components'];
  const existing = candidates.find((c) => fs.existsSync(path.join(cwd, c)));
  const base = existing ? path.join(cwd, existing) : path.join(cwd, 'components');
  return path.join(base, 'T7blocks');
}
export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component name (e.g. pop-hero)')
  .action(async (componentName: string) => {

    // Resolve "pop-hero" → "hero/pop-hero"
    const resolvedKey = Object.keys(registry).find(
      (k) => k.split('/')[1] === componentName
    );

    if (!resolvedKey) {
      console.log(pc.red(`\nComponent "${componentName}" not found.`));
      console.log(pc.dim('Run: npx @t7blocks/cli list\n'));
      process.exit(1);
    }

    const [category] = resolvedKey.split('/');
    const entry = registry[resolvedKey as keyof typeof registry] as RegistryEntry;

    if (entry.isPremium) {
      console.log(pc.yellow('\n⭐  This is a Pro component.'));
      console.log(pc.dim('Visit https://pro.t7blocks.com to get access.\n'));
      process.exit(0);
    }

   const targetDir = getTargetDir();
    fs.mkdirSync(targetDir, { recursive: true });

    const spinner = ora(`Adding ${componentName}...`).start();

    try {
      for (const file of entry.files) {
        const code = await fetchComponent(file.url);
        await writeComponentFile(file.name, code, targetDir);
      }

      spinner.succeed(pc.green(`Added ${componentName}`));
     console.log(pc.dim(`\nLocation: components/T7blocks/${componentName}`));

      if (entry.dependencies.length > 0) {
        console.log(pc.dim(`\nInstall dependencies:`));
        console.log(pc.cyan(`  pnpm add ${entry.dependencies.join(' ')}\n`));
        // or npm install command
        console.log(pc.cyan(`  npm install ${entry.dependencies.join(' ')}\n`));
      }
    } catch (err) {
      spinner.fail(pc.red('Failed to add component'));
      console.error(err);
      process.exit(1);
    }
  });