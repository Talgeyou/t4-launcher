import fs from 'fs';
import axios from 'axios';

export default async function downloadFile(path: string, url: string) {
  const writeStream = fs.createWriteStream(path);

  return axios
    .get(url, {
      responseType: 'stream',
    })
    .then((response) => {
      return new Promise<string | null>((resolve, reject) => {
        response.data.pipe(writeStream);

        let error: Error | null = null;

        writeStream.on('error', (writeError) => {
          error = writeError;
          writeStream.close();
          reject(writeError);
        });
        writeStream.on('close', () => {
          if (!error) {
            resolve(path);
          }
        });
      });
    })
    .catch((e) => e);
}
