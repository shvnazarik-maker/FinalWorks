function MusicPlayer({
  music,
  currentIndex,
  
  playing,
  togglePlay,

  previousSong,
  nextSong,

  currentTime,
  duration,
  changeProgress,

  onDelete,
}) {
  const currentSong =
    music[currentIndex];


  if (!currentSong) {
    return null;
  }


  const formatTime = (
    seconds
  ) => {
    if (
      !Number.isFinite(seconds)
    ) {
      return "00:00";
    }

    const minutes =
      Math.floor(
        seconds / 60
      );

    const secs =
      Math.floor(
        seconds % 60
      );

    return `${String(
      minutes
    ).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };


  return (
    <div className="music-player">


      <div className="music-controls">

        <button
          className="control-button"

          onClick={
            previousSong
          }

          disabled={
            music.length <= 1
          }

          title="Попередня композиція"
        >
          ⏮
        </button>


        <button
          className="play-button"

          onClick={
            togglePlay
          }

          title={
            playing
              ? "Пауза"
              : "Відтворити"
          }
        >
          {playing
            ? "❚❚"
            : "▶"}
        </button>


        <button
          className="control-button"

          onClick={
            nextSong
          }

          disabled={
            music.length <= 1
          }

          title="Наступна композиція"
        >
          ⏭
        </button>

      </div>

      <div className="song-info">

        <strong>
          {currentSong.name}
        </strong>


        <div className="player-line">

          <span>
            {formatTime(
              currentTime
            )}
          </span>


          <input
            type="range"

            min="0"

            max={
              duration || 0
            }

            value={
              currentTime
            }

            onChange={
              changeProgress
            }
          />


          <span>
            {formatTime(
              duration
            )}
          </span>

        </div>


        <div className="track-counter">

          Композиція{" "}
          {currentIndex + 1}{" "}
          з {music.length}

        </div>

      </div>

      <button
        className="delete-song"

        onClick={() =>
          onDelete(
            currentSong.id
          )
        }

        title="Видалити композицію"
      >
        ×
      </button>

    </div>
  );
}

export default MusicPlayer;
