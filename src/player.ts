const cp = require("child_process");
const path = require("path");
const player = require("play-sound")();

const _playerWindowsPath = path.join(__dirname, "..", "assets");

export default {
  play(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cp.execFile(_playerWindowsPath, [filePath]);
      resolve();
      player.play(filePath, (err: any) => {
        if (err) {
          console.error(
            "Error playing sound:",
            filePath,
            " - Description:",
            err
          );
          return reject(err);
        }
        resolve();
      });
    });
  },
};
