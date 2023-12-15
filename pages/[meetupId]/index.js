import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@cluster0.xkrycyt.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  //filter, which fields
  //csak az id, semmi más
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup

  const meetupId = context.params.meetupId; //url-ben lévő params

  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@cluster0.xkrycyt.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title.toString(),
        address: selectedMeetup.address.toString(),
        image: selectedMeetup.image.toString(),
        description: selectedMeetup.description.toString(),
      },
      /* JSON.parse(JSON.stringify(selectedMeetup)) */
    },
  };
}

export default MeetupDetails;
