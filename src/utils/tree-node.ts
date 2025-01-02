export class TreeNode {
  word: string;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(word: string) {
    this.word = word;
    this.left = null;
    this.right = null;
  }
}