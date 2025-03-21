import PlaylistModel from "../db/models/playlistModel"
import { Playlist, PlaylistItem } from "../entities/Playlist"
import { INTERNAL_RESPONSE, ServiceResponse } from "../utils"

export const listPlaylists = async (userId: string): Promise<ServiceResponse> => {
  try {
    const list = await PlaylistModel.find({ userId })
    return {
      ok: true,
      message: "",
      data: list
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const findPlaylist = async (id: string, userId: string): Promise<ServiceResponse> => {
  try {
    const found = await PlaylistModel.findOne({ _id: id, userId })
    return {
      ok: true,
      message: "",
      data: found
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const createPlaylist = async (item: Playlist, userId: number): Promise<ServiceResponse> => {
  try {
    const newPlaylist = new PlaylistModel({
      name: item.name,
      items: item.items,
      userId
    })

    const saved = await newPlaylist.save()
    const success = saved !== null

    return {
      ok: success,
      message: success ? `Playlist created` : "Unable to create playlist",
      data: success ? saved : null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const deletePlaylist = async (id: string, userId: string): Promise<ServiceResponse> => {
  try {
    const result = await PlaylistModel.deleteOne({ _id: id, userId })
    const success = result.deletedCount === 1

    return {
      ok: success,
      message: success ? `PLaylist deleted` : "Unable to delete",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const changeName = async (name: string, id: string, userId: string): Promise<ServiceResponse> => {
  try {
    const result = await PlaylistModel.updateOne({ _id: id, userId }, { name })
    const success = result.modifiedCount === 1

    return {
      ok: success,
      message: success ? `Playlist name changed` : "Unable to change name",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const cleanPlaylist = async (id: string, userId: string): Promise<ServiceResponse> => {
  try {
    const result = await PlaylistModel.updateOne({ _id: id, userId }, { items: [] })
    const success = result.modifiedCount === 1

    return {
      ok: success,
      message: success ? `PLaylist cleaned` : "Unable to clean",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const addItemToPlaylist = async (playlistId: string, item: PlaylistItem, userId: string): Promise<ServiceResponse> => {
  try {
    const found = await PlaylistModel.findOne({ _id: playlistId, userId })
    if (found === null)
      return {
        ok: false,
        message: "Unable to add item",
        data: null
      }
    
    const result = await PlaylistModel.updateOne({ _id: playlistId }, { items: [...found.items, item] })
    const success = result.modifiedCount === 1

    return {
      ok: success,
      message: success ? `Item added to playlist ${found.name}` : "Unable to add item",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const removeItemFromPlaylist = async (playlistId: string, itemId: string, userId: string): Promise<ServiceResponse> => {
  try {
    const found = await PlaylistModel.findOne({ _id: playlistId, userId })
    if (found === null || !found.items.some(i => i._id.toString("hex") === itemId))
      return {
        ok: false,
        message: "Unable to remove item",
        data: null
      }

    const filtered = found.items.filter(i => i._id.toString("hex") !== itemId)
    const result = await PlaylistModel.updateOne({ _id: playlistId }, { items: filtered })
    const success = result.modifiedCount === 1

    return {
      ok: success,
      message: success ? `Item removed` : "Unable to remove item",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}