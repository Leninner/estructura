import { TreeNode } from "./tree-node";

export class WordTree {
  root: TreeNode | null;

  constructor(words: string[]) {
    this.root = null;
    words.forEach((word) => this.insert(word));
  }

  insert(word: string) {
    const newNode = new TreeNode(word);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  private _insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.word < node.word) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  pickRandom(): string | null {
    const words = this.inOrder();
    if (words.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    console.log("Picking word", word);

    return word;
  }

  inOrder(): string[] {
    const result: string[] = [];
    this._inOrderTraversal(this.root, result);
    return result;
  }

  private _inOrderTraversal(node: TreeNode | null, result: string[]) {
    if (node) {
      this._inOrderTraversal(node.left, result);
      result.push(node.word);
      this._inOrderTraversal(node.right, result);
    }
  }

  private _size(node: TreeNode | null): number {
	if (!node) return 0;

	return 1 + this._size(node.left) + this._size(node.right);
  }

  size(): number {
	return this._size(this.root);
  }

  delete(word: string) {
    this.root = this._deleteNode(this.root, word);
  }

  private _deleteNode(node: TreeNode | null, word: string): TreeNode | null {
    if (!node) return null;

    if (word < node.word) {
      node.left = this._deleteNode(node.left, word);
    } else if (word > node.word) {
      node.right = this._deleteNode(node.right, word);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minNode = this._findMinNode(node.right);
      node.word = minNode!.word;
      node.right = this._deleteNode(node.right, minNode!.word);
    }
    return node;
  }

  private _findMinNode(node: TreeNode): TreeNode | null {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }
}