import { useRef } from "react";
import { toast } from "react-toastify";
import { musicApi } from "../services/api/musicApi";

import MusicPlayer from "../components/MusicPlayer";

function Music({
  music,
  setMusic,

  currentSong,
  setCurrentSong,

  isPlaying,
  togglePlay,

  nextSong,
  previousSong,

  currentTime,
  duration,
  changeProgress,

  onDelete,
}) {
  const inputRef = useRef(null);


  const addMusic = async (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const audioFiles = files.filter((file) =>
      file.type.startsWith("audio/")
    );

    if (audioFiles.length === 0) {
      toast.error("Будь ласка, виберіть аудіофайли.");
      event.target.value = "";
      return;
    }

    const author = window.prompt(
      "Введіть виконавця для вибраних композицій:",
      "Невідомий виконавець"
    );

    if (author === null) {
      event.target.value = "";
      return;
    }

    const album = window.prompt(
      "Введіть назву альбому для вибраних композицій:",
      "Без альбому"
    );

    if (album === null) {
      event.target.value = "";
      return;
    }

    const normalizedAuthor = author.trim() || "Невідомий виконавець";
    const normalizedAlbum = album.trim() || "Без альбому";

    try {
      const uploadedTracks = [];

      for (const file of audioFiles) {
        const track = await musicApi.upload(file, {
          title: file.name.replace(/\.[^/.]+$/, ""),
          author: normalizedAuthor,
          album: normalizedAlbum,
        });

        if (track?.url) {
          uploadedTracks.push(track);
        }
      }

      if (uploadedTracks.length) {
        setMusic((oldMusic) => [...oldMusic, ...uploadedTracks]);
        toast.success(
          uploadedTracks.length === 1
            ? "Композицію додано."
            : `Додано композицій: ${uploadedTracks.length}.`
        );
      } else {
        toast.error("Бекенд не повернув URL аудіофайлу.");
      }
    } catch (error) {
      console.error("Помилка завантаження музики:", error);
      const message =
        error?.response?.data?.message ||
        "Не вдалося завантажити музику на сервер.";
      toast.error(message);
    } finally {
      
      event.target.value = "";
    }
  };

  return (
    <section className="page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            МУЗИКА
          </span>

          <h1>
            Моя музика
          </h1>

          <p>
            Додайте улюблені композиції
            та слухайте їх прямо на сайті.
          </p>

        </div>


        <button
          type="button"
          className="primary-button"
          onClick={() =>
            inputRef.current?.click()
          }
        >
          + Додати музику
        </button>

      </div>


      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        multiple
        hidden
        onChange={addMusic}
      />


      {music.length === 0 ? (

        <div className="empty-state">

          <div>
            🎵
          </div>

          <h2>
            Музики ще немає
          </h2>

          <p>
            Додайте MP3 або інший
            аудіофайл зі свого пристрою.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              inputRef.current?.click()
            }
          >
            Додати музику
          </button>

        </div>

      ) : (

        <div className="music-list">

          <MusicPlayer
            music={music}

            currentIndex={
              currentSong
            }

            setCurrentIndex={
              setCurrentSong
            }

            playing={
              isPlaying
            }

            togglePlay={
              togglePlay
            }

            previousSong={
              previousSong
            }

            nextSong={
              nextSong
            }

            currentTime={
              currentTime
            }

            duration={
              duration
            }

            changeProgress={
              changeProgress
            }

            onDelete={
              onDelete
            }
          />


          <div className="uploaded-songs">

            <h3>
              Завантажені композиції
            </h3>


            {music.map(
              (song, index) => (

                <button
                  type="button"
                  key={song.id}

                  className={`
                    song-list-item
                    ${
                      index === currentSong
                        ? "selected-song"
                        : ""
                    }
                  `}

                  onClick={() =>
                    setCurrentSong(
                      index
                    )
                  }
                >

                  <span className="song-number">
                    {index + 1}
                  </span>


                  <span className="song-list-name">
                    {song.name}
                  </span>


                  {index ===
                    currentSong && (

                    <span className="now-playing">
                      ●
                    </span>

                  )}

                </button>

              )
            )}

          </div>

        </div>

      )}

    </section>
  );
}

export default Music;
