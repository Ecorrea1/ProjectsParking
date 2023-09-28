class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer>
          <p class="copyright">
            © Derechos Reservados 2023 | Simplepark</a>
          </p>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);