import { exec } from 'child_process';
import axios from 'axios';


export function checkGitInstallation(): Promise<string | null> {

  return new Promise((resolve, reject) => {
    // Check if Git is installed
    exec('git --version', (error, stdout, stderr) => {
      if (error || stderr) {
        reject(new Error('Git is not installed. Please install Git and try again.'));
      } else {
        // Git is installed, try to get user's authenticated name
        exec('git config user.email', async (userError, userStdout, userStderr) => {
          if (userError || userStderr) {
            reject(new Error('Failed to retrieve Git email.'));
          } else {
            const gitUserEmail = userStdout.trim();

            try {
              const { data } = await axios.get(`https://api.github.com/search/users?q=${gitUserEmail}`, {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                }
              });
              const name = data.items[0].login;

              resolve(name);
            } catch (axiosError) {
              reject(new Error('Failed to fetch user data from GitHub API.'));
            }
          }
        });
      }
    });
  });
}

