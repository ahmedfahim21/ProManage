import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {API_URL} from "../utils/env";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL+'api' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
    })
});

        

