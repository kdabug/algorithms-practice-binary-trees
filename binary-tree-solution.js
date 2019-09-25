//create a binary tree node that has a left and right value
class BinaryNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  //method inserts a value into the tree
  insert(value) {
    //creates a new node
    const newNode = new BinaryNode(value);
    //set value as root if none exists
    if (this.root === null) {
      this.root = newNode;
    } else {
      //root already exists
      //establish what the root is
      let currentNode = this.root;
      while (currentNode) {
        //careful - this needs an exit strategy
        //LEFT - determine if the value give is less than the root
        if (value < currentNode.value) {
          if (!currentNode.left) {
            //there is nothing to the left - put value here
            newNode.parent = currentNode;
            currentNode.left = newNode;
            return newNode;
          }
          currentNode = currentNode.left; //run while loop again using value left of root as currentNode
        } else {
          //RIGHT - value is greater than root
          if (!currentNode.right) {
            //there is no value currently to the right - put value here
            newNode.parent = currentNode;
            currentNode.right = newNode;
            return newNode;
          }
          currentNode = currentNode.right; //run while loop again with value to the right of root
        }
      }
    }
  }

  //method looks up a value in the tree
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

  //similar to above except uses recursion rather than a while loop
  lookUpNodeAndParent(value, node = this.root, parent = null) {
    if (!node || node.value === value) {
      return { found: node, parent };
    }
    if (value < node.value) {
      return this.lookUpNodeAndParent(value, node.left, node);
    }
    return this.lookUpNodeAndParent(value, node.right, node);
  }

  //size returns the number of nodes that are in the tree
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

  //getMax returns the largest node in the tree
  getMax(node = this.root) {
    if (!this.root) {
      return null;
    }
    let currentNode = node;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  //gitMin returns the smallest node in the tree
  getMin(node = this.root) {
    if (!this.root) {
      return null;
    }
    let currentNode = node;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  //height returns the height in levels of a specified node
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

  //returns the difference between the max and min heights of the tree
  balanceFactor(node) {
    let maxHeight = 0;
    let minHeight = null;
    function bHeight(node, height = 1) {
      if (node) {
        if (height > maxHeight) {
          maxHeight = height;
        }
        if (
          (!node.left && !node.right) ||
          (!node.right && height < maxHeight)
        ) {
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
    this.root && minHeight === null && (this.root.right || this.root.left)
      ? (minHeight = 1)
      : minHeight;
    console.log(minHeight, maxHeight);
    return maxHeight - minHeight;
  }

  //method uses balanceFactor to determine if tree is balanced
  isBalanced(node = this.root) {
    return this.balanceFactor(node) >= 2 ? false : true;
  }

  //method removes a value from the tree
  remove(value, node = this.root) {
    if (!node) {
      return false;
    } else if (value < node.value && node.left) {
      node.left = this.remove(value, node.left);
    } else if (value > node.value && node.right) {
      node.right = this.remove(value, node.right);
    } else if (value === node.value) {
      // check if node is a leaf node
      if (node.left && node.right) {
        // node has two children. change its value to the min
        // right value and remove the min right node
        node.value = this.getMin(node.right);
        node.right = this.remove(node.value, node.right);
      } else {
        // replace the node with whichever child it has
        let parent = node.parent;
        node = node.left || node.right;
        if (node) {
          node.parent = parent;
        }
      }
    }
    return node;
  }
}
module.exports = { BinaryTree };

// const tree = new BinaryTree();
// tree.remove(7);
// console.log("hi");
// tree.insert(9);
// tree.insert(4);
// tree.insert(6);
// tree.insert(20);
// tree.insert(170);
// tree.insert(180);
// tree.insert(160);
// tree.insert(177);
// tree.insert(167);
// tree.insert(168);
// tree.insert(15);
// tree.insert(1);

// //VISUALIZATION and TRAVERSALS
// //            9
// //     4              20
// //  1      6     15         170
// //                      160     180
// //                        167      177
// //                           168
// //below is recursion - -for testing the above tree
// function traverse(node) {
//   const tree = { value: node.value };
//   tree.left = node.left === null ? null : traverse(node.left);
//   tree.right = node.right === null ? null : traverse(node.right);
//   return tree;
// }
// // JSON.stringify(traverse(tree.root));
// //console.log(JSON.stringify(traverse(tree.root)));

// // console.log(tree.lookup(9));
// console.log(tree.remove(1));
// // console.log(JSON.stringify(traverse(tree.root)));
// // console.log(tree.size());
// console.log(tree.getMax());
// console.log(tree.getMin());
// // console.log(tree.height());
// console.log(tree.isBalanced());

// //tree.remove(15);
