import * as vscode from 'vscode';

export const copyFileNameCommand = 'tab-context-menu-enhancer.copy-file-name';

export function activate(context: vscode.ExtensionContext) {
	console.log('tab-context-menu-enhancer" is now active!');

	let copyNameDisposable = vscode.commands.registerCommand(copyFileNameCommand, () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const tabLabel = activeEditor.document.fileName;
			vscode.env.clipboard.writeText(tabLabel).then(() => {
				vscode.window.showInformationMessage(`Copied file name to clipboard`);
			});
		}
	});

	context.subscriptions.push(copyNameDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
