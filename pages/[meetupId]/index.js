import MeetupItemDetails from '@/components/meetups/MeetupItemDetails';
import Head from 'next/head';
import { MongoClient,ObjectId } from 'mongodb';
const MettupitemDetails = (props) => {
  return (
    <>
    <Head>
      <title>{props.meetupDetails.title}</title>
      <meta name='description' content={props.meetupDetails.discription} />
    </Head>
    <MeetupItemDetails props={props} />
    </>
     
   
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://Narsingh:12345@cluster0.ytyp2wc.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetup');
  const meetup_Id = await meetupCollection.find({},{_id:1}).toArray();
  
  
  
  return {
    fallback: false,
    paths: meetup_Id.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // paths:[{
    //   params:{meetupId:'1'}
    // }]
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
      
  const client = await MongoClient.connect(
    'mongodb+srv://Narsingh:12345@cluster0.ytyp2wc.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetup');
  const meetupSelection = await meetupCollection.findOne({_id:new ObjectId(meetupId)})

  return {
    props: {
      meetupDetails: {
        image: meetupSelection.image,
        id: meetupSelection._id.toString(),
        title: meetupSelection.title,
      
        address:meetupSelection.address,
        discription: meetupSelection.description,
      },
    },
  };
}

export default MettupitemDetails;
