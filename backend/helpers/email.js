import nodemailer from "nodemailer";

export const emailRegistro = async (datos)=>{
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    //Información del email
    const info = await transport.sendMail({
      from: ' "UpTask - Administrador de Proyectos" <cuentas@uptask.com> ',
      to: email,
      subject: "UpTask - Comprueba tu cuenta",
      text: "Comprueba tu cuenta en Uptask",
      html: `<p>Hola: ${nombre} comprueba tu cuenta en UpTask</p>
 
       <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
 
       <a href="${process.env.FRONTED_URL}/confirmar/${token}">Comprobar cuenta</a>
 
       <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
 
        `
    })
};

export const emailOlvidePassword = async (datos)=>{
  const { email, nombre, token } = datos

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

  //Información del email
  const info = await transport.sendMail({
      from: ' "UpTask - Administrador de Proyectos" <cuentas@uptask.com> ',
       to: email,
       subject: "UpTask - Reestablece tu password",
       text: "Reestablece tu password",
       html: `<p>Hola: ${nombre} has solicitado reestablecer tu password en UpTask</p>

        <p>Sigue el siguiente enlace para generar un nuevo password:</p>

        <a href="${process.env.FRONTED_URL}/olvide-password/${token}">Reestablecer Password</a>

        <p>Si tu no solicitaste el cambio de password, puedes ignorar este mensaje</p>
      `
  })
};