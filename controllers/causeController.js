const contract = require('../ethereum');
const { ethers } = require("ethers");
const serializeBigInt = require("../utils/serializeBigInt");

module.exports = {

    // Create a new cause
    createCause: async (req, res) => {
        try {
            const { name, description, goalAmount } = req.body;

            // Interact with the blockchain to create a cause
            const tx = await contract.createCause(name, description, ethers.parseEther(goalAmount.toString()));
            await tx.wait();

            res.status(200).json({ message: "Cause created successfully", txHash: tx.hash });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating cause" });
        }
    },

    // Update an existing cause
    updateCause: async (req, res) => {
        try {
            const { name, description, goalAmount } = req.body;
            const causeId = req.params.id;

            const tx = await contract.updateCause(causeId, name, description, ethers.parseEther(goalAmount.toString()));
            await tx.wait();

            res.status(200).json({ message: "Cause updated successfully", txHash: tx.hash });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error?error.reason:"Error updating cause" });
        }
    },

    // Close a cause
    closeCause: async (req, res) => {
        try {
            const causeId = req.params.id;

            const tx = await contract.closeCause(causeId);
            await tx.wait();

            res.status(200).json({ message: "Cause closed successfully", txHash: tx.hash });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error?error.reason:"Error updating cause" });
        }
    },

    // Donate to a cause
    donate: async (req, res) => {
        try {
            const causeId = req.params.id;
            const { amount } = req.body;

            const tx = await contract.donate(causeId, { value: ethers.utils.parseEther(amount.toString()) });
            await tx.wait();

            res.status(200).json({ message: "Donation successful", txHash: tx.hash });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error donating to cause" });
        }
    },

    // List all open causes
    listCauses: async (req, res) => {
        try {
            const causes = await contract.listCauses();
            const formattedCauses = serializeBigInt(causes);
            const responseCauses = formattedCauses.map((cause) => ({
                id: cause[0],
                name: cause[1],
                description: cause[2],
                address: cause[3],
                goalAmount: cause[4],
                fundsRaised: cause[5],
                isOpen: true,
            }));
            res.status(200).json(responseCauses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching causes" });
        }
    },

    getCauseById: async (req, res) => {
        const { id } = req.params;

        try {
            const cause = await contract.getCauseById(id);
            const formattedCause = serializeBigInt(cause);
            const causeDetails = {
                id: formattedCause[0],
                name: formattedCause[1],
                description: formattedCause[2],
                address: formattedCause[3],
                goalAmount: formattedCause[4],
                fundsRaised: formattedCause[5],
                isOpen: true,
            };
            console.log(causeDetails);
            res.json(causeDetails);
        } catch (error) {
            console.error("Error fetching cause by ID:", error);
            res.status(500).json({ error: "Failed to fetch cause details." });
        }
    },

};
