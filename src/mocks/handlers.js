import { rest } from "msw";

const baseURL = 'https://api-cadius.herokuapp.com/';


export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`,(req, res, ctx) => {
        return res(ctx.json({
            "pk":1,
            "username":"tinytim",
            "email":"",
            "first_name":"",
            "last_name":"",
            "profile_id":1,
            "profile_image":"https://res.cloudinary.com/dh23xgunw/image/upload/v1/media/../default_profile_u9bikl",
        }));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
]