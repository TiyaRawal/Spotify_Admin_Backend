const { connectDB } = require("../connection");

let AddAdminPlan = async (req, res) => {
    try {
        let db = await connectDB();
        let collection = db.collection("plans");
        let {name, price, duration, description, features, status} = req.body;
        if (!name || price === undefined || !duration || !description || !Array.isArray(features)) {
            return res.status(400).send({success: false, message: "All plan fields are required"});
        }

        let planExists = await collection.findOne({name: {$regex: `^${name.trim()}$`, $options: "i"}});
        if (planExists) {
            return res.status(400).send({success: false, message: "Plan already exists"});
        }

        let planData = {
            name: name.trim(),
            price: Number(price),
            duration,
            description,
            features,
            status: status || "Active"
        };

        let result = await collection.insertOne(planData);

        return res.status(201).send({success: true, message: "Plan added successfully",
            plan:{_id: result.insertedId, ...planData}
        });

    } catch (e) {
        return res.status(500).send({success: false, message: "Internal Server Error"});
    }
};

module.exports = { AddAdminPlan };
