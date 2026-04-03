import fs from 'fs';
import path from 'path';
import prompts from 'prompts';

export async function writeComponentFile(filename: string, content: string): Promise<void> {
  const dir = path.join(process.cwd(), 'components', 'ui');
  const filepath = path.join(dir, filename);

  if (fs.existsSync(filepath)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `${filename} already exists. Overwrite?`,
      initial: false,
    });
    if (!overwrite) {
      console.log(`Skipped ${filename}`);
      return;
    }
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, content, 'utf-8');
}