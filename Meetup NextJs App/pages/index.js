import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import React from "react";

/* const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tokyo_Tower_and_around_Skyscrapers.jpg/1208px-Tokyo_Tower_and_around_Skyscrapers.jpg",
    address: "tokyo street 123",
    description: "tokyo tower",
  },
  {
    id: "m2",
    title: "second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tokyo_Tower_and_around_Skyscrapers.jpg/1208px-Tokyo_Tower_and_around_Skyscrapers.jpg",
    address: "tokyo avenue 789",
    description: "tokyo tower again",
  },
]; */

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Meetups App</title>
        <meta name="description" content="See all your meetups here." />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Learner:<password>@cluster0.f9fv4pp.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 2,
  };
}

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export default HomePage;
