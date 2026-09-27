import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { usersApi } from "../services/api/usersApi";
import { getUserImage } from "../services/api/imageUrl";

function toApiBirthDate(value) {
  if (!value) return "";

  
  const match = String(value).trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function Profile({
  user,
  setUser,
  isOwnProfile = true,
  onMessage,
  onBack,
}) {
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const savedProfileRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    if (!savedProfileRef.current || savedProfileRef.current.id !== user.id) {
      savedProfileRef.current = {
        id: user.id,
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        city: user.city || "",
        birthPlace: user.birthPlace || "",
        userName: user.userName || user.username || "",
        country: user.country || "",
        birthDate: user.birthDate || "",
        about: user.about || user.aboutMe || "",
      };
    }
  }, [user]);

  if (!user) {
    return (
      <section className="page">
        <div className="page-header">
          <h1>Профіль не знайдено</h1>
        </div>
      </section>
    );
  }

  const updateUser = (field, value) => {
    if (!isOwnProfile || !setUser) return;

    setUser((oldUser) => ({
      ...oldUser,
      [field]: value,
    }));
  };

  const changePhoto = async (event) => {
    if (!isOwnProfile) return;

    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Будь ласка, виберіть фотографію.");
      return;
    }

    if (!user.id) {
      toast.error("Не знайдено ID користувача.");
      return;
    }

    setUploadingAvatar(true);

    try {
      const { data } = await usersApi.updateAvatar(user.id, file);

      const serverImage = getUserImage(data?.payload);

      if (serverImage) {
        updateUser("photo", serverImage);
        updateUser("image", serverImage);
      } else {
        
        try {
          const meResponse = await usersApi.getMe();
          const items = Array.isArray(meResponse?.data?.payload?.items)
            ? meResponse.data.payload.items
            : [];
          const me = items.find((item) => String(item.id) === String(user.id));
          const refreshedImage = getUserImage(me);

          if (refreshedImage) {
            updateUser("photo", refreshedImage);
            updateUser("image", refreshedImage);
          }
        } catch (refreshError) {
          console.warn("Аватар завантажено, але URL не вдалося отримати:", refreshError);
        }
      }

      toast.success(data?.message || "Фотографію профілю оновлено.");
    } catch (error) {
      console.error("Не вдалося оновити аватар:", error);
      toast.error(
        error?.response?.data?.message ||
        "Не вдалося завантажити фотографію на сервер."
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  const saveProfile = async () => {
    if (!isOwnProfile) return;

    const userId = Number(user.id);
    if (!Number.isInteger(userId) || userId <= 0) {
      toast.error("Не знайдено коректний ID користувача. Увійдіть у профіль ще раз.");
      return;
    }

    setSaving(true);

    try {
      const previous = savedProfileRef.current || {};
      const profilePayload = {
        userId,
        userName: user.userName || user.username || "",
        country: user.country || "",
        birthDate: toApiBirthDate(user.birthDate),
        aboutMe: user.about || user.aboutMe || "",
      };

      
      await usersApi.updateProfile(profilePayload);

      let emailChanged = false;
      if (String(user.email || "").trim() &&
          String(user.email || "").trim().toLowerCase() !== String(previous.email || "").trim().toLowerCase()) {
        await usersApi.changeEmail(String(user.email).trim());
        emailChanged = true;
      }

      const unsupportedChanged = [
        ["firstName", "Ім'я"],
        ["lastName", "Прізвище"],
        ["phone", "Телефон"],
        ["city", "Місто"],
        ["birthPlace", "Місце народження"],
      ].some(([key]) => String(user[key] || "") !== String(previous[key] || ""));

      savedProfileRef.current = {
        ...previous,
        id: userId,
        email: user.email || previous.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        city: user.city || "",
        birthPlace: user.birthPlace || "",
        userName: user.userName || user.username || "",
        country: user.country || "",
        birthDate: user.birthDate || "",
        about: user.about || user.aboutMe || "",
      };

      updateUser("username", user.userName || user.username || "");
      updateUser("userName", user.userName || user.username || "");

      toast.success(
        emailChanged
          ? "Профіль збережено. На нову пошту надіслано лист для підтвердження."
          : unsupportedChanged
            ? "Профіль збережено. Ім'я, прізвище, телефон, місто та місце народження поки не мають endpoint у Swagger."
            : "Інформацію профілю збережено!"
      );
    } catch (error) {
      console.error("Не вдалося зберегти профіль:", error);
      toast.error(
        error?.response?.data?.message ||
          "Не вдалося зберегти зміни профілю на сервері."
      );
    } finally {
      setSaving(false);
    }
  };

  const firstInitial = user.firstName?.charAt(0) || "";
  const lastInitial = user.lastName?.charAt(0) || "";

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            {isOwnProfile ? "ПРОФІЛЬ" : "ПРОФІЛЬ ДРУГА"}
          </span>

          <h1>{isOwnProfile ? "Моя сторінка" : fullName}</h1>

          <p>Інформація про користувача</p>
        </div>

        {isOwnProfile && <div className="settings-button active">⚙</div>}
      </div>

      <div className={`profile-card ${!isOwnProfile ? "profile-view-card" : ""}`}>
        <div className="profile-photo-section">
          <div className="profile-photo">
            {user.photo ? (
              <img src={user.photo} alt={fullName} />
            ) : (
              <div className="profile-photo-placeholder">
                {firstInitial}
                {lastInitial}
              </div>
            )}
          </div>

          <div className="profile-photo-name">
            <strong>{fullName}</strong>

            <span>
              {user.city}, {user.country}
            </span>
          </div>

          {isOwnProfile && (
            <>
              <label className="upload-photo">
                {uploadingAvatar
                  ? "⏳ Завантаження..."
                  : "📷 Змінити фотографію"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={changePhoto}
                  disabled={uploadingAvatar}
                />
              </label>

             
            </>
          )}

          {!isOwnProfile && (
            <div className="profile-actions flex flex-col gap-2">
              {onMessage && (
                <button
                  type="button"
                  className="primary-button"
                  onClick={onMessage}
                >
                  💬 Написати повідомлення
                </button>
              )}

              {onBack && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={onBack}
                >
                  ← Назад до друзів
                </button>
              )}
            </div>
          )}
        </div>

        <div className={`profile-information ${!isOwnProfile ? "profile-view-information" : ""}`}>
          {isOwnProfile ? (
            <>
              <h2>⚙ Основна інформація</h2>

              <p className="settings-description">
                Тут можна змінити інформацію про користувача.
              </p>

              <div className="form-grid">
                <label>
                  Ім'я
                  <input
                    type="text"
                    value={user.firstName || ""}
                    onChange={(event) => updateUser("firstName", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Прізвище
                  <input
                    type="text"
                    value={user.lastName || ""}
                    onChange={(event) => updateUser("lastName", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Ім'я користувача
                  <input
                    type="text"
                    value={user.userName || user.username || ""}
                    onChange={(event) => updateUser("username", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Дата народження
                  <input
                    type="text"
                    value={user.birthDate || ""}
                    onChange={(event) => updateUser("birthDate", event.target.value)}
                    readOnly={!isOwnProfile}
                    placeholder="ДД.ММ.РРРР"
                  />
                </label>

                <label>
                  Місце народження
                  <input
                    type="text"
                    value={user.birthPlace || ""}
                    onChange={(event) => updateUser("birthPlace", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Країна
                  <input
                    type="text"
                    value={user.country || ""}
                    onChange={(event) => updateUser("country", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Місто
                  <input
                    type="text"
                    value={user.city || ""}
                    onChange={(event) => updateUser("city", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Телефон
                  <input
                    type="tel"
                    value={user.phone || ""}
                    onChange={(event) => updateUser("phone", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    value={user.email || ""}
                    onChange={(event) => updateUser("email", event.target.value)}
                    readOnly={!isOwnProfile}
                  />
                </label>

                <label className="about-field">
                  Про себе
                  <textarea
                    value={user.about || ""}
                    onChange={(event) => updateUser("about", event.target.value)}
                    placeholder="Розкажіть трохи про себе..."
                    readOnly={!isOwnProfile}
                  />
                </label>
              </div>

              <button
                type="button"
                className="primary-button save-button"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "Збереження..." : "Зберегти зміни"}
              </button>
            </>
          ) : (
            <>
              <div className="profile-view-heading">
                <span className="profile-view-eyebrow">ОСНОВНА ІНФОРМАЦІЯ</span>
                <h2>{fullName}</h2>
                {user.userName || user.username ? (
                  <p>@{user.userName || user.username}</p>
                ) : null}
              </div>

              <div className="profile-details">
                {
                  [
                    ["Ім'я", user.firstName],
                    ["Прізвище", user.lastName],
                    ["Дата народження", user.birthDate],
                    ["Місце народження", user.birthPlace],
                    ["Країна", user.country],
                    ["Місто", user.city],
                    ["Телефон", user.phone],
                    ["Email", user.email],
                  ]
                    .filter(([, value]) => String(value || "").trim())
                    .map(([label, value]) => (
                      <div className="profile-detail" key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))
                }

                {String(user.about || user.aboutMe || "").trim() && (
                  <div className="profile-detail profile-detail-about">
                    <span>Про себе</span>
                    <p>{user.about || user.aboutMe}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
