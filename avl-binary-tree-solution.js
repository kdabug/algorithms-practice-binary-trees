const { BinaryTree, traverse } = require("./binary-tree-solution");

class AvlTree extends BinaryTree {
  constructor() {
    super();
  }

  //balances tree when nodes are added
  balance(node) {
    console.log("balance node value", node.value);
    if (super.balanceFactor(node) > 1) {
      // left subtree is higher than right subtree
      if (super.balanceFactor(node.left) > 0) {
        this.rightRotation(node);
      }
      if (super.balanceFactor(node.left) < 0) {
        this.leftRightRotation(node);
      }
    } else if (super.balanceFactor(node) < -1) {
      // right subtree is higher than left subtree
      if (super.balanceFactor(node.right) < 0) {
        this.leftRotation(node);
      }
      if (super.balanceFactor(node.right) > 0) {
        this.rightLeftRotation(node);
      }
    }
  }

  //helper for balancing
  swapParentChild(node, newParent, grandparent) {
    console.log("swapping", node, newParent, parent);
    if (grandparent) {
      let side;
      if (grandparent.left === node) {
        side = "left";
      } else if (grandparent.right === node) {
        side = "right";
      }
      grandparent[side] = newParent;
    } else {
      // no grandparent? so set it to null
      newParent.parent = null;
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
    this.rightRotation(node.right);
    return this.leftRotation(node);
  }

  //insert data into avl tree
  add(data) {
    // add a new Node to the tree, with data as the Node's data
    // insertion starts the same way as in a regular Binary Tree
    // once the node is inserted, however, check the heights for imbalance
    // if the new node causes imbalance, perform rotations to rebalance
    const node = super.insert(data);
    //console.log("hi", node);
    this.balanceUp(node);
    return node;
  }

  //remove data from tree and balance tree
  remove(data) {
    const node = super.lookUp(data);
    if (node) {
      const found = super.remove(data);
      node.parent && this.balanceUp(node.parent);
      return found;
    }
    return false;
  }

  balanceUp(node = this.root) {
    let current = node;
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
avlTree.add(23);
//avlTree.balance();

console.log(avlTree.isBalanced());
console.log(traverse(avlTree.root));
