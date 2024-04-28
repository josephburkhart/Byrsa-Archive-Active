// Utility Functions and Lookups
const regexs = {
    "feature-trace": /[A-Z]{2}-[A-Z]{0,2}[0-9]{4}[reh]{1}/g,
    "axis": /AX-[0-9]{3}/g,
    "figure": /[A-Za-z0-9]{1,10}\.[A-Z]{1}\.[0-9]{3}[a-z]{0,1}-{0,1}[0-9]{0,1}/g,
    "grid-minor": /([A-Z])\.([IVXLCDM]+)\.((?:\d+,)*(?:\d+))/g,
    "grid-major": /([A-Z].[IVXC]+(?:\b))(?!.\d)/g
}

// Add figure description to alt text
// let allFigures = document.getElementsByClassName('float-figure');
// for([_, figureElement] of Object.entries(allFigures)) {
//     const figureCaption = figureElement.getElementsByClassName('float-caption')[0];
//     const figureImages = figureElement.getElementsByTagName('img');
//     for (img of figureImages) {
//         img.alt = figureCaption.innerText;
//     }
// }

// Delete notes
// let allNotes = document.getElementsByClassName("note_comment");
// for ([_, noteElement] of Object.entries(allNotes)) {
//     noteElement.remove();
// } 

// Bold figure titles in captions
// allFigures = document.getElementsByClassName('float-figure');
// for([_, figureElement] of Object.entries(allFigures)) {
//     const figureCaption = figureElement.getElementsByClassName('float-caption')[0];
//     const figureID = figureCaption.innerText.match(/Figure [0-9]{0,2}.[0-9]{0,2}/);
//     figureCaption.innerHTML = figureCaption.innerHTML.replace(
//         figureID, 
//         `<b>${figureID}</b>`
//     );
// }

// Add Callbackless leaflinks for minor grid
// function addGridMinorLeafLinks() {
//     let regex = regexs["grid-minor"];
    
//     function processNode(node) {
//         if (node.nodeType === Node.TEXT_NODE) {
//             let originalText = node.textContent;

//             let match;

//             const newNodes = [];
//             let lastIndex = 0;

//             while ((match = regex.exec(originalText)) !== null) {
//                 // Text before the match becomes a new text node
//                 if (match.index > lastIndex) {
//                     newNodes.push(document.createTextNode(originalText.substring(lastIndex, match.index)));
//                 }

//                 // Unpack capture groups
//                 [fullMatchText, gridCol, gridRow, gridNums] = match;
//                 gridNums = gridNums.split(",");

//                 // Create a link for each minor grid number
//                 let fullNewText = fullMatchText;
//                 for ([i, n] of gridNums.entries()) {
//                     // Make link encompassing whole ID for the first number
//                     let textToReplace;
//                     let href;
//                     if (i === 0) {
//                         textToReplace = gridCol + "." + gridRow + "." + n;
//                         href = textToReplace;
//                     } else {
//                         textToReplace = n;
//                         href = gridCol + "." + gridRow + "." + n;
//                     }

//                     // Create link
//                     const link = document.createElement("leaf-link");
//                     link.setAttribute("link-type", "grid-minor");
//                     link.setAttribute("href", href);

//                     // Set the custom text if necessary
//                     if (href !== textToReplace) {
//                         link.setAttribute("link-text", textToReplace);
//                     }

//                     // Pass to new nodes
//                     newNodes.push(link)

//                     // If there's more than one grid number and we're not on the
//                     // last one, have to pass a comma
//                     if (gridNums.length > 1 && i < gridNums.length - 1) {
//                         newNodes.push(document.createTextNode(','));
//                     }
//                 }

//                 // Update lastIndex to the end of the current match
//                 lastIndex = match.index + fullMatchText.length;
//             }

//             // If there's remaining text after the last match, add it as a
//             // text node
//             if (lastIndex < originalText.length) {
//                 newNodes.push(document.createTextNode(originalText.substring(lastIndex)));
//             }

//             // If we've created new nodes, replace the original text node with them
//             if (newNodes.length > 0) {
//                 const parentNode = node.parentNode;
//                 newNodes.forEach(newNode => parentNode.insertBefore(newNode, node));
//                 parentNode.removeChild(node);
//             }
//         } else if (node.nodeType === Node.ELEMENT_NODE) {
//             // If it's an element node, recurse into its children
//             Array.from(node.childNodes).forEach(processNode);
//         }
//     }

//     // Start the recursion from the document body
//     processNode(document.body);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     addGridMinorLeafLinks();
// });
// for ([linkType, regex] of Object.entries(regexs)) {
//     // Special logic for grid-minor, which will have a lot of abbreviated IDs
//     if (linkType === "grid-minor") {

//     }
    
//     // For everything else, follow the same procedure
//     else {
        
//     }
// }
