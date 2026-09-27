function Home({ user, navigate }) {
  return (
    <section
      className="
        w-full
        p-5

        max-md:p-3
      "
    >
      

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mb-5
          p-5
          border-2
          border-purple
          rounded-[15px]
          bg-white

          max-md:p-4
        "
      >
        <div className="min-w-0">
          <span
            className="
              block
              mb-1
              text-purple
              text-[11px]
              font-bold
              uppercase
              tracking-[1px]
            "
          >
            i&myFriends
          </span>

          <h1
            className="
              m-0
              text-[26px]
              font-bold
              text-text

              max-md:text-[21px]
            "
          >
            Вітаємо, {user.firstName}!
          </h1>

          <p
            className="
              m-0
              mt-1.5
              text-muted
              text-[13px]
            "
          >
            Це головна сторінка вашого особистого кабінету.
          </p>
        </div>

        

        <button
          type="button"
          onClick={() => navigate("profile")}
          title="Налаштування профілю"
          aria-label="Налаштування профілю"
          className="
            w-11
            h-11
            shrink-0
            border-2
            border-purple
            rounded-[10px]
            bg-white
            text-purple
            text-[20px]
            grid
            place-items-center
            cursor-pointer
            transition-colors
            duration-200

            hover:bg-purple
            hover:text-white
          "
        >
          ⚙
        </button>
      </div>

      

        <div
       className="
        grid
        grid-cols-[minmax(220px,280px)_minmax(0,1fr)]
        gap-5
        max-[900px]:grid-cols-1
      "
      >

        

        <div
          className="
            border-2
            border-purple
            rounded-[15px]
            bg-white
            p-5
            flex
            flex-col
            items-center
            text-center
          "
        >
         

        <div
       className="
       w-[clamp(90px,14vw,160px)]
       h-[clamp(160px,22vw,250px)]
       overflow-hidden
       border-[3px]
       border-purple
       rounded-[15px]
       bg-pink
       grid
       place-items-center
       "
       >

      {user.photo ? (
      <img
      src={user.photo}
      alt="Користувач"
      className="
      block
      w-full
      h-full
      object-cover
      "
     />

      ) : (
    <>
      {user.firstName?.charAt(0)}
      {user.lastName?.charAt(0)}
    </>
     )}
    </div>

          

          <h2
            className="
              m-0
              mt-4
              text-[20px]
              font-bold
              text-text
            "
          >
            {user.firstName} {user.lastName}
          </h2>

          

          <p
            className="
              m-0
              mt-1.5
              text-muted
              text-[12px]
            "
          >
            {user.city}, {user.country}
          </p>

          

          <button
            type="button"
            onClick={() => navigate("profile")}
            className="
              w-full
              mt-5
              min-h-[42px]
              border-0
              rounded-[10px]
              bg-purple
              text-white
              text-[13px]
              font-bold
              cursor-pointer
              transition-colors
              duration-200

              hover:bg-purple-dark
            "
          >
            Редагування профілю
          </button>
        </div>

        

        <div
          className="
            border-2
            border-purple
            rounded-[15px]
            bg-white
            p-5

            max-md:p-4
          "
        >
          <h2
            className="
              m-0
              mb-4
              text-[20px]
              font-bold
              text-text
            "
          >
            Швидкий доступ
          </h2>

          <div
            className="
              grid
              grid-cols-2
              gap-3

              max-[600px]:grid-cols-1
            "
          >
            

            <button
              type="button"
              onClick={() => navigate("photos")}
              className="
                min-h-[85px]
                p-3
                border-2
                border-purple-light
                rounded-[12px]
                bg-purple-soft
                flex
                items-center
                gap-3
                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:border-purple
                hover:bg-purple-light
              "
            >
              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-white
                  grid
                  place-items-center
                  text-[21px]
                "
              >
                📷
              </span>

              <span className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                  "
                >
                  Мої фотографії
                </strong>

                <small
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Переглянути альбом
                </small>
              </span>
            </button>

            

            <button
              type="button"
              onClick={() => navigate("friends")}
              className="
                min-h-[85px]
                p-3
                border-2
                border-purple-light
                rounded-[12px]
                bg-purple-soft
                flex
                items-center
                gap-3
                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:border-purple
                hover:bg-purple-light
              "
            >
              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-white
                  grid
                  place-items-center
                  text-[21px]
                "
              >
                👥
              </span>

              <span className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                  "
                >
                  Мої друзі
                </strong>

                <small
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Знайти друзів
                </small>
              </span>
            </button>

            

            <button
              type="button"
              onClick={() => navigate("music")}
              className="
                min-h-[85px]
                p-3
                border-2
                border-purple-light
                rounded-[12px]
                bg-purple-soft
                flex
                items-center
                gap-3
                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:border-purple
                hover:bg-purple-light
              "
            >
              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-white
                  grid
                  place-items-center
                  text-[21px]
                "
              >
                🎵
              </span>

              <span className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                  "
                >
                  Моя музика
                </strong>

                <small
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Музична колекція
                </small>
              </span>
            </button>

            

            <button
              type="button"
              onClick={() => navigate("profile")}
              className="
                min-h-[85px]
                p-3
                border-2
                border-purple-light
                rounded-[12px]
                bg-purple-soft
                flex
                items-center
                gap-3
                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:border-purple
                hover:bg-purple-light
              "
            >
              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-white
                  grid
                  place-items-center
                  text-[21px]
                "
              >
                👤
              </span>

              <span className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                  "
                >
                  Моя сторінка
                </strong>

                <small
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Переглянути профіль
                </small>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("messages")}
              className="
                min-h-[85px]
                p-3
                border-2
                border-purple-light
                rounded-[12px]
                bg-purple-soft
                flex
                items-center
                gap-3
                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:border-purple
                hover:bg-purple-light
              "
            >
              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-white
                  grid
                  place-items-center
                  text-[21px]
                "
              >
                💬
              </span>

              <span className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                  "
                >
                  Мої повідомлення
                </strong>

                <small
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Відкрити повідомлення
                </small>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("notes")}
              className="
                min-h-[85px]
                p-3
                border-2
                border-purple-light
                rounded-[12px]
                bg-purple-soft
                flex
                items-center
                gap-3
                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:border-purple
                hover:bg-purple-light
              "
            >
              <span
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-white
                  grid
                  place-items-center
                  text-[21px]
                "
              >
                📝
              </span>

              <span className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                  "
                >
                  Мій блокнот
                </strong>

                <small
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Особисті записи
                </small>
              </span>
            </button>
          </div>
        </div>
      </div>


      <div
        className="
          mt-5
          border-2
          border-purple
          rounded-[15px]
          bg-white
          p-5

          max-md:p-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            mb-4
          "
        >
          <div className="min-w-0">
            <h2
              className="
                m-0
                text-[20px]
                font-bold
                text-text
              "
            >
              Інформація про користувача
            </h2>

            <p
              className="
                m-0
                mt-1
                text-muted
                text-[12px]
              "
            >
              Основна інформація вашого профілю
            </p>
          </div>

          <span
            className="
              w-10
              h-10
              shrink-0
              rounded-full
              bg-purple-soft
              grid
              place-items-center
              text-[18px]
            "
          >
            👤
          </span>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3

            max-[700px]:grid-cols-1
          "
        >
          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Ім'я та прізвище
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Ім'я користувача
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.userName || user.username || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Email
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.email || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Телефон
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.phone || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Дата народження
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.birthDate || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Місце народження
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.birthPlace || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Місто
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.city || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft
            "
          >
            <span className="block text-[10px] text-muted">
              Країна
            </span>
            <strong className="block mt-1 text-[13px] text-text break-words">
              {user.country || "Не вказано"}
            </strong>
          </div>

          <div
            className="
              col-span-2
              p-3
              border-2
              border-purple-light
              rounded-[12px]
              bg-purple-soft

              max-[700px]:col-span-1
            "
          >
            <span className="block text-[10px] text-muted">
              Про себе
            </span>
            <p
              className="
                m-0
                mt-1
                text-[13px]
                leading-5
                text-text
                break-words
              "
            >
              {user.about || user.aboutMe || "Інформацію про себе ще не додано."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
