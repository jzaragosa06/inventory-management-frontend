export const UserRole = {
    ADMIN: 'admin',
    AUDITOR: 'auditor',
    USER: 'user'
};

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    return user;
}

export const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || null;
};

export const hasRole = (requiredRoles) => {
    const userRole = getUserRole();
    return requiredRoles.includes(userRole);
};