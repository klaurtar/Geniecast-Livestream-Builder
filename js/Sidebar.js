class Sidebar {
  constructor() {
    this.$sidebar = undefined;
    this.$navbar = undefined;
    this.$navButtons = undefined;
    this.$body = undefined;

    this.content = [];
    this.closeHandler = [];

    this.renderSidebar();
    this.cacheDOMElements();
    this.setupListeners();
  }

  renderSidebar() {
    this.$sidebar = document.createElement('div');
    this.$sidebar.className = 'sidebar';
    this.$sidebar.innerHTML = ejs.render(sidebarTemplate);
  }

  cacheDOMElements() {
    this.$navbar = this.$sidebar.querySelector('.sidebar_navbar');
    this.$body = this.$sidebar.querySelector('.sidebar_tabbed-information');
  }

  renderButtons() {
    this.content.forEach((button) => {
      this.$navbar.innerHTML += ejs.render(sidebarButtonTemplate, button);
    });
  }

  getSidebar() {
    return this.$sidebar;
  }

  setContent(arrOfContent) {
    arrOfContent.forEach((item) => {
      this.content.push(item);

      if (item.active === true) {
        this.$body.innerHTML = item.content;
      }
    });
    this.renderButtons();
    this.$navButtons = this.$sidebar.querySelectorAll('.button');
  }

  renderBody() {
    this.content.forEach((item) => {
      if (item.active) this.$body.innerHTML = item.content;
    });
  }

  onClose(func) {
    this.closeHandler.push(func);
  }

  openSidebar() {
    this.$sidebar.style.display = 'grid';
  }

  closeSidebar() {
    this.$sidebar.style.display = 'none';
  }

  setupListeners() {
    this.$sidebar.addEventListener('click', (event) => {
      const clickedButton = event.target;
      if (clickedButton.className === 'button') {
        this.$navButtons.forEach((button) => {
          button.dataset.active = false;
        });

        clickedButton.dataset.active = 'true';

        this.content.forEach((item) => {
          item.active = false;
        });

        console.log(this.content);

        const test = this.content.find(
          (item) =>
            item.name.toUpperCase() === clickedButton.textContent.toUpperCase()
        );

        test.active = true;
        this.renderBody();
      } else if (clickedButton.closest('.close-container')) {
        this.closeSidebar();
        this.closeHandler.forEach((func) => {
          func();
        });
      }
    });
  }
}
