import wrapAsync from "../utils/tryCatchWrapper.js"
import { getAllUserUrlsDao } from "../dao/user.dao.js"
import { deleteShortUrlDao } from "../dao/short_url.js"

export const getAllUserUrls = wrapAsync(async (req, res) => {
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({message:"success",urls})
})

export const deleteUserUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    const deleted = await deleteShortUrlDao(id, _id)
    if (!deleted) {
        return res.status(404).json({ message: "URL not found or unauthorized" })
    }
    res.status(200).json({ message: "URL deleted successfully" })
})