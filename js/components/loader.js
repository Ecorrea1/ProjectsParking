class Loader extends HTMLElement {
    constructor() { super();
      this.message = 'Cargando...'
    }
    static get observedAttributes(){
      return ['message'];
    }
  
    attributeChangeCallback(nameAtr, oldValue, newValue){
      if (nameAtr == 'message') {
        this.message = newValue;
      }
    }
    connectedCallback() {
        this.innerHTML = `
        <div id="fader" class="fader">
          <div class="loading"></div>
          <p class="message">${this.message}</p>
        </div>`;
    }
}

customElements.define('loader-component', Loader);