import { apiSlice } from "./api-slice";
const USERS_URL = "/users";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data
            })
        }),
    })
});

export const { useLoginMutation } = usersApiSlice;



