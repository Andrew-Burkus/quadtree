"use strict";
var RegionQuadTree = function($__super) {
  function RegionQuadTree(width, height) {
    $traceurRuntime.superConstructor(RegionQuadTree).call(this, width, height);
    this.root = new RegionNode(0, 0, width, height, 0);
  }
  return ($traceurRuntime.createClass)(RegionQuadTree, {}, {}, $__super);
}(QuadTree);
