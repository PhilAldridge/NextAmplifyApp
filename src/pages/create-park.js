import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { API, Storage} from 'aws-amplify'
import { createPark } from '../graphql/mutations'
import config from '../aws-exports'

function CreatePark () {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImage = await Storage.put(image.name, image)
    console.log(uploadedImage)

    const newPark = await API.graphql({
      query: createPark,
      variables: {
        input: {
          name,
          image: {
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key
          }
        }
      }
    })
    console.log(newPark)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Park</h2>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' onChange={e => setName(e.target.value)} />
      <label htmlFor='image'>Image</label>
      <input type='file' id='image' onChange={e => setImage(e.target.files[0])} />
      <input type='submit' value='create' />
    </form>
  )
}

export default withAuthenticator(CreatePark)