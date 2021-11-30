# API SCHOLL EXPRESS
Api feita em express.

## Motivacao
Criar aplicação para cadastrar alunos,login. Cada estudante pode fazer upload de suas fotos.

## Feature
- Usei o sequelize para lidar com banco relacional mariaDB.
- Usei a google cloud com docker para gerar um servidor de banco de dados online.
- Sequelize trabalha no conceito de migration quando precisamos lidar diretamente com o banco.
- Para fazer upload de fotos foi usado o multer.
- Com extname consigo pegar o tipo  extensão do arquivo.


```javascript

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);
export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      return cb(null, true);
    }
    return cb(
      new multer.MulterError("Arquivo precisa ser do tipo png ou jpeg")
    );
  },
  storage: multer.diskStorage({
    destination: (req, file, cab) => {
      //primeiro parametro e o erro,
      //segundo parametro e o caminho absoluto
      cab(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cab) => {
       //file.originalname é o nome original do arquivo
      //construo uma string com o nome do arquivo e o numero aleatorio
      //assim garanto que o nome do arquivo seja unico
      cab(
        null,
        `${Date.now()}$_${randomNumber()}${extname(file.originalname)}`
      );
    },
  }),
};

```

 - Utilizei o método include do sequelize para incluir os campos fotos criados.
 - Para salvar photos tem seus próprios controle e rotas.
 - Usei o foreing key  para relação entre fotos e alunos.
 - Um aluno pode ter muitas fotos é podem ter fotos sem alunos.
 - Trabalhei com o conceito de token da lib  jsonwebtoken , com o token garanto  apenas os usuários logados podem acessar certas rotas.
 - Token na aplicação tem sua própria rota e controle. 
 - Usei atributes para retornar apenas oque desejo do banco de dados e order para ordenar.
-  Middleware de token garante apenas usuários autenticados em certas rotas.
 
 ```javascript
 
//middleware token 
 import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ["Precisa de token"],
    });
  }
  const [, token] = authorization.split(" ");

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    //toda vez que  o email do usuario for alterado,
    //preciso redirecionar para fazer novo token
    const user = await User.findOne({ where: { id, email } });
    //se nao encontrar usuario no banco porque email alterou
    if (!user) {
      return res.status(401).json({
        errors: ["Token invalido ou expirado"],
      });
    }
    req.userId = id;
    req.email = email;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: ["Token inválido"],
    });
  }
};

 
//controler token 
class Token {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          errors: ["Credenciais erradas"],
        });
      }
      //user ja esta fazendo a instancia da classe User
      //entao os metodos que estao em User estao disponiveis no user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          errors: ["Email invalido"],
        });
      }
      //metodo que esta no model User
      if (!(await user.comparePassword(password))) {
        return res.status(401).json({
          errors: ["Senha invalida"],
        });
      }
      const { id } = user;
      const token = jsw.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      res.json({ token });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}
 
 
 ///-------------------------///
 //controller user
 async index(req, res, next) {
    try {
      const students = await Students.findAll({
        attributes: [
          "id",
          "email",
          "name",
          "secondName",
          "height",
          "weight",
          "old",
        ],
        //id e o campo que vou ordenar
        //desc é para ordenar de forma decrescente
        //asc é para ordenar de forma crescente
        order: [
          ["id", "DESC"],
          [Photo, "id", "DESC"],
        ],
        include: {
          model: Photo,
          attributes: ["file_name"],
        },
      });
      return res.send(students);
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
 
 
 ```




