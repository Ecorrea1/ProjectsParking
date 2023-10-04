class Table extends HTMLElement {
    constructor() {
        super();
        this.tableId = 'table_registros';
        this.tableHeadId = 'list_titles';
        this.tableBodyId = 'list_row';
        this.tableClass = 'table table-striped table-xl table-bordered table-hover table-responsive-xxl';
    }

    static get observedAttributes(){
      return [
        'tableId',
        'tableClass', 
        'tableHeadId', 
        'tableBodyId'
    ];
    }
    
    attributeChangeCallback(nameAtr, oldValue, newValue){
        switch(nameAtr){
         case 'tableId':
           this.tableId = newValue;
         break;
         case 'tableHeadId':
           this.tableHeadId = newValue;
         break;
         case'tableBodyId':
           this.tableBodyId = newValue;
         break;
         case'tableClass':
           this.tableClass = newValue;
         break;
        }
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