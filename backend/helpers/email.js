import nodemailer from "nodemailer";

export const emailRegistro = async (datos)=>{
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e6da910c509547",
          pass: "5d5fb46916cc41"
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