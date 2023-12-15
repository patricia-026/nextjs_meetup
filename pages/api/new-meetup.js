import { MongoClient } from "mongodb";

//api/new-meetup
//ONLY POST

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      //ez soha nem futhat client oldalon, de ez a fv nem is fog ott futni
      "mongodb+srv://admin:pass123@cluster0.xkrycyt.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    //ez a meetups más is lehet mint a fenti
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    //ezeket mind try-catch-be ha valami error van

    console.log(result);

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler();
