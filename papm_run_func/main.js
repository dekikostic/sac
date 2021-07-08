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
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    //function called from SAC Analytic Application
    async run(url) {
      const BASE_URL = "http://localhost:3500/runAsync";
      const papmUrl = url != "" ? url : BASE_URL;

      try {
        const runRequest = await fetch(
          `${papmUrl}?EnvId='${this._props.env_id}'&Ver='${this._props.ver}'&ProcId=''&Activity=''&Fid='${this._props.fid}'`,
          {
            method: "POST",
            mode: "no-cors",
          }
        );

        // const runResponse = await runRequest.json();

        const test = await runRequest;

        console.log(test);

        return runResponse;

        // return msg.value;
      } catch (status) {
        console.log(status);
        new Error();
      }
      // fetch(
      //   "http://localhost:3500/runAsync?EnvId='SXP'&Ver='0007'&ProcId=''&Activity=''&Fid='CAACD'",
      //   {
      //     method: "POST",
      //     mode: "no-cors",
      //   }
      // )
      //   .then((response) => response.text())
      //   .then((result) => console.log(result))
      //   .catch((error) => console.log("error", error));
    }
  }

  customElements.define("papm-run-func", MainWebComponent);
})();
