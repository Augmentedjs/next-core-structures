/**
 * Stack - Standard Stack data structure</br>
 * <p>Supported options are:</p>
 * <ul>
 * <li><em>stack</em> - an array to populate</li>
 * </ul>
 * @param {object} options Options to pass
 */
class Stack {
  constructor(options) {
    if (!options) {
      options = {};
    }
    if (options.stack) {
      this._stack = options.stack;
    } else {
      this._stack = [];
    }
  };

  /**
   * The empty method clears the stack
   */
  empty() {
    return (this._stack.length === 0);
  };
  /**
   * The peek method returns the first in the stack
   * @returns {object} Returns the first object in the stack
   */
  peek() {
    return this._stack[0];
  };
  /**
   * The pop method returns and removes the first in the stack
   * @returns {object} Returns the first object in the stack
   */
  pop() {
    return this._stack.pop();
  };
  /**
   * The push method adds to the stack
   * @param {object} item The item to push to the stack
   */
  push(item) {
    this._stack.push(item);
  };
  /**
   * The search method returns where in the stack an item exists
   * @returns {number} Returns the index of the item
   */
  search(item) {
    return this._stack.indexOf(item);
  };
  /**
   * The size method returns the size of the stack
   * @returns {number} Returns the size of the stack
   */
  size() {
    return this._stack.length;
  };
  /**
   * The clear method clears the stack
   */
  clear() {
    this._stack.splice(0, this._stack.length);
  };
  /**
   * The toArray method returns the stack as an array
   * @returns {array} Returns the stack as an array
   */
  toArray() {
    return this._stack;
  };

  /**
   * The toString method returns the stack as an string
   * @returns {string} Returns the stack as an string
   */
  toString() {
    return this._stack.toString();
  };
};

export default Stack;
