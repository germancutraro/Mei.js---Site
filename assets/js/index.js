// DOM EVENT
Mei.getElement('#dom-doc', 'click', e => callDoc(e, 'dom.html', 'Mei.js - DOM Manipulation'));  
// CHANGE DOM
Mei.getElement('#changing-doc', 'click', e => callDoc(e, 'elements.html', 'Mei.js - Changing the DOM'));  
// Storage
Mei.getElement('#storage-doc', 'click', e => callDoc(e, 'storage.html', 'Mei.js - Storage'));  
// Examples
Mei.getElement('#examples-doc', 'click', e => callDoc(e, 'examples.html', 'Mei.js - Examples'));  


function callDoc(e, filename, section) {
  const content = Mei.getElement('#content');
  document.title = section;
  let path = `./docs/${filename}`;
  // ajax request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function () {
    this.status === 200 ? content.innerHTML = this.response : console.error(`Error! ${this.status}: ${this.statusText}`);
  }
  xhr.send();
} 

Mei.getElements('.docs-list li', 'click', () => window.matchMedia("(max-width: 1300px)").matches ? Mei.getElement('#nav').classList.remove('nav') : false);

Mei.getElement('#menu-icon', 'click', () => Mei.getElement('#nav').classList.add('nav'))

