(function () {
  let template = document.createElement("template");
  template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Run Parameters</legend>
				<table>
					<tr>
						<td>Environment</td>
						<td><input id="builder_env_id" type="text" size="10" maxlength="3"></td>
					</tr>
					<tr>
						<td>Version</td>
						<td><input id="builder_ver" type="text" size="10" maxlength="4"></td>
					</tr>
					<tr>
						<td>Function ID</td>
						<td><input id="builder_fid" type="text" size="10" maxlength="5"></td>
					</tr>
					<tr>
						<td>Process ID</td>
						<td><input id="builder_proc_id" type="text" size="10" maxlength="7"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

  class RunFunctionBuilderPanel extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._shadowRoot
        .getElementById("form")
        .addEventListener("submit", this._submit.bind(this));
    }

    _submit(e) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              env_id: this.env_id,
            },
          },
        })
      );
    }

    // onCustomWidgetBeforeUpdate(changedProperties) {
    //   // ...
    //   console.log(`${this._props["RunFunc"]}`);
    // }

    set env_id(env_id) {
      this._shadowRoot.getElementById("builder_env_id").value = env_id;
    }

    get env_id() {
      return this._shadowRoot.getElementById("builder_env_id").value;
    }
  }

  customElements.define("papm-run-func-builder", RunFunctionBuilderPanel);
})();
