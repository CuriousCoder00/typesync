import * as vscode from "vscode";
import * as path from "path";
import player from "./player";
import { debounce } from "lodash";
let listener: EditorListener;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "typesync" is now active!');
  listener = listener || new EditorListener(player);
  vscode.commands.registerCommand("typesync.on", () => {
    vscode.window.showInformationMessage(
      "TypeSync has been activated try typing to hear typewriter sound!"
    );
  });
}

export function deactivate() {}

export class EditorListener {
  private _disposable: vscode.Disposable;
  private _subscriptions: vscode.Disposable[] = [];
  private _basePath: string = path.join(__dirname, "../src");

  // Audio files
  private _typeWritterAudio = path.join(this._basePath, "assets", "sound.wav");

  constructor(private player: any) {
    vscode.workspace.onDidChangeTextDocument(
      this._keystrokeCallback,
      this,
      this._subscriptions
    );
    this._disposable = vscode.Disposable.from(...this._subscriptions);
    this.player = {
      play: (filePath: string) => player.play(filePath),
    };
  }

  _keystrokeCallback = debounce(
    (event: vscode.TextDocumentChangeEvent) => {
      let activeDocument =
        vscode.window.activeTextEditor &&
        vscode.window.activeTextEditor.document;
      if (
        event.document !== activeDocument ||
        event.contentChanges.length === 0
      ) {
        return;
      }

      let pressedKey = event.contentChanges[0].text;

      // check if the key pressed is a letter or a number
      if (pressedKey.match(/[a-zA-Z0-9]/)) {
        this.player.play(this._typeWritterAudio);
      }
      if (event.contentChanges[0].rangeLength === 1) {
        this.player.play(this._typeWritterAudio);
      }
    },
    10,
    { leading: true }
  );

  dispose() {
    this._disposable.dispose();
  }
}
