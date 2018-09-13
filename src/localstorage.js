/**********************************************************************************
* (c) 2017-2018, Nathanael Anderson.
* Licensed under the MIT license.
*
* Version 1.1.8                                        nathan@master-technology.com
**********************************************************************************/
'use strict';

const FileSystemAccess = require('tns-core-modules/file-system/file-system-access').FileSystemAccess;

// So that code that is looking for the "Storage" object will pass its check
if (!global.Storage) {
    global.Storage = function Storage() { };
}

if (!global.localStorage) {
    let localStorageData = {};
    let localStorageTimeout = null;

    const internalSaveData = function() {
        let fsa = new FileSystemAccess();
        let fileName = fsa.getDocumentsFolderPath() + "/localStorage.db";
        try {
            fsa.writeText(fileName, JSON.stringify(localStorageData));
        } catch (err) {
            // This should never happen on normal data, but if they tried to put non JS stuff it won't serialize
            console.log("localStorage: unable to write storage, error: ", err);
        }

    };

    const saveData = function()  {
        if (localStorageTimeout !== null) {
            clearTimeout(localStorageTimeout);
        }
        localStorageTimeout = setTimeout(internalSaveData, 250);
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
            localStorageData = data;
        }
        catch (err) {
            console.log("localStorage: error reading storage, Error: ", err);
        }
    };

    loadData();

    global.localStorage = {
        getItem: function (name) {
            if (localStorageData.hasOwnProperty(name)) {
                return localStorageData[name];
            }
            return null;
        },
        key: function(id) {
            const keys = Object.keys(localStorageData);
            if (id >= keys.length) { return null; }
            return keys[id];
        },
        setItemObject: function(name, value) {
            localStorageData[name] = value;
            saveData();
        },
        // Revamp this to be "String" only
        // https://github.com/NathanaelA/nativescript-localstorage/issues/17
        setItem: function (name, value) {
            if (value == null) {
                if (value === null) {
                    localStorageData[name] = "null";
                } else {
                    localStorageData[name] = "undefined";
                }
            } else {
                localStorageData[name] = value.toString();
            }
            saveData();
        },
        removeItem: function (name) {
            if (localStorageData[name]) {
                delete localStorageData[name];
                saveData();
            }
        },
        clear: function () {
            localStorageData = {};
            saveData();
        }
    };
    Object.defineProperty(global.localStorage, "length", {
        get: function() {
            return (Object.keys(localStorageData).length);
        },
        enumerable: true,
        configurable: true
    });
}


if (!global.sessionStorage) {
    let sessionStorageData = {};

    global.sessionStorage = {
        getItem: function (name) {
            if (sessionStorageData.hasOwnProperty(name)) {
                return sessionStorageData[name];
            }
            return null;
        },
        key: function(id) {
            const keys = Object.keys(sessionStorageData);
            if (id >= keys.length) { return null; }
            return keys[id];
        },
        setItemObject: function(name, value) {
            sessionStorageData[name] = value;
        },
        setItem: function (name, value) {
            if (value == null) {
                if (value === null) {
                    sessionStorageData[name] = "null";
                } else {
                    sessionStorageData[name] = "undefined";
                }
            } else {
                sessionStorageData[name] = value.toString();
            }
        },

        removeItem: function (name) {
            if (sessionStorageData[name]) {
                delete sessionStorageData[name];
            }
        },
        clear: function () {
            sessionStorageData = {};
        }
    };
    Object.defineProperty(global.sessionStorage, "length", {
        get: function() {
            return (Object.keys(sessionStorageData).length);
        },
        enumerable: true,
        configurable: true
    });
}




module.exports = global.localStorage;
