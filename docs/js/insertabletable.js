/** Class extending the default HTML table to have an insert method. */
class InsertableTable extends HTMLTableElement {
    constructor () {
      super();
    }

    /**
     * Insert data into the cell at a given row and column.
     * @param {number|string|HTMLElement} data - value, text, or element to be
     * inserted into the cell
     * @param {number} rowIndex - index of the row of the target cell
     * @param {number} colIndex - index of the column of the target cell
     */
    insert(data, rowIndex, colIndex) {
      let row = table.rows[rowIndex];
      let cell = row.cells[colIndex];
      
      // If data is an HTML element, append it as a child,
      // otherwise use it to set the cell's inner text
      if (data instanceof HTMLElement) { cell.appendChild(data) }
      else { cell.innerText = data };
    }
  }
  
customElements.define("insertable-table", InsertableTable, { extends: "table"});

/**
 * Return an empty insertable table with the specified number of rows and 
 * columns, and optionally with the specified attributes.
 * @param {number} nrows - number of rows
 * @param {number} ncols - number of columns
 * @param {object} [rowAttributes] - [optional] - in-line attributes to assign
 * to each row
 * - Note: Must be of the form {attribute1: "value1", attribute2: "value2", ...}
 */
function makeInsertableTable(nrows, ncols, rowAttributes = {}) {
    // Create parent table and table body
    const table = document.createElement("table", {is: 'insertable-table'});
    const tableBody = document.createElement("tbody");

    for (let i = 0; i < nrows; i++) {
        // Create row
        let row = document.createElement("tr");
        
        // Assign the provided attributes to the row
        for (k of Object.keys(rowAttributes)) {
          // console.log(k, rowAttributes[k]);
          row.setAttribute(k, rowAttributes[k]);
        }
        
        // Create cells in row
        for (let j = 0; j < ncols; j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
        }

        // Add row to end of table body
        tableBody.appendChild(row);
    }

    // Put table body in table
    table.appendChild(tableBody);

    return table
}