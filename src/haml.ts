const spawn = require('child_process').spawn;

export default function(source: string) {
  return new Promise<string>((resolve, reject) => {
    try {
      let result = '';
      const haml = spawn('haml', ['-s']);
      haml.stdin.write(source);
      haml.stdin.end();
      haml.stdout.on('data', (data: any) => {
        result = result + data;
      });
      haml.stderr.on('data', (data: any) => {
        reject(data.toString('utf8'));
      });

      haml.on('close', (code: number) => {
        if (code === 0) {
          resolve(result);
        }
        else {
          reject('haml exited with code ' + code);
        }
      });
    }
    catch(err) {
      reject(err);
    }
  });
}
