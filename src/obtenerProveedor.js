//obtenemos los proveedores de la base de datos por id

const { DynamoDB } = require('aws-sdk');
const dynamoDb = new DynamoDB.DocumentClient();
exports.obtenerProveedor = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'Proveedores',
    Key: {
      id,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Proveedor no encontrado' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (error) {
    console.error('Error al obtener el proveedor', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo obtener el proveedor' }),
    };
  }
};