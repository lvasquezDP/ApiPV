import { UploadedFile } from "express-fileupload";
import fs from "fs";
import * as pathh from "path";
import { uuid } from "../../plugins";
import { CustomError } from "../../rules";
import { validExt } from "../../config";

export class FileUploadService {
  constructor(private readonly id = uuid) {}

  private checkFolder(path: string) {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  }

  async uploadSingle(file: UploadedFile, path: string) {
    const ext = file.mimetype.split("/").at(1) ?? "";

    if (!validExt.includes(ext))
      throw CustomError.badRequest(`Invalid extension: ${ext}, valid ones ${validExt}`);
    try {
      const des = pathh.resolve(__dirname, "../../../uploads/", path);
      this.checkFolder(des);
      const fileName = `${this.id()}.${ext}`;
      file.mv(`${des}/${fileName}`);
      return "uploads/" + path + "/" + fileName;
    } catch (error) {
      throw CustomError.internalServer("Error al guardar el archivo");
    }
  }

  async uploadMultiple(files: UploadedFile[], path: string) {
    return await Promise.all(files.map((x) => this.uploadSingle(x, path)));
  }
}
