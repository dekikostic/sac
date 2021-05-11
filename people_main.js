
var url = "https://ghibliapi.herokuapp.com/people"

function fetchedData(url){
  const response = await fetch(url)
  return response.json()
}

(function () {
  // const template = document.createElement('template')
  // template.innerHTML = `
  //     <style>
  //     </style>
  //     <div id="root" style="width: 100%; height: 100%;">
  //     </div>
  //   `
  class MainWebComponent extends HTMLElement {
    // ------------------
    // Scripting methods
    // ------------------
    async get(index) {
      fetchedData(url).then( data => {
        return [
          data[index].name,
          data[index].age,
          data[index].gender
        ]
      }
    }
    customElements.define('dk-test-people', MainWebComponent)
  }
})()
