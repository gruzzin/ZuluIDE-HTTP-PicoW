var imgs=[];
function loadImgs() {
 fetch('nextImage')
  .then(response => response.json())
  .then(image => {
   if (image.status == 'wait') {setTimeout(loadImgs, 50);}
   else if (image.status == 'done') { loadImages(document.getElementById('newImg'));}
   else {imgs.push(image); loadImgs()}});
}
function selectClk() {
 document.getElementById('st').setAttribute('class', 'hdn');
 document.getElementById('si').setAttribute('class', 'img');
 let ni = document.getElementById('newImg');
 for (a in ni.options) { ni.options.remove(0); }
 if (imgs.length == 0) { loadImgs(); } else { loadImages(ni); }
}
function loadImages(ni) {
 for (i in imgs) {
  ni.add(new Option(imgs[i].filename));
 }
}
function cancelClicked() {
 showStatus();
}
function loadClicked() {
 let si = document.getElementById('newImg');
 fetch('image?' +  new URLSearchParams({
  imageName: encodeURIComponent(si.value)
 })).then(r => r.json())
    .then(s => { if (s.status != 'ok') alert('Select failed.');} );
 showStatus();
}
