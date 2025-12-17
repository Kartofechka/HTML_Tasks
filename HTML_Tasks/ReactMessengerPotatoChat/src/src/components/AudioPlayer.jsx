import React, { useState, useRef, useEffect } from "react";
import "../assets/PlayerStyles.css";

const tracks = [
  { title: "Тайна", src: "/songs/song1.mp3", author: "Кукрыниксы", text: "/texts/text1.txt" },
  { title: "Над пропастью во ржи", src: "/songs/song2.mp3", author: "Би-2", text: "/texts/text2.txt" },
  { title: "Добрые люди", src: "/songs/song3.mp3", author: "Король и Шут", text: "/texts/text3.txt" },
  { title: "Message man", src: "/songs/song4.mp3", author: "Twenty one pilots", text: "/texts/text4.txt" },
  { title: "Crying Lightning", src: "/songs/song5.mp3", author: "Arctic Monkeys", text: "/texts/text5.txt" },
  { title: "Планы", src: "/songs/song6.mp3", author: "Владимир Клявин", text: "texts/text6.txt" },
];

export default function AudioPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [mixed, setMixed] = useState(false);
  const [showText, setShowText] = useState(false);
  const [songText, setSongText] = useState("");
  const [isMenu, setIsMenu] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const currentTrack = tracks[trackIndex];

  const loadTrack = (index) => {
    setTrackIndex(index);
    setIsMenu(false);
    setShowText(false);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const backToMenu = () => {
    setIsMenu(true);
    setShowText(false);
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
  };

  const getRandomIndex = () => {
    let rand;
    do {
      rand = Math.floor(Math.random() * tracks.length);
    } while (rand === trackIndex && tracks.length > 1);
    return rand;
  };

  const nextTrack = () => {
    mixed ? loadTrack(getRandomIndex()) : loadTrack((trackIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    mixed ? loadTrack(getRandomIndex()) : loadTrack((trackIndex - 1 + tracks.length) % tracks.length);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleText = () => {
    if (!showText) {
      fetch(currentTrack.text)
        .then((res) => res.text())
        .then((txt) => setSongText(txt))
        .catch(() => setSongText("Не удалось загрузить текст песни."));
    }
    setShowText(!showText);
  };

  const downloadTrack = () => {
    const link = document.createElement("a");
    link.href = currentTrack.src;
    link.download = `${currentTrack.title} - ${currentTrack.author}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const progress = progressRef.current;

    const updateProgress = () => {
      if (progress) {
        progress.max = Math.floor(audio.duration) || 0;
        progress.value = Math.floor(audio.currentTime);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      nextTrack();
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [trackIndex]);

  return (
    <div className="player">
      {isMenu ? (
        <div className="track-list">
          <h2>Список треков</h2>
          <ul>
            {tracks.map((track, idx) => (
              <li
                key={idx}
                className={idx === trackIndex ? "active" : ""}
                onClick={() => loadTrack(idx)}
              >
                {track.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="btns">
          <button onClick={backToMenu}>❮</button>
          <h2>
            Сейчас играет: <br />
            <strong>{currentTrack.title}</strong> <br />
            {currentTrack.author}
          </h2>

          <div className="control-group">
            <button onClick={prevTrack}>⏮</button>
            <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
            <button onClick={nextTrack}>⏭</button>
          </div>

          <input
            type="range"
            ref={progressRef}
            defaultValue="0"
            min="0"
            step="1"
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          />

          <label>
            Громкость:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) => (audioRef.current.volume = e.target.value)}
            />
          </label>

          <div className="control-group">
            <button
              onClick={() => setMixed(!mixed)}
              style={{ background: mixed ? "#f3d36aff" : "" }}
            >
              🔀
            </button>
            <button onClick={toggleText}>Текст</button>
            <button onClick={downloadTrack}>⬇️ Скачать трек</button>
          </div>

          {showText && (
            <div className="textarea">
              <pre>{songText}</pre>
            </div>
          )}
        </div>
      )}

      <audio ref={audioRef}></audio>
    </div>
  );
}
