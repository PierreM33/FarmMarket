/**
 * Set state
 * @param {object} data The state data
 */
export const setState = (data) => {
    return {
        type: "SET_STATE",
        data,
    };
};
