import {Amplify} from 'aws-amplify'
import config from '../aws-exports'
import '../app/globals.css'

Amplify.configure({ ...config, ssr: true })

function MyApp({Component, pageProps}) {
    return <Component {...pageProps}/>
}

export default MyApp