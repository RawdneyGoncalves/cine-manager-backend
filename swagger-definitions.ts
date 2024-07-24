import { OpenAPI } from 'openapi-types';

const swaggerDefinition: OpenAPI.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Film and User Management API',
        version: '1.0.0',
        description: 'API para gerenciamento de filmes e usuários',
    },
    paths: {
        '/api/users': {
            get: {
                summary: 'Lista todos os usuários',
                responses: {
                    200: {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            name: { type: 'string' },
                                            email: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/users/register': {
            post: {
                summary: 'Cria um novo usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                                required: ['name', 'email', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Usuário criado com sucesso',
                    },
                    400: {
                        description: 'Requisição inválida',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/users/login': {
            post: {
                summary: 'Faz login do usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                                required: ['email', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login bem-sucedido',
                    },
                    401: {
                        description: 'Credenciais inválidas',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/users/{id}': {
            get: {
                summary: 'Obtém um usuário por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do usuário',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        name: { type: 'string' },
                                        email: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Usuário não encontrado',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
            put: {
                summary: 'Atualiza um usuário por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do usuário',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Usuário atualizado com sucesso',
                    },
                    400: {
                        description: 'Requisição inválida',
                    },
                    404: {
                        description: 'Usuário não encontrado',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
            delete: {
                summary: 'Exclui um usuário por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do usuário',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    204: {
                        description: 'Usuário excluído com sucesso',
                    },
                    404: {
                        description: 'Usuário não encontrado',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/films': {
            get: {
                summary: 'Lista todos os filmes',
                responses: {
                    200: {
                        description: 'Lista de filmes',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            title: { type: 'string' },
                                            themeId: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/films/{id}': {
            get: {
                summary: 'Obtém um filme por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do filme',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Filme encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        title: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Filme não encontrado',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/films/theme/{themeId}': {
            get: {
                summary: 'Obtém filmes por tema',
                parameters: [
                    {
                        name: 'themeId',
                        in: 'path',
                        required: true,
                        description: 'ID do tema',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Lista de filmes por tema',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            title: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/watched-films/mark': {
            post: {
                summary: 'Marca um filme como assistido',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    filmId: { type: 'string' },
                                },
                                required: ['userId', 'filmId'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Filme marcado como assistido',
                    },
                    400: {
                        description: 'Requisição inválida',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/watched-films/unmark': {
            delete: {
                summary: 'Desmarca um filme como assistido',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    filmId: { type: 'string' },
                                },
                                required: ['userId', 'filmId'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Filme desmarcado como assistido',
                    },
                    400: {
                        description: 'Requisição inválida',
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
        '/api/watched-films/report/{userId}': {
            get: {
                summary: 'Gera um relatório de filmes assistidos por usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        required: true,
                        description: 'ID do usuário',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Relatório de filmes assistidos',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            filmId: { type: 'string' },
                                            title: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Erro interno do servidor',
                    },
                },
            },
        },
    },
};

export default swaggerDefinition;
