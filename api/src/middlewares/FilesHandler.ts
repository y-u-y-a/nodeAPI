export class FilesController {
  upload = (file: object) => {
    console.log(file)
    return file
  }
}
export default new FilesController()
