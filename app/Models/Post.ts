import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public title: string

  @column()
  public content: string 

  @column()
  public demo: string

  @column()
  public online: boolean

  @column()
  public thumbmail: string | null

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public categoryId : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null

  
}
