import { MouseEvent, useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/16/solid";
import dayjs from "dayjs";

type ShareButtonProps = {
  date: string;
};

type AttachType = {
  title: string;
  text: string;
  url: string;
};

const ShareButton = ({ date }: ShareButtonProps) => {
  const [displayNotif, setDisplayNotif] = useState(false);

  const shareTitle = `Check out Nasa's picture of ${dayjs(date).format(
    "MMMM D, YYYY"
  )}!`;
  const shareMessage = `${window.location.href}${date}`;

  const copyShare = async () => {
    const tempInput = document.createElement("input");
    tempInput.value = `${shareTitle}\n${shareMessage}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      await navigator.clipboard.writeText(tempInput.value);
      setDisplayNotif(true);
    } catch {
      console.log("The link couldn't be copied.");
    } finally {
      document.body.removeChild(tempInput);
    }
  };

  const handleShare = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const content: AttachType = {
      title: shareTitle,
      text: shareMessage,
      url: shareMessage,
    };
    if (!navigator?.canShare || !navigator.canShare(content)) {
      copyShare();
    } else {
      navigator.share(content);
    }
  };

  useEffect(() => {
    let notifTimer: ReturnType<typeof setTimeout>;
    if (displayNotif === true) {
      notifTimer = setTimeout(() => {
        setDisplayNotif(false);
      }, 2000);
    }

    return () => {
      clearTimeout(notifTimer);
    };
  }, [displayNotif]);

  return (
    <button
      onClick={handleShare}
      className="hover:scale-110 active:scale-125 transition-all relative"
    >
      <ShareIcon className="w-8 h-8 text-green-600" />
      <span
        className={`rounded-xl bg-black text-white text-xs py-1 px-2 absolute -left-1/3 -top-1/3 transition-opacity ${
          displayNotif ? "opacity-80" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </button>
  );
};

export default ShareButton;
