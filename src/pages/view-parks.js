import Head from 'next/head'
import { withSSRContext } from 'aws-amplify'
import { listParks } from '../graphql/queries'
import { AmplifyS3Image } from '@aws-amplify/ui-react-v1'
import { Storage } from 'aws-amplify'
import Link from 'next/link'

export async function getServerSideProps () {
  const SSR = withSSRContext()
  const { data } = await SSR.API.graphql({ query: listParks })
  const parks = data.listParks.items;
  for(let i=0; i<parks.length; i++){
    const url = await Storage.get(parks[i].image.key);
    
    parks[i].url = url;
  }
  return {
    props: {
      parks: parks
    }
  }
}

export default function Home ({ parks }) {
    console.log(parks)
  return (
    <div>
      <div className='container'>
        <h1>National Parks <Link href='/create-park'>(+)</Link></h1>
        <div className='img-grid'>
            {parks.map(park => {
                
               
                return (
                    <div key={park.id} className='img-square'>
                        <h2>{park.name}</h2>
                        <img src={park.url}/>
                    </div>
                    )
            })}
        </div>
      </div>
    </div>
  )
}