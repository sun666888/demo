import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
    console.log('copy success');
}

function clipboardError() {
    console.log('copy failed');
}

export default function handleClipboard(text, event) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on('success', () => {
        clipboardSuccess();
        clipboard.off('error');
        clipboard.off('success');
        clipboard.destroy();
    })
    clipboard.on('error', () => {
        clipboardError();
        clipboard.off('error');
        clipboard.off('success');
        clipboard.destroy();
    })
    clipboard.onClick(event);
}