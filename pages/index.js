import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
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
];

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
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}

export default HomePage;
