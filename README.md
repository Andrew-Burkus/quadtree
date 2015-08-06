#QuadTree
One of the sexiest data structures around. This one's written in ES6 but compiled
with traceur, so it should run anywhere.

##Point QuadTree
When points are accurate enough.

##Region QuadTree
Great for 2D collision detection, image mapping, and a lot of other shit you can read
about on wikipedia.

##Use
the width and height of the space you wish to partition so eloquently
```javascript
    var tree = new QuadTree(width, height);
    tree.insert(item); //where item is an object with an x and y value.
    tree.retrieve(item); //where item is an object with an x and y value.
```
retrieve returns all objects which could collide with item
insert can also take arrays. Because that's useful.
