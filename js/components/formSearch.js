class FormSearch extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
      this.innerHTML = `
      <div class="container-search container">
        <form class="d-flex" role="search" id="form-search">
          <input class="form-control me-2" type="search" id="patenteSearch" placeholder="Ingresar Patente" aria-label="Search">
          <input type="date" class="form-control me-2" id="dateAttentionSearch" placeholder="Atencion" aria-label="Search">
          <button class="btn btn-primary text-center" type="submit">Buscar</button>
          <button id="btn-clear-search" class="btn btn-secondary text-center" type="reset">Limpiar</button>  
        </form>
      </div>
      `;
    }
}

customElements.define('form-search-component', FormSearch);