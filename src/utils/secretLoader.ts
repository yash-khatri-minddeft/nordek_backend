import axios from 'axios';

export async function secretLoader() {
  // you can use doppler to store your private key rather then in .env
  // const res = await axios.get(
  //   `https://${process.env.DOPPLER_KEY}@api.doppler.com/v3/configs/config/secrets/download?format=json`,
  // );
  // process.env.PRIVATE_KEY = res.data.PRIVATE_KEY;
}
