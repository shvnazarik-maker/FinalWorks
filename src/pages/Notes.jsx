import { useState } from "react";

function Notes({
  notes,
  setNotes,
}) {
  const [text, setText] =
    useState("");

  const addNote = () => {
    if (!text.trim()) return;

    setNotes([
      ...notes,
      {
        id:
          Date.now(),
        text: text,
      },
    ]);

    setText("");
  };

  const deleteNote = (
    id
  ) => {
    setNotes(
      notes.filter(
        (note) =>
          note.id !== id
      )
    );
  };

  return (
    <section className="page">

      <div className="page-header">

        <div>
          <span className="eyebrow">
            БЛОКНОТ
          </span>

          <h1>
            Мій блокнот
          </h1>

          <p>
            Ваші особисті записи.
          </p>
        </div>

      </div>

      <div className="note-create">

        <textarea
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="Напишіть нову нотатку..."
        />

        <button
          className="primary-button"
          onClick={addNote}
        >
          + Додати
        </button>

      </div>

      <div className="notes">

        {notes.map(
          (note, index) => (
            <div
              className="note"
              key={note.id}
            >

              <div className="note-number">
                {index + 1}
              </div>

              <p>
                {note.text}
              </p>

              <button
                onClick={() =>
                  deleteNote(
                    note.id
                  )
                }
              >
                ×
              </button>

            </div>
          )
        )}

      </div>

    </section>
  );
}

export default Notes;
