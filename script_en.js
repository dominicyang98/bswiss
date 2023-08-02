// Function to get the current date in the format "Day, Month Date, Year"
function getCurrentDate() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
}

// Function to get the current date in French
function getCurrentDateFrench() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('fr-FR', options);
}

// Function to get the current time in 24-hour format
function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Function to update the footer with the current date and time
function updateFooter() {
  const footerDate = document.getElementById('footer-date');
  const footerDateFrench = document.getElementById('footer-date-french');
  const footerTime = document.getElementById('footer-time');

  footerDate.textContent = getCurrentDate();
  footerDateFrench.textContent = getCurrentDateFrench();
  footerTime.textContent = getCurrentTime();
}

// Initial update of the footer
updateFooter();

// Update the footer every minute to show the current time
setInterval(updateFooter, 1000);

// Function to display content from JSON file
function displayContent(content) {
  const meetingContent = document.getElementById('meeting-content');

    // Define the set of allowed room values
    const allowedRooms = new Set([
        'AH', 'CC', 'I', 'II', 'III', 'IV', 'IX', 'S1', 'S3', 'S4',
        'Salle 100', 'Salle 101', 'Salle 102', 'Salle 103', 'Salle 104', 'Salle 105',
        'Salle 106', 'Salle 200', 'Salle 201', 'Salle 202', 'Salle 203', 'Salle 204',
        'Salle 205', 'Tempus', 'V', 'VI', 'VII', 'VIII', 'X', 'XI', 'XII', 'XIV',
        'XIX', 'XV', 'XVI', 'XVII', 'XVIII', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV',
        'XXV', 'XXVI', 'XXVII'
    ]);

  content
      .filter(item => allowedRooms.has(item.room))
      .forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('meeting-item');

      const timeDiv = document.createElement('div');
      timeDiv.classList.add('time', 'start-time-background'); // Add the new class here

      // Extract the hour and minute from the startTime
      const [hours, minutes] = item.startTime.split(':');
      const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

      timeDiv.textContent = `${formattedTime}`;

      const detailDiv = document.createElement('div');
      detailDiv.classList.add('detail');

      const organAcronymDiv = document.createElement('div');
      organAcronymDiv.textContent = item.organAcronym;
      organAcronymDiv.classList.add('bold-text'); // Add the bold-text

      const shortTitleDiv = document.createElement('div');
      shortTitleDiv.textContent = item.shortTitle;

      const roomClosedDiv = document.createElement('div');
      roomClosedDiv.classList.add('room-closed');

      const roomDiv = document.createElement('div');
      roomDiv.textContent = `Room: ${item.room}`;

      const closedDiv = document.createElement('div');
      // Replace "Y" with "Yes" and "N" with "No" for item.closed property
      closedDiv.textContent = `Public: ${item.closed === "Y" ? "Yes" : "No"}`;

      roomClosedDiv.appendChild(roomDiv);
      roomClosedDiv.appendChild(closedDiv);

      detailDiv.appendChild(organAcronymDiv);
      detailDiv.appendChild(shortTitleDiv);
      detailDiv.appendChild(roomClosedDiv);

      itemDiv.appendChild(timeDiv);
      itemDiv.appendChild(detailDiv);

      meetingContent.appendChild(itemDiv);
  });
}

// Fetching and displaying content from JSON file
fetch('input.json')
  .then(response => response.json())
  .then(data => displayContent(data))
  .catch(error => console.error('Error fetching JSON data:', error));

// Setting up the footer with current date and time
const { englishDate, frenchDate } = getCurrentDate();
const currentTime = getCurrentTime();

const dateElement = document.getElementById('date');
dateElement.textContent = ` ${englishDate} | ${frenchDate}`;

const timeElement = document.getElementById('time');
timeElement.textContent = ` ${currentTime}`;
