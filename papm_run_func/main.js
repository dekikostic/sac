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

    // ------------------
    // Scripting methods
    // ------------------
    async run(url) {
      const defaultUrl =
        "https://qam-papm.prod-dev.papm.cloud.sap/sap/opu/odata/NXI/P1_N_MOD_SRV"; //RunAsync

      let papmUrl = url !== "" ? url : defaultUrl;

      let runParams = `/RunAsync?EnvId='${this._props.env_id}'&Ver='${this._props.ver}'&ProcId=''&Activity=''&Fid='${this._props.fid}'`;

      let tokenRequest = await fetch(`${papmUrl}/$metadata`, {
        headers: { "x-csrf-token": "Fetch" },
      }).catch((error) => {
        console.error("Error:", error);
      });

      let csrfToken = tokenRequest.headers.get("x-csrf-token");
      let runRequest = await fetch(`${papmUrl}${runParams}`, {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
      });
    }
  }

  customElements.define("papm-run-func", MainWebComponent);
})();
