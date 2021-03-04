import dotenv from 'dotenv'

dotenv.config();

export const BACKEND_URL=process.env.NODE_ENV === 'development'?"/retrievestats":"https://nopeelstats.herokuapp.com/retrievestats"