import { UploadedFile } from "express-fileupload";
import { envs } from "../../config";
import { prisma } from "../../data";
import { EmailService, JWT, bcrypt } from "../../plugins";
import { CustomError, LoginUserDTO, RegisterUserDTO } from "../../rules";
import { FileUploadService } from "./file-upload.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async loginUser(DTO: LoginUserDTO) {
    const userdb = await prisma.usuario.findUnique({
      where: { correo: DTO.correo },
      include: { tienda: true },
    });
    if (!userdb) throw CustomError.unAuthorized("User not exist");
    if (!bcrypt.compare(DTO.contraseña, userdb.contraseña))
      throw CustomError.unAuthorized(`Password not match`);
    try {
      const { contraseña, ...user } = userdb;

      return {
        token: await JWT.generateToken({ correo: user.correo, id: user.id }),
        user,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async registerUser(DTO: RegisterUserDTO) {
    if (await prisma.usuario.findUnique({ where: { correo: DTO.correo } }))
      throw CustomError.badRequest("Email already exist");
    try {
      let path = null;
      if (DTO.img && !Array.isArray(DTO.img))
        path = await new FileUploadService().uploadSingle(
          DTO.img as UploadedFile,
          `tiendas/${DTO.tiendaId}/users`
        );

      await this.sendEmail(DTO.correo);

      const { contraseña, ...user } = await prisma.usuario.create({
        data: {
          ...DTO,
          img: path,
          contraseña: bcrypt.hash(DTO.contraseña),
        },
      });

      return {
        token: await JWT.generateToken({ correo: user.correo, id: user.id }),
        user,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async refresh(token: string) {
    const { user, newToken } = await JWT.refresh(token);
    const userdb = await prisma.usuario.findUnique({
      where: { correo: user.correo },
      include: { tienda: true },
    });
    if (!userdb) throw CustomError.unAuthorized("User not exist");
    try {
      const { contraseña, ...usuario } = userdb;

      return {
        token: newToken,
        user: usuario,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async validate(token: string) {
    try {
      const { to: correo } = (await JWT.validateToken(token)) as {
        [key: string]: any;
      };
      await prisma.usuario.update({
        where: { correo: correo },
        data: {
          correoValido: true,
        },
      });
      return true;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmail = async (to: string) => {
    const token = await JWT.generateToken({ to });
    if (!token) throw `Error getting token`;
    try {
      this.emailService.sendEmail({
        to,
        subject: "Validacion de correo",
        html: `
      <h3>Para validar su cuenta acceda al siguiente link</h3>
      <a href="${envs.WEBSERVICE_URL}api/auth/validate-email/${token}">Validate your email ${to}</a>
      `,
      });
    } catch (error) {
      throw CustomError.internalServer(`Error al enviar el correo`);
    }
  };
}
