class RegionQuadTree extends QuadTree {
    constructor(width, height) {
        super(width, height);
        this.root = new RegionNode(0, 0, width, height, 0);
    }
}
