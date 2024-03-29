/** Class extending the default span element to have a split method. */
class SplittableSpan extends HTMLSpanElement {
    constructor () {
      super();
    }
    /**
     * Split this span into multiple child text nodes according to a string, and
     * optionally insert an element in between each child node.
     * @param {string} on - what the inner text should be split on
     * @param {HTMLElement} [insertElement] - [optional] element to insert at
     * each split
     */
    replaceStringWithElement(str, element) {
      // Container for new/processed child nodes
      const newChildNodes = [];

      // Process each child node separately
      this.childNodes.forEach((child) => {
        console.log(child);
        if (child.nodeType === Node.TEXT_NODE) {
          // Check for matches
          if (child.textContent.match(str)) {
            const splits = child.textContent.split(str);

            for (let [i, s] of splits.entries()) {
              newChildNodes.push(document.createTextNode(s));

              if (i != splits.length -1 ) {
                newChildNodes.push(element);
              }
            }
          } else {
            newChildNodes.push(child);
          }
        } else {
          newChildNodes.push(child);
        }
      });

      // Clear the parent element and append the new child nodes
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      newChildNodes.forEach(node => {
        this.appendChild(node);
      });
    }
  }
  
  customElements.define('splittable-span', SplittableSpan, { extends: "span"});