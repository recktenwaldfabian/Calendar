define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/dom-style",
    "calendar/lib/jquery",
    "calendar/lib/jquery-ui.draggable.1.12.1"

], function (declare, _WidgetBase, dojoStyle, _jQuery, _jQueryUi) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    return declare("calendar.widget.DraggableCalendarEvent", [ _WidgetBase ], {

        // widget parameters
        titleAttr: '',

        // Internal variables.
        _handles: null,
        _contextObj: null,
        _jNode: null,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._jNode = $( this.domNode.parentNode ).draggable({
                revert: true,
                revertDuration: 0
            });
        },

        update: function (obj, callback) {

            logger.debug(this.id + ".update");
            this._contextObj = obj;
            this._updateRendering(callback);
        },

        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");

                this._jNode.data('event', {
                    title: this._contextObj.get( this.titleAttr )
                });    
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["calendar/widget/DraggableCalendarEvent"]);
