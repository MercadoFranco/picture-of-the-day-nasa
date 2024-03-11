import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "./Button";
import Input from "./Input";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

type DialogProps = {
  onClose: () => void;
};

const Dialog = ({ onClose }: DialogProps) => {
  const [date, setDate] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleDateInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    if (value.length === 2 || value.length === 5) {
      if (value.length > date.length) {
        setDate(`${value}/`);
      } else if (value.length < date.length) {
        setDate(value.substring(0, value.length - 1));
      }
    } else {
      setDate(value);
    }

    if (
      dayjs(value).isValid() &&
      dayjs(value).isAfter(dayjs("1995-06-16")) &&
      dayjs(value).isBefore(dayjs())
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div
      className="fixed h-screen w-screen left-0 top-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="mx-4 max-w-lg w-full p-8 bg-primary text-white rounded-xl relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="clear"
          size="xs"
          className="absolute right-2 top-2 px-1"
          onClick={() => onClose()}
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </Button>
        <h4 className="text-2xl font-strait uppercase w-full mb-8">
          Look up a day
        </h4>
        <p className="text-sm font-roboto text-gray-300 mb-4 text-center">
          Do you know what was the picture of the day on the day of your birth?
          (post 1995)
        </p>
        <Input
          value={date}
          onChange={handleDateInput}
          maxLength={10}
          inputMode="numeric"
          className="w-28 text-center mb-12"
          placeholder="MM/DD/YYYY"
        />

        <Link
          to={`/${dayjs(date).format("YYYY-MM-DD")}`}
          onClick={(e) => !isValid && e.preventDefault()}
          className={!isValid ? "pointer-events-none" : ""}
        >
          <Button variant="outline" size="sm" disabled={!isValid}>
            Look it up!
          </Button>
        </Link>

        {!isValid && date.length > 0 && (
          <p className="font-roboto text-primaryLight text-md">
            The date seems to be invalid
          </p>
        )}
        {}
      </div>
    </div>
  );
};

export default Dialog;
