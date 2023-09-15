import { Storage } from "aws-amplify"

function Test() {
    async function getFileUrls() {
        const files = await Storage.get('')
        console.log(files)
      }

      getFileUrls()
    return <h1></h1>
}

export default Test