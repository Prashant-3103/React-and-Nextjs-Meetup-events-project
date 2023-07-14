import {MongoClient} from 'mongodb'

async function handler(req, res){
if(req.method==='POST'){
    const data = req.body

    const{title, image, address, escription} = data;
    const client = await MongoClient.connect('mongodb+srv://pappi3103:Lwymmd@cluster0.a6ey8xz.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
  const result = await  meetupsCollection.insertOne(data)

  console.log(result)
  client.close()

  res.status(201).json({message: "meetup inserted"})
}
}

export default handler
