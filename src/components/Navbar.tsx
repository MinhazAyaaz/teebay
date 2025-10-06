import { useMemo } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../constants";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();

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
              (opened
                ? `flex absolute top-14 left-0 right-0 bg-white border-b border-gray-200 p-2 sm:static sm:flex sm:bg-transparent sm:border-0 sm:p-0`
                : `hidden sm:flex`)
            }
          >
            {LINKS.map((link) => {
              return (
                <Link
                  key={link.label}
                  to={link.link}
                  className="inline-block leading-none px-3 py-2 rounded-md  text-gray-700 text-sm font-medium hover:bg-gray-200 duration-200"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 ml-20">
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
              className="inline-block leading-none px-3 py-2 rounded-md  text-gray-700 text-sm font-medium bg-gray-200 hover:bg-gray-300 duration-200"
            >
              Logout
            </Link>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
              className="inline-flex flex-col justify-center gap-1 w-9 h-9 border border-transparent bg-transparent rounded-md cursor-pointer hover:bg-gray-100 sm:hidden"
            />
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
