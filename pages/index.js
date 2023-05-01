import React from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '@/components/meetups/MeetupList';
const Dummy_Meeetup_data = [
  {
    id: '1',
    title: 'hii',
    image: 'https://omnifood-narsingh.netlify.app/img/hero.png',
    discription: 'this is first hyy from my side',
  },
  {
    id: '2',
    title: 'Second meet',
    image: 'https://omnifood-narsingh.netlify.app/img/hero.png',
    discription: 'this is first hyy from my side',
  },
  {
    id: '3',
    title: 'Third  meet',
    image: 'https://omnifood-narsingh.netlify.app/img/hero.png',
    discription: 'this is first hyy from my side',
  },
  {
    id: '4',
    title: 'hii',
    image: 'https://omnifood-narsingh.netlify.app/img/hero.png',
    discription: 'this is first hyy from my side',
  },
];
const HomePage = (props) => {
  return (
    <>
    <Head>
      <title>Company Meetups</title>
      <meta name='description' content=' Company meetup List for our company add and SHedule meetup' />
    </Head>
    <MeetupList meetups={props.meetups} />
    </>
    
  );
};

export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    'mongodb+srv://Narsingh:12345@cluster0.ytyp2wc.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetup');
  const meetupList = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetupList.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate:1,
  };
}

export default HomePage;
