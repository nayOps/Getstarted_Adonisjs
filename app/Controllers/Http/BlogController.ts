import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class BlogController {

    /**
     * context 
     */

    async index ({ view } : HttpContextContract) {

        const posts = await Post.all()
      return view.render('blog/index', { 
          posts
        })
      
    }

    async show ({params , view} : HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return view.render('blog/show', { 
            post
         })
    }

    async update ({params, request, response, session} : HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        post
            .merge(request.all())
            .save()
        session.flash({success : "L'article a bien été save"})
        return response.redirect().toRoute('home')
    }


}
 