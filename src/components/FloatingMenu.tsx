import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Button from "./Button";
import { useContext, useState } from "react";
import { GalleryContext } from "../utils/context";
import Dialog from "./Dialog";

const FloatingMenu = () => {
  const { switchFilterByLoved, filterByLoved } = useContext(GalleryContext);
  const [showSearch, setShowSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed right-4 bottom-4 lg:right-20 lg:bottom-20 flex flex-col-reverse gap-y-4 z-50  ">
      <Button
        variant="secondary"
        size="sm"
        className="py-4 lg:p-6"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Bars3Icon
          className={`h-8 w-8 lg:h-10 lg:w-10 text-white transition  ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </Button>
      {isOpen && (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="py-4 lg:p-6 relative"
            tabIndex={0}
            onClick={() => switchFilterByLoved()}
            aria-description="Filter by Liked"
          >
            <HeartIcon className="lg:h-10 lg:w-10 text-white transition" />
            {filterByLoved ? (
              <XMarkIcon className="h-14 w-14 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            ) : (
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="py-4 lg:p-6 relative"
            onClick={() => setShowSearch((prev) => !prev)}
            aria-description="Search date"
          >
            <MagnifyingGlassIcon className="lg:h-10 lg:w-10 text-white transition" />
          </Button>
        </>
      )}
      {showSearch && <Dialog onClose={() => setShowSearch(false)} />}
    </div>
  );
};

export default FloatingMenu;
