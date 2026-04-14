import fs from 'fs';
import path from 'path';
import prompts from 'prompts';

export async function writeComponentFile(
  filename: string,
  content: string,
  targetDir: string
): Promise<void> {
  const filepath = path.join(targetDir, filename);

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

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(filepath, content, 'utf-8');
}