var siteName = document.getElementById('siteNameInput');
var siteURL = document.getElementById('siteURL');
var siteSearch = document.getElementById('siteSearchInput');
var addSite = document.getElementById('siteAddButton');
var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');
var currentIndex = 0;

// Local Storage
if (localStorage.getItem('allSites') == null) {
  var siteContainer = []
} else {
  var siteContainer = JSON.parse(localStorage.getItem('allSites'))
  displaySite()
}

// Create Site
function createSite() {
  var site = {
    sName: siteName.value,
    sURL: siteURL.value,
  }
  siteContainer.push(site)
}

// Clear Form
function clearForm() {
  siteName.value = '';
  siteURL.value = '';
}

// Display Site
function displaySite() {
  var trs = ''
  for (var i = 0; i < siteContainer.length; i++) {
    trs += `
    <tr>
    <td>${siteContainer[i].sName}</td>
    <td><a href="${siteContainer[i].sURL}" class="" target="_blank">${siteContainer[i].sURL}</a></td>
    <td><button onclick="getSiteInfo(${i})" class="btn btn-warning text-white">Update</button></td>
    <td><button onclick="deleteSite(${i})" class="btn btn-danger text-white">Delete</button></td>
    <td><a href="${siteContainer[i].sURL}" class="btn btn-success" target="_blank">Visit</a></td>
    </tr>
    `
  }
  document.getElementById('tableBody').innerHTML = trs;
}

// Delete Site
function deleteSite(index) {
  if (confirm('Are You Sure?')) {
    siteContainer.splice(index, 1);
    localStorage.setItem('allSites', JSON.stringify(siteContainer))
    displaySite();
  }
}

// Search Site
function searchSite() {
  var trs = ''
  for (var i = 0; i < siteContainer.length; i++) {
    if (siteContainer[i].sName.toLowerCase().includes(siteSearch.value.toLowerCase()) || siteContainer[i].sURL.toLowerCase().includes(siteSearch.value.toLowerCase())) {
      trs += `
      <tr>
      <td>${siteContainer[i].sName.replace(siteSearch.value, '<span class="bg-warning">' + siteSearch.value + '</span>')}</td>
      <td><a href="${siteContainer[i].sURL}" class="" target="_blank">${siteContainer[i].sURL.replace(siteSearch.value, '<span class="bg-warning">' + siteSearch.value + '</span>')}</a></td>
      <td><button onclick="getSiteInfo(${i})" class="btn btn-warning text-white">Update</button></td>
      <td><button onclick="deleteSite(${i})" class="btn btn-danger text-white">Delete</button></td>
      <td><a href="${siteContainer[i].sURL}" class="btn btn-success" target="_blank">Visit</a></td>
      </tr>
      `
    }
    document.getSelection(siteContainer[i].sName)
  }
  document.getElementById('tableBody').innerHTML = trs;
}

// Get Site Info
function getSiteInfo(index) {
  siteName.value = siteContainer[index].sName;
  siteURL.value = siteContainer[index].sURL;
  addSite.innerHTML = 'Update Site';
  currentIndex = index;
}

// Validation
addSite.onclick = function () {
  if (siteName.value == "" && siteURL.value == "") {
    nameAlert.classList.remove("d-none");
    urlAlert.classList.remove("d-none");
  } else if (siteName.value == "") {
    nameAlert.classList.remove("d-none");
    urlAlert.classList.add("d-none");
  } else if (siteURL.value == "") {
    nameAlert.classList.add("d-none");
    urlAlert.classList.remove("d-none");
  }
  else {
    nameAlert.classList.add("d-none");
    urlAlert.classList.add("d-none");
    if (addSite.innerHTML == 'Add Site') {
      createSite()
    } else {
      updateSite()
    }
    localStorage.setItem('allSites', JSON.stringify(siteContainer))
    clearForm();
    displaySite();
  }
}

// Update Site
function updateSite() {
  var site = {
    sName: siteName.value,
    sURL: siteURL.value
  }
  siteContainer[currentIndex] = site
  addSite.innerHTML = 'Add Site'
}
