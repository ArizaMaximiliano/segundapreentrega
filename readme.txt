
Probe la vista http://localhost:8080/api/products

Probe la vista http://localhost:8080/api/carts/655fe27ced0b2323fda80a82     //Carrito creado en mi db

Probe los endpoints


Post: http://localhost:8080/api/products/
{
   "title": "Producto de ejemplo",
  "description": "Esta es una descripción de ejemplo",
  "code": "ABC128",
  "price": 19.99,
  "status": "Disponible",
  "stock": 50,
  "category": "Electrónicos",
  "thumbnail": "url_de_la_miniatura.jpg",
  "availability": true
}

Post: http://localhost:8080/api/carts/655fe27ced0b2323fda80a82/products/655d09dd4aeeb3690082fb82
{
  "quantity": 1
}