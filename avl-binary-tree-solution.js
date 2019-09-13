import { BinaryNode, BinarySearchTree } from "./binary-tree-solution";
class AVLTree extends BinarySearchTree {
  insert(data) {
    // add a new Node to the tree, with data as the Node's data
    // insertion starts the same way as in a regular Binary Tree
    // once the node is inserted, however, check the heights for imbalance
    // if the new node causes imbalance, perform rotations to rebalance
    super.insert(data);
    let currentNode = this.root;
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }
  balance(node) {
    if (super.balanceFactor(node) > 1) {
      //left rotation - TWO OPTIONS
      if (super.balanceFactor(node.left) > 0) {
        //OPTION ONE: left-left rotation
        this.leftRotation(node);
      } else if (super.balanceFactor(node.left) < 0) {
        // OPTION TWO Left-Right rotation.
        this.leftRightRotation(node);
      }
    } else if (super.balanceFactor(node) < -1) {
      // Right rotation.
      if (super.balanceFactor(node.right) < 0) {
        // Right-Right rotation
        this.rightRotation(node);
      } else if (super.balanceFactor(node.right) > 0) {
        // Right-Left rotation.
        this.rightLeftRotation(node);
      }
    }
  }
  swapParentChild(node, newParent, grandParent) {
    if (parent) {
      const side = oldChild.isParentRightChild ? "right" : "left";
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
    let newGrandparent = node.parent;
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
  add(value) {
    const node = super.add(value);
    balanceUptream(node);
    return node;
  }

  remove(value) {
    const node = super.find(value);
    if (node) {
      const found = super.remove(value);
      balanceUptream(node.parent);
      return found;
    }

    return false;
  }
}
