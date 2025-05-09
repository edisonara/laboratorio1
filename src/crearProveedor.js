//creamos el proveedor con los campos: id( string), name (string), contact_email (string), phone (string), address( string)

const { v4 } = require('uuid');
const { DynamoDB } = require('aws-sdk');



exports.crearProveedor = async (event) => {
  const data = JSON.parse(event.body);
  const dynamoDb = new DynamoDB.DocumentClient();
  const { name, contact_email, phone, address } = data;

  if (!name || !contact_email || !phone || !address) {
    throw createError(400, 'Campos requeridos');
  }

  const provider = {
    id: v4(),
    name,
    contact_email,
    phone,
    address,
  };

  const params = {
    TableName: 'Proveedores',
    Item: provider,
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(provider),
    };
    
  } catch (error) {
    console.error('Error al crear el proveedor', error);
    throw createError(500, 'No se creo el proveedor');
  }
};