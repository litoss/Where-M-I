function addClipDrawer(place) {

    //  var audios = [];

    var div = document.createElement('div');

    var newClip = document.createElement('h2');
    newClip.innerHTML = 'Nuova clip';
    div.appendChild(newClip);

    var olc = new TextField("Open Location Code");
    olc.required = true;
    olc.disabled = true;
    olc.value = place.OLC;
    div.appendChild(olc.root_);
    div.appendChild(document.createElement('br'));

    var titolo = new TextField("Titolo");
    titolo.required = true;
    div.appendChild(titolo.root_);
    div.appendChild(document.createElement('br'));

    var testo = new TextField("Testo", null, "mdc-text-field--textarea");
    testo.required = true;
    div.appendChild(testo.root_);
    div.appendChild(document.createElement('br'));

    var what = new FormField(new Radio('radio1'), 'What');
    div.appendChild(what.root_);

    var how = new FormField(new Radio('radio2'), 'How');
    div.appendChild(how.root_);

    var why = new FormField(new Radio('radio3'), 'Why');
    div.appendChild(why.root_);

    var listE0 = new List();
    for (var i in languages) listE0.add(new SelectList(languages[i].name, languages[i].tag));
    var lang = new Select("Language", listE0.root_, 'form-field');
    div.appendChild(lang.root_);

    var listE1 = new List();
    for (var i in categories) listE1.add(new SelectList(categories[i].name, categories[i].id));
    var selectE1 = new Select("Content", listE1.root_);
    div.appendChild(selectE1.root_);

    var listE2 = new List();
    for (var i in audience) listE2.add(new SelectList(categories[i].name, categories[i].id));
    var selectE2 = new Select("Audience", listE2.root_);
    div.appendChild(selectE2.root_);

    var listE3 = new List();
    for (var i =0;i<10;i++) listE3.add(new SelectList(''+i, 'P'+i));
    var selectE3 = new Select("Detail", listE3.root_);
    div.appendChild(selectE3.root_);
    selectE3.root_.style.display = 'none';

    var registerClip = document.createElement('h2');
    registerClip.innerHTML = 'Registra clip';
    div.appendChild(registerClip);

    var regdiv = document.createElement('div');
    div.appendChild(regdiv);

    var register = new IconButtonToggle("stop", "fiber_manual_record", "mdc-button--raised");
    regdiv.appendChild(register.root_);

    var label = document.createElement('label');
    var seconds = 0;
    var interval;
    label.innerHTML = "00:00:00";
    regdiv.appendChild(label);

    var audiodiv = document.createElement('div');
    audiodiv.style.display = "none";
    div.appendChild(audiodiv);

    var audio = document.createElement('audio');
    audio.controls = 'controls';
    audio.type = 'audio/webm';
    audiodiv.appendChild(audio);

    var cancel = new IconButton('delete');
    audiodiv.appendChild(cancel.root_);

    var privacy = document.createElement('h2');
    //  privacy.innerHTML = 'Privacy Status';
    div.appendChild(privacy);

    /*  var listE3 = new List();
      listE3.add(new SelectList('Private', 'private'));
      listE3.add(new SelectList('Public', 'public'));

      var selectE3 = new Select("Privacy", listE3.root_);
      div.appendChild(selectE3.root_);
    */
    var salva = new ActionButton('Salva Clip');
    div.appendChild(salva.root_);

    var salvaBozza = new ActionButton('Salva come bozza');
    div.appendChild(salvaBozza.root_);

    var modifica = new ActionButton('Modifica Clip');
    div.appendChild(modifica.root_);

    how.listen('click', () => {
        selectE3.root_.style.display = 'none';
    });

    why.listen('click', () => {
        selectE3.root_.style.display = 'block';
    });

    what.listen('click', () => {
        selectE3.root_.style.display = 'none';
    });



    register.listen('MDCIconButtonToggle:change', async () => {
        function incrementSeconds() {
            seconds++;
            var date = new Date(null);
            date.setSeconds(seconds); // specify value for SECONDS here
            label.innerHTML = date.toISOString().substr(11, 8);
        }
        if (event.detail.isOn) {
            startRecord();
            interval = setInterval(incrementSeconds, 1000);
        } else {
            audio.src = await stopRecord();
            clearInterval(interval);
            regdiv.style.display = "none";
            audiodiv.style.display = "block";
        }
    });

    cancel.listen('click', () => {
        audio.src = '';
        seconds = 0;
        label.innerHTML = "00:00:00"
        regdiv.style.display = "block";
        audiodiv.style.display = "none";
    });

    salva.listen('click', async () => {
        saveVideo('public');
    });

    salvaBozza.listen('click', async () => {
        saveVideo('unlisted');
    });

    modifica.listen('click', () => {
        if (audio.src) {
            openVideoDialog(audio.src).then((response) => {
                audio.src = response;
            });
        } else {
            var snackbar = new SnackBar('Please record an audio.');
            snackbar.open();
            snackbar.listen("MDCSnackbar:closed", () => {
                document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
        }
    });

    map.pageDrawer = new PageDrawer('New Clip', div);
    map.pageDrawer.open = true;


    async function saveVideo(privacyStatus) {
        if (titolo.value && testo.value && (what.input.checked || how.input.checked || why.input.checked) && lang.value && selectE1.value && selectE2.value && audio.src) {
            var geoloc = olc.value.substring(0, 6) + "00+-" + olc.value.substring(0, 9) + "-" + olc.value;
            var purpose = what.input.checked ? "who" : how.input.checked ? "how" : "why";
            var language = lang.value;
            var content = selectE1.value;
            var audience = selectE2.value;
            var description = geoloc + ":" + purpose + ":" + language + ":" + content + ":A" + audience;//+ ":P" + detail;
            if (why.input.checked && selectE3.value) {
                var detail = selectE3.value;
                console.log(selectE3);
                description = description + detail;
            };
            var blob = await getimageBlob(audio.src);
            var base64 = await convertBlobToBase64(blob);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/audio_to_video');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = async function () {
                var url = await decode64(this.responseText, "video/webm");
                var blob = await getimageBlob(url);

                console.log(titolo.value, description, privacyStatus, blob);
                insertClip(titolo.value, description, privacyStatus, blob);
            };
            xhr.send(JSON.stringify({ chunks: base64 }));
        }
        else {
            var snackbar = new SnackBar('Missing data');
            snackbar.open();
            snackbar.listen("MDCSnackbar:closed", () => {
                document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
            });
        }
    }
};
