import type ComisionesInterface from '../interfaces/Comisiones'
import type { ParamsDictionary } from 'express-serve-static-core'
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
  async update(data: ComisionesInterface, params: ParamsDictionary) {
    try {
      const comision = await this.ComisionesModel.findByIdAndUpdate(
        { _id: params.id },
        data,
        { new: true },
      )
      return comision
    } catch (error) {
      throw new Error(
        `Ha ocurido un error al actualizar la comisión, intente nuevamente, ${error}`,
      )
    }
  }
  async delete(params: ParamsDictionary) {
    try {
      await this.ComisionesModel.findByIdAndDelete({ _id: params.id })
    } catch (error) {
      throw new Error(
        `Ha ocurido un error al eliminar la comisión, intente nuevamente, ${error}`,
      )
    }
  }

  async getAll() {
    try {
      const comisiones = await this.ComisionesModel.find()
      return comisiones
    } catch (error) {
      throw new Error(
        `Ha ocurrido un error al obtener las comisiones, intente nuevamente, ${error}`,
      )
    }
  }
}
export default ComisionesService
