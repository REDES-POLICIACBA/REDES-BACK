import type ComisionesInterface from '../interfaces/Comisiones'
import type { Model } from 'mongoose'

class ComisionesService {
  public ComisionesModel: Model<ComisionesInterface>
  constructor(ComisionesModel: Model<ComisionesInterface>) {
    this.ComisionesModel = ComisionesModel
  }
  async create(data: ComisionesInterface) {
    try {
      const newComision = await this.ComisionesModel.create(data)
      return newComision
    } catch (error) {
      throw new Error(
        `Ha ocurido un error al crear la comisión, intente nuevamente, ${error}`,
      )
    }
  }
}
export default ComisionesService
