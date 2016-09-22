import * as fs from 'fs';
/**
 * @brief      Reads a file thunk.
 *
 * @param      src      The source
 * @param      resolve  The resolve
 * @param      reject   The reject
 * @param      err      The error
 * @param      data     The data
 *
 * @return     a promise of string
 */
export function readFileThunk(src):Promise<string>{
  return new Promise<string>(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err:NodeJS.ErrnoException, data:string) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}