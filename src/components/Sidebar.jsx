function Sidebar({
  open,
  setOpen,
  currentPage,
  navigate,
  user,
}) {
  const menu = [
    {
      id: "home",
      icon: "🏠",
      title: "Головна",
    },
    {
      id: "profile",
      icon: "👤",
      title: "Моя сторінка",
    },
    {
      id: "photos",
      icon: "📷",
      title: "Мої фотографії",
    },
    {
      id: "friends",
      icon: "👥",
      title: "Мої друзі",
    },
    {
      id: "music",
      icon: "🎵",
      title: "Моя музика",
    },
    {
      id: "messages",
      icon: "💬",
      title: "Мої повідомлення",
    },
    {
      id: "notes",
      icon: "📝",
      title: "Мій блокнот",
    },
  ];

  const handleNavigate = (page) => {
    navigate(page);
    setOpen(false);
  };

  return (
    <>
      

   <aside
  className={`
    relative
    z-20
    shrink-0
    min-h-[620px]
    bg-white
    border-r
    border-purple-light
    transition-all
    duration-300
    ease-in-out

    ${open ? "w-[270px]" : "w-[95px]"}

    max-[900px]:w-full
    max-[900px]:min-h-0

    ${open ? "max-[900px]:block" : "max-[900px]:hidden"}
  `}
>


        <div
          className="
            h-[72px]
            px-2.5
            flex
            items-center
            gap-3
            border-b
            border-purple-light
          "
        >

          

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
            aria-expanded={open}

            className="
              w-[52px]
              h-[52px]
              shrink-0
              border-2
              border-purple
              rounded-[10px]
              bg-white
              flex
              flex-col
              items-center
              justify-center
              gap-[5px]
              cursor-pointer
              transition-colors
              duration-200
              hover:bg-purple-soft
            "
          >
            <span
              className={`
                block
                w-6
                h-[3px]
                rounded-full
                bg-purple
                transition-all
                duration-300
                ${
                  open
                    ? "translate-y-2 rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                w-6
                h-[3px]
                rounded-full
                bg-purple
                transition-all
                duration-300
                ${
                  open
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
            />

            <span
              className={`
                block
                w-6
                h-[3px]
                rounded-full
                bg-purple
                transition-all
                duration-300
                ${
                  open
                    ? "-translate-y-2 -rotate-45"
                    : ""
                }
              `}
            />
          </button>


          

          {open && (
            <div
              className="
                min-w-0
                overflow-hidden
              "
            >
              <strong
                className="
                  block
                  text-purple
                  text-[18px]
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
                  text-[10px]
                  whitespace-nowrap
                "
              >
                Соціальна мережа
              </span>
            </div>
          )}

        </div>


  

        {!open && (
          <button
            type="button"
            onClick={() => handleNavigate("profile")}
            title="Моя сторінка"
            className="
              w-[70px]
              h-[100px]
              p-0
              mx-auto
              mt-5
              block
              overflow-hidden
              border-[3px]
              border-purple
              rounded-[10px]
              bg-pink
              cursor-pointer
              hover:opacity-90
            "
          >
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Користувач"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  w-full
                  h-full
                  grid
                  place-items-center
                  bg-pink
                  text-white
                  text-[17px]
                  font-bold
                "
              >
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
            )}
          </button>
        )}


       

        {open && (
          <div
            className="
              mx-3
              mt-4
              mb-3
              p-3
              rounded-[12px]
              bg-purple-soft
              border
              border-purple-light
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-[68px]
                  h-[98px]
                  shrink-0
                  overflow-hidden
                  border-2
                  border-purple
                  bg-pink
                "
              >
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt="Користувач"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      w-full
                      h-full
                      grid
                      place-items-center
                      text-white
                      font-bold
                    "
                  >
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <strong
                  className="
                    block
                    text-text
                    text-[13px]
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                  "
                >
                  {user?.firstName} {user?.lastName}
                </strong>

                <span
                  className="
                    block
                    mt-1
                    text-muted
                    text-[10px]
                  "
                >
                  Моя сторінка
                </span>
              </div>

            </div>
          </div>
        )}



        <nav
          className={`
            flex
            flex-col
            gap-1.5
            px-2.5

            ${
              open
                ? "mt-2"
                : "mt-5"
            }
          `}
        >

          {menu.map((item) => {

            const active =
              currentPage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleNavigate(item.id)
                }
                title={
                  !open
                    ? item.title
                    : undefined
                }
                className={`
                  h-[48px]
                  w-full
                  border-0
                  rounded-[10px]
                  flex
                  items-center
                  cursor-pointer
                  transition-all
                  duration-200

                  ${
                    open
                      ? "justify-start gap-3 px-3"
                      : "justify-center px-0"
                  }

                  ${
                    active
                      ? "bg-purple-soft text-purple-dark"
                      : "bg-transparent text-text hover:bg-purple-soft hover:text-purple-dark"
                  }
                `}
              >

                <span
                  className="
                    w-7
                    shrink-0
                    text-center
                    text-[19px]
                  "
                >
                  {item.icon}
                </span>

                {open && (
                  <span
                    className="
                      min-w-0
                      overflow-hidden
                      text-ellipsis
                      whitespace-nowrap
                      text-[12px]
                    "
                  >
                    {item.title}
                  </span>
                )}

              </button>
            );
          })}

        </nav>

      </aside>


     

     
    </>
  );
}

export default Sidebar;
