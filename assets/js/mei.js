/**
 *
 * @version 1.0.0
 * @author germancutraro
 * @license MIT
 *
 **/

class Mei {
  /* ** DOM MANIPULATION ** */
  static getElement(query, type, cb = () => { }) {
    if (query === "")
      throw new SyntaxError("You must specify the element selector");
    let element = document.querySelector(query);
    return type === undefined || type === ""
      ? element
      : element.addEventListener(type, cb);
  }

  static getElements(query = null, type, cb = () => { }) {
    if (query === "")
      throw new SyntaxError("You must specify the element selector");
    let elements = [...document.querySelectorAll(query)];
    return type === undefined || type === ""
      ? elements
      : elements.map(el => el.addEventListener(type, cb));
  }

  /* ** CHANGING THE DOM ** */
  static createElement(element, attributes) {
    if (element === "")
      throw new SyntaxError("You must specify a valid element");
    let el = document.createElement(element);
    Object.keys(attributes).map(key => {
      key !== "parent" && key !== "children"
        ? (el[key] = attributes[key])
        : false;
    });
    // Parent AppendChild
    attributes.parent !== undefined ? attributes.parent.appendChild(el) : false;

    // Childs
    if (attributes.children !== undefined) {
      [...attributes.children].map((child, i) => {
        let newChildren = document.createElement(child.element);
        Object.keys(child).map(key => {
          key !== "element"
            ? (newChildren[key] = attributes.children[i][key])
            : false;
        });
        el.appendChild(newChildren);
      });
    }
  }

  static removeElement(id) {
    let el;
    typeof id === "string" && id !== ""
      ? ((el = document.querySelector(id)),
        el !== null ? el.remove() : console.error("element not found"))
      : typeof id === "object"
        ? id.remove()
        : console.error("Invalid ID specification");
  }

  static cloneElement(element) {
    return typeof element === "object"
      ? element.cloneNode(true)
      : typeof element === "string"
        ? this.getElement(element).cloneNode(true)
        : false;
  }

  /* ** STORAGE ** */
  static setTypeOfStore(query) {
    let type =
      query === "local"
        ? localStorage
        : query === "session"
          ? sessionStorage
          : new Error("Must be local or session!");
    return type;
  }
  static store(config = {}) {
    let storeType = this.setTypeOfStore(config.store);
    storeType.setItem(config.item, JSON.stringify(config.data));
  }
  static clearStore(type) {
    let storeType = this.setTypeOfStore(type);
    storeType.clear();
  }
  static displayStore(type, item) {
    let storeType = this.setTypeOfStore(type),
      items;
    storeType.getItem(item) === null
      ? (items = [])
      : (items = JSON.parse(storeType.getItem(item)));
    return items;
  }



}
