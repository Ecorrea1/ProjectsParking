class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Administracion Parking</a>
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
  </nav>
        `;
    }

}

customElements.define('header-component', Header);