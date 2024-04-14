import Ajv from "ajv";

const ajv = new Ajv();

const orderSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    totalPrice: {
      type: "number",
      minimum: 0,
    },
    items: {
      type: "array",
      items: {
        type: "number",
      },
      minItems: 1,
    },
  },
  required: ["totalPrice", "items", "id"],
};

export default ajv.compile(orderSchema);
