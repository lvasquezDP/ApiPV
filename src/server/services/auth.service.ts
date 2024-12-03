import { envs } from "../../config";
import { prisma } from "../../data";
import { EmailService, JWT, bcrypt } from "../../plugins";
import {
  CustomError,
  loginUserDTO,
  RegisterUserDTO,
  UserEntity,
} from "../../rules";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async loginUser(DTO: loginUserDTO) {
    const userdb = await prisma.usuario.findUnique({
      where: { correo: DTO.correo },
    });
    if (!userdb) throw CustomError.unAuthorized("User not exist");
    if (!bcrypt.compare(DTO.contraseña, userdb.contraseña))
      throw CustomError.unAuthorized(`Password not match`);
    try {
      const { contraseña, ...user } = UserEntity.fromObject(userdb);

      return {
        token: await JWT.generateToken({ correo: user.correo, id: user.id }),
        user: userdb,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async registerUser(DTO: RegisterUserDTO) {
    if (await prisma.usuario.findUnique({ where: { correo: DTO.correo } }))
      throw CustomError.badRequest("Email already exist");
    try {
      await this.sendEmail(DTO.correo);

      const { contraseña, ...user } = UserEntity.fromObject(
        await prisma.usuario.create({
          data: {
            ...DTO,

            contraseña: bcrypt.hash(DTO.contraseña),
          },
        })
      );
      return {
        token: await JWT.generateToken({ correo: user.correo, id: user.id }),
        user,
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
      throw `Error al enviar el correo`;
    }
  };
}