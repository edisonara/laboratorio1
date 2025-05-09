//editar proveedor
const { DynamoDB } = require('aws-sdk');
const dynamoDb = new DynamoDB.DocumentClient();
exports.editarProveedor = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);
  const { name, contact_email, phone, address } = data;

  if (!name || !contact_email || !phone || !address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Campos requeridos' }),
    };
  }

  const params = {
    TableName: 'Proveedores',
    Key: {
      id,
    },
    UpdateExpression: 'set #name = :name, contact_email = :contact_email, phone = :phone, address = :address',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': name,
      ':contact_email': contact_email,
      ':phone': phone,
      ':address': address,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error al editar el proveedor', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo editar el proveedor' }),
    };
  }
};