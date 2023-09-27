class FormSearch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="container-search container">
          <form class="d-flex" role="search" id="form-search">
          <div class="">
            <label for="exampleFormControlInput1" class="form-label">Patente</label>
            <input class="form-control me-2" type="search" id="patenteSearch" placeholder="Ingresar Patente" aria-label="Search">
          </div>

          <div class="">
            <label for="exampleFormControlInput2" class="form-label">Fecha de Ingreso</label>
            <input type="date" class="form-control me-2" id="dateAttentionSearch" placeholder="Atencion" aria-label="Search">
          </div>
  
          <button class="btn btn-primary text-center" type="submit">Buscar</button>
          <button id="btn-clear-search" class="btn btn-secondary text-center" type="reset">Limpiar</button>  
          </form>
        </div>
        `;
    }

}

customElements.define('form-search-component', FormSearch);