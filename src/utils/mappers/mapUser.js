function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const mapMember = function (member) {
    const user = { ...member.user };
    user.fullName = `${member.user.name} ${member.user.surname}`;

    if (!user.fullName.trim()) {
        user.fullName = member.user.name || member.user.surname || member.user.email;
    }

    const [first, second] = user.fullName.split(" ").map((u) => u[0].toUpperCase());
    if (first && second) {
        user.initials = `${first}.${second}.`;
    } else {
        user.initials = capitalizeFirstLetter(user.fullName.slice(0, 2));
    }

    return { user, role: member.role };
};

export const mapUser = function (u) {
    const user = { ...u };
    user.fullName = `${u.name} ${u.surname}`;

    if (!user.fullName.trim()) {
        user.fullName = u.name || u.surname || u.email;
    }

    const [first, second] = user.fullName.split(" ").map((u) => u[0].toUpperCase());
    if (first && second) {
        user.initials = `${first}.${second}.`;
    } else {
        user.initials = capitalizeFirstLetter(user.fullName.slice(0, 2));
    }
    
    return user;
};
