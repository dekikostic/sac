var getPromisify = (url, data, dataType) => {
  return new Promise((resolve, reject) => {
    $.post(
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
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    // ------------------
    // Scripting methods
    // ------------------
    async run(url, data, dataType) {
      let defaultUrl =
        "https://qam-papm.prod-dev.papm.cloud.sap/sap/opu/odata/NXI/P1_N_MOD_SRV/RunAsync";
      let papmUrl =
        (url !== "" ? url : defaultUrl) +
        `?EnvId='${this._props.env_id}'&Ver='${this._props.ver}'&ProcId=''&Activity=''&Fid='${this._props.fid}'`;
      const r = await getPromisify(papmUrl, data, dataType);
    }
  }

  customElements.define("papm-run-func", MainWebComponent);
})();
