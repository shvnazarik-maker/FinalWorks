import { useState } from "react";

function Friends({
  friends,
  addedFriendIds,
  onToggleFriend,
  onOpenProfile,
}) {
  const [search, setSearch] = useState("");

  

  const filteredUsers = friends.filter((friend) =>
    `${friend.firstName} ${friend.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  const myFriends = filteredUsers.filter((friend) =>
    addedFriendIds.includes(friend.id)
  );

  

  const otherUsers = filteredUsers.filter(
    (friend) =>
      !addedFriendIds.includes(friend.id)
  );

  

  const getInitials = (user) => {
    return (
      user.firstName?.charAt(0) +
      user.lastName?.charAt(0)
    );
  };

  

  const renderFriendCard = (friend, isFriend) => {
    return (
      <div
        className={`friend-card ${
          isFriend ? "friend-card-added" : ""
        }`}
        key={friend.id}
      >
        

        <button
          type="button"
          className="friend-avatar"
          onClick={() =>
            onOpenProfile(friend)
          }
          title="Відкрити профіль"
        >
          {friend.photo ? (
            <img
              src={friend.photo}
              alt={friend.name}
            />
          ) : (
            getInitials(friend)
          )}

          {friend.online && (
            <span className="online-dot" />
          )}
        </button>

        

        <div className="friend-data">
          <button
            type="button"
            className="friend-name-button"
            onClick={() =>
              onOpenProfile(friend)
            }
          >
            <strong>
              {friend.name ||
                `${friend.firstName} ${friend.lastName}`}
            </strong>
          </button>

          <span>
            - {friend.city}
          </span>
        </div>

        

        <button
          type="button"
          className={
            isFriend
              ? "friend-added"
              : "friend-add"
          }
          onClick={() =>
            onToggleFriend(friend.id)
          }
        >
          {isFriend
            ? "✓ Додано"
            : "+ Додати"}
        </button>
      </div>
    );
  };

  

  return (
    <section className="page">

      

      <div className="page-header">
        <div>
          <span className="eyebrow">
            ДРУЗІ
          </span>

          <h1>
            Мої друзі
          </h1>

          <p>
            Знайдіть нових друзів
            та знайомих.
          </p>
        </div>
      </div>

      

      <div className="friend-search">
        <span>
          🔍
        </span>

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Пошук друзів..."
        />

        {search && (
          <button
            type="button"
            onClick={() =>
              setSearch("")
            }
          >
            ×
          </button>
        )}
      </div>

      

      <div className="friends-section">

        <div className="friends-section-header">
          <h2>
            Мої друзі
          </h2>

          <span>
            {myFriends.length}
          </span>
        </div>

        {myFriends.length === 0 ? (
          <div className="empty-state">
            <div>
              👥
            </div>

            <h2>
              У вас ще немає друзів
            </h2>

            <p>
              Додайте когось зі списку нижче.
            </p>
          </div>
        ) : (
          <div className="friends-list">
            {myFriends.map((friend) =>
              renderFriendCard(
                friend,
                true
              )
            )}
          </div>
        )}
      </div>

      

      <div className="friends-section">

        <div className="friends-section-header">
          <h2>
            Знайти друзів
          </h2>

          <span>
            {otherUsers.length}
          </span>
        </div>

        {otherUsers.length === 0 ? (
          <div className="empty-state">
            <div>
              🔍
            </div>

            <h2>
              Нікого не знайдено
            </h2>

            <p>
              Спробуйте інше ім'я.
            </p>
          </div>
        ) : (
          <div className="friends-list">
            {otherUsers.map((friend) =>
              renderFriendCard(
                friend,
                false
              )
            )}
          </div>
        )}
      </div>

    </section>
  );
}

export default Friends;
