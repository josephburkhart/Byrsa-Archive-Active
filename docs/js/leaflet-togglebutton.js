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
    L.Control.ToggleButton = L.Control.extend({
        options: {
            position: 'topleft',
            customClassName: null,
            toggleCallback: null
        },
        onAdd: function(map) {
            this._map = map;
            this._choice = false;
            this._container = L.DomUtil.create('div', 'leaflet-bar');
            this._container.classList.add('leaflet-toggle-button');
            if (this.options.customClassName) {
                this._container.classList.add(this.options.customClassName);
            }
            L.DomEvent.disableClickPropagation(this._container);
            L.DomEvent.on(this._container, 'click', this._onToggle, this);
            return this._container;
        },
        onRemove: function() {
            L.DomEvent.off(this._container, 'click', this._onToggle, this);
        },
        _onToggle: function() {
            this._container.classList.toggle("activated");
            if (typeof this.options.toggleCallback === 'function') {
                this.options.toggleCallback.call(this);
            }
        }
    });
    L.control.toggleButton = function(options) {
        return new L.Control.ToggleButton(options)
    };
}, window))