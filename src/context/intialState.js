import { fetchUser } from "../utils/fetchLocalStorageData"

const userInfo = fetchUser();

export const intialState = {
    user: userInfo,
}