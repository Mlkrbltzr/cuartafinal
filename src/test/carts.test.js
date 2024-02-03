//carts.test.js
import mongoose from 'mongoose'
import Cart from '../DAO/mongo/carts.mongo.js'
import Assert from 'assert'
import * as Chai from 'chai'
import Supertest from 'supertest'
import config from '../config/factory.config.js' 

mongoose.connect(config.mongo_url);

const assert = Assert.strict
const expect = Chai.expect
const requester = Supertest("http://localhost:8080")

describe('Testing Cart DAO Mocha/Chai/SuperTest', () => {
    before(function () {
        this.cartsDao = new Cart()
    })
    it("Debería devolver los carritos de la DB", async function () {
        this.timeout(5000)
        try
        {
            const result = await this.cartsDao.get()
            assert.strictEqual(Array.isArray(result), true) //Mocha
            expect(Array.isArray(result)).to.be.equals(true) //Chai
        }
        catch(error)
        {
            console.error("Error durante el test: ", error)
            assert.fail("Test get producto con error")
        }
    })
    it("El DAO debe agregar un carrito en la DB", async function () {
        let mockCart = {
            products: [
                {
                    productId: '65bc2962c92397ba1c7b5e72',
                    quantity: 2
                }
            ]
        }
        const result = await this.cartsDao.addCart(mockCart)
        assert.ok(result._id) //Mocha
        expect(result).to.have.property('_id') //Chai
    })
    it("Debería devolver un carrito por el id desde la DB", async function () {
        this.timeout(5000)
        try
        {
            let idCart = '65bbfc3c71106986ffcdfdb3'
            const result = await this.cartsDao.getCart(idCart)
            assert.strictEqual(result.hasOwnProperty("cart"), true); // Mocha
            expect(result.hasOwnProperty("cart")).to.be.equals(true); // Chai
        }
        catch(error)
        {
            console.error("Error durante el test: ", error)
            assert.fail("Test get producto con error")
        }
    })
    it("Debería obtener si hay suficiente stock y resta el stock al producto", async function () {
        try {
            let products = [
                {
                    description: 'Pollo Palta Queso Crema Tempura',
                    stock: 2
                }
            ];
            const result = await this.cartsDao.getStock({ productos: products });  // Cambia 'products' a 'productos'
    
            // Verificar si result[products[0].description] está definido antes de acceder a la propiedad status
            if (result && result[products[0].description]) {
                const productStatus = result[products[0].description].status;
    
                // Verificar que el status sea 'Suficiente'
                if (productStatus) {
                    expect(productStatus).to.equal('Suficiente');
                } else {
                    assert.fail("La propiedad status no está definida en el resultado");
                }
            }
        } catch (error) {
            console.error("Error durante el test: ", error);
            assert.fail("Test getStock con error");
        }
    });
   

    //EJECUTAR EL SERVIDOR EN PARALELO PARA QUE FUNCIONEN LOS ULTIMOS DOS TEST
    it("El endpoint GET /carts debe devolver todos los carritos", async function() {
        const response = await requester.get('/carts')
        // Verifica el código de estado HTTP
        assert.strictEqual(response.status, 200);
        // Verifica el tipo de contenido de la respuesta
        expect(response.type).to.equal('application/json');
        // Verifica que la respuesta tenga una propiedad 'status' con valor 'success'
        expect(response.body).to.have.property('status', 'success');
    })
    it("El endpoint POST /carts debe crear un carrito", async function() {
        let mockCart = {
            products: [
                {
                    productId: '65bc2962c92397ba1c7b5e72',
                    quantity: 2
                }
            ]
        }
        
        const response = await requester.post('/carts').send(mockCart)
        // Verifica el código de estado HTTP
        assert.strictEqual(response.status, 200);
        // Verifica el tipo de contenido de la respuesta
        expect(response.ok).to.equal(true);
        // Verifica que la respuesta tenga una propiedad 'status' con valor 'success'
        expect(response.body).to.have.property('status', 'success');
    })
    after(function(done) {
        this.timeout(5000);
        console.log("Fin de las pruebas de Cart");
        done();
    });
})