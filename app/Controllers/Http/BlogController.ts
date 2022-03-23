import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import updatePostValidator from 'App/Validators/updatePostValidator'

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

        return await request.validate(updatePostValidator)
        
        const post = await Post.findOrFail(params.id)
        post
            .merge(await request.validate(updatePostValidator))
            .save()
        session.flash({success : "L'article a bien été save"})
        return response.redirect().toRoute('home')
    }


}
 