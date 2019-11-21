class AboutCard{
  constructor(name, img) {
        var card = document.createElement('div');
        card.className = 'mdc-card aboutCard';
        card.innerHTML =
        '<div class="mdc-card__primary-action ">' +
          '<div class="mdc-card__primary"> ' +
            '<img class="aboutImg" src=" ' + img + ' " alt="'+ name + 'Img">' +
            '<h2 class="mdc-typography mdc-typography--headline6">' + name + ' </h2> ' +
            '<h3 class="mdc-typography mdc-typography--overline">Dummy Text</h3>' +
            '<div class="mdc-card__actions">' +
              '<div class="mdc-card__action-icons">' +
                '<button class="mdc-icon-button" title="GitHub"><i class="fab fa-github "></i></button>' +
                '<button class="mdc-icon-button" title="Facebook"><i class="fab fa-facebook "></i></button>' +
                '<button class="mdc-icon-button" title="Instagram"><i class="fab fa-instagram "></i></button>'  +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
  return card;
  }
}
