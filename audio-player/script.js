const tracks = [
    { title: "Тайна", src: "songs/song1.mp3", author: "Кукрыниксы", text: "texts/text1.txt" },
    { title: "Над пропастью во ржи", src: "songs/song2.mp3", author: "Би-2", text: "texts/text2.txt" },
    { title: "Добрые люди", src: "songs/song3.mp3", author: "Король и Шут", text: "texts/text3.txt" },
    { title: "Message man", src: "songs/song4.mp3", author: "Twenty one pilots", text: "texts/text4.txt" },
    { title: "Crying Lightning", src: "songs/song5.mp3", author: "Arctic Monkeys", text: "texts/text5.txt" },
    { title: "Планы", src: "songs/song6.mp3", author: "Владимир Клявин", text: "texts/text6.txt" },
];


let trackIndex = 0;
let mixed = false;
let showingText = 1;


const listHead = document.getElementById('listHead');
const trackList = document.getElementById('trackList');
const btns = document.getElementById('btns');
const nowPlaying = document.getElementById('nowPlaying');
const audio = document.getElementById('audio');
const toMenuBtn = document.getElementById('toMenuBtn')
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeInput = document.getElementById('volumeInput');
const mixBtn = document.getElementById('mixBtn');
const textBtn = document.getElementById('textBtn');
const songText = document.getElementById('songtext');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const downloadBtn = document.getElementById('downloadBtn');


trackList.style.display = 'block';
listHead.style.display = 'block';
btns.style.display = 'none'


tracks.forEach((track, index) => {
  const li = document.createElement('li');
  li.textContent = track.title;
  li.addEventListener('click', () => loadTrack(index));
  trackList.append(li);
});


function loadTrack(index) {
  trackIndex = index;
  audio.src = tracks[index].src;
  nowPlaying.innerHTML = `<strong>${tracks[index].title}</strong><br>${tracks[index].author}`;
  highlightActiveTrack();
  btns.style.display = 'block';
  trackList.style.display = 'none';
  listHead.style.display = 'none';
  audio.play();
  progressBar.value = 0;
  progressBar.max = 0;
}


function backToMenu() {
  trackList.style.display = 'block';
  listHead.style.display = 'block';
  btns.style.display = 'none'
  document.getElementById('textarea').style.display = 'none';
}


function highlightActiveTrack() {
  document.querySelectorAll('#trackList li').forEach((li, idx) => {
    li.classList.toggle('active', idx === trackIndex);
  });
}


textBtn.addEventListener('click', () => {
  if (showingText == 1){
    const textPath = tracks[trackIndex].text;
    fetch(textPath)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки текста');
        return response.text();
      })
      .then(text => {
        songText.textContent = text;
        document.getElementById('textarea').style.display = 'block';
      })
      .catch(error => {
        songText.textContent = 'Не удалось загрузить текст песни.';
        document.getElementById('textarea').style.display = 'block';
      });
  }
  else {
    document.getElementById('textarea').style.display = 'none';
  }
  showingText *= -1
});


toMenuBtn.addEventListener('click', backToMenu)


prevBtn.addEventListener('click', () => {
  if (mixed) {
    loadTrack(getRandomIndex());
  } else {
    loadTrack((trackIndex - 1 + tracks.length) % tracks.length);
  }
  document.getElementById('textarea').style.display = 'none';
  showingText = 1
});

nextBtn.addEventListener('click', () => {
  if (mixed) {
    loadTrack(getRandomIndex());
  } else {
    loadTrack((trackIndex + 1) % tracks.length);
  }
  document.getElementById('textarea').style.display = 'none';
  showingText = 1
});


volumeInput.addEventListener('input', () => {
  audio.volume = volumeInput.value;
});


mixBtn.addEventListener('click', () => {
  mixed = !mixed;
  mixBtn.style.background = mixed ? '#f3d36aff' : '';
});


function getRandomIndex() {
  let rand;
  do {
    rand = Math.floor(Math.random() * tracks.length);
  } while (rand === trackIndex && tracks.length > 1);
  return rand;
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playBtn.textContent = '⏸';
});

audio.addEventListener('pause', () => {
  playBtn.textContent = '▶️';
});

audio.addEventListener('ended', () => {
  playBtn.textContent = '▶️';
  nextBtn.click();
});

audio.addEventListener('timeupdate', () => {
  progressBar.max = Math.floor(audio.duration) || 0;
  progressBar.value = Math.floor(audio.currentTime);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

downloadBtn.addEventListener('click', () => {
  const track = tracks[trackIndex];
  const link = document.createElement('a');
  link.href = track.src;
  link.download = `${track.title} - ${track.author}.mp3`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});