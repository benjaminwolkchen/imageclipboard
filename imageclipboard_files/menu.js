var currentImportPack = "";
function openEditMenu() {
    document.getElementById("EDITMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function openPackMenu() {
    document.getElementById("PACKMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function packMenuBack() {
    closeMenu();
    openPackMenu();
}
function packImportPrompt(x) {
    let i = -42;
    switch (x) {
        case "default":
            i = defaultData.length;
            currentImportPack = "default";
            break;
        case "omori1":
            i = omori1Data.length;
            currentImportPack = "omori1";
            break;
        case "omori2":
            i = omori2Data.length;
            currentImportPack = "omori2";
            break;
    }
    document.getElementById("PACKPROMPTHEADING").innerText = "Do you want to import " + i + " emojis? (This cannot be undone easily)";
    document.getElementById("PACKPROMPT").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function packImport() {
    let data = [];
    switch (currentImportPack) {
        case "default":
            data = defaultData;
            break;
        case "omori1":
            data = omori1Data;
            break;
        case "omori2":
            data = omori2Data;
            break;
    }
    closeMenu();
    for (var i = 0; i < data.length; i++) {
        let obj = data[i];
        if (obj.startsWith("https://cdn.discordapp.com/emojis/") && obj.includes("?size=")) {
            obj = obj.replace(/\d{2}$/, '48');
        }
        var copyDataJson = JSON.parse(localStorage.getItem("copyData"));
        copyDataJson.push(obj);
        localStorage.setItem("copyData", JSON.stringify(copyDataJson));
    }
    list();
}
function openImportMenu() {
    document.getElementById("IMPORTMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function exportData() {
    download(localStorage.getItem("copyData").toString(), 'export.json', 'text/plain');
}
function closeMenu() {
    document.getElementById("EDITMENU").style.display = "none";
    document.getElementById("GRAYBACKGROUND").style.display = "none";
    document.getElementById("IMPORTMENU").style.display = "none";
    document.getElementById("DANGERMENU").style.display = "none";
    document.getElementById("resetDataPopUp").style.display = "none";
    document.getElementById("deleteAllPopUp").style.display = "none";
    document.getElementById("HELPMENU").style.display = "none";
    document.getElementById("PACKMENU").style.display = "none";
    document.getElementById("PACKPROMPT").style.display = "none";
}
function editSetUp() {
    editMode = true;
    closeMenu();
    document.getElementById("URL").style.display = "none";
    document.getElementById("EDITBUTTON").style.display = "none";
    document.getElementById("EDITMODE").style.display = "flex";
    document.getElementById("HELPBUTTON").style.display = "none";
}
function defaultMode() {
    editMode = false;
    closeMenu();
    document.getElementById("URL").style.display = "flex";
    document.getElementById("EDITBUTTON").style.display = "flex";
    document.getElementById("EDITMODE").style.display = "none";
    document.getElementById("HELPBUTTON").style.display = "flex";
}
function dangerSetup() {
    document.getElementById("DANGERMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function deleteAllPopUp() {
    closeMenu();
    document.getElementById("deleteAllPopUp").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function resetDataPopUp() {
    closeMenu();
    document.getElementById("resetDataPopUp").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function resetData() {
    closeMenu();
    localStorage.setItem("copyData", JSON.stringify(defaultData));
    list();
}
function deleteAll() {
    closeMenu();
    localStorage.setItem("copyData", JSON.stringify([]));
    list();
}
function openHelpMenu() {
    document.getElementById("HELPMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
async function loadFile(file) {
    let text = await file.text();
    closeMenu();
    let json = JSON.parse(text);
    for (var i = 0; i < json.length; i++) {
        let obj = json[i];
        if (obj.startsWith("https://cdn.discordapp.com/emojis/") && obj.includes("?size=")) {
            obj = obj.replace(/\d{2}$/, '48');
        }
        var copyDataJson = JSON.parse(localStorage.getItem("copyData"));
        copyDataJson.push(obj);
        localStorage.setItem("copyData", JSON.stringify(copyDataJson));
    }
    list();
}
