class Player {
  constructor(container, tracks) {
    this.container = container;
    this.tracks = tracks;
    this.trackIndex = 0;
    this.mixed = false;
    this.showingText = true;
    this.render();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="player">
        <div class="track-list">
          <h2 class="list-head">Список треков</h2>
          <ul class="track-list-ul"></ul>
        </div>
        <div class="btns" style="display: none;">
          <button class="to-menu-btn">❮</button>
          <h2 class="now-playing">Сейчас играет:</h2>
          <div class="control-group">
            <button class="prev-btn">⏮</button>
            <button class="play-btn">▶️</button>
            <button class="next-btn">⏭</button>
          </div>
          <label>
            <input type="range" class="progress-bar" value="0" min="0" step="1" />
          </label>
          <label>Громкость:
            <input type="range" class="volume-input" min="0" max="1" step="0.01" value="0.5" />
          </label>
          <div class="control-group">
            <button class="mix-btn">🔀</button>
            <button class="text-btn">Текст</button>
            <button class="download-btn">⬇️ Скачать трек</button>
            <button class="close-btn">✕ Закрыть</button>
          </div>
        </div>
        <div class="textarea" style="display: none;">
          <pre class="song-text"></pre>
        </div>
        <audio class="audio-element"></audio>
      </div>
    `;
  }

  init() {
    this.getElements();
    this.linkActions();
    this.showTrackList();
    this.trackList.style.display = 'block';
    this.listHead.style.display = 'block';
    this.btns.style.display = 'none';
  }

  getElements() {
    this.listHead = this.container.querySelector('.list-head');
    this.trackList = this.container.querySelector('.track-list-ul');
    this.btns = this.container.querySelector('.btns');
    this.nowPlaying = this.container.querySelector('.now-playing');
    this.audio = this.container.querySelector('.audio-element');
    this.toMenuBtn = this.container.querySelector('.to-menu-btn');
    this.prevBtn = this.container.querySelector('.prev-btn');
    this.nextBtn = this.container.querySelector('.next-btn');
    this.volumeInput = this.container.querySelector('.volume-input');
    this.mixBtn = this.container.querySelector('.mix-btn');
    this.textBtn = this.container.querySelector('.text-btn');
    this.songText = this.container.querySelector('.song-text');
    this.playBtn = this.container.querySelector('.play-btn');
    this.progressBar = this.container.querySelector('.progress-bar');
    this.downloadBtn = this.container.querySelector('.download-btn');
    this.textArea = this.container.querySelector('.textarea');
    this.closeBtn = this.container.querySelector('.close-btn');
  }

  linkActions() {
    this.toMenuBtn.addEventListener('click', () => this.backToMenu());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.volumeInput.addEventListener('input', () => this.audio.volume = this.volumeInput.value);
    this.mixBtn.addEventListener('click', () => this.toggleMix());
    this.textBtn.addEventListener('click', () => this.showText());
    this.playBtn.addEventListener('click', () => this.clickPlay());
    this.downloadBtn.addEventListener('click', () => this.downloadTrack());
    this.closeBtn.addEventListener('click', () => this.closePlayer());
    this.audio.addEventListener('play', () => this.playBtn.textContent = '⏸');
    this.audio.addEventListener('pause', () => this.playBtn.textContent = '▶️');
    this.audio.addEventListener('ended', () => {
      this.playBtn.textContent = '▶️';
      this.nextTrack();
    });
    this.audio.addEventListener('timeupdate', () => {
      this.progressBar.max = Math.floor(this.audio.duration) || 0;
      this.progressBar.value = Math.floor(this.audio.currentTime);
    });
    this.progressBar.addEventListener('input', () => {
      this.audio.currentTime = this.progressBar.value;
    });
  }

  showTrackList() {
    this.tracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.textContent = track.title;
      li.addEventListener('click', () => this.loadTrack(index));
      this.trackList.append(li);
    });
  }

  loadTrack(index) {
    this.trackIndex = index;
    const track = this.tracks[index];
    this.audio.src = track.src;
    this.nowPlaying.innerHTML = `<strong>${track.title}</strong><br>${track.author}`;
    this.highlightActiveTrack();
    this.btns.style.display = 'block';
    this.trackList.style.display = 'none';
    this.listHead.style.display = 'none';
    this.audio.play();
    this.progressBar.value = 0;
    this.progressBar.max = 0;
  }

  backToMenu() {
    this.trackList.style.display = 'block';
    this.listHead.style.display = 'block';
    this.btns.style.display = 'none';
    this.textArea.style.display = 'none';
  }

  highlightActiveTrack() {
    this.container.querySelectorAll('.track-list-ul li').forEach((li, idx) => {
      li.classList.toggle('active', idx === this.trackIndex);
    });
  }

  showText() {
    if (this.showingText) {
      const textPath = this.tracks[this.trackIndex].text;
      fetch(textPath)
        .then(response => {
          if (!response.ok) throw new Error('Ошибка загрузки текста');
          return response.text();
        })
        .then(text => {
          this.songText.textContent = text;
          this.textArea.style.display = 'block';
        })
        .catch(() => {
          this.songText.textContent = 'Не удалось загрузить текст песни.';
          this.textArea.style.display = 'block';
        });
    } else {
      this.textArea.style.display = 'none';
    }
    this.showingText = !this.showingText;
  }

  prevTrack() {
    const index = this.mixed ? this.getRandomIndex() : (this.trackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack(index);
    this.textArea.style.display = 'none';
    this.showingText = true;
  }

  nextTrack() {
    const index = this.mixed ? this.getRandomIndex() : (this.trackIndex + 1) % this.tracks.length;
    this.loadTrack(index);
    this.textArea.style.display = 'none';
    this.showingText = true;
  }

  toggleMix() {
    this.mixed = !this.mixed;
    this.mixBtn.style.background = this.mixed ? '#f3d36aff' : "";
  }

  getRandomIndex() {
    let rand;
    do {
      rand = Math.floor(Math.random() * this.tracks.length);
    } while (rand === this.trackIndex && this.tracks.length > 1);
    return rand;
  }

  clickPlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  downloadTrack() {
    const track = this.tracks[this.trackIndex];
    const link = document.createElement('a');
    link.href = track.src;
    link.download = `${track.title} - ${track.author}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  closePlayer() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
    this.container.remove();
  }
}

const tracks1 = [
  { title: "Тайна", src: "songs/song1.mp3", author: "Кукрыниксы", text: "texts/text1.txt" },
  { title: "Над пропастью во ржи", src: "songs/song2.mp3", author: "Би-2", text: "texts/text2.txt" },
  { title: "Добрые люди", src: "songs/song3.mp3", author: "Король и Шут", text: "texts/text3.txt" }
];

const tracks2 = [
  { title: "Message man", src: "songs/song4.mp3", author: "Twenty one pilots", text: "texts/text4.txt" },
  { title: "Crying Lightning", src: "songs/song5.mp3", author: "Arctic Monkeys", text: "texts/text5.txt" },
  { title: "Планы", src: "songs/song6.mp3", author: "Владимир Клявин", text: "texts/text6.txt" }
];

function createNewPlayer(tracks = tracks1) {
  const playersContainer = document.getElementById('playersContainer');
  const playerContainer = document.createElement('div');
  playerContainer.className = 'player-container';
  playersContainer.appendChild(playerContainer);
  
  const player = new Player(playerContainer, tracks);
  return player;
}

document.addEventListener('DOMContentLoaded', () => {
  createNewPlayer(tracks1);
  document.getElementById('addPlayerBtn').addEventListener('click', () => {
    const tracks = document.querySelectorAll('.player-container').length % 2 === 0 ? tracks1 : tracks2;
    createNewPlayer(tracks);
  });
});