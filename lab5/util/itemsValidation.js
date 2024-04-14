import Ajv from "ajv";

const ajv = new Ajv();

const itemSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    price: { type: "number" },
    desc: { type: "string" },
  },
  required: ["name", "price", "id"],
};

export default ajv.compile(itemSchema);
