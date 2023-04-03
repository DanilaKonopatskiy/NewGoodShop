import { mockData } from "./mock.data";

export const getMockData = (ms) => async (route) => {
    const promise = new Promise((res, reg) => {
        setTimeout(() => {
            if (route in mockData) res(mockData[route]);
            else reg('No such route');
        }, ms);
    });

    const data = await promise;
    return data;
};

const getCategories = getMockData(2000);

getCategories(ROUTES.GET_CATEGORIES);