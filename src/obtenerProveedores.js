//obtenemos los proveedores de la base de datos

const { DynamoDB } = require('aws-sdk');

const dynamoDb = new DynamoDB.DocumentClient();
exports.obtenerProveedores = async (event) => {
  const params = {
    TableName: 'Proveedores',
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error('Error al obtener los proveedores', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudieron obtener los proveedores' }),
    };
  }
};