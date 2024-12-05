import { prisma } from "../../data";
import { EmailService } from "../../plugins";
import { CustomError } from "../../rules";
import { RegisterStoreDTO } from "../../rules/dtos/store/register-store.dto";

export class StoreService {
  constructor(private readonly emailService: EmailService) {}

  public async registerStore(DTO: RegisterStoreDTO) {
    try {
      // await this.sendEmail(DTO.correo);
      return {
        tienda: await prisma.tienda.create({ data: DTO }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async show(id: number) {
    try {
      return {
        tienda: await prisma.tienda.findUnique({
          where: { id },
          include: { usuarios: {select:{nombre:true,correo:true,img:true}} },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
