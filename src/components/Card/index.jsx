import styles from "./Card.module.scss";
import Tooltip from "../Tooltip";
import { useState } from "react";
import { Spinner } from "../Spinner";

export const Card = ({ email, phone, photo, name, position, cardLoading }) => {
  const [tooltipName, setTooltipName] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(false);
  const [tooltipEmail, setTooltipEmail] = useState(false);
  const [tooltipPhone, setTooltipPhone] = useState(false);

  return (
    <div className={styles.card}>
      {cardLoading ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          {photo ? (
            <img
              className={styles.photo}
              src={photo}
              width='70'
              height='70'
              alt=''
            />
          ) : (
            <img
              className={styles.photo}
              src='/images/photo-cover.svg'
              width='70'
              height='70'
              alt=''
            />
          )}
          <div
            className={styles.tooltip}
            onMouseEnter={() => {
              setTooltipName(true);
            }}
            onMouseLeave={() => {
              setTooltipName(false);
            }}
          >
            <p className={styles.name}>{name}</p>
            {tooltipName && <Tooltip text={name} />}
          </div>

          <div
            className={styles.tooltip}
            onMouseEnter={() => {
              setTooltipPosition(true);
            }}
            onMouseLeave={() => {
              setTooltipPosition(false);
            }}
          >
            <p className={styles.position}>{position}</p>
            {tooltipPosition && <Tooltip text={position} />}
          </div>
          <div
            className={styles.tooltip}
            onMouseEnter={() => {
              setTooltipEmail(true);
            }}
            onMouseLeave={() => {
              setTooltipEmail(false);
            }}
          >
            <p className={styles.email}>{email}</p>
            {tooltipEmail && <Tooltip text={email} />}
          </div>
          <div
            className={styles.tooltip}
            onMouseEnter={() => {
              setTooltipPhone(true);
            }}
            onMouseLeave={() => {
              setTooltipPhone(false);
            }}
          >
            <p className={styles.phone}>{phone}</p>
            {tooltipPhone && <Tooltip text={phone} />}
          </div>
        </div>
      )}
    </div>
  );
};
