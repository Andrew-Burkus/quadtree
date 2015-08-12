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
        return this.children[this.index(key)].retrieve(key);
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

"use strict";
var QuadTree = function() {
  function QuadTree(width, height, max_depth, max_objects) {
    this.root = new Node(0, 0, width, height, 0, max_depth, max_objects);
  }
  return ($traceurRuntime.createClass)(QuadTree, {
    insert: function(key) {
      if (key instanceof Array) {
        var $__4 = true;
        var $__5 = false;
        var $__6 = undefined;
        try {
          for (var $__2 = void 0,
              $__1 = (key)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
            var k = $__2.value;
            {
              this.root.insert(k);
            }
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
      } else {
        this.root.insert(key);
      }
    },
    retrieve: function(item) {
      return this.root.retrieve(item);
    },
    clear: function() {
      this.root.clear();
    },
    draw: function() {
      if (window.p5)
        this.root.draw();
    }
  }, {});
}();

"use strict";
var RegionNode = function($__super) {
  function RegionNode(x, y, width, height, depth, max_depth, max_objects) {
    $traceurRuntime.superConstructor(RegionNode).call(this, x, y, width, height, depth, max_depth, max_objects);
    this.misfits = [];
  }
  return ($traceurRuntime.createClass)(RegionNode, {
    insert: function(key) {
      if (this.children.length) {
        var child = this.children[this.index(key)];
        if (child.fits(key)) {
          child.insert(key);
        } else {
          this.misfits.push(key);
        }
      } else {
        this.objects.push(key);
        if (this.objects.length > this.MAX_OBJECTS && this.depth < this.MAX_DEPTH) {
          this.split();
          while (this.objects.length > 0) {
            var key = this.objects.pop();
            var index = this.index(key);
            var child = this.children[index];
            child.insert(key);
          }
          while (this.misfits.length > 0) {
            this.insert(this.misfits.pop());
          }
        }
      }
    },
    retrieve: function(key) {
      if (this.children.length) {
        return this.children[this.index(key)].retrieve(key);
      } else
        return this.objects.concat(this.misfits);
    },
    fits: function(key) {
      var widthOk = key.x >= this.x && key.x + key.width <= this.x + this.width;
      var heightOk = key.y >= this.y && key.y + key.height <= this.y + this.height;
      return widthOk && heightOk;
    },
    clear: function() {
      this.misfits.length = 0;
      if (this.children.length) {
        var $__4 = true;
        var $__5 = false;
        var $__6 = undefined;
        try {
          for (var $__2 = void 0,
              $__1 = (this.children)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
            var child = $__2.value;
            child.clear();
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
      }
      this.children.length = 0;
      this.objects.length = 0;
    }
  }, {}, $__super);
}(Node);

"use strict";
var RegionQuadTree = function($__super) {
  function RegionQuadTree(width, height, max_depth, max_objects) {
    $traceurRuntime.superConstructor(RegionQuadTree).call(this, width, height, max_depth, max_objects);
    this.root = new RegionNode(0, 0, width, height, 0, max_depth, max_objects);
  }
  return ($traceurRuntime.createClass)(RegionQuadTree, {}, {}, $__super);
}(QuadTree);
