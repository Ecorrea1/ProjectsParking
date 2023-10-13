class Table extends HTMLElement {
    constructor() {
        super();
        this.attributesComponents = [
          this.tableId = 'table_registros',
          this.tableHeadId = 'list_titles',
          this.tableBodyId = 'list_row',
          this.tableClass = 'table table-striped table-xl table-bordered table-hover table-responsive-xxl'
        ];
    }

    static get observedAttributes(){
      return [
        'tableId',
        'tableClass', 
        'tableHeadId', 
        'tableBodyId'
      ];
    }
    
    attributeChangeCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }

    connectedCallback() {
        this.innerHTML = `
        <table id="${this.tableId}" class="${this.tableClass}">
          <caption>Lista de Registros</caption>
          <thead id="${this.tableHeadId}" class="table-dark"></thead>
          <tbody id="${this.tableBodyId}"></tbody>
        </table>
        </tfoot>
        `;
    }
}

customElements.define('table-component', Table);