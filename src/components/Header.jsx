function Header({
  onMenuClick,

  isLoggedIn,
  onLogin,
  onLogout,

  music,
  currentSong,
  isPlaying,

  togglePlay,
  nextSong,
  previousSong,

  currentTime,
  duration,
  changeProgress,
}) {
  const currentTrack =
    music && music.length > 0
      ? music[currentSong]
      : null;

  const formatTime = (time) => {
    if (!time || isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
   <header
  className="
    relative
    z-30
    m-4
    min-h-[100px]
    px-[18px]
    py-3
    border-2
    border-purple
    rounded-[15px]
    bg-white

    grid
    grid-cols-[220px_minmax(0,1fr)_80px]
    items-center
    gap-4

    max-[1000px]:grid-cols-[190px_minmax(0,1fr)_70px]
    max-[1000px]:gap-2

    max-[900px]:grid-cols-1
    max-[900px]:gap-2
    max-[900px]:p-2
    max-[900px]:min-h-0

    max-[768px]:m-2
    max-[768px]:rounded-[12px]
  "
>

<div
  className="
    min-w-0
    flex
    items-center
    gap-2.5

    max-[900px]:justify-center
  "
>

        <div
          className="
            w-[52px]
            h-[52px]
            shrink-0
            rounded-full
            grid
            place-items-center
            bg-purple
            text-white
            font-bold
            text-[12px]

           max-[900px]:w-[43px]
           max-[900px]:h-[43px]
           max-[900px]:text-[10px]

          "
        >
          i&mF
        </div>

       <div
        className="
        min-w-0
        max-[900px]:hidden
        "
        >

          <strong
            className="
              block
              text-purple
              text-[23px]
              whitespace-nowrap
            "
          >
            i&myFriends
          </strong>

          <span
            className="
              block
              mt-0.5
              text-muted
              text-[9px]
            "
          >
            Соціальна мережа
          </span>
        </div>
      </div>



      <div
  className="
    min-w-0
    h-[58px]
    flex
    items-center
    justify-center
    gap-3
    px-3
    py-1.5
    rounded-xl
    bg-purple-soft

    max-[1000px]:gap-2
    max-[1000px]:px-2

    max-[900px]:h-[56px]
    max-[900px]:w-full
    max-[900px]:mt-2
    max-[900px]:border
    max-[900px]:border-purple-light
    max-[900px]:shadow-[0_5px_20px_rgba(90,40,90,0.12)]
  "
>



        <div
          className="
            min-w-0
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              w-9
              h-9
              shrink-0
              grid
              place-items-center
              rounded-full
              bg-purple
              text-white
              text-[14px]

              max-[900px]:w-8
              max-[900px]:h-8
            "
          >
            🎵
          </div>

          <div
            className="
              min-w-0
              max-w-[180px]

              max-[1000px]:max-w-[120px]
              max-[900px]:max-w-[100px]
            "
          >
            <strong
              className="
                block
                overflow-hidden
                text-ellipsis
                whitespace-nowrap
                text-text
                text-[11px]
              "
            >
              {currentTrack
                ? currentTrack.name
                : "Немає композиції"}
            </strong>

            <small
              className="
                block
                mt-[3px]
                text-muted
                text-[9px]
              "
            >
              {currentTrack
                ? `${currentSong + 1} / ${music.length}`
                : "Моя музика"}
            </small>
          </div>
        </div>



        <div
          className="
            shrink-0
            flex
            items-center
            gap-1
          "
        >

          <button
            type="button"
            onClick={previousSong}
            disabled={!currentTrack}
            title="Попередня композиція"
            className="
              w-8
              h-8
              shrink-0
              p-0
              border-0
              rounded-full
              bg-white
              text-purple
              grid
              place-items-center
              text-[12px]
              cursor-pointer
              transition-colors

              hover:bg-purple-light

              disabled:opacity-35
              disabled:cursor-not-allowed
            "
          >
            ⏮
          </button>


          <button
            type="button"
            onClick={togglePlay}
            disabled={!currentTrack}
            title={
              isPlaying
                ? "Пауза"
                : "Відтворити"
            }
            className="
              w-[38px]
              h-[38px]
              shrink-0
              p-0
              border-0
              rounded-full
              bg-purple
              text-white
              grid
              place-items-center
              text-[12px]
              cursor-pointer
              transition-colors

              hover:bg-purple-dark

              disabled:opacity-35
              disabled:cursor-not-allowed
            "
          >
            {isPlaying ? "⏸" : "▶"}
          </button>


          <button
            type="button"
            onClick={nextSong}
            disabled={!currentTrack}
            title="Наступна композиція"
            className="
              w-8
              h-8
              shrink-0
              p-0
              border-0
              rounded-full
              bg-white
              text-purple
              grid
              place-items-center
              text-[12px]
              cursor-pointer
              transition-colors

              hover:bg-purple-light

              disabled:opacity-35
              disabled:cursor-not-allowed
            "
          >
            ⏭
          </button>

        </div>




        <div
          className="
            min-w-0
            flex
            items-center
            gap-1.5
          "
        >

          <span
            className="
              shrink-0
              text-muted
              text-[9px]

              max-[900px]:hidden
            "
          >
            {formatTime(currentTime)}
          </span>


          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={changeProgress}
            disabled={!currentTrack}
            className="
              w-[110px]
              min-w-[50px]
              accent-purple

              max-[1000px]:w-[80px]
              max-[900px]:w-[60px]

              disabled:opacity-35
              disabled:cursor-not-allowed
            "
          />


          <span
            className="
              shrink-0
              text-muted
              text-[9px]

              max-[900px]:hidden
            "
          >
            {formatTime(duration)}
          </span>

        </div>

      </div>



      <div
        className="
          flex
          justify-end
        "
      >
        {isLoggedIn ? (
         <button
  type="button"
  onClick={onLogout}
  title="Вийти з акаунта"
  className="
    w-[70px]
    h-[55px]
    border-2
    border-purple
    rounded-[10px]
    bg-white
    text-purple
    flex
    flex-col
    justify-center
    items-center
    gap-1
    text-[11px]
    cursor-pointer
    transition-colors

    hover:bg-purple
    hover:text-white

    max-[1000px]:w-[60px]
    max-[900px]:translate-y-13
  "
>
  <span>
    Вихід
  </span>
</button>

        ) : (
          <button
            type="button"
            onClick={onLogin}
            title="Увійти"
            className="
              w-[70px]
              h-[55px]
              border-2
              border-purple
              rounded-[10px]
              bg-white
              text-purple
              flex
              flex-col
              justify-center
              items-center
              gap-1
              text-[11px]
              cursor-pointer
              transition-colors

              hover:bg-purple
              hover:text-white

              max-[1000px]:w-[60px]

            "
          >
            <span className="text-[18px]">
              ⇥
            </span>

            <span>
              Вхід
            </span>
          </button>
        )}
      </div>


      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Відкрити меню"
        className="
          hidden

          max-[900px]:grid
          max-[900px]:w-[45px]
          max-[900px]:h-[45px]
          max-[900px]:place-items-center
          max-[900px]:border-2
          max-[900px]:border-purple
          max-[900px]:rounded-[9px]
          max-[900px]:bg-white
          max-[900px]:text-purple
          max-[900px]:text-[22px]
          max-[900px]:cursor-pointer
        "
      >
        ☰
      </button>

    </header>
  );
}

export default Header;
