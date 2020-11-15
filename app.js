'use strict';

document.getElementById('list').onclick = function () {
  document.getElementById('container').style.transform = 'scale(1)';
};
document.getElementById('close').onclick = function () {
  document.getElementById('container').style.transform = 'scale(0)';
};

document.getElementById('form').addEventListener('submit', memorizeMarker);

function memorizeMarker(x) {
  let name = document.getElementById('WebsiteName').value;
  let URL = document.getElementById('URL').value;
  x.preventDefault();

  // check input validation
  if (!name && !URL) {
    alert('Please insert the name and the URL');
    return false;
  } else if (!name) {
    alert('Please insert the name');
    return false;
  } else if (!URL) {
    alert('Please insert the URL');
    return false;
  } else {
    showLight();
    setTimeout(hideLight, 1000);
  }

  let data = {
    siteName: name,
    siteURL: URL,
  };
  // check if there's no local storage
  if (localStorage.getItem('storage') === null) {
    let arr = [];
    arr.push(data);
    let myjson = JSON.stringify(arr);
    // create local storage
    localStorage.setItem('storage', myjson);
  } else {
    let get = JSON.parse(localStorage.getItem('storage'));
    get.push(data);
    let myjson = JSON.stringify(get);
    localStorage.setItem('storage', myjson);
  }
  // prevent reloading to see bookmark list
  display();
  document.getElementById('form').reset();
}

function display() {
  let get = JSON.parse(localStorage.getItem('storage'));
  let result = document.getElementById('yourSites');

  result.innerHTML = '';
  for (let i = 0; i < get.length; i++) {
    result.innerHTML +=
      '<div>' +
      get[i].siteName +
      '<a href="' +
      get[i].siteURL +
      '"' +
      'target="_blank">Go</a>' +
      '<button onclick="deleteOne(\'' +
      get[i].siteName +
      '\')">Delete</button>' +
      '</div>';
  }
}

// function for light

function showLight() {
  document.getElementById('light').style.display = 'block';
}
function hideLight() {
  document.getElementById('light').style.display = 'none';
}

function deleteOne(x) {
  let get = JSON.parse(localStorage.getItem('storage'));
  for (let i = 0; i < get.length; i++) {
    if (get[i].siteName === x) {
      get.splice(i, 1);
    }
  }
  let myjson = JSON.stringify(get);
  localStorage.setItem('storage', myjson);
  display();
}
