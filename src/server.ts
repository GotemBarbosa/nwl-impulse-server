import { prisma } from './prisma'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "db6d3921f0bcf9",
      pass: "0cd9ec19bf5b6b"
    }
  });

app.post('/feedbacks', async (req, res)=>{

    const {type, comment, screenshot} = req.body 

    const feedback = await prisma.feedback.create({
        data:{
            type, //short sintax (when variable == value )
            comment: comment,
            screenshot: screenshot,
        }
    })
    await transport.sendMail({
        from: "Equipe Feedget <contato@feedget.com>",
        to: "Gabriel Barbosa <gotembarbosagd@gmail.com>",
        subject: "Novo feedback",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,

        ].join('\n')
    })

    return res.status(201).json({data: feedback})
})

app.listen(3333, ()=>{
    console.log('HTTP server running!')
})