import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';


function HomePage(props){

    return(
         <Fragment>
               <Head>
        <title>React meetups</title>
        <meta name ="description"
         content='Browse a huge list of highly active react meetups'
         />
    </Head>
             <MeetupList meetups={props.meetups}/>
         </Fragment>
    )
}


export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://pappi3103:Lwymmd@cluster0.a6ey8xz.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()
  client.close()
return{
    props: {
        meetups: meetups.map(meetup=>({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString()
        }))
    },
    revalidate: 10
}
}





export default HomePage
