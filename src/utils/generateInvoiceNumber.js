const { Invoice } = require("../models");

module.exports = async function generateInvoiceNumber() {
    const lastInvoice = await Invoice.findOne({
        order: [["id", "DESC"]],
    });

    const lastNumber = lastInvoice ? lastInvoice.id + 1 : 1;

    return "FAC-" + String(lastNumber).padStart(5, "0");
};