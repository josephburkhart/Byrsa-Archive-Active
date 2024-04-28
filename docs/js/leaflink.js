class LeafLink extends HTMLElement {
    // Initialize the event listener registry
    #eventListenerRegistry = new Map();

    constructor () {
      // Always call super first in constructor
      // Return value from super() is a reference to this element
      super();
      
      // Bind the event handler to `this`
      this.handleClick = this.handleClick.bind(this);

      // Bind the cloning method to `this`
      this.cloneWithCallbacks = this.cloneWithCallbacks.bind(this);
    }
    
    connectedCallback() {        
      // Create elements
      const wrapper = document.createElement("span")
      wrapper.setAttribute("class", "wrapper");
      const code = document.createElement("code");
      code.setAttribute("class", "code");
      
      // Check that callbacks for handlers are present and error if they aren't
      code.addEventListener("click", this.handleClick);
      
      // Get attribute information
      const href = this.getAttribute("href");
      const text = this.getAttribute("link-text");

      // Populate inner text with the href if no custom link text was provided
      if (!text) {
        code.textContent = href;
      } else {
        code.textContent = text;
      }

      // If href and inner text are different, create a tooltip
      let tooltip;
      if (href !== code.textContent) {
        tooltip = document.createElement("div");
        tooltip.setAttribute("class", "tooltip");
        tooltip.innerText = this.getAttribute("href");
      }
    
      // Attach the created elements
      this.appendChild(wrapper);
      wrapper.appendChild(code);
      if (tooltip) {
        wrapper.appendChild(tooltip);
      }
    }
    
    disconnectedCallback() {
      this.removeEventListener('click', this.handleClick);
    }
    
    handleClick(e) {
      // Call the relevant callback, but only if it was provided
      if (e.ctrlKey && this._ctrlClickCallback) {
        this._ctrlClickCallback();
      } else {
        if (this._clickCallback) {
          this._clickCallback();
        }
      }
    }
    
    set clickCallback(callback) {
      this._clickCallback = callback;
    }
    
    set ctrlClickCallback(callback) {
      this._ctrlClickCallback = callback;
    }

    cloneWithCallbacks() {
      //Clone the element
      const clone = this.cloneNode(true);

      // Add the callbacks
      clone.clickCallback = this._clickCallback;
      clone.ctrlClickCallback = this._ctrlClickCallback;

      // Add the Event Listener
      clone.addEventListener("click", clone.handleClick);

      return clone;
    }
  }
  
  customElements.define("leaf-link", LeafLink);