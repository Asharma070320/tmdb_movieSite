// src/hooks/useFooter.js
import { useMemo } from "react";

const useFooter = () => {
  const footerData = useMemo(
    () => ({
      basics: [
        { label: "About TMDB", path: "#" },
        { label: "Contact Us", path: "#" },
        { label: "Support Forums", path: "#" },
        { label: "API Documentation", path: "#" },
        { label: "System Status", path: "#" },
      ],
      getInvolved: [
        { label: "Contribution Bible", path: "#" },
        { label: "Add New Movie", path: "#" },
        { label: "Add New TV Show", path: "#" },
      ],
      community: [
        { label: "Guidelines", path: "#" },
        { label: "Discussions", path: "#" },
        { label: "Leaderboard", path: "#" },
      ],
      legal: [
        { label: "Terms of Use", path: "#" },
        { label: "API Terms of Use", path: "#" },
        { label: "Privacy Policy", path: "#" },
        { label: "DMCA Policy", path: "#" },
      ],
    }),
    []
  );

  // Optional helper (if you want to reuse it)
  const renderLinks = (title, items) => (
    <div className="footer-column">
      <h3 className="text-white font-bold text-[16px] mb-3 tracking-wide">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.path}
              className="text-white text-[14px] hover:text-[#01b4e4] transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return { footerData, renderLinks };
};

export default useFooter;
