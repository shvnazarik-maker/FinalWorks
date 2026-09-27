import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Photos from '../pages/Photos';
import Friends from '../pages/Friends';
import Music from '../pages/Music';
import Notes from '../pages/Notes';
import Messages from '../pages/Messages';

const pageNavigate = (navigate) => page => navigate(`/${page}`);

function HomeRoute({ user }) { const navigate = useNavigate(); return <Home user={user} navigate={pageNavigate(navigate)} />; }
function FriendProfileRoute({ friend, onMessage }) { const navigate = useNavigate(); return <Profile user={friend} isOwnProfile={false} onMessage={onMessage} onBack={() => navigate('/friends')} />; }
function MessagesRoute(props) { return <Messages {...props} />; }
function AppRoutes({ user, selectedProfile, selectedMessageFriendId, photos, setPhotos, friends, addedFriendIds, onToggleFriend, onOpenProfile, musicProps, messagesProps, notes, setNotes, setUser, onMessage }) {
  const navigate = useNavigate();
  return <Routes>
    <Route path="/" element={<HomeRoute user={user} />} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/profile" element={<Profile user={user} setUser={setUser} isOwnProfile />} />
    <Route path="/friends" element={<Friends friends={friends} addedFriendIds={addedFriendIds} onToggleFriend={onToggleFriend} onOpenProfile={onOpenProfile} />} />
    <Route path="/friends/:friendId" element={<FriendProfileParam friend={selectedProfile} onMessage={onMessage} friends={friends} />} />
    <Route path="/photos" element={<Photos photos={photos} setPhotos={setPhotos} />} />
    <Route path="/music" element={<Music {...musicProps} />} />
    <Route path="/messages" element={<MessagesRoute {...messagesProps} initialFriendId={selectedMessageFriendId} />} />
    <Route path="/notes" element={<Notes notes={notes} setNotes={setNotes} />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

function FriendProfileParam({ friend, friends, onMessage }) {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const selected = friends.find(item => String(item.id) === friendId) ?? friend;
  if (!selected) return <Navigate to="/friends" replace />;
  return <Profile user={selected} isOwnProfile={false} onMessage={() => onMessage(selected.id)} onBack={() => navigate('/friends')} />;
}

export default AppRoutes;
