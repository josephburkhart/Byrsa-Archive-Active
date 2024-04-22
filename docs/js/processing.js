function urlPageNumber(labelledPageNumber) {
    let romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix',
        'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii',
        'xviii', 'xix', 'xx', 'xxi'];
    if (romanNumerals.includes(labelledPageNumber)) {
        return romanNumerals.indexOf(labelledPageNumber) + 1;
    } else {
        return parseInt(labelledPageNumber) + romanNumerals.length;
    }
}

let url = `https://open.library.ubc.ca/media/stream/pdf/24/1.0401823/` +
           `3#page=${urlPageNumber}`;
// Redact figures that could violate copyright
let redactedFigures = {
    "Figure 5.7": 61,   // annotated - fair use?
    "Figure 6.4": 140,  // annotated - fair use?
    "Figure 6.5": 141,  // annotated - fair use?
    "Figure 6.6": 146,  // annotated - fair use?
    "Figure 6.7": 148,  // annotated - fair use?
    "Figure 6.8": 149,  // annotated - fair use?
    "Figure 6.9": 150,  // annotated - fair use?
    "Figure A.1": 187,  // annotated - fair use?
    "Figure A.2": 188,  // annotated - fair use?
    "Figure A.5": 192,  // annotated - fair use?
    "Figure A.6": 193,  // annotated - fair use?
    "Figure A.7": 194,  // annotated - fair use?
    "Figure A.8": 196,  // annotated - fair use?
    "Figure B.1": 199,
    "Figure B.2": 200,
    "Figure B.3": 201,
    "Figure B.4": 202,
    "Figure B.5": 203,
    "Figure B.6": 203,
    "Figure B.7": 204,
    "Figure B.8": 205,
    "Figure B.9": 206,
    "Figure B.10": 207,
    "Figure B.11": 208,
    "Figure B.12": 209,
    "Figure B.13": 209,
    "Figure B.14": 210,
    "Figure B.15": 211,
    "Figure B.16": 212,
    "Figure B.17": 213,
    "Figure B.18": 214,
    "Figure B.19": 215,
    "Figure B.20": 216,
}
const allFigures = document.getElementsByClassName('float-figure');
for([_, figureElement] of Object.entries(allFigures)) {
    const figureCaption = figureElement.getElementsByClassName('float-caption')[0];
    const matchedFigureName = Object.keys(redactedFigures).find(
        v => figureCaption.innerText.includes(v)
    );
    
    if (matchedFigureName) {
        // Mark figure container as redacted
        figureElement.classList.add('redacted');

        // Create redaction element
        const redactionElement = document.createElement('div');
        redactionElement.className = 'redacted-figure';
        const redactedText = `${matchedFigureName} has been redacted due to ` +
                            `copyright restrictions. To view the figure, ` +
                            `see page ${redactedFigures[matchedFigureName]} ` +
                            `(${urlPageNumber(redactedFigures[matchedFigureName])} ` +
                            `of 314) in Burkhart 2021: `;
        const url = `https://open.library.ubc.ca/media/stream/pdf/24/1.040182` + 
                    `3/3#page=` + 
                    `${urlPageNumber(redactedFigures[matchedFigureName])}`;
        const redactedLink = document.createElement('a');
        redactedLink.setAttribute('href', url);
        redactedLink.innerText = url;

        redactionElement.appendChild(document.createTextNode(redactedText));
        redactionElement.appendChild(redactedLink);

        // Replace img element with redaction div
        const figureImages = figureElement.getElementsByTagName('img');
        for (img of figureImages) {
            img.replaceWith(redactionElement);
        }
    }
}

// Footnote handling
const foots = document.getElementsByClassName("foot");
for ([key, div] of Object.entries(foots)) {
  const footLabel = div.getElementsByClassName("foot_label")[0];
  const footContent = div.getElementsByClassName("foot_inner")[0];
  // Make sure foot content shows the fn label
  const footContentLabel = document.createElement("sup");
  footContentLabel.innerText = footLabel.innerText + " ";
  footContent.prepend(footContentLabel);
  // footContent.prepend(footContentLabel);
  
  // On click, open the footnote content and keep it open
  footLabel.addEventListener("click", function(e) {
    // If content is not currently active, make it so...
    if (!footContent.classList.contains('active')) {
      footContent.classList.add("active");
      // Button to close footnote
      const closeButton = document.createElement("div");
      closeButton.setAttribute("class", "close");
      closeButton.innerText = "x";
      closeButton.addEventListener("click", function(e) {
        e.stopPropagation();
        footContent.classList.remove("active");
        // closeButton.remove();
      });
      footContent.appendChild(closeButton); 
    } 
    // ... otherwise make it inactive
    else {
      footContent.classList.remove("active");;
    }
  })
}