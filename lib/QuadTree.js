"use strict";
var NW = 0;
var NE = 1;
var SW = 2;
var SE = 3;
var Node = function() {
  function Node(x, y, width, height, depth) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.children = [];
    this.objects = [];
  }
  return ($traceurRuntime.createClass)(Node, {
    insert: function(key) {
      if (this.children.length) {
        this.children[this.index(key)].insert(key);
        return;
      }
      this.objects.push(key);
      if (this.objects.length > MAX_OBJECTS && this.depth <= MAX_DEPTH) {
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
      if (this.childen.length) {
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
      this.children[NW] = new this.constructor(this.x, this.y, this.halfWidth, this.halfHeight, this.depth + 1);
      this.children[NE] = new this.constructor(this.x + this.halfWidth, this.y, this.halfWidth, this.halfHeight, this.depth + 1);
      this.children[SW] = new this.constructor(this.x, this.y + this.halfHeight, this.halfWidth, this.halfHeight, this.depth + 1);
      this.children[SE] = new this.constructor(this.x + this.halfWidth, this.y + this.halfHeight, this.halfWidth, this.halfHeight, this.depth + 1);
    },
    get halfWidth() {
      return this.width / 2;
    },
    get halfHeight() {
      return this.height / 2;
    }
  }, {});
}();
var MAX_OBJECTS = 4;
var MAX_DEPTH = 25;
var QuadTree = function() {
  function QuadTree(width, height) {
    this.root = new Node(0, 0, width, height, 0);
  }
  return ($traceurRuntime.createClass)(QuadTree, {
    insert: function(key) {
      if (key instanceof Array) {
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (key)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var k = $__6.value;
            {
              this.root.insert(k);
            }
          }
        } catch ($__11) {
          $__9 = true;
          $__10 = $__11;
        } finally {
          try {
            if (!$__8 && $__5.return != null) {
              $__5.return();
            }
          } finally {
            if ($__9) {
              throw $__10;
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
      this.root.draw();
    }
  }, {});
}();
var RegionNode = function($__super) {
  function RegionNode(x, y, width, height, depth) {
    $traceurRuntime.superConstructor(RegionNode).call(this, x, y, width, height, depth);
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
        if (this.objects.length > MAX_OBJECTS && this.depth < MAX_DEPTH) {
          this.split();
          while (this.objects.length > 0) {
            var key = this.objects.pop();
            var index = this.index(key);
            var child = this.children[index];
            child.insert(key);
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
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (this.children)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var child = $__6.value;
            child.clear();
          }
        } catch ($__11) {
          $__9 = true;
          $__10 = $__11;
        } finally {
          try {
            if (!$__8 && $__5.return != null) {
              $__5.return();
            }
          } finally {
            if ($__9) {
              throw $__10;
            }
          }
        }
      }
      this.children.length = 0;
      this.objects.length = 0;
    }
  }, {}, $__super);
}(Node);
var RegionQuadTree = function($__super) {
  function RegionQuadTree(width, height) {
    $traceurRuntime.superConstructor(RegionQuadTree).call(this, width, height);
    this.root = new RegionNode(0, 0, width, height, 0);
  }
  return ($traceurRuntime.createClass)(RegionQuadTree, {}, {}, $__super);
}(QuadTree);
var canvas,
    tree,
    items;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent('container');
  tree = new RegionQuadTree(width, height);
  items = populatePoints(1000);
  items.forEach(function(item) {
    tree.insert(item);
  });
}
function draw() {
  background(145);
  tree.draw();
  items.forEach(function(item) {
    rect(item.x, item.y, item.width, item.height);
  });
}
function mouseClicked() {
  tree.clear();
  populatePoints(10000).forEach(function(item) {
    tree.insert(item);
  });
}
function populatePoints(num) {
  var i;
  var points = [];
  for (i = 0; i < num; i++) {
    var x = random(0, width);
    var y = random(0, height);
    var w = random(5, 55);
    var h = random(5, 55);
    points.push({
      x: x,
      y: y,
      width: w,
      height: h
    });
  }
  return points;
}
