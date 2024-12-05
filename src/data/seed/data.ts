import { $Enums } from "@prisma/client";
import { bcrypt } from "../../plugins";

interface data{
  tiendas:{nombre: string, contacto: string, direccion: string}[],
  proveedores:{nombre: string, contacto: string, direccion: string}[],
  users:{nombre: string, correo: string, contraseña:string,rol:$Enums.Rol}[],
  products:{nombre: string, codigo: string, nombrePublico:string,precio:number,descripcion:string}[],
  
}

export const seedData:data = {

  tiendas: [
    { nombre: 'Tienda XYZ', contacto: 'test1@google.com', direccion: 'Calle Falsa 123' },
    { nombre: 'Tienda ABC', contacto: 'test2@google.com', direccion: 'Calle Falsa 456' },
    { nombre: 'Tienda DFG', contacto: 'test3@google.com', direccion: 'Calle Falsa 789' },
    { nombre: 'Tienda HIJ', contacto: 'test4@google.com', direccion: 'Calle Falsa 000' },
  ],

  proveedores: [
    { nombre: 'Proveedor XYZ', contacto: 'test1@google.com', direccion: 'Calle Falsa 123'},
    { nombre: 'Proveedor ABC', contacto: 'test2@google.com', direccion: 'Calle Falsa 456'},
    { nombre: 'Proveedor DFG', contacto: 'test3@google.com', direccion: 'Calle Falsa 789'},
    { nombre: 'Proveedor HIJ', contacto: 'test4@google.com', direccion: 'Calle Falsa 000'},
  ],

  users: [
    { nombre: 'Test 1', correo: 'test1@google.com', contraseña: bcrypt.hash('123456'), rol:'ADMINISTRADOR'  },
    { nombre: 'Test 2', correo: 'test2@google.com', contraseña: bcrypt.hash('123456'), rol:'ADMINISTRADOR'  },
    { nombre: 'Test 3', correo: 'test3@google.com', contraseña: bcrypt.hash('123456'), rol:'ADMINISTRADOR'  },
    { nombre: 'Test 4', correo: 'test4@google.com', contraseña: bcrypt.hash('123456'), rol:'TRABAJADOR'  },
    { nombre: 'Test 5', correo: 'test5@google.com', contraseña: bcrypt.hash('123456'), rol:'TRABAJADOR'  },
  ],

  products: [
    { codigo:'12345x1', nombre: 'Than', nombrePublico: 'Than', precio: 75.0369, descripcion: 'daughter me move thumb claws lose supper strip animal teach additional definition why pitch help thus boy like every mud month are account dozen' },
    { codigo:'12345x2', nombre: 'Wagon', nombrePublico: 'Wagon', precio: 1.9631,  descripcion: 'actual difficult nature yellow smile captain nervous to cause wolf strong neck fifteen wrote consider visit likely happened rear red review wash flag parent' },
    { codigo:'12345x3', nombre: 'Tone', nombrePublico: 'Tone', precio: 11.0312, descripcion: 'met certain specific detail deeply red forth tiny whatever what image parts deer difficulty pair mixture trouble forgotten fort dry listen strength got seldom' },
    { codigo:'12345x4', nombre: 'Song', nombrePublico: 'Song', precio: 99.2314, descripcion: 'look board flat river solve spite universe history use pool frequently twenty basic lying this came poetry particular function previous suit west shore tomorrow' },
    { codigo:'12345x5', nombre: 'Plenty', nombrePublico: 'Plenty', precio: 75.4476, descripcion: 'dinner welcome screen expression structure plastic doubt missing thank garage property particular park syllable slide cup alphabet swimming stood fought fog shut spite ever' },
    { codigo:'12345x6', nombre: 'Season', nombrePublico: 'Season', precio: 91.6254, descripcion: 'canal promised split headed studying had declared vessels hello matter lovely congress birthday fed word street happened ought cold heavy cage shoulder sight applied' },
    { codigo:'12345x7', nombre: 'Voyage', nombrePublico: 'Voyage', precio: 84.0274,  descripcion: 'reach myself owner building anyway tool dance particles branch shadow clear home of grass rabbit wind bit barn slipped husband recent tongue important zero' },
    { codigo:'12345x8', nombre: 'Medicine', nombrePublico: 'Medicine', precio: 38.1478, descripcion: 'mountain five art moving foot roll harder lucky pitch mile nails married finally spend adult left storm easy cry increase cook drew announced glad' },
    { codigo:'12345x9', nombre: 'How', nombrePublico: 'How', precio: 47.5355, descripcion: 'heat student highway very word health them feel off cover trail cage went mission ice safety disease observe copy flat speech experiment now finest' },
    { codigo:'12345x0', nombre: 'Saved', nombrePublico: 'Saved', precio: 75.9318, descripcion: 'weather mud friend brother breakfast corn prevent numeral deer quiet so nombre fastened tongue sing phrase concerned tree pass flies fighting chapter fence act' },
    { codigo:'12346x1', nombre: 'High', nombrePublico: 'High', precio: 90.1331, descripcion: 'went split establish speak origin itself news when cross stand value vertical decide bicycle tone are market view depth income touch above nation spread' },
    { codigo:'12346x2', nombre: 'Colony', nombrePublico: 'Colony', precio: 27.3687, descripcion: 'jungle weight whether printed west egg run cut rod football fewer trouble hearing him been note select our shelf afraid jump alike slip shore' },
    { codigo:'12346x3', nombre: 'Dozen', nombrePublico: 'Dozen', precio: 63.9702,  descripcion: 'tobacco spent congress who accept pond outline changing flow find cat mirror tax keep twenty yellow into pile reach move plan recall nervous gold' },
    { codigo:'12346x4', nombre: 'Bean', nombrePublico: 'Bean', precio: 44.1797, descripcion: 'direct might am golden block seat birth television taught twenty clock process safety shirt guard control cent follow couple eleven weather location turn parent' },
    { codigo:'12346x5', nombre: 'Pain', nombrePublico: 'Pain', precio: 74.0199, descripcion: 'start difficult two force source job process tomorrow machinery physical loose five fruit leaving century ourselves difference for frog throughout bridge atomic sunlight send' },
    { codigo:'12346x6', nombre: 'Clearly', nombrePublico: 'Clearly', precio: 8.6356, descripcion: 'well poem little but therefore instant tight outline foreign drove characteristic mine leader cold close club satellites quiet face tobacco age gas bend push' },
    { codigo:'12346x7', nombre: 'Immediately', nombrePublico: 'Immediately', precio: 41.4278, descripcion: 'feel shot fill square caught would valley path whispered come porch function pocket fish division think same sign was adventure worry bean wealth realize' },
    { codigo:'12346x8', nombre: 'Sent', nombrePublico: 'Sent', precio: 95.3915, descripcion: 'shut cookies goes serious several change poet principle play congress begun mill composition unless piece negative expect ancient milk shall house period stranger eight' },
    { codigo:'12346x9', nombre: 'Globe', nombrePublico: 'Globe', precio: 32.7184,  descripcion: 'saw clean golden brick shot brave percent damage eight chain young tears religious stems speak element example eager busy satellites pain fast operation person' },
    { codigo:'12346x0', nombre: 'Battle', nombrePublico: 'Battle', precio: 53.4763, descripcion: 'his prevent sight camera ring generally glad refused among group nervous cave box rate breath somehow whether gate plant related citizen even yellow after' },
  ]
}