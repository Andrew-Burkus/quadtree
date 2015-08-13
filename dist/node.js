"use strict";
var NW = 0;
var NE = 1;
var SW = 2;
var SE = 3;
var Node = function() {
  function Node(x, y, width, height, depth, MAX_DEPTH, MAX_OBJECTS) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.children = [];
    this.objects = [];
    this.MAX_OBJECTS = MAX_OBJECTS || 5;
    this.MAX_DEPTH = MAX_DEPTH || 100;
    this.prev = null;
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
      if (this.prev)
        return this.prev;
      var out = [];
      if (this.children.length) {
        out.push.apply(out, this.children[this.index(key)].retrieve(key));
      }
      out.push.apply(out, this.objects);
      this.prev = out;
      return out;
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
      push();
      noFill();
      stroke(0, 0, 0);
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height);
      var $__4 = true;
      var $__5 = false;
      var $__6 = undefined;
      try {
        for (var $__2 = void 0,
            $__1 = (this.children)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
          var child = $__2.value;
          child.draw();
        }
      } catch ($__7) {
        $__5 = true;
        $__6 = $__7;
      } finally {
        try {
          if (!$__4 && $__1.return != null) {
            $__1.return();
          }
        } finally {
          if ($__5) {
            throw $__6;
          }
        }
      }
      pop();
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
