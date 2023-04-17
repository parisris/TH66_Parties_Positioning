
// Define the parties and their initial positions
var parties = [
  { x: 70, y: 440, logo: 'images/party1.png' },
  { x: 170, y: 440, logo: 'images/party2.png' },
  { x: 270, y: 440, logo: 'images/party3.png' },
  { x: 370, y: 440, logo: 'images/party4.png' },
  { x: 470, y: 440, logo: 'images/party5.png' },
  { x: 570, y: 440, logo: 'images/party6.png' },
  { x: 670, y: 440, logo: 'images/party7.png' }
];

// Get the graph and parties containers
var graphContainer = document.getElementById('graph-container');

// Function to remove all child nodes from a given element
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// Initialize the parties on the graph
function initParties() {
  // Get all existing party elements
  var existingParties = document.querySelectorAll('.party');

  // Remove existing party elements from the graph container
  existingParties.forEach(function(party) {
    graphContainer.removeChild(party);
  });

  // Calculate the party positions and size based on the screen size
  var rowHeight, xStart, yStart, xStep, logoSize;
  if (window.innerWidth < 480) { // Mobile and Tablet screens
    rowHeight = 75;
    xStart = 20;
    yStart = 430;
    xStep = 75;
    logoSize = Math.min(window.innerWidth * 0.15, 75);
} else if (window.innerWidth < 768) {
    rowHeight = 80;
    xStart = 30;
    yStart = 430;
    xStep = 100;
    logoSize = Math.min(window.innerWidth * 0.125, 75);
} else { // Desktop screens
    rowHeight = 0;
    xStart = 70;
    yStart = 430;
    xStep = 100;
    logoSize = Math.min(window.innerWidth * 0.125, 75);
  }

  // Loop through the parties array and create party elements
  parties.forEach(function(party, index) {
    // Calculate the position of the party based on the screen size
    if (window.innerWidth < 480) { // Mobile and Tablet screens
      var x = xStart + (index%4 * xStep);
      var y = yStart + (Math.floor(index / 4) * rowHeight)
    } else if (window.innerWidth < 768) {
      var x = xStart + (index%5 * xStep);
      var y = yStart + (Math.floor(index / 5) * rowHeight)
    } else {
      var x = xStart + (index * xStep);
      var y = yStart + (Math.floor(index / 7) * rowHeight)
    };

    // Create a new party element
    var partyElement = document.createElement('img');
    partyElement.className = 'party';
    partyElement.src = party.logo;
    partyElement.width = logoSize;
    partyElement.height = logoSize;
    partyElement.style.position = 'absolute';
    partyElement.style.left = x + 'px';
    partyElement.style.top = y + 'px';

    // Add the party to the graph container
    graphContainer.appendChild(partyElement);

    // Make the party draggable
    dragElement(partyElement);
  });
};

// Call the initParties function to initialize the parties on page load
initParties();

// Reinitialize the parties on window resize
window.addEventListener('resize', function() {
  initParties();
});


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.addEventListener('mousedown', dragMouseDown);
  elmnt.addEventListener('touchstart', dragTouchStart);

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mouseup', closeDragElement);
    // call a function whenever the cursor moves:
    document.addEventListener('mousemove', elementDrag);
  }

  function dragTouchStart(e) {
    e.preventDefault();
    // get the touch position at startup:
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    document.addEventListener('touchend', closeDragElement);
    // call a function whenever the touch moves:
    document.addEventListener('touchmove', elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    if (e.type === 'touchmove') {
      // calculate the new touch position:
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      // calculate the new mouse position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button or touch is released:*/
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('touchend', closeDragElement);
    document.removeEventListener('touchmove', elementDrag);
  }
};
