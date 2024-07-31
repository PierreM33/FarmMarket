/**
 * Update user
 */

export const setUserData = (token, user, userId) => ({
    type: 'SET_USER_DATA',
    payload: { token, user, userId }
});

/**
 * DISCONNECT
 */
export const logout = () => ({
    type: 'LOGOUT',
});
