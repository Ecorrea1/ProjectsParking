class Footer extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.message = 'Derechos Reservados',
        this.year = '2023',
      ];
    }

    static get observedAttributes(){
      return ['message', 'year'];
    }
    attributeChangeCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }

    connectedCallback() {
        this.innerHTML = `
        <footer>
          <p class="copyright">
            © ${this.message} ${this.year} | Simplepark</a>
          </p>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);