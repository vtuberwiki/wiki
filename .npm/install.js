import { exec } from 'child_process';


function install() {
  const dirs = ['.', './Scripts'];
  const wd = process.cwd();

  dirs.forEach(dir => {
    process.chdir(`${wd}/${dir}`);
    exec('npm install', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });

    process.chdir(wd);
  });
}

install();
