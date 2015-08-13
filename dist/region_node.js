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
      if (this.prev)
        return this.prev;
      var out = [];
      if (this.children.length) {
        out.push.apply(out, this.children[this.index(key)].retrieve(key));
      }
      out.push.apply(out, this.misfits);
      out.push.apply(out, this.objects);
      this.prev = out;
      return out;
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
