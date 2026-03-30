import mongoose from 'mongoose';
import config from '../config.ts';
import User from '../model/user/User.ts';
import Artist from '../model/musics/Artist.ts';
import { randomUUID } from 'crypto';
import Album from '../model/musics/Album.ts';
import Track from '../model/musics/Track.ts';

const fixtureImagesPath: string = `../fixtures/images`;

const run = async () => {
  await mongoose.connect(config.db);

  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('track_histories');
  } catch (error) {
    console.error(error);
  }

  await User.create(
    {
      username: 'polskyBobr',
      password: 'polskyBobr12345',
      token: randomUUID(),
    },
    {
      username: 'cheeseNagibator',
      password: 'cheeseNagibator12345',
      token: randomUUID(),
    },
  );

  const [metro_boomin, the_weeknd] = await Artist.create(
    {
      name: 'Metro Boomin',
      image: `${fixtureImagesPath}/artists/metro_boomin.jpg`,
      information:
        'Leland Tyler Wayne (born September 16, 1993), professionally known as Metro Boomin (also known as Young Metro or simply Metro), is an Atlanta-based record producer and record executive from St. Louis, Missouri. Having expressed an interest for beat-making in his early teens.',
    },
    {
      name: 'The Weeknd',
      image: `${fixtureImagesPath}/artists/the_weeknd.png`,
      information:
        'Abel Makkonen Tesfaye (born February 16, 1990 in Scarborough, Ontario), popularly known as The Weeknd, is an R&B/pop/hip-hop singer-songwriter and record producer from Toronto, Canada. He has been referred to as the songbird of his generation and the best musical talent since Michael Jackson throughout his career.',
    },
  );

  const [
    heroes_and_villains,
    spdm_across_the_spd_verse,
    starboy,
    the_highlights,
  ] = await Album.create([
    {
      artist_id: metro_boomin!.id,
      name: 'Heroes & Villains',
      release_year: 2022,
      image: `${fixtureImagesPath}/albums/heroes_and_villains.png`,
    },
    {
      artist_id: metro_boomin!.id,
      name: 'Spider-Man: Across the Spider-Verse',
      release_year: 2023,
      image: `${fixtureImagesPath}/albums/spider_man_across_the_spider-verse.png`,
    },
    {
      artist_id: the_weeknd!.id,
      name: 'Starboy',
      release_year: 2023,
      image: `${fixtureImagesPath}/albums/star_boy.png`,
    },
    {
      artist_id: the_weeknd!.id,
      name: 'The Highlights',
      release_year: 2021,
      image: `${fixtureImagesPath}/albums/the_highlights.png`,
    },
  ]);

  await Track.create([
    {
      album_id: heroes_and_villains!.id,
      name: 'Superhero',
      time: '3:02',
      trackNumber: 1,
    },
    {
      album_id: heroes_and_villains!.id,
      name: 'Trance',
      time: '3:15',
      trackNumber: 2,
    },
    {
      album_id: heroes_and_villains!.id,
      name: 'Around Me',
      time: '3:11',
      trackNumber: 3,
    },
    {
      album_id: heroes_and_villains!.id,
      name: 'Raindrops ',
      time: '3:08',
      trackNumber: 4,
    },
    {
      album_id: heroes_and_villains!.id,
      name: 'I Can’t Save You',
      time: '1:30',
      trackNumber: 5,
    },

    {
      album_id: spdm_across_the_spd_verse!.id,
      name: 'Am I Dreaming',
      time: '4:16',
      trackNumber: 1,
    },
    {
      album_id: spdm_across_the_spd_verse!.id,
      name: 'Annihilate',
      time: '3:51',
      trackNumber: 2,
    },
    {
      album_id: spdm_across_the_spd_verse!.id,
      name: 'Self Love',
      time: '2:20',
      trackNumber: 3,
    },
    {
      album_id: spdm_across_the_spd_verse!.id,
      name: 'Calling',
      time: '2:00',
      trackNumber: 4,
    },
    {
      album_id: spdm_across_the_spd_verse!.id,
      name: 'Givin’ Up',
      time: '3:54',
      trackNumber: 5,
    },

    {
      album_id: starboy!.id,
      name: 'Starboy',
      time: '4:33',
      trackNumber: 1,
    },
    {
      album_id: starboy!.id,
      name: 'Party Monster',
      time: '4:17',
      trackNumber: 2,
    },
    {
      album_id: starboy!.id,
      name: 'True Colors',
      time: '3:26',
      trackNumber: 3,
    },
    {
      album_id: starboy!.id,
      name: 'Die For You',
      time: '3:53',
      trackNumber: 4,
    },
    {
      album_id: starboy!.id,
      name: 'A Lonely Night',
      time: '3:40',
      trackNumber: 5,
    },

    {
      album_id: the_highlights!.id,
      name: 'Starboy',
      time: '4:33',
      trackNumber: 1,
    },
    {
      album_id: the_highlights!.id,
      name: 'Often',
      time: '4:09',
      trackNumber: 2,
    },
    {
      album_id: the_highlights!.id,
      name: 'Die For You',
      time: '3:53',
      trackNumber: 3,
    },
    {
      album_id: the_highlights!.id,
      name: 'Blinding Lights',
      time: '2:26',
      trackNumber: 4,
    },
    {
      album_id: the_highlights!.id,
      name: 'Heartless',
      time: '4:09',
      trackNumber: 5,
    },
  ]);
};

run().catch((error) => console.error(error));
