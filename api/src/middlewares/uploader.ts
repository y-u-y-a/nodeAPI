import path from 'path'
import multer, { diskStorage } from 'multer'

// TODO: add user_id to filename
const rename = (file: Express.Multer.File) => {
  const extname = path.extname(file.originalname)
  const timestamp = new Date().getTime().toString()
  return `${timestamp}${extname}`
}

const storage = diskStorage({
  // ファイルの保存場所
  destination: (req, file, callback) => {
    callback(null, './storage') // ルートパスが基準？
  },
  // ファイル名
  filename: (req, file, callback) => {
    const filename = rename(file)
    callback(null, filename)
  },
})

const uploader: multer.Multer = multer({ storage: storage })

export default uploader
