import express from 'express';

import createPlaylist from './createPlaylist.js';
import getAllPlaylists from './getAllPlaylists.js';
import getPlaylistById from './getPlaylistById.js';
import updatePlaylist from './updatePlaylist.js';
import deletePlaylist from './deletePlaylist.js';

const PlaylistRouter = express.Router();

PlaylistRouter.post('/', createPlaylist);
PlaylistRouter.get('/', getAllPlaylists);
PlaylistRouter.get('/:id', getPlaylistById);
PlaylistRouter.put('/:id', updatePlaylist);
PlaylistRouter.delete('/:id', deletePlaylist);

export default PlaylistRouter;
