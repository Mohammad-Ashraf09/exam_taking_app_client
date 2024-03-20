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

// export const util = {
//     isMobile: mobileDevice(),

//     isTablet: tabletDevice(),

//     isMobileDevice: () => {
//         return util.isMobile || util.isTablet;
//     },

//     convertObjectToArray: (objectItem) => {
//         return cloneDeep(Object.values(objectItem)) || [];
//     },

//     deleteObjectKeys: (obj, keys) => {
//         keys.forEach((key) => delete obj?.[key]);
//     },
// }