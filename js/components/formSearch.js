class FormSearch extends HTMLElement {
    constructor() { 
      super(); 
      this.attributesComponents = [
        this.name = 'Buscar',
        this.btnSearchClass = 'form-control me-2 text-uppercase',
        this.btnClearName = 'Limpiar'
      ]
    }
    
    static get observedAttributes(){
      return ['name', 'btnSearchClass', 'btnClearName'];
    }


    attributeChangeCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }

    connectedCallback() {
      this.innerHTML = `
        <div class="container-search container">
          <form class="d-flex" role="search" id="form-search">
            <input class="${this.btnSearchClass}" type="search" id="idServicioSearchInput" placeholder="Ingresar ID" aria-label="Search">
            <input class="form-control me-2 text-uppercase" type="search" id="patenteSearchInput" placeholder="Ingresar Patente" aria-label="Search">
            <input type="date" class="form-control me-2" id="inicioServicioSearchInput" placeholder="Hora Ingreso" aria-label="Search">
            <button class="btn btn-primary text-center" type="submit">${this.name}</button>
            <button id="btn-clear-search" class="btn btn-secondary text-center" type="reset">${this.btnClearName}</button>  
          </form>
        </div>
      `;

      // this.style = '';
    }
}

customElements.define('form-search-component', FormSearch);