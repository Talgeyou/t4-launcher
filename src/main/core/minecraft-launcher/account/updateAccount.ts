import path from 'path';
import fs from 'fs';
import { Account } from 'renderer/entities/account';

export default function updateAccount(minecraftRoot: string, account: Account) {
  const dirPath = path.resolve(minecraftRoot);
  const filePath = path.resolve(`${dirPath}\\t4-launcher_account.json`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }

  fs.writeFileSync(filePath, JSON.stringify(account));
}
