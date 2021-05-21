var getPromisify = (url, data, dataType) => {
  return new Promise((resolve, reject) => {
    $.get(
      url,
      data,
      (response, status, xhr) => {
        if (status === "success") {
          resolve({ response, status, xhr });
        } else {
          const err = new Error("xhr error");
          err.target = xhr;
          reject(err);
          console.log("xhr error");
        }
      },
      dataType
    );
  });
};

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;

  class MainWebComponent extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // ------------------
    // Scripting methods
    // ------------------
    async run(url, data, dataType) {
      console.log(`shadowRoot: ${shadowRoot}`);
      // console.log(`Env id: ${this._props[env_id]}`);
      // const r = await getPromisify(url, data, dataType);
      // console.log(r);
      // return [
      //   r.response[data].name,
      //   r.response[data].age,
      //   r.response[data].gender,
      // ];
      return url;
    }
  }

  customElements.define("papm-run-func", MainWebComponent);
})();
