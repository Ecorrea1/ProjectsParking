class BadgeSuccess extends HTMLElement {
    constructor() { super(); }
    connectedCallback() { this.innerHTML = `<span class="badge text-bg-success">Success</span>`; }
}

customElements.define('badge-success-component', BadgeSuccess);

class BadgeDanger extends HTMLElement {
    constructor() { super(); }
    connectedCallback() { this.innerHTML = `<span class="badge text-bg-danger">Danger</span>`; }
}

customElements.define('badge-danger-component', BadgeDanger);