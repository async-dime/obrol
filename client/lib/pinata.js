import axios from 'axios'

const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_API_SECRET

export const pinJSONToIPFS = async (json) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

  return axios
    .post(url, json, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then((response) => {
      return response.data.IpfsHash
    })
    .catch((error) => {
      console.log(error)
    })
}

export const pinFileToIpfs = async (file, pinataMetadata) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

  let data = new FormData()

  data.append('file', file)
  data.append('pinataMetadata', JSON.stringify(pinataMetadata))

  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then((response) => {
      return response.data.IpfsHash
    })
    .catch((error) => {
      console.log(error)
    })
}
