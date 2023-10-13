class Alert extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `<div id="alert-msg" class="alert" role="alert" insvisible hidden></div>`;
    }
}

customElements.define('alert-component', Alert);