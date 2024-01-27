import * as vscode from 'vscode';

import {resolveCommandsContext, getCommandsContext} from 'vscode/workbench/browser/parts/editor/editorCommands';

export const copyFileNameCommand = 'tab-context-menu-enhancer.copy-file-name';

export function activate(context: vscode.ExtensionContext) {
	console.log('tab-context-menu-enhancer" is now active!');

	// let tabContextMenuDisposable = vscode.window.onDidChangeWindowState((event) => {
	// 	const activeEditor = vscode.window.activeTextEditor;
	// 	vscode.window.tabGroups.
	// 	if (activeEditor) {
	// 		const clickedEditor = vscode.window.visibleTextEditors.find(editor => editor.viewColumn === activeEditor.viewColumn && editor !== activeEditor);
	// 		if (clickedEditor) {
	// 			const tabLabel = clickedEditor.document.fileName;
	// 			vscode.window.showInformationMessage(`Right-clicked on tab "${tabLabel}"`);
	// 		}
	// 	}
	// });

	// let tabContextMenuDisposable = vscode.window.activeTextEditor((event) => {
	// 	event.focused.valueOf();
	// 	vscode.window.showInformationMessage(`onDidChangeWindowState`);
	// });

	// let copyNameDisposable2 = vscode.window.onDidChangeActiveTextEditor((event) => {
	// 	let test = event;
	// 	vscode.window.showInformationMessage(`onDidChangeTabs`);

	// 	// const activeEditor = vscode.window.activeTextEditor;
	// 	// if (activeEditor) {
	// 	// 	const tabLabel = activeEditor.document.fileName;
	// 	// 	vscode.env.clipboard.writeText(tabLabel).then(() => {
	// 	// 		vscode.window.showInformationMessage(`Copied file name to clipboard`);
	// 	// 	});
	// 	// }
	// });


	let copyNameDisposable = vscode.commands.registerCommand(copyFileNameCommand, () => {
		let tabs = vscode.window.tabGroups.all.flatMap((tabGroup) => tabGroup.tabs);

		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const tabLabel = activeEditor.document.fileName;
			vscode.env.clipboard.writeText(tabLabel).then(() => {
				vscode.window.showInformationMessage(`Copied file name to clipboard`);
			});
		}
	});

	let copyNameDisposable2 = vscode.commands.registerCommand(copyFileNameCommand, () => {

		const editorGroupService = accessor.get(IEditorGroupsService);

		const { group, editor } = resolveCommandsContext(editorGroupService, getCommandsContext(resourceOrContext, context));
		if (group && editor) {
			if (group.activeEditor) {
				group.pinEditor(group.activeEditor);
			}

			await group.closeEditors({ direction: CloseDirection.RIGHT, except: editor, excludeSticky: true }, { preserveFocus: context?.preserveFocus });
		}




		vscode.window.showInformationMessage(`onDidChangeTabs`);
	});

	context.subscriptions.push(copyNameDisposable, copyNameDisposable2);
}

// export function activate(context: vscode.ExtensionContext) {
// 	console.log('tab-context-menu-enhancer" is now active!');

// 	let activeEditor = vscode.window.activeTextEditor;

// 	vscode.window.onDidChangeActiveTextEditor((editor) => {
// 	  activeEditor = editor;
// 	});

// 	let copyNameDisposable = vscode.commands.registerCommand(copyFileNameCommand, () => {
// 	  if (activeEditor) {
// 		const tabLabel = activeEditor.document.fileName;
// 		vscode.env.clipboard.writeText(tabLabel).then(() => {
// 		  vscode.window.showInformationMessage(`Copied file name to clipboard`);
// 		});
// 	  }
// 	});

// 	// let tabContextMenuDisposable = vscode.window.onDidChangeWindowState((event) => {
// 	//   if (event.focused && event.focusedView === vscode.window.activeTextEditor?.viewColumn) {
// 	// 	vscode.window.showInformationMessage(`Right-clicked on active tab`);
// 	//   } else {
// 	// 	vscode.window.showInformationMessage(`Right-clicked on inactive tab`);
// 	//   }
// 	// });

// 	let tabContextMenuDisposable = vscode.window.onDidChangeWindowState((event) => {
// 		const activeEditor = vscode.window.activeTextEditor;
// 		if (activeEditor) {
// 		  const clickedEditor = vscode.window.visibleTextEditors.find(editor => editor.viewColumn === activeEditor.viewColumn && editor !== activeEditor);
// 		  if (clickedEditor) {
// 			const tabLabel = clickedEditor.document.fileName;
// 			vscode.window.showInformationMessage(`Right-clicked on tab "${tabLabel}"`);
// 		  }
// 		}
// 	  });

// 	context.subscriptions.push(copyNameDisposable, tabContextMenuDisposable);
//   }
