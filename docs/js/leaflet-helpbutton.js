/*
Boilerplate code was adapted from leaflet-ruler, which is distributed under the
MIT License.

Link to the original repo: https://github.com/gokertanrisever/leaflet-ruler

The original license is as follows:
                              --------------
The MIT License (MIT)

Copyright (c) 2017 Goker Tanrisever

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.
*/
(function(factory, window) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }
    if (typeof window !== 'undefined' && window.L) {
        window.L.Title = factory(L);
    }
}(function (L) {
    "use strict";
    L.Control.Help = L.Control.extend({
        options: {
            position: 'topleft',
            helpElement: document.createElement('div')
        },
        onAdd: function(map) {
            this._map = map;
            this._choice = false;
            this._container = L.DomUtil.create('div', 'leaflet-bar');
            this._container.classList.add('leaflet-help-button');
            L.DomEvent.disableClickPropagation(this._container);
            L.DomEvent.on(this._container, 'click', this._toggleHelp, this);
            return this._container;
        },
        onRemove: function() {
            L.DomEvent.off(this._container, 'click', this._toggleHelp, this);
        },
        _toggleHelp: function() {
            this._choice = !this._choice;
            let helpElement = document.getElementById("leaflet-help-message");

            // When toggling on
            if (this._choice) {
                // Make help element if it doesn't already exist
                if (!helpElement) {
                    helpElement = this.options.helpElement;
                    helpElement.classList.add('leaflet-help-message');
                    helpElement.setAttribute("id", "leaflet-help-message");
                    document.body.append(helpElement);
                }
                // otherwise just toggle visibility on
                else {
                    helpElement.style.display = 'block';
                }
            }
            // When toggling off
            else {
                console.log('here')
                helpElement.style.display = 'none';
            }
        }
    });
    L.control.help = function(options) {
        return new L.Control.Help(options)
    };
}, window))