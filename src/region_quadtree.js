class RegionQuadTree extends QuadTree {
    constructor(width, height, max_depth, max_objects) {
        super(width, height, max_depth, max_objects);
        this.root = new RegionNode(0, 0, width, height, 0, max_depth, max_objects);
    }
}
