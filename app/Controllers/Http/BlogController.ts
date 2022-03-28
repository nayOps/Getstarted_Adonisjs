import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import updatePostValidator from 'App/Validators/updatePostValidator'

export default class BlogController {
    
    /**
     * context 
     */

    async index({ view } : HttpContextContract) {
      const posts = await Post.all()
      return view.render('blog/index', { 
          posts
        })
    }

    async create({view} : HttpContextContract) {
        const post = new Post()
        return view.render('blog/create', {
            post
        })
    }

    async store({params, request, response, session} : HttpContextContract) {
       await this.handleRequest(params, request)
       session.flash({success : "L'article a bien été save"})
       return response.redirect().toRoute('home')

    }

    async show ({params , view} : HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        return view.render('blog/show', { 
            post
         })
    }


    async update ({params, request, response, session} : HttpContextContract) {
        // return await request.validate(updatePostValidator)
        await this.handleRequest(params, request)
        session.flash({success : "L'article a bien été save"})
        return response.redirect().toRoute('home')
    }

    private async handleRequest(params: HttpContextContract['params'], request : HttpContextContract['request']) {
        const post = params.id ? await Post.findOrFail(params.id) : new Post();
        const data = await request.validate(updatePostValidator)
        post
            .merge({...data, online: data.online || false})
            .save()
    }
 }
 
 
