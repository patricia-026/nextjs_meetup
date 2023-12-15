import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

/*const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
    address: "Some address 5, 1212 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "Second",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
    address: "Some address 10, 1232 Some City",
    description: "This is a second meetup",
  },
];*/

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req; //authnál, vagy ha check some session cookie
//   const res = context.res;

//   //fetch data from an api....
//   return {
//     props: DUMMY_MEETUPS,
//   };
// }

export async function getStaticProps() {
  //fetch data from an API/database/read data from some filesystem

  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@cluster0.xkrycyt.mongodb.net/?retryWrites=true&w=majority"
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
    revalidate: 1,
  };
}

export default HomePage;
