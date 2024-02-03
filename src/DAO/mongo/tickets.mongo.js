// tickets.mongo.js
import mongoose from 'mongoose';

const ticketsCollection = "ticket";

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String,
    id_cart_ticket: String 
});

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

export default class Tickets {
    constructor() {}

    async get() {
        let tickets = await ticketsModel.find();
        return tickets;
    }

    async getTicketById(ticketId) {
        try {
            let ticket = await ticketsModel.findById(ticketId).lean();
            return ticket;
        } catch (error) {
            console.error("Error al obtener el ticket por ID:", error);
            return "Error interno";
        }
    }

    async addTicket(ticket) {
        try {
            const existingTicket = await ticketsModel.findOne({ code: ticket.code });
            if (existingTicket) {
                // Código duplicado, manejar según sea necesario
                return { error: "El código del ticket ya existe en la base de datos." };
            }

            let result = await ticketsModel.create(ticket);
            return result;
        } catch (error) {
            console.error("Error en la creación del ticket:", error);
            // Devolver un objeto con un mensaje de error
            return { error: "Error interno en la creación del ticket." };
        }
    }
}