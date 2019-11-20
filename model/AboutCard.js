class AboutCard{
  constructor(name, img) {
        var card = document.createElement('div');
        card.className = 'mdc-card aboutCard';
        card.innerHTML =
        '<div class="mdc-card__primary-action ">' +
          '<div class="mdc-card__media mdc-card__media--16-9 " style="background-image: url(&quot;' + img + '&quot;);"></div>' +
          '<div class="mdc-card__primary"> ' +
            '<h2 class="mdc-typography mdc-typography--headline6">' + name + ' </h2> ' +
            '<h3 class="mdc-typography mdc-typography--overline">Dummy Text</h3>' +
            '<div class="mdc-card__actions">' +
              '<div class="mdc-card__action-icons">' +
                '<button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Share">share</button>' +
                '<button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="More options">more_vert</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
  return card;
  }
}
