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
      const BASE_URL =
        "https://qam-papm.prod-dev.papm.cloud.sap/sap/opu/odata/NXI/P1_N_MOD_SRV";

      const runParams = `/RunAsync?EnvId='${this._props.env_id}'&Ver='${this._props.ver}'&ProcId=''&Activity=''&Fid='${this._props.fid}'`;

      try {
        const tokenRequest = await fetch(`${BASE_URL}/$metadata`, {
          credentials: "include",
          headers: { "x-csrf-token": "Fetch" },
        });
        const csrfToken = tokenRequest.headers.get("x-csrf-token");

        const runRequest = await fetch(`${BASE_URL}${runParams}`, {
          method: "POST",
          credentials: "include",
          headers: { "x-csrf-token": csrfToken },
        });

        const runResponse = await runRequest.json();

        // let runStatusRequest = () => {
        //   await fetch(
        //     `${baseUrl}/Entities/AL?$filter=RUN_ID eq${runResponse.d.Content.RUN_ID}`
        //   );
        // };

        // let runState = "RUNNING";
        // while (runState === "RUNNING") {
        //   setTimeout(runStatusRequest, 1000);
        //   runState = await runMsgRequest.json().value;
        // }

        // return msg.value;
      } catch (status) {
        new Error();
      }
    }
  }

  customElements.define("papm-run-func", MainWebComponent);
})();
