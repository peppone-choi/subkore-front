'use client';

import React from 'react';
import Badge from './Badge';
import { eventStateList, eventTagList } from '@/config/eventTagList';
import { EventComponentProps } from '@/types/types';
import Image from 'next/image';
import { modalOpen, setEventModalItem } from '@/store/eventModalItem';
import { useAppDispatch } from '@/store/store';

const EventComponent = ({
  id,
  headerImagePath,
  title,
  tags,
  startDate,
  endDate,
  location,
  keywords,
  isLongTimeEvent,
  state,
  isOverNight,
}: EventComponentProps) => {
  const dispatch = useAppDispatch();

  const handleEventIdChange = (id: string) => {
    dispatch(modalOpen());
    dispatch(setEventModalItem(id));
  };

  return (
    <div
      onClick={() => {
        handleEventIdChange(id);
      }}
      className="hover:cursor-pointer w-40 h-40 lg:w-72 lg:h-80 bg-white shadow-md lg:shadow-2xl rounded-lg">
      <div className="relative h-14 lg:h-1/2 w-full rounded-t-lg">
        <Image
          src={headerImagePath}
          alt={title}
          className="rounded-t-lg"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>
      <div className="p-1 lg:p-2">
        <h1 className="font-bold lg:text-lg lg:mb-1 overflow-hidden whitespace-nowrap text-ellipsis break-all">
          {title}
        </h1>
        <div className="max-lg:h-10 max-lg:overflow-y-clip mb-1 lg:mb-2">
          <p className="text-sm lg:text-base lg:space-x-1">
            {tags.map(tag => {
              return (
                <Badge
                  name={eventTagList.get(tag)?.text as string}
                  color={eventTagList.get(tag)?.color as string}
                  textColor={eventTagList.get(tag)?.textColor as string}
                />
              );
            })}
            {isLongTimeEvent ? <Badge name="장기행사" color="rgb(238, 224, 218)" textColor="rgb(68, 42, 30)" /> : null}
            {
              <Badge
                name={eventStateList.get(state as string)?.text as string}
                color={eventStateList.get(state as string)?.color as string}
                textColor={eventStateList.get(state as string)?.textColor as string}
              />
            }
            {isOverNight ? <Badge name="밤샘" color="rgb(238, 224, 218)" textColor="rgb(68, 42, 30)" /> : null}
          </p>
        </div>
        <p className="text-xs mb-1">
          {startDate} {endDate ? `-> ${endDate}` : null}
        </p>
        <p className="text-xs mb-1 hidden lg:block">{location}</p>
        <p className="text-xs space-x-1 hidden lg:block">
          {keywords.map((keyword, idx) => (
            <span>
              {keyword}
              {idx < keyword.length ? ',' : ''}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default EventComponent;
