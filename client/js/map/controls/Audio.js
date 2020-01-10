class Audio{
  constructor(){
    var audio = document.createElement('audio');
    audio.className = 'mdc-theme--surface	';
    audio.controls = 'controls';
    audio.type = 'audio/webm';

    return audio;
  }
}
