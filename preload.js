window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    // Replace text in elements with IDs like 'chrome-version', 'node-version', 'electron-version'
    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});
