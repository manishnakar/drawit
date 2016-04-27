/**
 * Created by deepak.vishwakarma on 4/26/16.
 */
/*jslint browser: true*/
"use strict";
(function (window, d3) {
    function Utility() { // jshint ignore:line
    }
    Utility.prototype.defineReadonly = function defineReadonly(obj, key, value) {
        Object.defineProperty(obj, key, {
            configurable: true,
            value: value,
            writable: false
        });
    };
    //const utility = new Utility();
    var GraphNames;
    (function (GraphNames) {
        GraphNames[GraphNames.stacked = 1] = "stacked";
    })(GraphNames || (GraphNames = {}));
    function Stacked(options) {
        this.options = options;
        this.listeners = [];
    }
    Stacked.prototype.draw = function draw(updatedData){
        var that = this;
        var options = that.options;
        var defaults = DrawIt.defaults;
        var data = updatedData || options.data;
        var selector = options.selector;
        if(!selector || !data){
            throw "Missing data and selector";
        }
        var height = options.dim ? options.dim.height || defaults.height : defaults.height;
        var width = options.dim ? options.dim.width || defaults.width : defaults.width;
        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
        that.stack = d3.layout.stack()
            .values(function(d) { return d.values; })
            .x(function(d) { return new Date(Date.parse(d.date)); })
            .y(function(d) { return d.count; });

        var stacked = that.stack(data);
        that.maxY = d3.max(stacked, function(d) {
            return d3.max(d.values, function(d) {
                return d.y0 + d.y;
            });
        });
        that.yScale = d3.scale.linear()
            .range([height, 0])
            .domain([0, that.maxY]);
        that.xScale = d3.time.scale()
            .range([0, width])
            .domain(d3.extent(data[0].values, function(d) {
                return new Date(Date.parse(d.date));
            }))
            .nice(4);
        that.svg = d3.select("body").append(selector)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        that.colors = options.colors || d3.scale.category10();
        that.layers = that.svg.selectAll('g.layer')
            .data(stacked, function(d) { return d.name; })
            .enter()
            .append('g')
            .attr('class', 'layer')
            .attr('fill', function(d) { return that.colors(d.name); });
        that.layers.selectAll('rect')
            .data(function(d) { return d.values; })
            .enter()
            .append('rect')
            .attr('x', function(d) {return that.xScale(new Date(Date.parse(d.date))); })
            .attr('width', width / 3)
            .attr('y', function(d) {
                return that.yScale(d.y0 + d.y);
            }).attr('height', function(d) {
            return height - that.yScale(d.y);
        });
    };
    Stacked.prototype.on = function on(prop, event , callback){
        var that = this;
        if(typeof that[prop] === 'undefined'){
            throw "Event can\'t bind to "+prop;
        }
        that[prop].on(event, callback);
        var unbind = function () {
            console.log("Stopping listening events"+prop+":"+event);
            that[prop].on(event, null);  //this should remove the event listener
            that.listeners = that.listeners.filter(function (l){
                return l.id !== listener.id;
            });
        };
        var listener = {
            id:that.listeners.length,
            event:event,
            prop:prop,
            callback:callback,
            unbind:unbind
        };
        that.listeners.push(listener);
        return listener;
    };
    Stacked.prototype.unbind = function unbind(id){
        var listener = this.listeners[id];
        if(listener){
            console.log("Stopping listening events"+listener.prop+":"+listener.event);
            this[listener.prop].on(listener.event, null);  //this should remove the event listener
            this.listeners = this.listeners.filter(function (l){
                return l.id !== listener.id;
            });
        }
    };
    function DrawIt(options){
        var chart ;
        switch (options.type){
            case GraphNames.stacked:
                chart = new Stacked(options);
                break;
            default:
                throw "Invalid graph "+options.type;
        }
        return chart;
    }
    DrawIt.defaults = {
        height: 600,
        width: 600
    };
    DrawIt.GraphNames = GraphNames;
    if(window){
        window.DI = DrawIt;
        return window.DrawIt = DrawIt;
    }
    if(module){
        return module.exports = DrawIt;
    }
})(window, window.d3);