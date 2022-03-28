import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import updatePostValidator from 'App/Validators/updatePostValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BlogController {

    /**
     * context 
     */

    async index({ view, request } : HttpContextContract) {
    //   const posts = await Post.all()
    const page = request.input('page', 1)
    const posts = await Database.from(Post.table).paginate(page, 3)
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

    async destroy ({params, response, session} : HttpContextContract){
        const post = await Post.findOrFail(params.id)
        await post.delete()
        session.flash({success : "L'article a bien été supprimé"})
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