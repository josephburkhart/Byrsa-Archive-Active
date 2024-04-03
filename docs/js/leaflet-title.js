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
    // This boilerplate was copied from leaflet-ruler
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
    // This code is my own
    L.Control.Title = L.Control.extend({
        options: {
            position: 'topleft',
            text: 'Example Title'
        },
        onAdd: function(map) {
            this._map = map;    //necessary?
            this._container = L.DomUtil.create('div', 'leaflet-bar');
            this._container.classList.add('leaflet-title');
            console.log('here')
            L.DomEvent.disableClickPropagation(this._container);
            this._container.innerText = this.options.text;
            this._allLayers
            return this._container;
        },
        onRemove: function() {
            // do nothing here
        }
    });
    // This boilerplate was adapted from leaflet-ruler
    L.control.title = function(options) {
        return new L.Control.Title(options)
    };
}, window))