//create a binary tree node that has a left and right value
class BinaryNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    //creates a new node
    const newNode = new BinaryNode(value);
    //set value as root if none exists
    if (this.root === null) {
      this.root = newNode;
    } else {
      // root already exists
      //establish what the root is
      let currentNode = this.root;
      while (currentNode) {
        //careful - this needs an exit strategy
        //LEFT - determine if the value give is less than the root
        if (value < currentNode.value) {
          if (!currentNode.left) {
            //there is nothing to the left - put value here
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left; //run while loop again using value left of root as currentNode
        } else {
          //RIGHT - value is greater than root
          if (!currentNode.right) {
            //there is no value currently to the right - put value here
            currentNode.right = newNode;
            return this;
          }
          currentNode = currentNode.right; //run while loop again with value to the right of root
        }
      }
    }
  }
  lookup(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return false;
  }
  size(node = this.root) {
    let count = 0;
    function rSize(node) {
      if (node) {
        count++;
        rSize(node.left);
        rSize(node.right);
      }
    }
    rSize(node);
    return count;
  }
  getMax() {
    if (!this.root) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }
  getMin() {
    if (!this.root) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
  height(node = this.root) {
    let maxHeight = 0;
    function rHeight(node, height = 1) {
      if (node) {
        if (height > maxHeight) {
          maxHeight = height;
        }
        rHeight(node.left, height + 1);
        rHeight(node.right, height + 1);
      }
    }
    rHeight(node);
    return maxHeight;
  }
  balanceFactor(node) {
    let maxHeight = 0;
    let minHeight = null;
    function bHeight(node, height = 1) {
      if (node) {
        if (height > maxHeight) {
          maxHeight = height;
        }
        if (height < maxHeight) {
          if (!minHeight) {
            minHeight = height;
          }
          if (height < minHeight) {
            minHeight = height;
          }
        }
        bHeight(node.left, height + 1);
        bHeight(node.right, height + 1);
      }
    }
    bHeight(node);
    console.log(minHeight, maxHeight);
    return maxHeight - minHeight;
  }
  isBalanced(node = this.root) {
    return this.balanceFactor(node) > 2 ? false : true;
  }
  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //we have a match
        //option 1: no right child;
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            //if parent > current value, make current
            //left child a child of parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
          //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          } else {
            //if parent > current, make right child of the left the parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;

              //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }

          //Option 3: Right child that has a left child
        } else {
          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }
}

module.exports = { BinaryNode, BinarySearchTree };

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
// tree.insert(180);
// tree.insert(160);
// tree.insert(177);
// tree.insert(167);
// tree.insert(168);
tree.insert(15);
tree.insert(1);

//VISUALIZATION and TRAVERSALS
//      9
//  4       20
//1   6  15   170

//below is recursion - -for testing the above tree
function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
JSON.stringify(traverse(tree.root));
//console.log(JSON.stringify(traverse(tree.root)));

console.log(tree.lookup(9));
// console.log(tree.remove(9));
console.log(JSON.stringify(traverse(tree.root)));
// console.log(tree.size());
// console.log(tree.getMax());
// console.log(tree.getMin());
// console.log(tree.height());
console.log(tree.isBalanced());

//tree.remove(15);
