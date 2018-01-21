// DOM EVENT
Mei.getElement('#dom-doc', 'click', e => callDoc(e, 'dom.html'));  
// CHANGE DOM
Mei.getElement('#changing-doc', 'click', e => callDoc(e, 'elements.html'));  
// Storage
Mei.getElement('#storage-doc', 'click', e => callDoc(e, 'storage.html'));  
// Examples
Mei.getElement('#examples-doc', 'click', e => callDoc(e, 'examples.html'));  


function callDoc(e, filename) {
  const content = Mei.getElement('#content');
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

