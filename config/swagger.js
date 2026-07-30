import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ShipNow API",
            version: "1.0.0",
            description: "API REST para la gestión de usuarios, productos, tiendas, pedidos y generación de datos de prueba de ShipNow.",
            license: {
                name: "MIT"
            }
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Servidor local"
            }
        ],
        tags: [
            {
                name: "Users",
                description: "Operaciones relacionadas con los usuarios."
            },
            {
                name: "Products",
                description: "Operaciones relacionadas con los productos."
            },
            {
                name: "Stores",
                description: "Operaciones relacionadas con las tiendas."
            },
            {
                name: "Orders",
                description: "Operaciones relacionadas con los pedidos."
            },
            {
                name: "Mocks",
                description: "Generación de datos de prueba."
            },
            {
                name: "Logger",
                description: "Herramienta para validar el sistema de logs."
            }
        ],

        components: {
            schemas: {

                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a61230d02fc11ac8e749b09"
                        },
                        firstName: {
                            type: "string",
                            example: "Daniela"
                        },
                        lastName: {
                            type: "string",
                            example: "Ponce"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "daniela@gmail.com"
                        },
                        password: {
                            type: "string",
                            format: "password",
                            writeOnly: true,
                            example: "123456"
                        },
                        role: {
                            type: "string",
                            enum: [
                                "customer",
                                "admin",
                                "driver",
                                "store"
                            ],
                            example: "customer"
                        },
                        addresses: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    label: {
                                        type: "string",
                                        enum: ["home", "work"],
                                        example: "home"
                                    },
                                    address: {
                                        type: "string",
                                        example: "Av. Siempre Viva 123"
                                    },
                                    reference: {
                                        type: "string",
                                        example: "Casa azul"
                                    }
                                }
                            }
                        },
                        documents: {
                            type: "array",
                            items: {
                                type: "string",
                                enum: [
                                    "user_document",
                                    "driver_license",
                                    "delivery_proof"
                                ]
                            },
                            example: [
                                "user_document",
                                "driver_license"
                            ]
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "uri"
                            },
                            example: [
                                "http://localhost:8000/uploads/foto-perfil.jpg"
                            ]
                        }
                    }
                },


                UserCreate: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/User"
                        },
                        {
                            type: "object",
                            required: [
                                "firstName",
                                "lastName",
                                "email",
                                "password"
                            ],

                            properties: {

                                password: {
                                    type: "string",
                                    format: "password",
                                    example: "123456"
                                },

                                images: {
                                    type: "array",
                                    description: "Permite subir imágenes o enviar URLs",
                                    items: {
                                        oneOf: [
                                            {
                                                type: "string",
                                                format: "binary",
                                                description: "Archivo de imagen"
                                            },
                                            {
                                                type: "string",
                                                format: "uri",
                                                description: "URL externa"
                                            }
                                        ]
                                    }
                                },

                                imageUrls: {
                                    type: "array",
                                    description: "URLs externas de imágenes",
                                    items: {
                                        type: "string",
                                        format: "uri"
                                    },
                                    example: [
                                        "https://imagen.com/avatar.jpg"
                                    ]
                                }
                            }
                        }
                    ]
                },

            
                UserUpdate: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/User"
                        },
                        {
                            type: "object",
                            properties: {

                                password: {
                                    type: "string",
                                    format: "password",
                                    example: "123456"
                                },

                                images: {
                                    type: "array",
                                    description: "Nuevas imágenes por archivo o URL",
                                    items: {
                                        oneOf: [
                                            {
                                                type: "string",
                                                format: "binary"
                                            },
                                            {
                                                type: "string",
                                                format: "uri"
                                            }
                                        ]
                                    }
                                },

                                imageUrls: {
                                    type: "array",
                                    description: "URLs externas de imágenes",
                                    items: {
                                        type: "string",
                                        format: "uri"
                                    }
                                }
                            }
                        }
                    ]
                },


                Product: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66b5b0a5d3c9d7f5b8d2e123"
                        },
                        title: {
                            type: "string",
                            example: "Notebook Lenovo"
                        },
                        description: {
                            type: "string",
                            example: "Notebook Lenovo IdeaPad 15 pulgadas"
                        },
                        price: {
                            type: "number",
                            example: 950000
                        },
                        stock: {
                            type: "number",
                            example: 10
                        },
                        category: {
                            type: "string",
                            example: "Tecnología"
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "uri"
                            },
                            example: [
                                "http://localhost:8000/uploads/notebook1.jpg",
                                "http://localhost:8000/uploads/notebook2.jpg"
                            ]
                        },
                        seller: {
                            type: "string",
                            description: "ID del usuario vendedor",
                            example: "66b5b0a5d3c9d7f5b8d2e456"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-25T14:30:00.000Z"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-25T14:30:00.000Z"
                        }
                    }
                },

                ProductCreate: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/Product"
                        },
                        {
                            type: "object",
                            required: [
                                "title",
                                "description",
                                "price",
                                "stock",
                                "category",
                                "seller"
                            ],
                            
                            properties: {
                                images: {
                                    type: "array",
                                    description:"Archivos o URLs de imágenes del producto",
                                    items:{
                                        oneOf:[
                                            {
                                                type:"string",
                                                format:"binary"
                                            },
                                            {
                                                type:"string",
                                                format:"uri"
                                            }
                                        ]
                                    }
                                },

                                imageUrls:{
                                    type:"array",
                                    description:"URLs externas del producto",
                                    items:{
                                        type:"string",
                                        format:"uri"
                                    },
                                    example:[
                                        "https://imagen.com/notebook.jpg"
                                    ]
                                }

                            }
                        }
                    ]
                },


                ProductUpdate: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/Product"
                        },
                        {
                        type: "object",
                            properties: {
                                images:{
                                    type:"array",
                                    items:{
                                        oneOf:[
                                            {
                                                type:"string",
                                                format:"binary"
                                            },
                                            {
                                                type:"string",
                                                format:"uri"
                                            }
                                        ]
                                    }
                                },

                                imageUrls:{
                                    type:"array",
                                        items:{
                                            type:"string",
                                            format:"uri"
                                        }
                                }
                            }
                        }
                    ]
                },


                Store: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66b5b0a5d3c9d7f5b8d2e999"
                        },
                        owner: {
                            type: "string",
                            description: "ID del propietario de la tienda",
                            example: "66b5b0a5d3c9d7f5b8d2e456"
                        },
                        name: {
                            type: "string",
                            example: "Tienda Daniela"
                        },
                        description: {
                            type: "string",
                            example: "Venta de artículos para el hogar."
                        },
                        address: {
                            type: "string",
                            example: "Av. Siempre Viva 123"
                        },
                        phone: {
                            type: "string",
                            example: "1122334455"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "tienda@gmail.com"
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "uri"
                            },
                            example: [
                                "http://localhost:8000/uploads/tienda1.jpg"
                            ]
                        },
                        isActive: {
                            type: "boolean",
                            example: true
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-25T14:30:00.000Z"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-25T14:30:00.000Z"
                        }
                    }
                },

                StoreCreate: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/Store"
                        },
                        {
                            type: "object",
                            required: [
                                "owner",
                                "name",
                                "address"
                            ],

                            properties: {

                                images: {
                                    type: "array",
                                    description: "Archivos de imágenes de la tienda",
                                    items: {
                                        type: "string",
                                        format: "binary"
                                    }
                                },

                                imageUrls: {
                                    type: "array",
                                    description: "URLs externas de imágenes",
                                    items: {
                                        type: "string",
                                        format: "uri"
                                    },
                                    example:[
                                        "https://imagen.com/tienda.jpg"
                                    ]
                                }
                            }
                        }
                    ]
                },

                StoreUpdate: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/Store"
                        },
                        {
                            type: "object",
                            properties: {
                                
                                images: {
                                    type:"array",
                                    description:"Nuevos archivos de imagen",
                                    items:{
                                        type:"string",
                                        format:"binary"
                                    }
                                },

                                imageUrls:{
                                    type:"array",
                                    description:"Nuevas URLs externas",
                                    items:{
                                        type:"string",
                                        format:"uri"
                                    },
                                    example:[
                                        "https://imagen.com/nueva-tienda.jpg"
                                    ]
                                }
                            }
                        }
                    ]
                },

            DeliveryAddress: {
                type: "object",
                properties: {

                    label:{
                        type:"string",
                        enum:[
                            "home",
                            "work"
                        ],
                        example:"home"
                    },

                    address: {
                        type: "string",
                        example: "Av. Siempre Viva 123"
                    },
                    
                    reference: {
                        type: "string",
                        example: "Portón negro"
                    }
                }
            },

            OrderProduct: {
                type: "object",
                properties: {
                        
                    image: {
                        type: "string",
                        format: "uri",
                        example: "http://localhost:8000/uploads/notebook.jpg"
                    },
                    
                    product: {

                        type: "string",
                        description: "ID del producto",
                        example: "66b5b0a5d3c9d7f5b8d2e123"
                    },
                    
                    name: {
                        type: "string",
                        example: "Notebook Lenovo"
                    },
                    
                    price: {
                        type: "number",
                        example: 950000
                    },
                    
                    quantity: {
                        type: "number",
                        minimum: 1,
                        example: 2
                    }
                }
            },

                Order: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66b5b0a5d3c9d7f5b8d2e999"
                        },
                        buyer: {
                            type: "string",
                            description: "ID del comprador",
                            example: "66b5b0a5d3c9d7f5b8d2e111"
                        },
                        store: {
                            type: "string",
                            description: "ID de la tienda",
                            example: "66b5b0a5d3c9d7f5b8d2e222"
                        },
                        products: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/OrderProduct"
                            }
                        },
                        deliveryAddress: {
                            $ref: "#/components/schemas/DeliveryAddress"
                        },
                        total: {
                            type: "number",
                            example: 1900000
                        },
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "created"
                        },
                        priority: {
                            type: "string",
                            enum: [
                                "low",
                                "normal",
                                "high"
                            ],
                            example: "normal"
                        },
                        proof: {
                            type: "object",
                            nullable: true,
                            example: null
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-27T14:30:00.000Z"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-27T14:30:00.000Z"
                        }
                    }
                },

                OrderCreate: {
                    allOf: [
                        {
                        $ref: "#/components/schemas/Order"
                        },
                        {
                            type: "object",
                            required: [
                                "buyer",
                                "store",
                                "products",
                                "deliveryAddress"
                            ]
                        }
                    ]
                },


                ErrorResponse: {
                    type: "object",
                    required: [
                        "status",
                        "message"
                    ],
                    properties: {
                        status: {
                            type: "string",
                            example: "error"
                        },
                        message: {
                            type: "string",
                            example: "Error al obtener el recurso"
                        },
                        error: {
                            type: "object",
                            nullable: true,
                            example: null
                        }
                    }
                },

                MockUser: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            example: "Juan"
                        },
                        lastName: {
                            type: "string",
                            example: "Perez"
                        },
                        email: {
                            type: "string",
                            example: "juan@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        },
                        role: {
                            type: "string",
                            enum: [
                                "customer",
                                "admin",
                                "driver",
                                "store"
                            ],
                            example: "customer"
                        },

                        images:{
                            type:"array",
                            items:{
                                type:"string",
                                format:"uri"
                            },
                            example:[
                                "http://localhost:8000/uploads/avatar.jpg"
                            ]
                        },
                        documents:{
                            type:"array",
                            items:{
                                type:"string",
                                enum:[
                                    "user_document",
                                    "driver_license",
                                    "delivery_proof"
                                ]
                            },
                            example:[
                                "user_document"
                            ]
                        }
                    }
                },


                MockProduct: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            example: "Mouse Logitech"
                        },
                        description: {
                            type: "string",
                            example: "Mouse inalámbrico"
                        },
                        price: {
                            type: "number",
                            example: 25000
                        },
                        stock: {
                            type: "number",
                            example: 20
                        },
                        category: {
                            type: "string",
                            example: "Tecnología"
                        },
                        images:{
                            type:"array",
                            items:{
                                type:"string",
                                format:"uri"
                            }
                        },
                        seller:{
                            type:"string",
                            description:"ID del vendedor",
                            example:"66b5b0a5d3c9d7f5b8d2e456"
                        }
                    }
                },


                MockStore: {
                    type:"object",
                    properties:{

                        owner:{
                            type:"string",
                            description:"ID del propietario de la tienda",
                            example:"66b5b0a5d3c9d7f5b8d2e456"
                        },

                        name:{
                            type:"string",
                            example:"Tienda Tech"
                        },
                        description:{
                            type:"string",
                            example:"Productos electrónicos"
                        },
                        address:{
                            type:"string",
                            example:"Av Siempre Viva 123"
                        },
                        phone:{
                            type:"string",
                            example:"1122334455"
                        },
                        email:{
                            type:"string",
                            format:"email",
                            example:"tiendatech@gmail.com"
                        },
                        images:{
                            type:"array",
                            items:{
                                type:"string",
                                format:"uri"
                            },
                            example:[
                                "http://localhost:8000/uploads/tienda.jpg"
                            ]
                        },
                        isActive:{
                            type:"boolean",
                            example:true
                        }

                    }
                },


                MockOrder: {
                    type: "object",
                    properties: {
                        buyer: {
                            type: "string",
                            example: "66b5b0a5d3c9d7f5b8d2e111"
                        },

                        store: {
                            type: "string",
                            example: "66b5b0a5d3c9d7f5b8d2e222"
                        },

                        products: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/OrderProduct"
                            },
                            example: [
                                {
                                    product: "66b5b0a5d3c9d7f5b8d2e123",
                                    name: "Notebook Lenovo",
                                    image: "http://localhost:8000/uploads/notebook.jpg",
                                    price: 950000,
                                    quantity: 2
                                }
                            ]

                        },

                        deliveryAddress: {
                            $ref: "#/components/schemas/DeliveryAddress"
                        },

                        total: {
                            type: "number",
                            example: 1900000
                        },

                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "created"
                        },

                        priority: {
                            type: "string",
                            enum: [
                                "low",
                                "normal",
                                "high"
                            ],
                            example: "normal"
                        }
                    }
                },


                LoggerResponse:{
                    type:"object",
                    properties:{
                        status:{
                            type:"string",
                            example:"success"
                        },
                        message:{
                            type:"string",
                            example:"Logger funcionando correctamente"
                        }
                    }
                },



            }
        }
    },
    apis: ["./routes/*.js"]
});