import React, { FC, useEffect, useMemo, useState } from "react";

interface ICountdownTimer {
  deleteLink: () => Promise<void>;
}

const CountdownTimer: FC<ICountdownTimer> = ({ deleteLink }) => {
  // 4:59 minutes in seconds
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60 - 1);
  const degrees = useMemo(() => (timeLeft / 300) * 180, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const cleanup = () => {
      clearInterval(interval);
    };

    if (timeLeft === 0) {
      cleanup();
    }

    return cleanup;
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      deleteLink();
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="circle-wrap">
        <div className="circle ">
          <div
            className="mask full"
            style={{ transform: `rotate(${degrees}deg)` }}
          >
            <div
              className="fill"
              style={{ transform: `rotate(${degrees}deg)` }}
            ></div>
          </div>
          <div className="mask half">
            <div
              className="fill"
              style={{ transform: `rotate(${degrees}deg)` }}
            ></div>
          </div>
          <div className="inside-circle"> {formatTime(timeLeft)} </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
