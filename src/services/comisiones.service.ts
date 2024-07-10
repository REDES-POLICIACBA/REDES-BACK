import type ComisionesInterface from '../interfaces/Comisiones'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { Model } from 'mongoose'
import NotificationServices from './notification.service'

const servicesExternos = new NotificationServices()

class ComisionesService {
    public ComisionesModel: Model<ComisionesInterface>
    constructor(ComisionesModel: Model<ComisionesInterface>) {
        this.ComisionesModel = ComisionesModel
    }
    async create(data: ComisionesInterface) {
        const dataToken =
            'f-C8F6ObR5y3pKVwHnIZ_h:APA91bGO2mrPRIF5C02XJdn_7dHJ1CzSBkhnrctjj_uS7V_WOZwjGylT9hqaEABsrxjF0BMe12pu2uUjVV7luzYx_P4sVIE2v8kxv3lpm7ZYiQycPSW_2x_6NKVXIP8coJ5sjyIqc3RM'
        servicesExternos.notificationComisionUser(
            dataToken,
            'Nueva comisión',
            'Se ha creado una nueva comisión',
        )
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

    /* 
  ACA VAMOS A NECESITAR QUERYPARAMS PARA TRAER LA DATA EN PROPORCIONES PEQUEÑAS;
  PODRIAMOS TENER DOS METODOS, UNO PARA TRAER TODAS LAS COMISIONES Y OTRO PARA TRAERLAS DE A POCO

  CUANDO TRAIGA TODAS LAS COMISIONES, DEBERIA TRAER UNA CANTIDAD LIMITADA DE COMISIONES, Y UN BOTON PARA TRAER MAS COMISIONES O CUANDO LLEGUE AL FINAL DEL SCROLL, EL SCROLL SE DEBERIA ACTIVAR Y TRAER MAS COMISIONES

  POR OTRA PARTE EN EL FRONT CUANDO EL USUARIO SCROLLE DOS VECES LA DIMENSION DE SU PANTALLA, DEBERIA APARECER UN BOTON CON FIXED CON UN LUPA PARA QUE EL USUARIO PUEDA BUSCAR UNA COMISION EN ESPECIFICO

  SI LA MANTIENE APRETADA A LA LUPA POR MAS DE UN TIEMPO DETERMINADO EL USUARIO DEBERIA VOLVER AL COMIENZO DE LA LISTA EN DONDE ENCONTRARIA LOS DEMAS FILTROS PARA BUSCAR LA COMISION EN ESPECIFICO(DATAPICKER, SELECTS, ETC)
*/
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
    async asignarComision(
        comision: ComisionesInterface,
        params: ParamsDictionary,
    ) {
        try {
            const comisionDB = await this.ComisionesModel.findOne({
                _id: params.id,
            })
            if (comisionDB !== null) {
                const userExists = comisionDB.groupJob
                    .map((comision) => comision.toString())
                    .includes(comision.groupJob.toString())
                if (userExists) {
                    throw new Error('El usuario ya tiene asignada la comisión')
                }
                //@ts-ignore
                comisionDB.groupJob.push(comision.groupJob)
                comisionDB.process = 'en proceso'
                await comisionDB.save()
                return comisionDB
            }
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al asignar la comisión,  ${error}`,
            )
        }
    }
}
export default ComisionesService
