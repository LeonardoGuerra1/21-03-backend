import { ITEM_TYPES } from "../constants"
import FavoriteModel from "../db/models/favoriteModel"
import { Favorite } from "../entities/Favorite"
import { INTERNAL_RESPONSE, ServiceResponse } from "../utils"

export const listFavoritesTracks = async (userId: number): Promise<ServiceResponse>  => {
  try {
    const list = await FavoriteModel.find({ userId, type: ITEM_TYPES.TRACK })
    return {
      ok: true,
      message: "",
      data: list
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const listFavoritesAlbums = async (userId: number): Promise<ServiceResponse>  => {
  try {
    const list = await FavoriteModel.find({ userId, type: ITEM_TYPES.ALBUM })
    return {
      ok: true,
      message: "",
      data: list
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const listFavoritesArtists = async (userId: number): Promise<ServiceResponse>  => {
  try {
    const list = await FavoriteModel.find({ userId, type: ITEM_TYPES.ARTIST })
    return {
      ok: true,
      message: "",
      data: list
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const addItem = async (payload: Favorite, userId: number): Promise<ServiceResponse> => {
  try {
    const newFavorite = new FavoriteModel({
      ...payload,
      userId
    })
    const saved = await newFavorite.save()
    const success = saved !== null

    return {
      ok: success,
      message: success ? `'${saved.name}' added to favorites` : "Unable to add",
      data: success ? saved : null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const removeItem = async (id: string, userId: number): Promise<ServiceResponse> => {
  try {
    const result = await FavoriteModel.deleteOne({ s_id: id, userId })
    const success = result.deletedCount === 1

    return {
      ok: success,
      message: success ? `Deleted from favorites` : "Unable to delete",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}
