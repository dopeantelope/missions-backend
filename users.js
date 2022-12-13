const users = []

const addUser = (id, username, room) => {
    const existingUser = users.find(user => user.username.trim().toLowerCase() === username.trim().toLowerCase())

    if (existingUser) return { error: "Username has already been taken" }
    if (!username && !room) return { error: "Username and room are required" }
    if (!username) return { error: "Username is required" }
    if (!room) return { error: "Room is required" }

    const user = { id, username, room }
    console
    users.push(user)
    return { user }
}

const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUsers = (room) => users.filter(user => user.room === room)

module.exports = { addUser, getUser, deleteUser, getUsers }