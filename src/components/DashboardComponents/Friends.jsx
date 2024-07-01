import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box, IconButton,Divider  } from '@mui/material';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { fetchFriends, sendFriendRequest, deleteFriend, fetchIncomingRequests, fetchOutgoingRequests, acceptFriendRequest, declineFriendRequest } from '../../utils/api';
import { toast } from 'sonner';

const Friends = () => {
    const [friendEmail, setFriendEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);

    const fetchFriendsData = async () => {
        try {
            setLoading(true);
            const response = await fetchFriends();
            const friendsData = response.data;
            setFriends(friendsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching friends:', error);
            setFriends([]);
            setLoading(false);
        }
    };

    const fetchRequestsData = async () => {
        try {
            const incomingResponse = await fetchIncomingRequests();
            const outgoingResponse = await fetchOutgoingRequests();
            setIncomingRequests(incomingResponse.data);
            setOutgoingRequests(outgoingResponse.data);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            setIncomingRequests([]);
            setOutgoingRequests([]);
        }
    };

    useEffect(() => {
        fetchFriendsData();
        fetchRequestsData();
    }, []);

    const handleFriendEmailChange = (e) => {
        setFriendEmail(e.target.value);
    };

    const handleFriendRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await sendFriendRequest({ email: friendEmail });
            if (response.status === 201) {
                setFriendEmail('');
                fetchRequestsData(); // Refresh friend requests after adding a new friend request
            }
            
        } catch (error) {
            console.error('Error sending friend request:', error);
       }
    };

    const handleDeleteFriend = async (friendId) => {
        try {
            const response = await deleteFriend({ id: friendId });
            if (response.status === 200) {
                fetchRequestsData();
                fetchFriendsData();
            }
        } catch (error) {
            console.error('Error deleting friend:', error);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            console.log(requestId);
            const response = await acceptFriendRequest({ id: requestId });
            if (response.status === 201) {
                fetchRequestsData();
                fetchFriendsData();
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDeclineRequest = async (requestId) => {
        try {
            const response = await declineFriendRequest({ id: requestId });
            if (response.status === 200) {
                fetchRequestsData();
            }
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", overflowY: "auto" }} className=''>
            <Typography variant="h6" gutterBottom>
                Add Friends
                </Typography>
            <form onSubmit={handleFriendRequest}>
                <Grid item xs={12} sx={{ pb: 2 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={friendEmail}
                        onChange={handleFriendEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Send Friend Request
                    </Button>
                </Grid>
            </form>

            <Divider sx={{ mt: 4, mb: 4, backgroundColor: '#ffffff' }} />

            <Grid item xs={12} sx={{pb:2}}>
                <Typography variant="h6" gutterBottom>
                    Friends
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    }}
                >   
                {console.log(friends)}
                    {friends.map((friend) => (
                        <Box key={friend.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, color: "#000000", pb: 2, pt: 2, borderRadius: 4, width: "100%", backgroundColor: "white" }}>
                            <Typography sx={{ px: 3 }} variant="h6" fontWeight="bold" color="#000000">
                                {friend.firstName} {friend.lastName}
                            </Typography>
                            <IconButton onClick={() => handleDeleteFriend(friend.id)} sx={{ px: 3 }}>
                                <PersonRemoveOutlinedIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Grid>

            <Divider sx={{ mt: 4, mb: 4, backgroundColor: '#ffffff' }} />

            <Grid container spacing={2} sx={{ mt: 4, justifyContent: "space-between" }}>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#00df98" }}>
                        Incoming Friend Requests
                    </Typography>
                    <Box sx={{ border: '1px solid #00df98',
                            borderRadius: 2,}}>
                            <Box
                        sx={{
                           
                            p: 2,
                            height: 200,
                            //overflowY: 'scroll'
                        }}
                        className="overflow-y-scroll smooth-scroll"
                    >
                        {incomingRequests.map((request) => (
                            <Box key={request.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1,  border: '1px solid #a6a6a6',color: 'white', borderRadius: 2, p: 1,transition: 'border-color 0.5s', '&:hover': { borderColor: '#ffffff'} }}>
                                <Typography variant="body1" sx={{ fontWeight: 'thin' }}>
                                    {request.email}
                                </Typography>
                                <Box>
                                    <Button variant="outlined" color="primary" onClick={() => handleAcceptRequest(request.requestId)} sx={{ mr: 1 }}>
                                        Accept
                                    </Button>
                                    <Button variant="outlined"  onClick={() => handleDeclineRequest(request.requestId)}>
                                        Decline
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    </Box>
                    
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#00df98" }}>
                        Outgoing Friend Requests
                    </Typography>
                    <Box
                        sx={{
                            border: '1px solid #00df98',
                            
                            borderRadius: 2,
                            p: 2,
                            height: 200,
                            overflowY: 'scroll'
                        }}
                    >
                        {outgoingRequests.map((request) => (
                            <Box key={request.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1,  border: '1px solid #a6a6a6',color: 'white', borderRadius: 2, p: 1,py:1.75,transition: 'border-color 0.5s', '&:hover': { borderColor: '#ffffff'} }}>
                            <Typography variant="body1" sx={{ fontWeight: 'thin' }}>
                                    {request.email}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Friends;
