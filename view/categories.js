function openCategories(){
  var categories = [
    { tag:"none", name:"nessuna"},
    { tag:"nat", name:"natura"},
    { tag:"art", name:"arte"},
    { tag:"his", name:"storia"},
    { tag:"flk", name:"folklore"},
    { tag:"mod", name:"cultura moderna"},
    { tag:"rel", name:"religione"},
    { tag:"cui", name:"cucina e drink"},
    { tag:"spo", name:"sport"},
    { tag:"mus", name:"musica"},
    { tag:"mov", name:"film"},
    { tag:"fas", name:"moda"},
    { tag:"shp", name:"shopping"},
    { tag:"tec", name:"tecnologia"},
    { tag:"pop", name:"cult. pop. e gossip"},
    { tag:"prs", name:"nessuna"},
    { tag:"none", name:"esperienze personali"},
    { tag:"oth", name:"altro"}
  ];
 
  var chipSet = new ChipSet(categories);
  //var chipSetElement = mdc.chips.MDCChipSet.attachTo(chipSet);
  document.body.appendChild(chipSet.root_);
}
