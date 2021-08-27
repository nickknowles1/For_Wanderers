create database nick_mvp;

\c nick_mvp;

create table travelers (
  traveler_id serial primary key unique,
  name varchar unique,
  photo_url varchar,
  points smallint
);

create table places (
  place_id serial primary key unique,
  name varchar unique,
  beenHere smallint,
  wantToGo smallint,
  photoURL varchar,
  description varchar,
  date varchar,
  points smallint
);

create table friends (
  friend1 integer,
  friend2 integer,
  constraint fk_friend1
    foreign key(friend1)
      references travelers(traveler_id),
  constraint fk_friend2
    foreign key(friend2)
      references travelers(traveler_id)
);

create table traveler_places (
  traveler integer,
  place integer,
  date varchar,
  constraint fk_traveler
    foreign key(traveler)
      references travelers(traveler_id),
  constraint fk_place
    foreign key(place)
      references places(place_id)
);