"use strict";
var NW = 0;
var NE = 1;
var SW = 2;
var SE = 3;
var Node = function() {
  function Node(x, y, width, height, depth, MAX_OBJECTS, MAX_DEPTH) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.children = [];
    this.objects = [];
    this.prev = null;
    this.MAX_OBJECTS = this.MAX_OBJECTS || 5;
    this.MAX_DEPTH = this.MAX_DEPTH || 100;
  }
  return ($traceurRuntime.createClass)(Node, {
    insert: function(key) {
      if (this.children.length) {
        this.children[this.index(key)].insert(key);
        return;
      }
      this.objects.push(key);
      if (this.objects.length > this.MAX_OBJECTS && this.depth <= this.MAX_DEPTH) {
        this.split();
        while (this.objects.length > 0) {
          var point = this.objects.pop();
          var index = this.index(point);
          var child = this.children[index];
          child.insert(point);
        }
      }
    },
    retrieve: function(key) {
      if (this.children.length) {
        if (this.prev)
          return this.prev;
        else {
          this.prev = this.children[this.index(key)].retrieve(key).concat(this.objects);
          return this.prev;
        }
      } else
        return this.objects;
    },
    clear: function() {
      if (this.children.length) {
        var i;
        for (i = 0; i < this.children.length; i++) {
          this.children[i].clear();
        }
        this.children.length = 0;
      }
      this.objects.length = 0;
    },
    index: function(key) {
      var W = key.x <= this.x + this.halfWidth;
      var N = key.y <= this.y + this.halfHeight;
      if (N) {
        if (W)
          return NW;
        else
          return NE;
      } else {
        if (W)
          return SW;
        else
          return SE;
      }
    },
    draw: function() {
      noFill();
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height);
      this.children.forEach(function(child) {
        child.draw();
      });
    },
    split: function() {
      this.children[NW] = new this.constructor(this.x, this.y, this.halfWidth, this.halfHeight, this.depth + 1, this.MAX_DEPTH, this.MAX_OBJECTS);
      this.children[NE] = new this.constructor(this.x + this.halfWidth, this.y, this.halfWidth, this.halfHeight, this.depth + 1, this.MAX_DEPTH, this.MAX_OBJECTS);
      this.children[SW] = new this.constructor(this.x, this.y + this.halfHeight, this.halfWidth, this.halfHeight, this.depth + 1, this.MAX_DEPTH, this.MAX_OBJECTS);
      this.children[SE] = new this.constructor(this.x + this.halfWidth, this.y + this.halfHeight, this.halfWidth, this.halfHeight, this.depth + 1, this.MAX_DEPTH, this.MAX_OBJECTS);
    },
    get halfWidth() {
      return this.width / 2;
    },
    get halfHeight() {
      return this.height / 2;
    }
  }, {});
}();
