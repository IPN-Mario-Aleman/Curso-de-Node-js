import cors from 'cors';

const ACCEPTED_ORIGINS = [
        'localhost:8080',
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'http://localhost:3000',
        'http://000000000:3000',
]

export const middlewareCors = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
    cors({
        origin: (origin, callback) => {
            if(acceptedOrigins.includes(origin) || !origin) {
                return callback(null, true)
            }
            
            return callback(new Error('Origin not allowed'))
        }
    })
