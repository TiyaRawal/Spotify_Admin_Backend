
const { connectDB } = require("../connection");
const { ObjectId } = require("mongodb");

let GetAdminPlanUsers = async (req, res) => {
    try {
        let db = await connectDB();

        let planCollection = db.collection("plans");
        let userCollection = db.collection("users");

        let planId = req.params.planId;

        if (!ObjectId.isValid(planId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid plan ID"
            });
        }

        let plan = await planCollection.findOne({
            _id: new ObjectId(planId)
        });

        if (!plan) {
            return res.status(404).send({
                success: false,
                message: "Plan not found"
            });
        }

        let planName = plan.name;
        let currentDate = new Date();

        let query = {};

        if (planName.toLowerCase() === "basic") {
            query = {
                $or: [
                    { premium: { $ne: true } },
                    { premiumExpiryDate: { $lte: currentDate } },
                    { premiumExpiryDate: { $exists: false } }
                ]
            };
        } else {
            query = {
                premium: true,
                premiumPlan: {
                    $regex: `^${planName}$`,
                    $options: "i"
                },
                premiumExpiryDate: { $gt: currentDate }
            };
        }

        let users = await userCollection
            .find(query, {
                projection: {
                    password: 0
                }
            })
            .toArray();

        return res.status(200).send({
            success: true,
            planName,
            totalUsers: users.length,
            users
        });

    } catch (e) {
        console.log(e);

        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { GetAdminPlanUsers };
