function Footer() {
  return (
    <footer
      className="
        mx-4 mb-4
        p-[15px]
        border-2 border-purple
        rounded-[13px]
        grid
        grid-cols-3
        gap-[15px]
        text-muted
        text-[11px]

        max-md:grid-cols-1
        max-md:mx-2
        max-md:mb-2
      "
    >
      <div>
        <strong
          className="
            block
            text-purple
            text-[15px]
            mb-[3px]
          "
        >
          i&myFriends
        </strong>

        <span className="block mt-[3px]">
          Соціальна мережа
        </span>
      </div>

      <div>
        <span className="block mt-[3px]">
          Email: shvnazarik@gmail.com
        </span>

        <span className="block mt-[3px]">
          Телефон: +380 95 030 11 45
        </span>
      </div>

      <div
        className="
          text-right
          max-md:text-left
        "
      >
        © 2026 i&myFriends
      </div>
    </footer>
  );
}

export default Footer;
