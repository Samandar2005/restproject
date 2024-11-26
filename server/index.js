import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
const app = express();
const port = 3002;
let data = {
    products : [
        {
            id: 1,
            productName: "PC",
            productPrice: 2500,
            productImage: "./public/pc.jpg",
        },
        {
            id: 2,
            productName: "Laptop",
            productPrice: 1200,
            productImage: "./public/laptop.webp",
        },
        {
            id: 3,
            productName: "Phone",
            productPrice: 700,
            productImage: "./public/phone.jpg",
        }
    ]
}


const findProductById = (productId) => {
    const product = data.products.find((product) => product.id === Number(productId))
    return product;
}

const deleteProductHandler = (productId) => {
    data.products = data.products.filter((product) => product.id !== Number(productId))
}

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

app.get('/getallproduct', (req, res) => {
  res.send(data);
})

app.get('/getproductbyid/:id', (req, res) => {
    const { id } = req.params
    const product = findProductById(id)

    if(product) {
        res.status(200).send(product)
        return
    }
    res.status(400).send({ message: "product not found" })
})

app.delete("/deleteproduct/:id", (req, res) =>{
    const { id } = req.params;

    deleteProductHandler(id);
    res.json({ message: "product successfully deleted" })

})

app.patch("/updateproduct", (req, res) => {
    console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})