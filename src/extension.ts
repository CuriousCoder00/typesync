import * as vscode from "vscode";
import * as path from "path";
const player = require("play-sound")();

// this method is called when your extension is activate

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "typesync" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("typesync.helloWorld", () => {
      vscode.window.showInformationMessage("Typewriter opened from TypeSync!");
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(() => {
      playTypewriterSound(context);
    })
  );
}

function playTypewriterSound(context: vscode.ExtensionContext) {
  const soundPath = path.join(context.extensionPath, "assets", "sound.wav");
  console.log(soundPath);
  player
    .play()
    .catch((err: unknown) => console.error("Error playing sound:", err));
}

// this method is called when your extension is deactivated

export function deactivate() {}
