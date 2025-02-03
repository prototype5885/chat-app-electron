var { ipcRenderer } = window.require("electron");


document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

function handleWindowControls() {
    document.getElementById('window-minimize').addEventListener("click", event => {
        ipcRenderer.send('TITLE_BAR_ACTION', "MINIMIZE_WINDOW")
    });

    document.getElementById('window-maximize').addEventListener("click", event => {
        ipcRenderer.send('TITLE_BAR_ACTION', "MAXIMIZE_WINDOW")
    });

    document.getElementById('window-close').addEventListener("click", event => {
        console.log('closing')
        ipcRenderer.send('TITLE_BAR_ACTION', "CLOSE_APP")
    });
}