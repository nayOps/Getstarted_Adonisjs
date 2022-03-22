import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlogController {

    /**
     * context 
     */

    async index ({ view } : HttpContextContract) {
        return view.render('blog/index')
      
    }


}
 