const player = {
  tracks: [
    { title: "Тайна", src: "songs/song1.mp3", author: "Кукрыниксы", text: "texts/text1.txt" },
    { title: "Над пропастью во ржи", src: "songs/song2.mp3", author: "Би-2", text: "texts/text2.txt" },
    { title: "Добрые люди", src: "songs/song3.mp3", author: "Король и Шут", text: "texts/text3.txt" },
    { title: "Message man", src: "songs/song4.mp3", author: "Twenty one pilots", text: "texts/text4.txt" },
    { title: "Crying Lightning", src: "songs/song5.mp3", author: "Arctic Monkeys", text: "texts/text5.txt" },
    { title: "Планы", src: "songs/song6.mp3", author: "Владимир Клявин", text: "texts/text6.txt" },
  ],
  trackIndex: 0,
  mixed: false,
  showingText: true,

  init() {
    this.getElements();
    this.linkActions();
    this.showTrackList();
    this.trackList.style.display = 'block';
    this.listHead.style.display = 'block';
    this.btns.style.display = 'none';
  },

  getElements() {
    this.listHead = document.getElementById('listHead');
    this.trackList = document.getElementById('trackList');
    this.btns = document.getElementById('btns');
    this.nowPlaying = document.getElementById('nowPlaying');
    this.audio = document.getElementById('audio');
    this.toMenuBtn = document.getElementById('toMenuBtn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.volumeInput = document.getElementById('volumeInput');
    this.mixBtn = document.getElementById('mixBtn');
    this.textBtn = document.getElementById('textBtn');
    this.songText = document.getElementById('songtext');
    this.playBtn = document.getElementById('playBtn');
    this.progressBar = document.getElementById('progressBar');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.textArea = document.getElementById('textarea');
  },

  linkActions() {
    this.toMenuBtn.addEventListener('click', () => this.backToMenu());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.volumeInput.addEventListener('input', () => this.audio.volume = this.volumeInput.value);
    this.mixBtn.addEventListener('click', () => this.toggleMix());
    this.textBtn.addEventListener('click', () => this.showText());
    this.playBtn.addEventListener('click', () => this.clickPlay());
    this.downloadBtn.addEventListener('click', () => this.downloadTrack());
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
  },

  showTrackList() {
    this.tracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.textContent = track.title;
      li.addEventListener('click', () => this.loadTrack(index));
      this.trackList.append(li);
    });
  },

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
  },

  backToMenu() {
    this.trackList.style.display = 'block';
    this.listHead.style.display = 'block';
    this.btns.style.display = 'none';
    this.textArea.style.display = 'none';
  },

  highlightActiveTrack() {
    document.querySelectorAll('#trackList li').forEach((li, idx) => {
      li.classList.toggle('active', idx === this.trackIndex);
    });
  },

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
  },

  prevTrack() {
    const index = this.mixed ? this.getRandomIndex() : (this.trackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack(index);
    this.textArea.style.display = 'none';
    this.showingText = true;
  },

  nextTrack() {
    const index = this.mixed ? this.getRandomIndex() : (this.trackIndex + 1) % this.tracks.length;
    this.loadTrack(index);
    this.textArea.style.display = 'none';
    this.showingText = true;
  },

  toggleMix() {
    this.mixed = !this.mixed;
    this.mixBtn.style.background = this.mixed ? '#f3d36aff' : "";
  },

  getRandomIndex() {
    let rand;
    do {
      rand = Math.floor(Math.random() * this.tracks.length);
    } while (rand === this.trackIndex && this.tracks.length > 1);
    return rand;
  },

  clickPlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  },

  downloadTrack() {
    const track = this.tracks[this.trackIndex];
    const link = document.createElement('a');
    link.href = track.src;
    link.download = `${track.title} - ${track.author}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

player.init()