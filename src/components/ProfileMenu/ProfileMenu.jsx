import React from 'react'
import { Avatar, Menu } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const ProfileMenu = ({ user, logout }) => {
    const navigate = useNavigate()

    // Dummy user data (replace with API response)
    const dummyUser = {
        picture: "https://via.placeholder.com/150", // Example profile image
        name: "John Doe"
    };

    return (
        <Menu>
            <Menu.Target>
                <Avatar src={user?.picture || dummyUser.picture} alt='user image' radius={"xl"} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
                    Favourites
                </Menu.Item>

                <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
                    Bookings
                </Menu.Item>

                <Menu.Item onClick={() => {
                    localStorage.clear();
                    logout()
                }}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ProfileMenu
