document.addEventListener('DOMContentLoaded', function () {
  const backgroundUrlInput = document.getElementById('background-url');
  const setBackgroundButton = document.getElementById('set-background');
  const quickLinksList = document.getElementById('quick-links-list');
  const newLinkInput = document.getElementById('new-link');
  const newLinkTitleInput = document.getElementById('new-link-title'); // Added input for title
  const addLinkButton = document.getElementById('add-link');
  document.body.style.backgroundImage = `url('${"https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-255379.jpg&fm=jpg"}')`
  document.body.style.backgroundRepeat="no-repeat";
  document.body.style.backgroundSize="cover";
  setBackgroundButton.addEventListener('click', function () {
    const backgroundUrl = backgroundUrlInput.value.trim();
    
    if (backgroundUrl !== '') {
      document.body.style.backgroundImage = `url('${backgroundUrl}')`;
      // Save background URL to storage for persistence
      browser.storage.sync.set({ 'backgroundUrl': backgroundUrl });
    }
  });

  addLinkButton.addEventListener('click', function () {
    const newLink = newLinkInput.value.trim();
    const newLinkTitle = newLinkTitleInput.value.trim(); // Get title value

    if (newLink !== '') {
      addQuickLink(newLink, newLinkTitle); // Pass title to the function
      // Save quick links to storage for persistence
      browser.storage.sync.get('quickLinks', function (data) {
        const quickLinks = data.quickLinks || [];
        quickLinks.push({ link: newLink, title: newLinkTitle }); // Store link and title
        browser.storage.sync.set({ 'quickLinks': quickLinks });
      });
      newLinkInput.value = '';
      newLinkTitleInput.value = ''; // Clear title input
    }
  });

  // Load saved background and quick links on extension load
  browser.storage.sync.get(['backgroundUrl', 'quickLinks'], function (data) {
    const backgroundUrl = data.backgroundUrl;
    const quickLinks = data.quickLinks || [];

    if (backgroundUrl) {
      document.body.style.backgroundImage = `url('${backgroundUrl}')`;
      backgroundUrlInput.value = backgroundUrl;
    }

    quickLinks.forEach(linkObj => addQuickLink(linkObj.link, linkObj.title)); // Pass title to the function 
  });

  function addQuickLink(link, title) {
    const listItem = document.createElement('li');
    const linkElement = document.createElement('a'); // Create a link element
    linkElement.style.textDecoration="none";
    linkElement.href = link;
    linkElement.textContent = title || link; // Use title if available, otherwise use the link
    listItem.appendChild(linkElement);
    quickLinksList.appendChild(listItem);
  

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.id='remove';
  removeButton.addEventListener('click', function () {
    // Remove the quick link from the DOM
    listItem.remove();

    // Remove the quick link from storage
    browser.storage.sync.get('quickLinks', function (data) {
      const updatedQuickLinks = data.quickLinks.filter(item => item.link !== link);
      browser.storage.sync.set({ 'quickLinks': updatedQuickLinks });
    });
  });

  listItem.appendChild(removeButton);

  quickLinksList.appendChild(listItem);
}
 
    

});

var date = new Date();
const elementDate = document.getElementById("printDate");
const elementDay = document.getElementById("printDay");
const elementTime = document.getElementById("printTime");
const listOfDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function printDate() {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  elementDate.innerHTML = day + " / " + month + " / " + year;
}

function printDay() {
  date = new Date();
  var numberOfDay = date.getDay();
  var day = listOfDays[numberOfDay];
  elementDay.innerHTML = day;
}

function printTime() {
  date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours > 12) {
    hours = hours - 12;
    elementTime.innerHTML = hours + " : " + minutes + " : " + seconds + "  PM ";
  } else if (hours < 12) {
    elementTime.innerHTML = hours + " : " + minutes + " : " + seconds + "  AM ";
  } else if (hours = 12) {
    elementTime.innerHTML = hours + " : " + minutes + " : " + seconds + "  PM ";
  }
}

setInterval(function() {
  printTime();
  printDate();
  printDay();
}, 1000);