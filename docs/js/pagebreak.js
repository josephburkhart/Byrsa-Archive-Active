/** 
 Class for displaying where page breaks occur in the thesis's PDF 
 Must be initialized with the following attributes:
   - `pnbefore`: the page number before the break
   - `pnafter`: the page nubmer after the break
*/
class PB extends HTMLElement {
    constructor () {
      super();
      
      // Bind the event handler to `this`
      this.handleClick = this.handleClick.bind(this);
    }
    
    connectedCallback() {
      // Create shadow root
      const shadow = this.attachShadow({ mode: "open" });
      
      // Get input for before and after page number
      const pnbefore = this.getAttribute("pnbefore");
      const pnafter = this.getAttribute("pnafter");
      
      // Create elements
      const wrapper = document.createElement("span");
      wrapper.setAttribute("class", "page-break-wrapper")

      const before = document.createElement("small");
      before.setAttribute("class", "page-number");
      before.innerText = pnbefore;

      const line = document.createElement("span");
      line.setAttribute("class", "page-break-mark");
      line.innerText = "|";

      const after = document.createElement("small");
      after.setAttribute("class", "page-number")
      after.innerText = pnafter;
      
      // Create callbacks
      // Note: I tried to abstract this away into a lookup function, but it
      // kept failing in ways I couldn't understand. Keeping the functionality
      // here, although inelegant, solved the problems.
      before.addEventListener("click", function (e) {
        let urlPageNumber;
        let romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix',
        'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii',
        'xviii', 'xix', 'xx', 'xxi'];
        if (romanNumerals.includes(pnbefore)) {
          urlPageNumber = romanNumerals.indexOf(pnbefore) + 1
        } else {
          urlPageNumber = parseInt(pnbefore) + romanNumerals.length
        }
        let url = `https://open.library.ubc.ca/media/stream/pdf/24/1.0401823/` +
                   `3#page=${urlPageNumber}`;
        window.open(url, "");   // doesn't always open to new tab - prompt user to confirm first?
      });
      after.addEventListener("click", function (e) {
        let urlPageNumber;
        let romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix',
        'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii',
        'xviii', 'xix', 'xx', 'xxi'];
        if (romanNumerals.includes(pnafter)) {
          urlPageNumber = romanNumerals.indexOf(pnafter) + 1
        } else {
          urlPageNumber = parseInt(pnafter) + romanNumerals.length
        }
        let url = `https://open.library.ubc.ca/media/stream/pdf/24/1.0401823/` +
                   `3#page=${urlPageNumber}`;
        window.open(url, "");
      });

      // Create style
      const style = document.createElement("style");
      style.innerText = `
        * {
        user-select: none;
        opacity: 0.5;
        }
        .page-break-wrapper:hover * {
          opacity: 1.0;
          font-weight: bold;
        }
        .page-number {
          margin-right: 3px;
          margin-left: 3px;
        }
        .page-number:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `
      // Append children
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(before);
      wrapper.appendChild(line);
      wrapper.appendChild(after);
    }
    
    handleClick(e) {
      if (this._clickCallback) { this.clickCallback() };
    }
    
    set clickCallback(callback) {
      this._clickCallback = callback;
    }
  }

// Custom element
customElements.define("p-b", PB);