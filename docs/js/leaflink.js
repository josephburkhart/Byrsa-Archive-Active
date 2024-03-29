class LeafLink extends HTMLElement {
    constructor () {
      // Always call super first in constructor
      // Return value from super() is a reference to this element
      super();
      
      // Bind the event handler to `this`
      this.handleClick = this.handleClick.bind(this);
    }
    
    connectedCallback() {  
      // Create a shadow root
      const shadow = this.attachShadow({ mode: "open" });
      
      // Create elements
      const wrapper = document.createElement("span")
      wrapper.setAttribute("class", "wrapper");
      const code = document.createElement("code");
      code.setAttribute("class", "code");
      const anchor = document.createElement("a");
      anchor.setAttribute("class", "a");
      anchor.setAttribute("href", "")
      
      code.appendChild(anchor);
      
      // Check that callbacks for handlers are present and error if they aren't
      code.addEventListener("click", this.handleClick);
      
      // Take attribute content and put it inside the anchor
      const text = this.getAttribute("link-text");
      anchor.textContent = text;
      
      // Tooltip with instructions
      const tip = document.createElement("span");
      tip.setAttribute("class", "tip");
      tip.textContent = "click: highlight; Ctrl+click: go to feature";
      
      // Create some CSS to apply to the shadow dom
      const style = document.createElement("style");
      
      style.textContent = `
        .wrapper {
          position: relative;
        }
        
        .code {
          background-color: #eee;
          border-radius: 3px;
          padding: 0 3px;
        }
        
        .tip {
          font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
          font-size: 0.8rem;
          width: 225px;
          display: inline-block;
          border: 1px solid #eee;
          padding: 3px;
          background: rgba(255,255,255,0.8);
          box-shadow: 0 0 5px rgba(0,0,0,0.05);
          border-radius: 5px;
          opacity: 0;
          transition: 0.2s all;
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 3;
          text-align: center
        }
        
        .code:hover  + .tip, .code:focus + .tip {
          opacity: 1;
        }
      `;
      
      // Attach the created elements to the shadow dom
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(code);
      wrapper.appendChild(tip);
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
  }
  
  customElements.define("leaf-link", LeafLink);