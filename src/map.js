import { isString } from "next-core-utilities";

/**
 * ES6-like Map - than can marshall
 * @param myData {object} Map data to fill map
 */
class AugmentedMap {
  constructor(myData) {
    this._keys = [];
    this._data = {};
    if (myData) {
      this.marshall(myData);
    }
  };

  /**
   * Set the value by key in the map
   * @param {string} key name of the key
   * @param {any} value value for the key
   */
  set(key, value) {
    if (key !== null && value !== null) {
      if (!this._data[key]) {
        this._keys.push(key);
      }
      this._data[key] = value;
    }
  };

  /**
   * Get the value by key in the map
   * @param {string} key name of the key
   * @returns {any} The value for the key
   */
  get(key) {
    return this._data[key];
  };

  /**
   * Index of the key in the map
   * @param {string} key name of the key
   * @returns {number} index of the key
   */
  indexOf(key) {
    return this._keys.indexOf(key);
  };

  /**
   * Remove the value by key in the map
   * @param {string} key name of the key
   */
  remove(key) {
    const i = this.indexOf(key);
    this._keys.splice(i, 1);
    delete this._data[key];
  };

  /**
   * Has returns whether a key exists in the map
   * @param {string} key name of the key
   * @returns {boolean} true if the key exists in the map
   */
  has(key) {
    return (this.indexOf(key) !== -1);
  };

  /**
   * Iterator forEach key to value in the map
   * @param {function} fn callback for the iterator
   */
  forEach(fn) {
    if (typeof fn !== "function") {
      return null;
    }
    const len = this._keys.length;
    let i = 0, k;
    for (i = 0; i < len; i++) {
      k = this._keys[i];
      fn(k, this._data[k], i);
    }
  };

  /**
   * Get the key for the index in the map
   * @param {number} i index of the key
   * @returns {object} the key at index
   */
  key(i) {
    return this._keys[i];
  };

  /**
   * The entries value object in the map
   * @returns {array} Array of entries value objects
   */
  entries() {
    let i = 0;
    const len = this._keys.length, entries = new Array(len);
    for (i = 0; i < len; i++) {
      entries[i] = {
        key : this._keys[i],
        value : this._data[i]
      };
    }
    return entries;
  };

  /**
   * The values in the map as an Array
   * @returns {array} values as an Array
   */
  values() {
    const len = this._keys.length, values = new Array(len);
    let i = 0, key;

    for (i = 0; i < len; i++) {
      key = this._keys[i];
      values[i] = this._data[key];
    }
    return values;
  };

  /**
   * Clear the map
   */
  clear() {
    this._keys = [];
    this._data = {};
  };

  /**
   * The size of the map in keys
   * @returns {number} size of map by keys
   */
  size() {
    return this._keys.length;
  };

  /**
   * Represent the map in JSON
   * @returns {object} JSON of the map
   */
  toJSON() {
    return this._data;
  };

  /**
   * Represent the map in a String of JSON
   * @returns {string} Stringified JSON of the map
   */
  toString() {
    return JSON.stringify(this._data);
  };

  // non-es6 API

  /**
   * Checks of the map is empty (not ES6)
   * @returns {boolean} true if the map is empty
   */
  isEmpty() {
    return this._keys.length === 0;
  };

  /**
   * Marshalls a map<br/>
   * dataToMarshall must be the following type of data to parse:
   * JSON object with properties (key/value)
   *
   * @param {Augmented.Utility.Map} dataToMarshall Data to marshall as a map
   * @returns {boolean} Returns true on success
   */
  marshall(dataToMarshall) {
    let dataToParse;
    if (dataToMarshall && dataToMarshall instanceof AugmentedMap) {
      dataToParse = dataToMarshall.toJSON();
    } else if(dataToMarshall && dataToMarshall instanceof Object && (Object.keys(dataToMarshall).length > 0)) {
      dataToParse = dataToMarshall;
    } else if(dataToMarshall && isString(dataToMarshall)) {
      try {
        dataToParse = JSON.parse(dataToMarshall);
      } catch(e) {
        console.warn("Map: Could not marshall data.");
        //_logger.warn("AUGMENTED: Map: Could not marshall data: " + JSON.stringify(dataToMarshall));
        return false;
      }
    } else {
      //_logger.warn("AUGMENTED: Map: Could not marshall data: " + JSON.stringify(dataToMarshall));
      console.warn("Map: Could not marshall data.");
      return false;
    }

    const props = Object.keys(dataToParse),
          l = props.length;
    this._keys = props;
    this._data = dataToParse;
    /*let i = 0;
    for (i = 0; i < l; i++) {
      const p = props[i],
            v = dataToParse[p];
      this.set(p, v);
    }*/
    return true;
  };
};

export default AugmentedMap;
