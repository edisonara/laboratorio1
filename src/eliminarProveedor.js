//eliminar proveedor

const { DynamoDB } = require('aws-sdk');
const dynamoDb = new DynamoDB.DocumentClient();
exports.eliminarProveedor = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'Proveedores',
    Key: {
      id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Proveedor eliminado' }),
    };
  } catch (error) {
    console.error('Error al eliminar el proveedor', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo eliminar el proveedor' }),
    };
  }
};