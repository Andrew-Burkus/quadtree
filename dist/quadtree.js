"use strict";
var QuadTree = function() {
  function QuadTree(width, height, max_depth, max_objects) {
    this.root = new Node(0, 0, width, height, 0);
  }
  return ($traceurRuntime.createClass)(QuadTree, {
    insert: function(items) {
      if (items instanceof Array) {
        var $__4 = true;
        var $__5 = false;
        var $__6 = undefined;
        try {
          for (var $__2 = void 0,
              $__1 = (items)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
            var item = $__2.value;
            {
              this.root.insert(item);
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
        this.root.insert(item);
      }
    },
    retrieve: function(item) {
      return this.root.retrieve(item);
    },
    clear: function() {
      this.root.clear();
    }
  }, {});
}();
