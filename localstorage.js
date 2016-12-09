/**********************************************************************************
* (c) 2016, Nathanael Anderson.
* Licensed under the MIT license.
*
* Version 1.0.0                                        nathan@master-technology.com
**********************************************************************************/
'use strict';

const FileSystemAccess = require('file-system/file-system-access.js').FileSystemAccess;

if (!global.localStorage) {
    let internalData = {};
    let timeout = null;

    const internalSaveData = function() {
        let fsa = new FileSystemAccess();
        let fileName = fsa.getDocumentsFolderPath() + "/localStorage.db";
        try {
            fsa.writeText(fileName, JSON.stringify(internalData));
        } catch (err) {
            // This should never happen on normal data, but if they tried to put non JS stuff it won't serialize
            console.log("localStorage: unable to write storage, error: ", err);
        }

    };

    const saveData = function()  {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(internalSaveData, 250);
    };

    const loadData = function() {
        let fsa = new FileSystemAccess();
        let fileName = fsa.getDocumentsFolderPath() + "/localStorage.db";
        if (!fsa.fileExists(fileName)) {
            return;
        }

        let data;
        try {
            let textData = fsa.readText(fileName);
            data = JSON.parse(textData);
            internalData = data;
        }
        catch (err) {
            console.log("localStorage: error reading storage, Error: ", err);
        }
    };

    loadData();


    global.localStorage = {
        getItem: function (name) {
            if (internalData[name]) {
                return internalData[name];
            }
            return null;
        },
        key: function(id) {
            const keys = Object.keys(internalData);
            if (id >= keys.length) { return null; }
            return keys[id];
        },
        setItem: function (name, value) {
            internalData[name] = value;
            saveData();
        },
        removeItem: function (name) {
            if (internalData[name]) {
                delete internalData[name];
                saveData();
            }
        },
        clear: function () {
            internalData = {};
            saveData();
        }
    };
    Object.defineProperty(global.localStorage, "length", {
        get: function() {
            return (Object.keys(internalData).length);
        },
        enumerable: true,
        configurable: true
    });
}
module.exports = global.localStorage;
