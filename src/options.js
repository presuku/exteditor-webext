/* vim: set et ts=4 tw=92:
 * Copyright (C) 2017-2018  Jonathan Lebon <jonathan@jlebon.com>
 * This file is part of Textern.
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

function onError(error) {
    console.log(`Error: ${error}`);
}

function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        editor: document.querySelector("#editor").value,
        shortcut: document.querySelector("#shortcut").value,
        extension: document.querySelector("#extension").value
    });
    document.querySelector("#saved").innerHTML = '\u2713';
}

function clearCheckmark(e) {
    document.querySelector("#saved").innerHTML = "";
}

async function restoreOptions() {
    let r = await browser.storage.local.get({
        editor: "[\"gedit\", \"+%l:%c\"]",
        shortcut: "Ctrl+E",
        extension: "txt",
    }).catch(onError);
    await Promise.all([
        (async () => { document.querySelector("#editor").value = r.editor })(),
        (async () => { document.querySelector("#shortcut").value = r.shortcut })(),
        (async () => { document.querySelector("#extension").value = r.extension })(),
    ]);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelectorAll("form > input").forEach(
    function(value, key, listObj, argument) {
        value.addEventListener("input", clearCheckmark);
    }
)
