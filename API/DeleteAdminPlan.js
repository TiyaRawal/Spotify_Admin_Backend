
const { connectDB } = require("../connection");
const { ObjectId } = require("mongodb");

let DeleteAdminPlan = async (req, res) => {
    try {
        let db = await connectDB();
        let collection = db.collection("plans");

        let { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid plan ID"
            });
        }

        let result = await collection.deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Plan not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Plan deleted successfully"
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { DeleteAdminPlan };
