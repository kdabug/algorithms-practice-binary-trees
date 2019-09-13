const { BinaryTree, traverse } = require("./binary-tree-solution");
class AvlTree extends BinaryTree {
  balance(node = this.root) {
    if (super.balanceFactor(node) > 1) {
      // left subtree is higher than right subtree
      console.log("left subtree is higher than right subtree");
      if (super.balanceFactor(node.left) > 0) {
        this.rightRotation(node);
      } else if (super.balanceFactor(node.left) < 0) {
        this.leftRightRotation(node);
      }
    } else if (super.balanceFactor(node) < -1) {
      // right subtree is higher than left subtree
      console.log("right subtree is higher than left subtree");

      if (super.balanceFactor(node.right) < 0) {
        this.leftRotation(node);
      } else if (super.balanceFactor(node.right) > 0) {
        this.rightLeftRotation(node);
      }
    }
  }
  swapParentChild(oldChild, newChild, parent) {
    if (parent) {
      console.log("swapping");
      let side;
      if (parent.left === oldChild) {
        side = "left";
      } else if (parent.right === oldChild) {
        side = "right";
      }
      // this set parent child AND also
      parent[side] = newChild;
    } else {
      // no parent? so set it to null
      newChild.parent = null;
    }
  }
  rightRotation(node) {
    // rotate the given node SO THAT IT IS A RIGHT DESCENDANT of a current child node
    let newParent = node.left;
    let grandparent = node.parent;
    // make 1 the parent of 3 (previously was the parent of 2)
    this.swapParentChild(node, newParent, grandparent);
    // do RR rotation
    newParent.right = node; // makes 2 the left child of 3
    node.left = undefined; // clean 2's right child
    return newParent;
  }
  leftRotation(node) {
    // rotate the given node SO THAT IT IS A LEFT DESCENDANT of a current child node
    const newParent = node.right; // e.g. 3
    const grandparent = node.parent; // e.g. 1
    // make 1 the parent of 3 (previously was the parent of 2)
    this.swapParentChild(node, newParent, grandparent);
    // do LL rotation
    newParent.left = node; // makes 2 the left child of 3
    node.right = undefined; // clean 2's right child
    return newParent; // 3 is the new parent (previously was 2)
  }
  leftRightRotation(node) {
    leftRotation(node.left);
    return rightRotation(node);
  }
  rightLeftRotation(node) {
    rightRotation(node.right);
    return leftRotation(node);
  }
  add(data) {
    // add a new Node to the tree, with data as the Node's data
    // insertion starts the same way as in a regular Binary Tree
    // once the node is inserted, however, check the heights for imbalance
    // if the new node causes imbalance, perform rotations to rebalance
    const node = super.insert(data);
    console.log("hi", node);
    this.balanceUp(node);
    return node;
  }
  remove(data) {
    const node = super.lookUp(data);
    if (node) {
      const found = super.remove(data);
      this.balanceUp(node.parent);
      return found;
    }
    return false;
  }
  balanceUp(node) {
    let current = node;
    while (current) {
      this.balance(current);
      current = current.parent;
    }
  }
}

let avlTree = new AvlTree();
console.log(avlTree);
avlTree.insert(9);
avlTree.insert(4);
avlTree.insert(6);
avlTree.insert(20);
avlTree.insert(170);
avlTree.insert(180);
avlTree.insert(160);
avlTree.insert(177);
avlTree.insert(167);
avlTree.insert(168);
avlTree.balance();
//console.log(JSON.stringify(traverse(avlTree.root)));
console.log(avlTree.isBalanced());
