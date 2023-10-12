class Footer extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [];
    }

    static get observedAttributes(){
      return [];
    }
    attributeChangeCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
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