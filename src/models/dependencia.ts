import mongoose, { Types } from 'mongoose'

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        coordinates: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true },
        },
        linkType: { type: String, required: true },
        firewall: { type: String, required: true },
        ipInside: { type: String, required: true },
        ipOutside: { type: String, required: true },
        referencia: { type: String },
        notas: { type: String },
        type: { type: String, enum: ['capital', 'interior'], required: true },
        lastEdit: { type: Types.ObjectId, ref: 'users', required: true },
        proveedores: {},
    },
    { timestamps: true },
)

const collection = 'dependencias'

const Dependencias = mongoose.model(collection, schema)

export default Dependencias

/* 
las dependecias pueden tener proveedores de internet, eso provedores de internet pueden tener diferentes tipos de conecciones. ( ADLS, HFC o MPLS), a su vez estos diferentes tipo s de conexiones pueden coeexistir en el mismo lugar. Y cada tipo de conexions tiene un status.




numeroIdconexion:
refencia de contrato
notas tendria que ser un array de objetos con la siguiente estructura
{
  usuario que creo la nota
  fecha de creacion de la nota
  clasificacion de la nota
  contenido de la nota
  adjuntos de la nota como imagenes  
}



*/
