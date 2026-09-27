import { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import AppRoutes from './routes/AppRoutes';
import { login, logout } from './app/store/slices/authSlice';
import { authService } from './services/authService';
import { selectIsLoggedIn, selectUser, selectFriends, selectAddedFriendIds, selectPhotos, selectMusic, selectNotes, selectMessages, selectUi } from './app/store/selectors';
import { setPhotos, setMusic, setNotes, setMessages, setUser, toggleFriend } from './app/store/slices/dataSlice';
import { setSidebarOpen, setSelectedProfile, setSelectedMessageFriendId, clearSelectedProfile } from './app/store/slices/uiSlice';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { musicApi } from './services/api/musicApi';

function Shell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const addedFriendIds = useSelector(selectAddedFriendIds);
  const photos = useSelector(selectPhotos);
  const music = useSelector(selectMusic);
  const notes = useSelector(selectNotes);
  const messages = useSelector(selectMessages);
  const { sidebarOpen, selectedProfile, selectedMessageFriendId } = useSelector(selectUi);
  const audio = useAudioPlayer(music);

  useEffect(() => {
    if (!isLoggedIn) return;

    let cancelled = false;
    const hydrateCurrentUser = async () => {
      const currentUser = await authService.getCurrentUser();
      if (!cancelled && currentUser) dispatch(setUser(currentUser));
    };

    hydrateCurrentUser();
    return () => { cancelled = true; };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setMusic([]));
      return;
    }

    let cancelled = false;

    const loadMusic = async () => {
      try {
        const tracks = await musicApi.getAll();
        if (!cancelled) dispatch(setMusic(tracks.filter(track => track.url)));
      } catch (error) {
        console.error('Не вдалося завантажити музику:', error);
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message ||
            'Не вдалося завантажити музику з сервера.'
          );
        }
      }
    };

    loadMusic();

    return () => {
      cancelled = true;
    };
  }, [dispatch, isLoggedIn]);

  const currentPage = useMemo(() => {
    const path = location.pathname.split('/')[1];
    if (path === 'friends' && location.pathname !== '/friends') return 'friend-profile';
    return path || 'home';
  }, [location.pathname]);

  const goTo = useCallback((page) => {
    const path = page === 'home' ? '/' : `/${page}`;
    dispatch(setSidebarOpen(false));
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, navigate]);

  const openProfile = useCallback((friend) => {
    if (!friend) return;
    dispatch(setSelectedProfile(friend));
    dispatch(setSidebarOpen(false));
    navigate(`/friends/${friend.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, navigate]);

  const openFriendMessages = useCallback((friendId) => {
    if (friendId === undefined || friendId === null) return;
    dispatch(setSelectedMessageFriendId(friendId));
    dispatch(setSidebarOpen(false));
    navigate('/messages');
  }, [dispatch, navigate]);

  const handleLogin = useCallback(async ({ email, password }) => {
    const result = await authService.login({ email, password });
    if (!result.success) return result;

    if (result.user) dispatch(setUser(result.user));
    dispatch(login());
    navigate('/');
    return { success: true };
  }, [dispatch, navigate]);

  const handleRegister = useCallback(async ({ firstName, lastName, email, password }) => {
    const result = await authService.register({ firstName, lastName, email, password });
    if (!result.success) return result;

    if (result.user) dispatch(setUser(result.user));
    dispatch(login());
    navigate('/');
    return { success: true };
  }, [dispatch, navigate]);

  const handleLogout = useCallback(() => {
    authService.logout();
    dispatch(logout());
    dispatch(setSidebarOpen(false));
    dispatch(clearSelectedProfile());
    navigate('/');
    toast.info('Ви вийшли з акаунта.');
  }, [dispatch, navigate]);

  const deleteMusic = useCallback(async (id) => {
    const deletedIndex = music.findIndex(song => song.id === id);
    if (deletedIndex === -1) return;

    try {
      await musicApi.remove(id);

      const nextMusic = music.filter(song => song.id !== id);
      dispatch(setMusic(nextMusic));

      if (!nextMusic.length) {
        audio.setCurrentIndex(0);
        return;
      }

      if (deletedIndex < audio.currentIndex) {
        audio.setCurrentIndex(index => Math.max(0, index - 1));
      }

      if (audio.currentIndex >= nextMusic.length) {
        audio.setCurrentIndex(nextMusic.length - 1);
      }

      toast.success('Композицію видалено.');
    } catch (error) {
      console.error('Не вдалося видалити композицію:', error);
      toast.error(
        error?.response?.data?.message ||
        'Не вдалося видалити композицію з сервера.'
      );
    }
  }, [audio, dispatch, music]);

  const musicProps = useMemo(() => ({
    music, setMusic: value => dispatch(setMusic(typeof value === 'function' ? value(music) : value)),
    currentSong: audio.currentIndex, setCurrentSong: audio.setCurrentIndex, isPlaying: audio.isPlaying,
    togglePlay: audio.togglePlay, nextSong: audio.nextSong, previousSong: audio.previousSong,
    currentTime: audio.currentTime, duration: audio.duration, changeProgress: audio.changeProgress, onDelete: deleteMusic,
  }), [audio, deleteMusic, dispatch, music]);

  const messagesProps = useMemo(() => ({
    user, friends, messages, setMessages: value => dispatch(setMessages(typeof value === 'function' ? value(messages) : value)), onOpenProfile: openProfile,
  }), [dispatch, friends, messages, openProfile, user]);

  if (!isLoggedIn) {
    return (
      <>
        <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </>
    );
  }

  return (
    <>
      <Helmet><title>i&myFriends</title><meta name="description" content="i&myFriends — соціальна мережа" /></Helmet>
      <div className="w-[min(1200px,calc(100%-24px))] min-h-[calc(100vh-24px)] mx-auto my-3 border-[3px] border-purple rounded-[20px] bg-white overflow-hidden flex flex-col max-[900px]:w-full max-[900px]:min-h-screen max-[900px]:my-0 max-[900px]:border-x-0 max-[900px]:rounded-none">
      <Header onMenuClick={() => dispatch(setSidebarOpen(!sidebarOpen))} isLoggedIn={isLoggedIn} onLogout={handleLogout} music={music} currentSong={audio.currentIndex} isPlaying={audio.isPlaying} togglePlay={audio.togglePlay} nextSong={audio.nextSong} previousSong={audio.previousSong} currentTime={audio.currentTime} duration={audio.duration} changeProgress={audio.changeProgress} />
      <div className={`layout ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <Sidebar open={sidebarOpen} setOpen={value => dispatch(setSidebarOpen(value))} currentPage={currentPage} navigate={goTo} user={user} />
        <main className="main">
          <AppRoutes
            user={user} selectedProfile={selectedProfile} selectedMessageFriendId={selectedMessageFriendId}
            photos={photos} setPhotos={value => dispatch(setPhotos(typeof value === 'function' ? value(photos) : value))}
            friends={friends} addedFriendIds={addedFriendIds} onToggleFriend={id => dispatch(toggleFriend(id))} onOpenProfile={openProfile}
            musicProps={musicProps} messagesProps={messagesProps} notes={notes} setNotes={value => dispatch(setNotes(typeof value === 'function' ? value(notes) : value))}
            setUser={value => dispatch(setUser(typeof value === 'function' ? value(user) : value))}
            onMessage={openFriendMessages}
          />
        </main>
      </div>
      <audio ref={audio.audioRef} preload="metadata" />
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </>
  );
}

function AuthScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  return mode === 'login'
    ? <Login onLogin={onLogin} onRegister={() => setMode('register')} />
    : <Register onRegister={onRegister} onLogin={() => setMode('login')} />;
}

export default function App() {
  return <HelmetProvider><BrowserRouter><Shell /></BrowserRouter></HelmetProvider>;
}
