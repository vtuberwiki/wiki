import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';



async function fetchPackageFile() {
  try {
    const packageFilePath = path.join(process.cwd(), 'package.json');
    const data = await fs.readFile(packageFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error fetching package file:', err);
    throw err;
  }
}

function padString(str, direction = "right") {
  const length = Math.max(str.length, 2);
  const pad = " ".repeat(length - str.length);
  return direction === "right" ? `${str}${pad}` : `${pad}${str}`;
}

async function install() {
  try {
    const dirs = ['./Scripts'];
    const wd = process.cwd();

    for (const dir of dirs) {
      const dirPath = path.join(wd, dir);
      process.chdir(dirPath);
      const packageData = await fetchPackageFile();
      await new Promise((resolve, reject) => {
        exec('npm install', { stdio: 'ignore' }, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error installing dependencies for ${packageData.name}: ${err.message}`);
            reject(err);
            return;
          }
          const dependencies = Object.keys(packageData.dependencies);
          console.log(`Successfully installed dependencies for ${packageData.name} (${dependencies.length})`);
          dependencies.forEach(dependency => {
            console.log(`   - ${padString(dependency)}: ${packageData.dependencies[dependency]}`);
          });
          resolve();
        });
      });
    }

    process.chdir(wd);
  } catch (error) {
    console.error('An error occurred during installation:', error);
  }
}

install();