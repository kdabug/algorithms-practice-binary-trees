const { BinaryTree, traverse } = require("./binary-tree-solution");
class AvlTree extends BinaryTree {
  constructor() {
    super();
  }
  balance(node = this.root) {
    console.log("balance node value", node.value);
    if (this.balanceFactor(node) > 1) {
      // left subtree is higher than right subtree
      console.log(
        "right subtree is higher than left subtree",
        this.balanceFactor(node),
        this.balanceFactor(node.right),
        this.balanceFactor(node.left)
      );

      if (this.balanceFactor(node.right) < 0) {
        this.leftRotation(node);
      }
      if (this.balanceFactor(node.left) > 0) {
        this.rightLeftRotation(node);
      }
    } else if (this.balanceFactor(node) < -1) {
      // right subtree is higher than left subtree
      console.log(
        "left subtree is higher than right subtree",
        this.balanceFactor(node)
      );
      if (this.balanceFactor(node.left) > 0) {
        this.rightRotation(node);
      }
      if (this.balanceFactor(node.left) < 0) {
        this.leftRightRotation(node);
      }
    }
  }
  swapParentChild(oldChild, newChild, parent) {
    console.log("swapping");
    if (parent) {
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
    this.swapParentChild(node, newParent, grandparent);
    // do RR rotation
    newParent.right = node;
    node.left = undefined;
    return newParent;
  }
  leftRotation(node) {
    // rotate the given node SO THAT IT IS A LEFT DESCENDANT of a current child node
    const newParent = node.right;
    const grandparent = node.parent;
    this.swapParentChild(node, newParent, grandparent);
    // do LL rotation
    newParent.left = node;
    node.right = undefined;
    return newParent;
  }
  leftRightRotation(node) {
    this.leftRotation(node.left);
    return this.rightRotation(node);
  }
  rightLeftRotation(node) {
    console.log("rightL rotation");
    this.rightRotation(node.right);
    return this.leftRotation(node);
  }
  add(data) {
    // add a new Node to the tree, with data as the Node's data
    // insertion starts the same way as in a regular Binary Tree
    // once the node is inserted, however, check the heights for imbalance
    // if the new node causes imbalance, perform rotations to rebalance

    const node = this.insert(data);
    //console.log("hi", node);
    this.balanceUp(node);
    return node;
  }
  remove(data) {
    const node = this.lookUp(data);
    if (node) {
      const found = this.remove(data);
      node.parent && this.balanceUp(node.parent);
      return found;
    }
    return false;
  }
  balanceUp(node = this.root) {
    let current = node;
    console.log("balancingUP", current.value);
    while (current) {
      this.balance(current);
      current = current.parent;
    }
  }
}

let avlTree = new AvlTree();
console.log(avlTree);
avlTree.add(9);
avlTree.add(4);
avlTree.add(6);
avlTree.add(20);
avlTree.add(170);
avlTree.add(180);
avlTree.add(160);
avlTree.add(177);
avlTree.add(167);
avlTree.add(168);
//avlTree.add(23);
avlTree.balance();

console.log(avlTree.isBalanced());
