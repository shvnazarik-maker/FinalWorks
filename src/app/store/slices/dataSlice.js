import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../../services/storage';
import { normalizeUserImage } from '../../../services/api/imageUrl';

const defaultUser = {
  firstName: 'Швець', lastName: 'Назар', birthDate: '12.10.1989', birthPlace: 'Львів',
  country: 'Україна', city: 'Львів', phone: '+380 95 030 11 45', email: 'shvnazarik@gmail.com',
  photo: null, about: 'Люблю музику, фотографію та спілкування з друзями.',
};

const defaultFriends = [
  ['Aftin','Dumanden','AD',true,'18.02.1991','Київ','Україна','Київ','Люблю подорожі, спорт та нові знайомства.'],
  ['Craus','Osteper','CO',true,'11.06.1989','Львів','Україна','Львів','Цікавлюся музикою та фотографією.'],
  ['Lobies','Tersen','LT',false,'25.09.1993','Одеса','Україна','Одеса','Люблю море, подорожі та спорт.'],
  ['Qest','Elban','QE',false,'07.01.1990','Харків','Україна','Харків','Захоплююся технологіями та книгами.'],
  ['Krocus','Speners','KS',true,'16.12.1992','Дніпро','Україна','Дніпро','Люблю автомобілі, музику та кіно.'],
  ['Grenis','Deften','GD',false,'03.04.1995','Київ','Україна','Київ','Цікавлюся дизайном та мистецтвом.'],
].map(([firstName,lastName,initials,online,birthDate,birthPlace,country,city,about], i) => ({
  id:i+1, firstName,lastName,name:`${firstName} ${lastName}`,initials,online,lastMessage:'',birthDate,birthPlace,country,city,phone:'',email:'',photo:null,about,
}));

const defaultMessages = [
  { id:1, friendId:1, from:'friend', text:'Привіт! Як твої справи?', time:'14:20' },
  { id:2, friendId:1, from:'me', text:'Привіт! Все добре 😊 А твої?', time:'14:22' },
  { id:3, friendId:1, from:'friend', text:'У мене теж все чудово!', time:'14:24' },
  { id:4, friendId:2, from:'friend', text:'Привіт 👋', time:'13:10' },
];

const savedUser = storage.read(
  'myfriends_user',
  null,
  value => value && typeof value === 'object'
);

const normalizeSavedUser = user => {
  if (!user) return user;

  const normalizedImage = normalizeUserImage(user.image ?? user.photo);

  return {
    ...user,
    image: normalizedImage,
    photo: normalizedImage,
  };
};

const initialState = {
  user: savedUser ? { ...defaultUser, ...normalizeSavedUser(savedUser) } : defaultUser,
  friends: defaultFriends,
  addedFriendIds: storage.read('myfriends_added', [], Array.isArray),
  photos: storage.read('myPhotos', [], Array.isArray),
  
  music: [],
  notes: storage.read('myfriends_notes', [{ id:1,text:'Моя перша нотатка' }], Array.isArray),
  messages: storage.read('myfriends_messages', defaultMessages, Array.isArray),
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUser(state, action) { state.user = { ...state.user, ...action.payload }; },
    setPhotos(state, action) { state.photos = action.payload; },
    setMusic(state, action) { state.music = action.payload; },
    setNotes(state, action) { state.notes = action.payload; },
    setMessages(state, action) { state.messages = action.payload; },
    toggleFriend(state, action) {
      const id = action.payload;
      state.addedFriendIds = state.addedFriendIds.includes(id)
        ? state.addedFriendIds.filter(friendId => friendId !== id)
        : [...state.addedFriendIds, id];
    },
    addMessage(state, action) { state.messages.push(action.payload); },
  },
});

export const { setUser, setPhotos, setMusic, setNotes, setMessages, toggleFriend, addMessage } = dataSlice.actions;
export const persistedDataActions = new Set([
  setUser.type, setPhotos.type, setMusic.type, setNotes.type, setMessages.type, toggleFriend.type, addMessage.type,
]);
export default dataSlice.reducer;
