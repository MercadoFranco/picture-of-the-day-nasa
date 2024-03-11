import { Link } from "react-router-dom";
import Button from "./Button";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

type NavBarProps = {
  title?: string;
  backButton?: boolean;
};

const NavBar = ({ title, backButton }: NavBarProps) => {
  return (
    <>
      <header className="w-full py-2 md:p-6 flex justify-center relative min-h-14 md:min-h-20 shadow-sm lg:h-20 lg:w-3/4 border-b border-b-primaryLight">
        <div className="w-full max-w-7xl px-4 md:px-16">
          {backButton && (
            <Link to={"/"} className="w-fit block">
              <Button size="xs" variant="outline" className="flex items-center">
                <ChevronLeftIcon className="h-6 w-6 lg:h-4 lg:w-4 m-0.5 text-white" />
                <p className="hidden sm:block font-mono">GO BACK</p>
              </Button>
            </Link>
          )}
          <h1 className="font-strait text-xs md:text-2xl text-center uppercase font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            {title ?? "Nasa's picture of the day"}
          </h1>
        </div>
      </header>
    </>
  );
};

export default NavBar;
