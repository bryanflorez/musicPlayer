// Datos de las canciones
const songList = [  
    {
        title: "She",
        file: "she.mp3",
        cover: "Fine-Line.jpg"
    },
    {
        title: "Goof",
        file: "Binaerpilot_-_Goof.mp3",
        cover: "goof.jpg"
    },
    {
        title: "Can you feel",
        file: "Nordgroove_-_Can_you_feel.mp3",
        cover: "the other.jpg"
    },
]
//canción actual 
let aSong = null
// Captura de DOM 
const songs = document.getElementById("canciones")
const audio = document.getElementById("audio")
const title = document.getElementById("titulo")
const cover = document.getElementById("cover")
const play = document.getElementById("play")
const prev = document.getElementById("back")
const next = document.getElementById("next")
const barra = document.getElementById("barra")
const progreso = document.getElementById("progreso")

//duración de audio
audio.addEventListener("timeupdate", progress)
//Listen clicks
//barra progreso
progreso.addEventListener("click", setProgress)
//pause/play
play.addEventListener("click", () => {
    if(audio.paused){
        playSong()
    }
    else{
        pauseSong()
    }
})
// Anterior y siguiente
next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar las canciones
function loadSongs(){
    songList.forEach((song, index) => { 
        //li
        const li = document.createElement("li")
        //a
        const link = document.createElement("a")
        //Refresh a
        link.textContent = song.title
        link.href = "#" //cursor seleccionable
        //Listen del índice
        link.addEventListener("click", () => loadSong(index))
        //Poner en li
        li.appendChild(link)
        //Añadir li en ul
        songs.appendChild(li) 
        })
}
//Cargar canción
function loadSong(songIndex){
    if(songIndex!=aSong){
        aClass(aSong, songIndex)
        aSong = songIndex
        audio.src = "./music/" + songList[songIndex].file
        playSong()
        cCover(songIndex)
        cTitle(songIndex)
    }
}
//Play / pause
function aControl(){
    if(audio.paused){
        play.classList.remove("fa-pause-circle")
        play.classList.add("fa-play-circle")
    }
    else{
        play.classList.remove("fa-play-circle")
        play.classList.add("fa-pause-circle")
    }
}

function playSong(){
    if(aSong!=null){
    audio.play()
    aControl()
    }
}
function pauseSong(){
    audio.pause()
    aControl()
}
function prevSong(){
    if(aSong > 0){
        loadSong(aSong - 1)
    }  
}
function nextSong(){
    if(aSong < songList.length -1){
        loadSong(aSong + 1)
    }
    else{
        loadSong(0)
    }
}

//Cambiar la imagen de la song
function cCover(songIndex){
    cover.src = "./img/" + songList[songIndex].cover
}
//Cambiar titulo
function cTitle(songIndex){
    title.innerText = songList[songIndex].title
}
//Progreso
function progress(event){
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime/duration) * 100
    barra.style.width = percent + "%"
}
 function setProgress(event){
     const progressTotal = this.offsetWidth
     const progressWidth = event.offsetX
     const percent = (progressWidth/progressTotal) * audio.duration
     audio.currentTime = percent
 }
//Clase active de CSS
function aClass(lastIndex,newIndex){
const links = document.querySelectorAll("a")
if(lastIndex != null){
    links[lastIndex].classList.remove("active")
}
links[newIndex].classList.add("active")
}
// siguiente cuando se acaba la canción actual 
audio.addEventListener("ended", () => {
    nextSong()
})
//Execute
loadSongs();

