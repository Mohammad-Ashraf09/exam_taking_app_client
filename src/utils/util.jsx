// import { UAParser } from 'ua-parser-js';
// import cloneDeep from 'lodash.clonedeep';


// const mobileDevice = () => {
//     const userAgentParser = new UAParser();
//     return userAgentParser.getDevice().type === 'mobile';
// };

// const tabletDevice = () => {
//     const userAgentParser = new UAParser();
//     return userAgentParser.getDevice().type === 'tablet';
// };

export const util = {
    // isMobile: mobileDevice(),

    // isTablet: tabletDevice(),

    // isMobileDevice: () => {
    //     return util.isMobile || util.isTablet;
    // },

    // convertObjectToArray: (objectItem) => {
    //     return cloneDeep(Object.values(objectItem)) || [];
    // },

    // deleteObjectKeys: (obj, keys) => {
    //     keys.forEach((key) => delete obj?.[key]);
    // },

    getFormattedDate: (stringDate) => {
        const dateObject = new Date(stringDate);
        const date = dateObject.getDate()<10 ? '0'+dateObject.getDate() : dateObject.getDate();
        const month = dateObject.getMonth()+1<10 ? '0'+(dateObject.getMonth()+1) : dateObject.getMonth()+1;
        const year = dateObject.getFullYear();
        const hr = dateObject.getHours()<10 ? '0'+dateObject.getHours() : dateObject.getHours();
        const min = dateObject.getMinutes()<10 ? '0'+dateObject.getMinutes() : dateObject.getMinutes();

        const formattedDate = `${date}-${month}-${year} ${hr}:${min}`;
        return formattedDate;
    }
}