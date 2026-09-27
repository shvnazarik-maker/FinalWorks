import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function Photos({
  photos,
  setPhotos,
}) {
  const inputRef = useRef(null);

  const [selectedPhoto, setSelectedPhoto] =
    useState(null);



  const addPhotos = (event) => {
    const files =
      Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }


    const fileReaders =
      files.map((file) => {
        return new Promise(
          (resolve, reject) => {
            const reader =
              new FileReader();

            reader.onload = () => {
              resolve({
                id:
                  Date.now() +
                  Math.random(),

                name: file.name,

                url: reader.result,
              });
            };

            reader.onerror = () => {
              reject(
                new Error(
                  `Не вдалося прочитати файл ${file.name}`
                )
              );
            };

            reader.readAsDataURL(file);
          }
        );
      });


    Promise.all(fileReaders)
      .then((newPhotos) => {
        setPhotos((oldPhotos) => [
          ...oldPhotos,
          ...newPhotos,
        ]);
      })
      .catch((error) => {
        console.error(
          "Помилка додавання фотографій:",
          error
        );

        toast.error("Не вдалося додати одну або кілька фотографій.");
      });


    
    event.target.value = "";
  };


  const deletePhoto = (id) => {
    const shouldDelete =
      window.confirm(
        "Видалити цю фотографію?"
      );

    if (!shouldDelete) {
      return;
    }


    setPhotos((oldPhotos) =>
      oldPhotos.filter(
        (photo) =>
          photo.id !== id
      )
    );


    setSelectedPhoto((current) => {
      if (current === null) {
        return null;
      }

      const deletedIndex =
        photos.findIndex(
          (photo) =>
            photo.id === id
        );

      if (deletedIndex === -1) {
        return current;
      }

      if (photos.length <= 1) {
        return null;
      }

      if (
        current === deletedIndex
      ) {
        if (
          current >=
          photos.length - 1
        ) {
          return current - 1;
        }

        return current;
      }

      if (
        deletedIndex < current
      ) {
        return current - 1;
      }

      return current;
    });
  };


  const openPhoto = (index) => {
    setSelectedPhoto(index);
  };


  const closePhoto = () => {
    setSelectedPhoto(null);
  };


  const nextPhoto = (event) => {
    event?.stopPropagation();

    setSelectedPhoto((current) => {
      if (
        current === null ||
        photos.length === 0
      ) {
        return null;
      }

      return (
        (current + 1) %
        photos.length
      );
    });
  };


  const previousPhoto = (event) => {
    event?.stopPropagation();

    setSelectedPhoto((current) => {
      if (
        current === null ||
        photos.length === 0
      ) {
        return null;
      }

      return (
        (current - 1 + photos.length) %
        photos.length
      );
    });
  };



  const handlePhotoKeyDown = (
    event,
    index
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      openPhoto(index);
    }
  };



  useEffect(() => {
    if (selectedPhoto === null) {
      return;
    }


    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        closePhoto();

        return;
      }


      if (event.key === "ArrowRight") {
        event.preventDefault();

        nextPhoto();

        return;
      }


      if (event.key === "ArrowLeft") {
        event.preventDefault();

        previousPhoto();

        return;
      }
    };


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    selectedPhoto,
    photos.length,
  ]);


  return (
    <section className="page">


      <div className="page-header">

        <div>
          <span className="eyebrow">
            ФОТОГРАФІЇ
          </span>

          <h1>
            Мої фотографії
          </h1>

          <p>
            Ваш особистий фотоальбом
          </p>
        </div>



        <button
          type="button"
          className="primary-button"
          onClick={() =>
            inputRef.current?.click()
          }
        >
          + Додати фотографію
        </button>

      </div>


      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={addPhotos}
      />


      {photos.length === 0 ? (

        <div className="empty-state">

          <div>
            📷
          </div>

          <h2>
            Фотографій ще немає
          </h2>

          <p>
            Натисніть «Додати фотографію»,
            щоб завантажити зображення.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              inputRef.current?.click()
            }
          >
            Додати фотографію
          </button>

        </div>

      ) : (


        <div className="gallery">

          {photos.map(
            (photo, index) => (

              <div
                key={
                  photo.id ??
                  index
                }

                className="gallery-item"

                role="button"

                tabIndex={0}

                onClick={() =>
                  openPhoto(index)
                }

                onKeyDown={(event) =>
                  handlePhotoKeyDown(
                    event,
                    index
                  )
                }

              >

                <img
                  src={photo.url}
                  alt={
                    photo.name ||
                    `Фотографія ${index + 1}`
                  }
                />


                <div className="gallery-overlay">

                  <span>
                    {photo.name ||
                      `Фотографія ${index + 1}`}
                  </span>


                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      deletePhoto(
                        photo.id
                      );
                    }}

                    aria-label="Видалити фотографію"
                    title="Видалити фотографію"
                  >
                    ×
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}



      {selectedPhoto !== null &&
        photos[selectedPhoto] && (

          <div
            className="photo-viewer"

            onClick={closePhoto}
          >

            <button
              type="button"

              className="photo-viewer-close"

              onClick={closePhoto}

              aria-label="Закрити"

              title="Закрити"
            >
              ×
            </button>


            {photos.length > 1 && (

              <button
                type="button"

                className="photo-viewer-prev"

                onClick={previousPhoto}

                aria-label="Попередня фотографія"

                title="Попередня фотографія"
              >
                ‹
              </button>

            )}



            <img
              className="photo-viewer-image"

              src={
                photos[selectedPhoto].url
              }

              alt={
                photos[selectedPhoto].name ||
                "Фотографія"
              }

              onClick={(event) =>
                event.stopPropagation()
              }
            />


            

            {photos.length > 1 && (

              <button
                type="button"

                className="photo-viewer-next"

                onClick={nextPhoto}

                aria-label="Наступна фотографія"

                title="Наступна фотографія"
              >
                ›
              </button>

            )}


            

            {photos.length > 1 && (

              <div className="photo-viewer-counter">
                {selectedPhoto + 1}
                {" / "}
                {photos.length}
              </div>

            )}

          </div>
        )}

    </section>
  );
}

export default Photos;
