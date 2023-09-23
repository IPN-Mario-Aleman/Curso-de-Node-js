const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'
    }).min(1),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().positive().max(10),
    poster: z.string().url({
        invalid_type_error: 'Poster must be a URL',
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-fi'])
    )
})

function validateSchema (object) {
    return movieSchema.safeParse(object)
}

function validateUpdateSchema (object) {
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateSchema,
    validateUpdateSchema
}