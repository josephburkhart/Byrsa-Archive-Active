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