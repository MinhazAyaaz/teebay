import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../constants";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const shouldRender = useMemo(() => {
    const url = window.location.pathname;
    return !(url === "/login" || url === "/signup");
  }, []);

  if (!shouldRender) return null;

  return (
    <header className="h-14 bg-white border-b border-gray-200">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="h-14 flex justify-between items-center">
          <Link
            to="/"
            className="font-bold font-mono text-[20px] text-gray-700 no-underline"
          >
            Sazim Test App
          </Link>

          <nav
            className={
              `items-center gap-1 ` +
              (mobileOpen
                ? `flex absolute top-14 left-0 right-0 bg-white border-b border-gray-200 p-2 sm:static sm:flex sm:bg-transparent sm:border-0 sm:p-0`
                : `hidden sm:flex`)
            }
          >
            {LINKS.map((link) => {
              return (
                <a
                  key={link.label}
                  href={link.link}
                  className="inline-block leading-none px-3 py-2 rounded-md  text-gray-700 text-sm font-medium hover:bg-gray-200 duration-200"
                  onClick={(e) => e.preventDefault()}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
              className="inline-block leading-none px-3 py-2 rounded-md  text-gray-700 text-sm font-medium bg-gray-200 hover:bg-gray-300 duration-200"
            >
              Logout
            </a>
            <button
              className="inline-flex flex-col justify-center gap-1 w-9 h-9 border border-transparent bg-transparent rounded-md cursor-pointer hover:bg-gray-100 sm:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block w-[18px] h-[2px] bg-gray-900 mx-auto" />
              <span className="block w-[18px] h-[2px] bg-gray-900 mx-auto" />
              <span className="block w-[18px] h-[2px] bg-gray-900 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
