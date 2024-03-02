const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const node = this.treeRoot;
    if (node === null) {
      this.treeRoot = new BinarySearchTreeNode(data);
      return;
    } else {
      const searchTree = node => {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new BinarySearchTreeNode(data);
            return;
          } else {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new BinarySearchTreeNode(data);
            return;
          } else {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };

      return searchTree(node);
    }
  }

  has(data) {
   let currentNode = this.treeRoot;
   while(currentNode) {
     if(data === currentNode.data) {
       return true;
     }
     if(data < currentNode.data) {
       currentNode = currentNode.left;
     } else {
       currentNode = currentNode.right;
     }
   }
    return false;
  }

  find(data) {
    let currentNode = this.treeRoot;
    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    const removeNode = (currentNode, data) => {
      if (currentNode === null) {
        return null;
      }
      if (data === currentNode.data) {
        if (currentNode.left == null && currentNode.right == null) {
          return null;
        }
        if (currentNode.left === null) {
          return currentNode.right;
        }
        if (currentNode.right === null) {
          return currentNode.left;
        }
        let temp = currentNode.right;
        while (temp.left !== null) {
          temp = temp.left;
        }
        currentNode.data = temp.data;
        currentNode.right = removeNode(currentNode.right, temp.data);
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, data);
        return currentNode;
      } else {
        currentNode.right = removeNode(currentNode.right, data);
        return currentNode;
      }
    }
    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    let currentNode = this.treeRoot;
    if (currentNode === null)  return null;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.treeRoot;
    if (currentNode === null) return null;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};