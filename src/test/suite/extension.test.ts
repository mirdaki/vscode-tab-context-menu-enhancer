import * as assert from 'assert';

import * as vscode from 'vscode';
import * as extension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Copy file name command registered', (done) => {
		vscode.commands.getCommands(true).then(
			commands => {
				assert.strictEqual(commands.includes(extension.copyFileNameCommand), true);
			}
		);
		done();
	});

	test('Check if file name is copied to clipboard', (done) => {
		const expectedFileName = vscode.window.activeTextEditor?.document.fileName;

		vscode.commands.executeCommand(extension.copyFileNameCommand).then(
			() => {
				vscode.env.clipboard.readText().then(
					clipboardText => {
						assert.strictEqual(clipboardText, expectedFileName);
					}
				);
			}
		);
		done();
	});
});
