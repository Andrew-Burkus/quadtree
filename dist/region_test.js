"use strict";
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
