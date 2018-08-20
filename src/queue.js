import { extend } from "next-core-utilities";

const DEFAULT_TIMEOUT = 2000;

/**
 * AsynchronousQueue -
 * An Async queue for handling async chained functions
 * @param {number} timeout The timout period for each process in the queue (optional)
 */
class AsynchronousQueue {
  constructor(timeout) {
    this._timeout = (timeout) ? timeout : DEFAULT_TIMEOUT;
    this._queue = {};
  };

  /**
   * Add method for adding processes to the queue
   */
  add(...args) {
    if (args && args.length > 0) {
      extend(this._queue, args);
      return true;
    }
    return false;
  };

  /**
   * Clear all processes in the queue
   */
  clear() {
    if (this._queue.length > 0) {
      this._queue.splice(0, this._queue.length);
    }
  };

  /**
   * Process the queue
   */
  process(...args) {
    if (args) {
      extend(this._queue, args);
    }
    const q = this._queue;
    const l = Object.keys(q).length;//args.length;
    let to = this._timeout;

    if (l <= 0) {
      return false;
    }
    const chain = (i) => {
      if (i >= l || typeof q[i] !== 'function') {
        return false;
      }
      setTimeout( () => {
        q[i]();
        chain(i + 1);
      }, to);
    };
    chain(0);
    return true;
  };

  /**
   * Get the timeout for the queue
   */
  get timeout() {
    return this._timeout;
  };

  /**
   * Get the full queue
   */
  get queue() {
    return this._queue;
  };
};

export default AsynchronousQueue;
