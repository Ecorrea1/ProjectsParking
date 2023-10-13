class Loader extends HTMLElement {
    constructor() { 
      super();
      this.attributesComponents = [
        this.message = 'Cargando...'
      ]
    }
    static get observedAttributes(){
      return ['message'];
    }
  
    attributeChangeCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
    connectedCallback() {
      this.innerHTML = `
      <div id="fader" class="fader">
        <div class="loading"></div>
        <p class="message">${this.message}</p>
      </div>`;

      // this.style = ;
    }
}

customElements.define('loader-component', Loader);