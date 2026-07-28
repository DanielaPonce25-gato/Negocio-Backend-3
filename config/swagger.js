import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Shipnow API",
            version: "1.0.0",
            description: "Documentación de la API de Shipnow"
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Servidor local"
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

                DeliveryAddress: {
                    type: "object",
                    properties: {
                        label: {
                            type: "string",
                            example: "Casa"
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
                }

            }
        }
    },
    apis: ["./routes/*.js"]
});