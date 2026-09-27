import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useAudioPlayer(tracks) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentTrack = useMemo(() => tracks[currentIndex] ?? null, [tracks, currentIndex]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    try {
      if (audio.paused) await audio.play(); else audio.pause();
    } catch (error) {
      console.error('Помилка відтворення:', error);
      setIsPlaying(false);
    }
  }, [currentTrack]);

  const nextSong = useCallback(() => {
    if (tracks.length <= 1) return;
    setCurrentIndex(index => index >= tracks.length - 1 ? 0 : index + 1);
  }, [tracks.length]);

  const previousSong = useCallback(() => {
    if (tracks.length <= 1) return;
    setCurrentIndex(index => index === 0 ? tracks.length - 1 : index - 1);
  }, [tracks.length]);

  useEffect(() => {
    if (currentIndex >= tracks.length && tracks.length) setCurrentIndex(tracks.length - 1);
    if (!tracks.length) setCurrentIndex(0);
  }, [tracks.length, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentTrack) {
      audio.pause(); audio.removeAttribute('src'); audio.load(); setIsPlaying(false); setCurrentTime(0); setDuration(0); return;
    }
    const wasPlaying = !audio.paused;
    audio.pause(); audio.src = currentTrack.url; audio.load(); setCurrentTime(0); setDuration(0);
    if (wasPlaying) audio.play().catch(() => setIsPlaying(false));
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMetadata = () => { if (Number.isFinite(audio.duration)) setDuration(audio.duration); };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => tracks.length > 1 ? nextSong() : setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime); audio.addEventListener('loadedmetadata', onMetadata);
    audio.addEventListener('play', onPlay); audio.addEventListener('pause', onPause); audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMetadata);
      audio.removeEventListener('play', onPlay); audio.removeEventListener('pause', onPause); audio.removeEventListener('ended', onEnded);
    };
  }, [tracks.length, nextSong]);

  const changeProgress = useCallback(event => {
    const value = Number(event.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = value; setCurrentTime(value);
  }, []);

  return { audioRef, currentIndex, setCurrentIndex, currentTrack, isPlaying, togglePlay, nextSong, previousSong, currentTime, duration, changeProgress };
}

