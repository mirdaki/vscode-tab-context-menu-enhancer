import * as vscode from 'vscode';
import * as path from 'path';

export const copyFileNameCommand = 'tab-context-menu-enhancer.copy-file-name';

export function activate(context: vscode.ExtensionContext) {
	console.log('tab-context-menu-enhancer" is now active!');

	let copyNameDisposable = vscode.commands.registerCommand(copyFileNameCommand, () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const fullPath = activeEditor.document.fileName;
			const fileName = path.basename(fullPath);
			vscode.env.clipboard.writeText(fileName).then(() => {
				vscode.window.showInformationMessage(`Copied file name to clipboard`);
			});
		}
	});

	context.subscriptions.push(copyNameDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
