import { ITEM_TYPES } from "../constants"
import CommentaryModel from "../db/models/commentaryModel"
import { INTERNAL_RESPONSE, ServiceResponse } from "../utils"

export interface CommentaryJSON {
  content: string
  author: string
  itemId: string
  type: string
}

export const getComments = async (itemId: string) => {
  try {
    const list = await CommentaryModel.find({ itemId })

    return {
      ok: true,
      message: "",
      data: list
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const getAllUserComments = async (userId: number) => {
  try {
    const list = await CommentaryModel.find({ userId })

    return {
      ok: true,
      message: "",
      data: {
        tracks: list.filter(i => i.type === ITEM_TYPES.TRACK),
        albums: list.filter(i => i.type === ITEM_TYPES.ALBUM)
      }
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}


export const submitComment = async (payload: CommentaryJSON, userId: number): Promise<ServiceResponse>  => {
  try {
    const newComment = new CommentaryModel({
      content: payload.content,
      author: payload.author,
      itemId: payload.itemId,
      type: payload.type,
      userId
    })
    
    const saved = await newComment.save()
    const success = saved !== null

    return {
      ok: success,
      message: success ? `Comment submitted` : "Unable to submit comment",
      data: success ? saved : null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const editComment = async (id: string, userId: string, content: string): Promise<ServiceResponse>  => {
  try {
    const result = await CommentaryModel.updateOne({ _id: id, userId }, { content })
    const success = result.modifiedCount === 1
    
    return {
      ok: success,
      message: success ? "Comment updated" : "Unable to update comment",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const deleteComment = async (id: string, itemId: string, userId: string): Promise<ServiceResponse>  => {
  try {
    const result = await CommentaryModel.deleteOne({ _id: id, itemId, userId })
    const success = result.deletedCount === 1

    return {
      ok: success,
      message: success ? `Comment deleted` : "Unable to delete comment",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}
