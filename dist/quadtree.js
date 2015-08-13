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
      return this.root.retrieve(item).slice(0);
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
