import {
  useEffect,
  useState,
} from "react";


function Messages({
  user,
  friends,
  messages,
  setMessages,
  onOpenProfile,
  initialFriendId,
}) {

  

  const [selectedFriendId, setSelectedFriendId] =
  useState(initialFriendId ?? null);


  

 useEffect(() => {
  if (
    initialFriendId !== undefined &&
    initialFriendId !== null
  ) {
    setSelectedFriendId(initialFriendId);
  }
}, [initialFriendId]);

useEffect(() => {
  if (
    selectedFriendId === null &&
    friends.length > 0
  ) {
    setSelectedFriendId(friends[0].id);
  }
}, [friends, selectedFriendId]);


  

  const [messageText, setMessageText] =
    useState("");


  const currentFriend =
    friends.find(
      (friend) =>
        friend.id ===
        selectedFriendId
    );



  if (!currentFriend) {
    return (
      <section className="page">

        <div className="page-header">

          <div>

            <span className="eyebrow">
              ПОВІДОМЛЕННЯ
            </span>

            <h1>
              Мої повідомлення
            </h1>

            <p>
              У вас поки немає друзів
              для спілкування.
            </p>

          </div>

        </div>

      </section>
    );
  }


  const currentMessages =
    messages.filter(
      (message) =>
        message.friendId ===
        currentFriend.id
    );



  const sendMessage = () => {
    const text =
      messageText.trim();

    if (!text) {
      return;
    }

    const now =
      new Date();

    const time =
      now.toLocaleTimeString(
        "uk-UA",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    const newMessage = {
      id: Date.now(),

      friendId:
        currentFriend.id,

      from: "me",

      text,

      time,
    };

    setMessages(
      (oldMessages) => [
        ...oldMessages,
        newMessage,
      ]
    );

    setMessageText("");
  };



  const handleKeyDown = (
    event
  ) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();
    }
  };



  const handleOpenProfile = () => {
    if (onOpenProfile) {
      onOpenProfile(
        currentFriend
      );
    }
  };



  return (
    <section className="page">


      <div className="page-header">

        <div>

          <span className="eyebrow">
            ПОВІДОМЛЕННЯ
          </span>

          <h1>
            Мої повідомлення
          </h1>

          <p>
            Спілкуйтеся з друзями
            прямо на сайті.
          </p>

        </div>

      </div>


      

      <div className="messages-layout">

        

        <aside className="messages-sidebar">

          <div className="messages-sidebar-title">

            <h2>
              Друзі
            </h2>

            <span>
              {friends.length}
            </span>

          </div>


          <div className="friends-list">

            {friends.map(
              (friend) => (

                <button
                  type="button"
                  key={friend.id}

                  className={`
                    friend-item
                    ${
                      friend.id ===
                      selectedFriendId
                        ? "active"
                        : ""
                    }
                  `}

                  onClick={() =>
                    setSelectedFriendId(
                      friend.id
                    )
                  }
                >

                  <div className="friend-avatar">

                    {friend.photo ? (
                      <img
                        src={
                          friend.photo
                        }
                        alt={
                          friend.name
                        }
                      />
                    ) : (
                      friend.initials
                    )}

                    {friend.online && (
                      <span className="online-dot" />
                    )}

                  </div>


                  <div className="friend-info">

                    <strong>
                      {friend.name ||
                        `${friend.firstName} ${friend.lastName}`}
                    </strong>

                    <span>
                      {friend.lastMessage}
                    </span>

                  </div>

                </button>

              )
            )}

          </div>

        </aside>


        <div className="chat">


          <div className="chat-header">

            <button
              type="button"
              className="chat-avatar"
              onClick={
                handleOpenProfile
              }
              title="Відкрити профіль"
            >

              {currentFriend.photo ? (
                <img
                  src={
                    currentFriend.photo
                  }
                  alt={
                    currentFriend.name
                  }
                />
              ) : (
                currentFriend.initials
              )}

              {currentFriend.online && (
                <span className="online-dot" />
              )}

            </button>


            <button
              type="button"
              className="chat-user-info"
              onClick={
                handleOpenProfile
              }
            >

              <strong>
                {currentFriend.name ||
                  `${currentFriend.firstName} ${currentFriend.lastName}`}
              </strong>

              <span>
                {currentFriend.online
                  ? "У мережі"
                  : "Не в мережі"}
              </span>

            </button>

          </div>


          

          <div className="chat-messages">

            {currentMessages.length ===
            0 ? (

              <div className="empty-chat">

                <div>
                  💬
                </div>

                <h3>
                  Повідомлень ще немає
                </h3>

                <p>
                  Напишіть перше повідомлення.
                </p>

              </div>

            ) : (

              currentMessages.map(
                (message) => (

                  <div
                    key={message.id}
                    className={`
                      message-row
                      ${
                        message.from ===
                        "me"
                          ? "my-message"
                          : "friend-message"
                      }
                    `}
                  >

                    <div className="message-bubble">

                      <p>
                        {message.text}
                      </p>

                      <span>
                        {message.time}
                      </span>

                    </div>

                  </div>

                )
              )

            )}

          </div>


          <div className="message-form">

            <textarea
              value={messageText}

              onChange={(event) =>
                setMessageText(
                  event.target.value
                )
              }

              onKeyDown={
                handleKeyDown
              }

              placeholder="Напишіть повідомлення..."

              rows={1}
            />


            <button
              type="button"
              className="send-message-button"

              onClick={
                sendMessage
              }

              disabled={
                !messageText.trim()
              }

              title="Надіслати"
            >
              ➤
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Messages;
