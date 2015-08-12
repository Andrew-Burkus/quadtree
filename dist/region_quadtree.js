"use strict";
var RegionQuadTree = function($__super) {
  function RegionQuadTree(width, height, max_depth, max_objects) {
    $traceurRuntime.superConstructor(RegionQuadTree).call(this, width, height, max_depth, max_objects);
    this.root = new RegionNode(0, 0, width, height, 0);
  }
  return ($traceurRuntime.createClass)(RegionQuadTree, {}, {}, $__super);
}(QuadTree);
