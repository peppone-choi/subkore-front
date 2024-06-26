'use client';

import React from 'react';
import Badge from './Badge';
import { eventStateList, eventTagList } from '@/config/eventTagList';
import { EventModalProps } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { modalClose, resetEventModalItem } from '@/store/eventModalItem';
import { useAppDispatch } from '@/store/store';

const fetchEventData = async (id: string) => {
  const res = await fetch(`/api/event/${id}`);
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return res.json();
};

const EventModal = ({ id }: EventModalProps) => {
  const {
    data: eventData,
    isError,
    error,
  } = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventData(id),
    retry: false,
  });

  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(modalClose());
    dispatch(resetEventModalItem());
  };

  return (
    <div className="max-h-[32rem] w-full rounded-lg bg-white">
      {isError ? (
        <div>{error.message}</div>
      ) : (
        <>
          <div className="relative h-44 w-full rounded-t-lg">
            <div className="w-full flex justify-end pr-2">
              <Image
                src={eventData?.headerImage}
                alt={eventData?.title}
                className="rounded-t-lg"
                layout="fill"
                objectFit="cover"
                loading="lazy"
              />
              <div className="w-full relative z-50 h-44">
                <button
                  onClick={handleModalClose}
                  className="size-8 min-w-8 relative -right-full -translate-x-full top-2 rounded-full text-white text-2xl font-light bg-black bg-opacity-30">
                  X
                </button>
                <h1 className="absolute bottom-0 ml-4 mb-4 max-lg:mb-2 max-lg:ml-2 max-lg:text-2xl text-4xl text-white font-bold">
                  {eventData?.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll h-80 text-sm break-all ml-2 mt-2 lg:m-4">
            <div className="h-full">
              <div className="flex">
                <p className="w-28 md:w-40">날짜</p>
                <p>
                  {eventData?.startTime.split('T')[0].split('-')[0]}년{' '}
                  {eventData?.startTime.split('T')[0].split('-')[1]}월{' '}
                  {eventData?.startTime.split('T')[0].split('-')[2]}일
                  {eventData?.startTime.split('T')[0] === eventData?.endTime.split('T')[0]
                    ? null
                    : ` -> ${eventData?.endTime.split('T')[0].split('-')[0]}년 ${eventData?.endTime.split('T')[0].split('-')[1]}월 ${eventData?.endTime.split('T')[0].split('-')[2]}일`}
                </p>
              </div>
              <div className="flex">
                <p className="min-w-28 md:min-w-40">유형/상태</p>
                <div className="">
                  {eventData?.tag.map((tag: string) => {
                    return (
                      <Badge
                        key={tag}
                        name={eventTagList.get(tag)?.text as string}
                        color={eventTagList.get(tag)?.color as string}
                        textColor={eventTagList.get(tag)?.textColor as string}
                      />
                    );
                  })}
                  {
                    <Badge
                      name={eventStateList.get(eventData?.state as string)?.text as string}
                      color={eventStateList.get(eventData?.state as string)?.color as string}
                      textColor={eventStateList.get(eventData?.state as string)?.textColor as string}
                    />
                  }
                  {eventData?.isLongTimeEvent ? (
                    <Badge name="장기행사" color="rgb(238, 224, 218)" textColor="rgb(68, 42, 30)" />
                  ) : null}
                  {eventData?.isOverNight ? (
                    <Badge name="밤샘" color="rgb(238, 224, 218)" textColor="rgb(68, 42, 30)" />
                  ) : null}
                </div>
              </div>
              <div className="flex">
                <p className="w-28 md:w-40">장소</p>
                <p>{eventData?.location}</p>
              </div>
              <div className="flex">
                <p className="w-28 md:w-40">상세 주소</p>
                <p>{eventData?.detailLocation}</p>
              </div>
              <div className="flex">
                <p className="w-28 md:w-40">인근 교통수단</p>
                <p>{eventData?.transport}</p>
              </div>

              <div className="flex">
                <p className="w-28 md:w-40">장르 및 키워드</p>
                <p>{eventData?.genreAndKeyword.join(', ')}</p>
              </div>

              <div className="flex">
                <p className="w-28 md:w-40">가격</p>
                <div>
                  {eventData?.detail.price.map((price: { price: number; option: string }) => {
                    return (
                      <div>
                        {price.price}원 ({price.option})
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex">
                <p className="w-28 md:w-40">링크</p>
                <a href={eventData?.detail.link}>{eventData?.detail.link}</a>
              </div>
              <div className="flex mt-2 md:mt-10">
                <p>{eventData?.detail.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventModal;
