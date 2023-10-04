class Header extends HTMLElement {
  constructor() { 
    super(); 
    this.titleName = 'Administracion Parking';
    this.navbarClass = '"navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark""';
  }
  static get observedAttributes(){
    return ['titleName', 'navbarClass'];
  }

  attributeChangeCallback(nameAtr, oldValue, newValue){
    switch(nameAtr){
      case 'titleName':
          this.titleName = newValue;
      break;
      case 'navbarClass':
        this.navbarClass = newValue;
      break;
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <nav class= ${this.navbarClass} >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${ this.titleName }</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/views/reportes.html">Reportes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/views/escritorio.html">Escritorio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/views/tipos.html">Tipos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/views/tarifas.html">Tarifas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/views/usuarios.html">Usuarios</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/views/ajustes.html">Ajustes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Acerca de</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
  }
}

customElements.define('header-component', Header);