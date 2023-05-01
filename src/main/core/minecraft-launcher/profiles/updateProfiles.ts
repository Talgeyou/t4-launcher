import path from 'path';
import fs from 'fs';
import { Profile } from 'renderer/entities/profile';

export default function updateProfiles(
  minecraftRoot: string,
  profiles: Record<string, Profile>
) {
  const dirPath = path.resolve(minecraftRoot);
  const filePath = path.resolve(`${minecraftRoot}\\launcher_profiles.json`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }

  fs.writeFileSync(filePath, JSON.stringify({ profiles }));
}
