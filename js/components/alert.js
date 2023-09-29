class Alert extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `<div class="alert alert-primary" role="alert"></div>`;
    }
}

customElements.define('alert-component', Alert);